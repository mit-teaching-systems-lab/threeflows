var express = require('express');
var url = require('url');
var _ = require('lodash')
var fs = require('fs');
var path = require('path');
var bodyParser = require('body-parser');
var request = require('superagent');
var basicAuth = require('basic-auth');
var pg = require('pg');

// create and configure server
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(enforceHTTPS);


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

function facultyAuth(req, res, next) {
  if (process.env.NODE_ENV === 'development') return next();

  const {FACULTY_USERNAME, FACULTY_PASSWORD} = process.env;
  if (!FACULTY_USERNAME) return sendUnauthorized(res);
  if (!FACULTY_PASSWORD) return sendUnauthorized(res);

  var user = basicAuth(req);
  console.log({user});
  if (user && user.name === FACULTY_USERNAME && user.pass === FACULTY_PASSWORD) return next();
  
  return sendUnauthorized(res);
};


// api routes
// helper for db connection pooling
function queryDatabase(text, values, cb) {
  pg.connect(process.env.DATABASE_URL, function(err, client, done) {
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


app.get('/server/evidence', facultyAuth, function(request, response) {
  if (process.env.NODE_ENV === 'development' && process.env.READ_LOCAL_EVIDENCE) {
    return readFile('../../tmp/query.json')(request, response);
  }

  queryDatabase('SELECT * FROM evidence ORDER BY timestamp DESC', [], function(err, result) {
    if (err) {
      console.log({ error: err });
      return response.status(500);
    }

    const {rows} = result;
    console.log(`Returning ${rows.length} records.`);
    response.status(200);
    return response.json({rows});
  });
});

app.post('/server/evaluations/:app/:type/:version', function(request, response) {
  const timestamp = Math.floor(new Date().getTime() / 1000);
  const {app, type, version} = request.params;
  const payload = JSON.stringify(request.body);
  const values = [app, type, version, timestamp, payload];

  tellSlackAboutEvaluations(request.params, request.body);

  if (!process.env.DATABASE_URL) {
    console.log('No database.');
    response.status(204);
    return response.json({});
  }

  const sql = `
    INSERT INTO evaluations(app, type, version, timestamp, json)
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

app.get('/server/evaluations', facultyAuth, function(request, response) {
  queryDatabase('SELECT * FROM evaluations ORDER BY timestamp DESC', [], function(err, result) {
    if (err) {
      console.log({ error: err });
      return response.status(500);
    }

    const {rows} = result;
    console.log(`Returning ${rows.length} records.`);
    response.status(200);
    return response.json({rows});
  });
});



app.get('/server/questions', facultyAuth, function(request, response){
  if (process.env.NODE_ENV === 'development') {
    return response.json({});
  }

  queryDatabase('SELECT * FROM message_popup_questions ORDER BY timestamp DESC LIMIT 1', [], function(err, result){
    if (err) {
      console.log({ error: err });
      return response.status(500);
    }

    const {rows} = result;
    console.log(rows);
    response.status(200);
    if(rows.length === 0) return response.json({});
    return response.json({row: rows[0]});
  });
});

// serve static HTML
function readFile(filename) {
  return function(request, response) {
    const absolutePath = path.join(__dirname, '..', 'ui', 'build', filename);
    console.log(absolutePath);
    const string = fs.readFileSync(absolutePath);
    response.end(string);
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
