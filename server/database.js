const {getDomain} = require('./domain.js');

//Endpoint to handle requests to access participant data
//queries databse for a specific url corresponding to a certain group 
//of users and returns all rows in the evidence table with that url
//Returns 200 unless there was an error with the database query
function dataEndpoint(pool, request, response) {
  const token = request.headers['x-teachermoments-token'];
  const domain = getDomain(request);
  const location = `${domain}/teachermoments/turner?KevinTesting20180319`;

  checkAccess(pool, location, token)
    .then(isTokenAuthorized => {
      if (isTokenAuthorized) {
        getData(pool, location)
          .then(results => {
            response.set('Content-Type', 'application/json');
            response.json({
              evidence: {rows: results} 
            });
            return response.status(200).end();
          });
      }
      else{
        console.log('Researcher is not authorized to see this data');
        return response.status(405).end();
      }
    })
    .catch(err => {
      console.log('Error with database query:', err);
      return response.status(500).end();
    });
}

// Spoofing the part where I confirm a token is allowed to view data from 
// a specific location. Location is currently hard coded so this is fine.
function checkAccess(pool, location, token) {
  return Promise.resolve(true);
}

// This gets list of consenting participant emails and then only grabs 
// data with specified url and emails
// Some testing notes:
//      I've confirmed emails not in the consented_email table do not show up
//      I've confirmed emails that have false in any of audio/permission/consent do not show up
function getData(pool, location){
  const dataValues = [location];
  const dataSQL = `
    SELECT *
    FROM evidence
    WHERE 1=1
      AND json->'GLOBAL'->>'location' = $1
      AND json->>'email' IN (SELECT email FROM consented_email WHERE audio='t' AND permission='t' AND consent='t')
    ORDER BY json->>'sessionId', id ASC;`;

  return pool.query(dataSQL,dataValues)
    .then(results => results.rows)
    .catch(err => {
      console.log('Error with database query:', err);
    });
}

module.exports = {
  dataEndpoint
};