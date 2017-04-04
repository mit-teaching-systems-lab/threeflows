var express = require('express');
var url = require('url');
var _ = require('lodash')
var fs = require('fs');
var path = require('path');
var bodyParser = require('body-parser');
var request = require('superagent');
var basicAuth = require('basic-auth');
var pg = require('pg');
var AudioEndpoints = require('./endpoints/audio.js');
var ReviewEndpoint = require('./endpoints/review.js');
var ReviewLoginEndpoint = require('./endpoints/review_login.js');
var createS3Client = require('./s3_client.js');
var createMailgunEnv = require('./mailgun_env.js');


// create and configure server
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.raw({ type: 'audio/wav', limit: '50mb' }));
app.use(enforceHTTPS);

// external services
const s3 = createS3Client();
const mailgunEnv = createMailgunEnv();

// https redirect
function enforceHTTPS(request, response, next) {
  if (process.env.NODE_ENV === 'development') return next();
  
  if (request.headers['x-forwarded-proto'] !== 'https') {
    const httpsUrl = ['https://', request.headers.host, request.url].join('');
    return response.redirect(httpsUrl);
  }

  return next();
}

// auth middleware
function sendUnauthorized(res) {
  res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
  return res.send(401);
};

function questionAuthoringAuth(req, res, next) {
  if (process.env.NODE_ENV === 'development') return next();

  const {QUESTION_AUTHORING_USERNAME, QUESTION_AUTHORING_PASSWORD} = process.env;
  if (!QUESTION_AUTHORING_USERNAME) return sendUnauthorized(res);
  if (!QUESTION_AUTHORING_PASSWORD) return sendUnauthorized(res);

  var user = basicAuth(req);
  console.log({user});
  if (user && user.name === QUESTION_AUTHORING_USERNAME && user.pass === QUESTION_AUTHORING_PASSWORD) return next();
  
  return sendUnauthorized(res);
};


// api routes
// helper for db connection pooling
function queryDatabase(text, values, cb) {
  const connectionUrl = (process.env.NODE_ENV === 'development')
    ? process.env.DATABASE_URL
    : process.env.DATABASE_URL +'?ssl=true';
  pg.connect(connectionUrl, function(err, client, done) {
    client.query(text, values, function(err, result) {
      done();
      cb(err, result);
    });
  });
};

// This endpoint that receives all evidence.
// The payload is determined by the type, but for now it only
// supports JSON serialization and puts everything in the same
// Postgres table with a jsonb column.
app.post('/server/evidence/:app/:type/:version', function(request, response) {
  const timestamp = Math.floor(new Date().getTime() / 1000);
  const {app, type, version} = request.params;
  const payload = JSON.stringify(request.body);
  const values = [app, type, version, timestamp, payload];

  tellSlackAboutEvidence(request.params, request.body);

  if (!process.env.DATABASE_URL) {
    console.log('No database.');
    response.status(204);
    return response.json({});
  }

  const sql = `
    INSERT INTO evidence(app, type, version, timestamp, json)
    VALUES ($1,$2,$3,to_timestamp($4),$5)`;
  queryDatabase(sql, values, function(err, result) {
    if (err) {
      console.log({ error: err });
      return response.status(500);
    }
    console.log(JSON.stringify(result));
    response.status(201);
    return response.json({});  
  });
});

function tellSlackAboutEvaluations(params, body) {
  return tellSlack('Got evaluation.');
}

function tellSlackAboutEvidence(params, body) {
  return tellSlack('Got evidence.');
}

function tellSlack(text) {
  var url = process.env.SLACK_EVIDENCE_WEBHOOK_URL;
  if (!url) return console.log('Slack integration not enabled.');
  request
    .post(url)
    .send({
      username: "robo-coach",
      icon_emoji: ":robot_face:",
      text: text
    })
    .set('Accept', 'application/json')
    .end();
}


app.post('/server/questions', questionAuthoringAuth, function(request, response){
  const timestamp = Math.floor(new Date().getTime() / 1000);
  const questions = JSON.stringify(request.body);
  const values = [timestamp, questions];

  if (!process.env.DATABASE_URL) {
    console.log('No database.');
    return response.status(204);
  }

  const sql = `
    INSERT INTO message_popup_questions(timestamp, questions)
    VALUES (to_timestamp($1), $2)`;

    queryDatabase(sql, values, function(err, result){
      if(err) {
        console.log({ error: err });
        return response.status(500);
      }
      console.log(JSON.stringify(result));
      response.status(201);
      return response.json({});
    });

});

app.get('/server/questions', questionAuthoringAuth, function(request, response){
  if (process.env.NODE_ENV === 'development' && !process.env.DATABASE_URL) {
    return response.json({questions: {currentQuestions:[], archivedQuestions: []}});
  }

  queryDatabase('SELECT * FROM message_popup_questions ORDER BY timestamp DESC LIMIT 1', [], function(err, result){
    if (err) {
      console.log({ error: err });
      return response.status(500);
    }

    const {rows} = result;
    console.log(rows);
    response.status(200);
    if(rows.length === 0) return response.json({questions: {currentQuestions:[], archivedQuestions: []}});
    return response.json({questions: rows[0].questions});
  });
});


// Write audio responses
app.post('/teachermoments/wav', AudioEndpoints.post(s3));


// Related to the read path for reviewing responses, and for fetching audio files
app.post('/server/reviews/create', ReviewLoginEndpoint.createReview({queryDatabase, mailgunEnv}));
app.get('/server/reviews', ReviewEndpoint.sensitiveGetReview({queryDatabase}));
app.get('/teachermoments/wav/(:id).wav', ReviewEndpoint.sensitiveGetAudioFile({queryDatabase, s3}));



// serve static HTML
function readFile(filename) {
  return function(request, response) {
    const absolutePath = path.join(__dirname, '..', 'ui', 'build', filename);
    console.log(absolutePath);
    const readStream = fs.createReadStream(absolutePath);
    readStream.pipe(response);
  }
}
app.get('/bundle.js', readFile('bundle.js'));
app.get('/playtest.html', readFile('playtest.html'));
app.get('/favicon.ico', (request, response) => { response.status(404).end() });
app.get('*', readFile('index.html'));


// start server
app.set('port', (process.env.PORT || 5000));
app.listen(app.get('port'), function() {
  console.log('Server is running on port:', app.get('port'));
});