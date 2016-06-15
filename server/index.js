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



// serve static HTML
function readFile(filename) {
  return function(request, response) {
    const absolutePath = path.join(__dirname, '..', 'ui', 'build', filename);
    console.log(absolutePath);
    const string = fs.readFileSync(absolutePath);
    response.end(string);
  }
}
const html = 'index.html';
const bundle = 'bundle.js';
app.get('/', readFile(html));
app.get('/bundle.js', readFile(bundle));
app.get('/challenge/:id', readFile(html));
app.get('/message_popup', readFile(html));



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

app.get('/server/message_popup', function(request, response) {
  // const values = [JSON.stringify(request.body)];
  var urlParts = url.parse(request.url, true);
  var query = urlParts.query;
  const values = [JSON.stringify(query)];
  queryDatabase('INSERT INTO message_popup_responses(json) VALUES ($1)', values, function(err, result) {
    console.log(JSON.stringify(result));
    response.json({result});  
  });
});

app.get('/server/dump', function(request, response) {
  queryDatabase('SELECT * FROM message_popup_responses', [], function(err, result) {
    console.log(JSON.stringify(result));
    response.json({result});  
  });
});


// start server
app.set('port', (process.env.PORT || 5000));
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
