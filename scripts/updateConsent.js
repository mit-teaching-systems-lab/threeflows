var fs = require('fs');
const {Pool} = require('pg');

function updateConsent(database){
  //Still need to grab emails from a sensitive data file
  const emails = JSON.parse(fs.readFileSync('./tmp/consented-latest.json'))
  const emailString = emails.consented.map(x => "'" + x + "'").toString();
  const pool = new Pool({database});
  const sql = `
    INSERT INTO consented_email_test (email,audio,permission,consent) 
    SELECT x,TRUE,TRUE,TRUE 
    FROM unnest(ARRAY[${emailString}]) x;`;
  console.log(sql)
  return pool.query(sql);
}

// Create a new database for test or development mode, and 
// create the tables for the database.
const databaseName = process.argv[2];
updateConsent(databaseName)
  .then(results => {
    console.log('Done.');
    process.exit(0); // eslint-disable-line no-process-exit
  })
  .catch(err => {
    console.log('error', err);
    process.exit(1); // eslint-disable-line no-process-exit
  });

