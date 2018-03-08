const fs = require('fs');
const Mustache = require('mustache');
const request = require('superagent');


// Render email into an HTML string.
// Template is originally from litmus.
function renderEmail(templateFilename, params = {}) {
  const template = fs.readFileSync(templateFilename).toString();
  return Mustache.render(template, params);
}

// Send an email through Mailgun, taking env config, info on email and
// html string.
// Calls back with {status: 'ok'}
function sendEmail(env, info, html, cb) {
  const {subject, fromEmail, toEmail} = info;
  const {MAILGUN_API_KEY, MAILGUN_DOMAIN} = env;
  if (!MAILGUN_API_KEY || !MAILGUN_DOMAIN) {
    console.log('No MailGun env, aborting email...');
    return cb({ error: 'abort' });
  }
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

module.exports = {sendEmail, renderEmail};