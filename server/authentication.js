const path = require('path');
const uuid = require('uuid');
const qs = require('querystring');
const {sendEmail, renderEmail} = require('./util/email.js');

// Redirect to HTTPS
function enforceHTTPS(request, response, next) {
  if (process.env.NODE_ENV === 'development') return next();
  if (request.headers['x-forwarded-proto'] !== 'https') {
    const httpsUrl = ['https://', request.headers.host, request.url].join('');
    return response.redirect(httpsUrl);
  }
  return next();
}

function getDomain(request) {
  return (process.env.NODE_ENV === 'development')
    ? 'http://localhost:3000'
    : `https://${request.headers.host}`;
}

// Middleman function to confirm authorization token is valid
// Reads token from request header and checks against tokens in db.
// Runs in both development and production
function onlyAllowResearchers(pool, request, response, next) {
  const token = request.headers['x-teachermoments-token'];
  const email = request.headers['x-teachermoments-email'];
  //need to update interactions.js in UI to actually send token and email

  checkToken(pool, email, token)
    .then(istokenAuthorized => {
      if (istokenAuthorized) {
        return next();
      }
      else if (istokenAuthorized===false){
        return response.status(405).end();
      }
      else {
        return response.status(500).end();
      }
    })
    .catch(err => {
      return response.status(500).end();
    });
}

function checkToken(pool, email, token) {
  const now = new Date();

  const sql = `
    SELECT * 
    FROM tokens 
    WHERE token=$1 
      AND email=$2
      AND $3 > timestampz
      And $3 < (timestampz + INTERVAL '24 hours')
    ORDER BY id ASC LIMIT 1`;
  const values = [token, email, now];
  return pool.query(sql, values)
    .then(results => Promise.resolve(results.rowCount===1))
    .catch(err => {
      console.log('checkToken query returned err looking up login token: ', err);
    });
}

//Endpoint to handle login attempts
//Check recieved email against autherized set of researchers on whitelist
//Generates and records link for authorized email. 
//Emails link for next login step
//Returns 200 for success, 405 for unauthorized email and 500 for any errors
function loginEndpoint(pool, mailgunEnv, request, response){
  console.log('Arrived at loginEndpoint');
  const {email} = request.body;

  isOnWhitelist(pool, email)
    .then(isNotAuthorized => {
      if (isNotAuthorized) {
        console.log('isNotAuthorized: ', email);
        return response.status(405).end();
      } else {
        console.log('isAuthorized: ', email);
        const domain = getDomain(request);
        return createLinkAndEmail(pool, mailgunEnv, email, domain)
          .then(result => response.status(200).end());
      }
    })
    .catch(err => {
      console.log('query error in checking email against whitelist: ', err);
      return response.status(500).end();
    });
}

function isOnWhitelist(pool, email){
  console.log('checking whitelist: ', email);
  const whitelistSQL = 'SELECT * FROM whitelist WHERE email=$1 ORDER BY id ASC LIMIT 1';
  const whitelistValues = [email];
  
  return pool.query(whitelistSQL, whitelistValues)
    .then(results => Promise.resolve(results.rowCount === 0));
}

function createLinkAndEmail(pool, mailgunEnv, email, domain) {
  console.log('creating link and email');
  return insertLink(pool,email, domain)
    .then(link => emailLink(mailgunEnv, email, link));
}

function insertLink(pool, email, domain) {
  const linkToken = uuid.v4();
  //TODO: what should link look like???
  const link = `${domain}/login_from_email?${qs.stringify({linkToken})}`;
  console.log('inserting link: ', link);

  // Insert link into database
  const linkSQL = `INSERT INTO links(email, link, timestampz) VALUES ($1, $2, $3)`;
  const now = new Date();
  const linkValues = [email, linkToken, now];
  return pool.query(linkSQL, linkValues)
    .then(results => link)
    .catch(err => {
      console.log('query error in inserting new link into database: ', err);
    });
}

function emailLink(mailgunEnv, email, link) {
  console.log('emailing link: ', link, email);
  const loginlinkFilename = path.join(__dirname,'research/loginlink.html.mustache');
  const html = renderEmail(loginlinkFilename,{link});

  const info = {
    toEmail: email,
    fromEmail: 'teacher-moments@tsl.mit.edu',
    subject: 'Teacher Moments: Login Link'
  };

  if (process.env.NODE_ENV !== 'production') {
    if (process.env.NODE_ENV === 'development') {
      console.log('No emailing except for in production mode. Go to the following link to move forward.');
      console.log(link);
    }
    return Promise.resolve();
  }

  return new Promise((resolve, reject) => {
    sendEmail(mailgunEnv, info, html, (err, mailgunResponse) => {
      if (err) {
        console.log("Mailgun request (err):\n  " + JSON.stringify(err, null, 2));
        return reject(err);
      }
      console.log("Mailgun returned:\n  " + JSON.stringify(mailgunResponse, null, 2));
      return resolve();   
    });
  });
}

// Endpoint to check link from researchers' email
// Confirm email link is valid and generates token 
// for user to access data. Adds token to 'tokens' database
// 
function emailLinkEndpoint(pool, request, response){
  const linkToken = request.body['link'];
  const email = request.body['email'];
  checkLink(pool, email, linkToken)
    .then(isLinkTokenAuthorized => {
      if (isLinkTokenAuthorized) {
        console.log('LinkToken Authorized');
        generateToken(pool, email)
          .then(results => {
            const token = results;
            response.set('Content-Type', 'application/json');
            response.json({ 
              token: token
            });
            return response.status(200).end();
          });
      }
      else {
        console.log('Unauthorized linkToken:', linkToken);
        return response.status(405).end();
      }
    })
    .catch(err => {
      console.log('emailLinkEndpoint returned error: ', err);
      return response.status(500).end();
    });
}

function checkLink(pool, email, link) {
  const now = new Date();

  const linkSQL = `
    SELECT * 
    FROM links 
    WHERE link=$1 
      AND email=$2
      AND $3 > timestampz
      And $3 < (timestampz + INTERVAL '24 hours')
    ORDER BY id ASC LIMIT 1`;
  const linkValues = [link, email, now];
  return pool.query(linkSQL, linkValues)
    .then(results => {
      return Promise.resolve(results.rowCount===1);
    })
    .catch(err => {
      console.log('query error in confirming email with login link: ', err);
    });
}

function generateToken(pool, email) {
  const now = new Date();
  //Create actual token and insert into token DB
  const token = uuid.v4();

  const sql = `INSERT INTO tokens(email, token, timestampz) VALUES ($1, $2, $3)`;
  const values = [email, token, now];
  return pool.query(sql, values)
    .then(result => token)
    .catch(err => {
      console.log('query error in inserting new token into database: ', err);
    });
}

module.exports = {
  enforceHTTPS,
  onlyAllowResearchers,
  loginEndpoint,
  emailLinkEndpoint
};