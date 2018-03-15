const {getDomain} = require('../domain.js');
const uuid = require('uuid');
const Mustache = require('mustache');
const fs = require('fs');
const path = require('path');
const qs = require('querystring');
const request = require('superagent');
const crypto = require('crypto');
const {isSensitiveReviewingEnabled} = require('./review.js');

function createDatabaseTimestamp() {
  return Math.floor(new Date().getTime() / 1000);
}

// For communicating without using plain email address in querystrings.
// This is used client side as well, and so this is more obfuscation than
// security.
function hashedEmail(emailAddress) {
  const shasum = crypto.createHash('sha256');
  shasum.update(emailAddress);
  return shasum.digest('hex');
}

// Creates a new review token and inserts it into the db.
// This will grant the emailAddress access to their user data
// for a limited time window.
// Calls back with {token}
function createReviewToken(params, cb) {
  const {queryDatabase, reviewRow, emailAddress} = params;

  const token = uuid.v4();
  const timestamp = createDatabaseTimestamp();
  const hid = hashedEmail(emailAddress);
  const values = [reviewRow.id, emailAddress, hid, token, timestamp];
  const sql = `
    INSERT INTO review_tokens(review_id, email_address, hid, token, timestamp)
    VALUES ($1,$2,$3,$4,to_timestamp($5));`;
  queryDatabase(sql, values, (err, result) => {
    if (err) {
      return cb(err);
    }
    return cb(null, {token});
  });
}


// Sends email with a login link that has a token valid for a limited time window.
// The user will also have to confirm email address again to gain access.
// Calls back with { status: 'ok' }
function sendAuthenticationEmail(params, cb) {
  const {domain, emailAddress, token, mailgunEnv} = params;

  const link = `${domain}/teachermoments/review_link?${qs.stringify({token})}`;
  console.log(`sendAuthenticationEmail: link = ${link}`);

  // Render email with link and send it.
  const html = renderEmail({link});
  const info = {
    toEmail: emailAddress,
    fromEmail: 'teacher-moments-bot@tsl.mit.edu',
    subject: 'Review your responses'
  };
  sendEmail(mailgunEnv, info, html, (err, result) => {
    if (err) return cb(err);
    return cb(null, { status: 'ok' });
  });
  return;
}


// Render email into an HTML string.  Template is originally from litmus.
function renderEmail(params) {
  const {link} = params;
  const templateFilename = path.join(__dirname, '/review.html.mustache');
  const template = fs.readFileSync(templateFilename).toString();
  return Mustache.render(template, {link});
}


// Send an email through Mailgun, taking env config, info on email and html string.
// Calls back with {status: 'ok'}
function sendEmail(env, info, html, cb) {
  const {subject, fromEmail, toEmail} = info;
  const {MAILGUN_API_KEY, MAILGUN_DOMAIN} = env;
  console.log('Sending `' + subject + '` to ' + toEmail + ' from ' + fromEmail);

  request
    .post('https://api:' + MAILGUN_API_KEY + '@api.mailgun.net/v3/' + MAILGUN_DOMAIN + '/messages')
    .set('Content-Type', 'application/x-www-form-urlencoded')
    .set('Accept', 'application/json')
    .send({
      from: fromEmail,
      to: toEmail,
      subject: subject,
      html: html
    })
    .end((err, result) => {
      console.log('Mailgun request (err, result):', "\n  " + JSON.stringify(err), "\n  " + JSON.stringify({ status: result.status, text: result.text }));
      if (err) return cb(err);
      return cb(null, { status: 'ok' });
    });
}



module.exports = {
  // Takes a reviewKey and an access code, given in person or out of band of this system.
  // The learner can give those along with their email address to generate a login token for
  // a limited time window, that is sent to their email address as an authentication check.
  createReview(mailgunEnv, queryDatabase) {
    return (request, response) => {
      const reviewKey = request.body.review_key;
      const accessCode = request.body.access_code;
      const emailAddress = request.body.email_address;

      // Check global kill switch
      if (!isSensitiveReviewingEnabled()) {
        console.log('createReview: not isSensitiveReviewingEnabled');
        response.status(403);
        response.json({ error: 'unauthorized' });
        return;
      }

      // Do reviewKey and accessCode match?
      const values = [reviewKey, accessCode];
      queryDatabase('SELECT * FROM reviews WHERE review_key=$1 and access_code=$2 ORDER BY id ASC LIMIT 1', values, function(err, result){
        if (err) {
          console.log({ error: err });
          return response.status(500);
        }

        // 403 back
        const {rows} = result;
        const reviewRow = rows[0];
        if (!reviewRow) {
          console.log('createReview: unauthorized', JSON.stringify({reviewKey, accessCode, emailAddress}, null, 2));
          response.status(403);
          response.json({ error: 'unauthorized' });
          return;
        }

        // Create new token for user and insert into DB,
        // then send email with login link.
        console.log('createReview: creating token...');
        createReviewToken({queryDatabase, reviewRow, emailAddress}, function(err, result) {
          if (err) {
            console.log('createReview: createReviewToken failed', JSON.stringify(err, null, 2));
            response.status(500);
            response.json({ status: 'error' });
            return;
          }

          const token = result.token;
          const domain = getDomain(request);
          const sendParams = {domain, emailAddress, mailgunEnv, token};
          console.log('createReview: sending email...');
          sendAuthenticationEmail(sendParams, function(err, result) {
            if (err) {
              console.log('createReview: sendAuthenticationEmail failed', JSON.stringify(err, null, 2));
              response.status(500);
              response.json({ status: 'error' });
              return;
            }

            console.log('createReview: sent');
            response.status(201);
            response.json({ status: 'sent' });
            return;
          });
        });
      });
    };
  }
};
