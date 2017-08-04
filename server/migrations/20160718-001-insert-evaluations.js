const pg = require('pg');
const fs = require('fs');

// For loading evaluation data from the playtest into the same store.
// First, dump the playtest database to disk.
// Then use this to load it into another database.
// This assumes evidence ids are consistent across databases.


// read db config from disk
const databaseConfig = JSON.parse(fs.readFileSync('./tmp/threeflows_database_config.json'));

// helper for db connection pooling
function queryDatabase(text, values, cb) {
  pg.connect(databaseConfig, function(err, client, done) {
    if (err) console.log({err});
    client.query(text, values, function(err, result) {
      done();
      cb(err, result);
    });
  });
}


// read dump from disk
function readAllEvaluations(callback) {
  const results = JSON.parse(fs.readFileSync('./tmp/playtest_evaluations.json'));
  callback(null, results);
}

// throws away the database-local evaluation id, but relies on the evidence ids
// being consistent across DBs
function insertEvaluation(evaluationRow, callback) {
  console.log('inserting...');
  console.log(evaluationRow);
  const {app, type, version, timestamp, json} = evaluationRow;
  const values = [app, type, version, timestamp, json];
  const sql = `INSERT INTO evaluations (app, type, version, timestamp, json) VALUES ($1,$2,$3,$4,$5);`;
  console.log('sql:', sql);
  console.log('values:', values);
  queryDatabase(sql, values, callback);
}

function insertEach(rows, callback) {
  rows.forEach((evaluationRow) => {
    insertEvaluation(evaluationRow, (err, result) => {
      if (err) return callback(err);
      console.log('Inserted.');
      callback(null, result);
    });
  });
}

function main() {
  readAllEvaluations((err, result) => {
    if (err) return console.log({err});
    const rows = result.rows;
    var remaining = rows.length;
    console.log(`Read ${rows.length} rows.`);

    insertEach(rows, (err, result) => {
      remaining--;
      console.log('.');
      if (err) return console.log({err});

      if (remaining === 0) {
        console.log('Done.');
        process.exit(0); // eslint-disable-line no-process-exit
      }
    });
  });
}

main();