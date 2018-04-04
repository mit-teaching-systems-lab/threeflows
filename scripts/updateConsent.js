var fs = require('fs');
const {Pool} = require('pg');

function updateConsent(database){
  //Still need to grab emails from a sensitive data file
  const emails = JSON.parse(fs.readFileSync('./tmp/consented-latest.json'))
  const emailArray = emails.consented;
  const promiseArray = emailArray.map(email => {
    const pool = new Pool({database});
    const sql = `
      INSERT INTO consented_email_test (email,audio,permission,consent) 
      VALUES ($1,TRUE,TRUE,TRUE);`;
    const values = [email]
    return pool.query(sql,values);
  });
  return Promise.all(promiseArray);
}

// Create a new database for test or development mode, and 
// create the tables for the database.
const databaseName = process.argv[2];
updateConsent(databaseName)
  .then(results => {
    console.log('Done updating database.');
    process.exit(0); // eslint-disable-line no-process-exit
  })
  .catch(err => {
    console.log('error', err);
    process.exit(1); // eslint-disable-line no-process-exit
  });

