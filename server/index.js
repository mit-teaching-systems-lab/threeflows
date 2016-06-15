var express = require('express');
var url = require('url');
var _ = require('lodash')
var fs = require('fs');
var path = require('path');
var bodyParser = require('body-parser')

// create and configure server
var app = express();
app.use(bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({    // to support URL-encoded bodies
  extended: true
}));




// api routes
// helper for db connection pooling
var pg = require('pg');
function queryDatabase(text, values, cb) {
  pg.connect(process.env.DATABASE_URL, function(err, client, done) {
    client.query(text, values, function(err, result) {
      done();
      cb(err, result);
    });
  });
};

app.post('/server/message_popup', function(request, response) {
  const values = [JSON.stringify(request.body)];
  queryDatabase('INSERT INTO message_popup_responses(json) VALUES ($1)', values, function(err, result) {
    if (err) {
      console.log({ error: err });
      return response.code(500);
    }
    console.log(JSON.stringify(result));
    response.json({result});  
  });
});

app.get('/server/dump', function(request, response) {
  queryDatabase('SELECT * FROM message_popup_responses', [], function(err, result) {
    if (err) {
      console.log({ error: err });
      return response.code(500);
    }
    console.log(JSON.stringify(result));
    response.json({result});  
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
app.get('*', readFile('index.html'));


// start server
app.set('port', (process.env.PORT || 5000));
app.listen(app.get('port'), function() {
  console.log('Server is running on port:', app.get('port'));
});
