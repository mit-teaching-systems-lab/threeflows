var fs = require('fs');
const {Pool} = require('pg');

function batchPromises(batchSize, emails, fn){
  const current = emails.slice(0,batchSize)
  const rest = emails.slice(batchSize)
  console.log(current.length, rest.length)

  const currentPromises = current.map(fn);
  // we want to then this somehow, with Promise.all probably

  const restPromises = (rest.length === 0)
    ? []
    : batchPromises(batchSize,rest,fn);

  return Promise.all(currentPromises.concat(restPromises));
}

function updateConsent(database){
  //Still need to grab emails from a sensitive data file
  // const emails = JSON.parse(fs.readFileSync('./tmp/consented-latest.json'))
  const emails = JSON.parse(fs.readFileSync('./tmp/consented-latest.json'))
  const emailArray = emails.consented;
  console.log("processing", emailArray.length, " emails")

  const pool = new Pool({database});
  return batchPromises(5, emailArray, email => {
    const sql = `
      INSERT INTO consented_email (email,audio,permission,consent) 
      VALUES ($1,TRUE,TRUE,TRUE)
      ON CONFLICT (email)
      DO NOTHING
      ;`;
    const values = [email]
    return pool.query(sql,values);
  });
}

// Create a new database for test or development mode, and 
// create the tables for the database.
const databaseName = process.argv[2];
updateConsent(databaseName)
  .then(results => {
    console.log(results.length,"emails inserted")
    // console.log("processing", results.length, " emails")
    console.log('Done updating database.');
    process.exit(0); // eslint-disable-line no-process-exit
  })
  .catch(err => {
    console.log('error', err);
    process.exit(1); // eslint-disable-line no-process-exit
  });

