var fs = require('fs');
const {Pool} = require('pg');
const config = {
  postgresUrl: (process.env.NODE_ENV === 'development')
    ? process.env.DATABASE_URL
    : process.env.DATABASE_URL +'?ssl=true'
};

function batchPromises(batchSize, emails, fn){
  const current = emails.slice(0,batchSize)
  const rest = emails.slice(batchSize)
  const currentPromises = current.map(fn);
  // we want to then this somehow, with Promise.all probably

  const restPromises = (rest.length === 0)
    ? []
    : batchPromises(batchSize,rest,fn);

  return Promise.all(currentPromises.concat(restPromises));
}

function updateConsent(){
  //Still need to grab emails from a sensitive data file
  const emails = JSON.parse(fs.readFileSync("/dev/stdin", "utf-8"))
  const emailArray = emails.consented;
  console.log("processing", emailArray.length, "emails...")
  const pool = new Pool({connectionString:config.postgresUrl});
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
updateConsent()
  .then(results => {
    console.log('Done updating database.');
    // process.exit(0); // eslint-disable-line no-process-exit
  })
  .catch(err => {
    console.log('error', err);
    // process.exit(1); // eslint-disable-line no-process-exit
  });

