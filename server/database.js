const {getDomain} = require('./domain.js');

//Endpoint to handle requests to access participant data
//queries databse for a specific url corresponding to a certain group 
//of users and returns all rows in the evidence table with that url
//Returns 200 unless there was an error with the database query
function dataEndpoint(pool, request, response) {
  const token = request.headers['x-teachermoments-token'];
  const url = request.headers['x-teachermoments-location'];

  const domain = getDomain(request);
  const location = `${domain}`+url;

  checkAccess(pool, location, token, request)
    .then(isTokenAuthorized => {
      if (isTokenAuthorized) {
        getData(pool, location,request)
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
        return response.status(403).end();
      }
    })
    .catch(err => {
      console.log('Error with database query:', err);
      return response.status(500).end();
    });
}

// It seems more natural to store email/url pairs in access db.
// Should I be using token to find the corresponding email and 
// use the email to check for access?
// I'm not sure how to store token/url pairs.
function checkAccess(pool, location, token, request) {
  return getEmail(pool,token)
    .then(email => {
      const sql = `
        SELECT *
        FROM access
        WHERE email = $1
          AND url = $2`;
      const values = [email, location];
      return pool.query(sql, values)
        .then(results => {
          if (results.rowCount>0) {
            return Promise.resolve(true);
          }
          else{
            return Promise.reject();
          }
        })
        .catch(err => {
          console.log('checkAccess query returned err: ',err);
        });

    })
    .catch(err => {
      console.log('Error in getting email from token: ',err);
    });
}

function getEmail(pool, token) {
  const now = new Date();
  const sql = `
    SELECT email
    FROM tokens
    WHERE token = $1
      AND $2 > timestamp
      And $2 < (timestamp + INTERVAL '24 hours')`;
  const values = [token, now];
  return pool.query(sql, values)
    .then(result => result.rows[0].email)
    .catch(err => {
      console.log('Error in getting email from token: ',err);
    });
}

// This gets list of consenting participant emails and then only grabs 
// data with specified url and emails
// Some testing notes:
//      I've confirmed emails not in the consented_email table do not show up
//      I've confirmed emails that have false in any of audio/permission/consent do not show up
function getData(pool, location,request){
  const dataValues = [location];
  const dataSQL = `
    SELECT *
    FROM evidence
    WHERE 1=1
      AND json->'GLOBAL'->>'location' = $1
      AND LOWER(json->>'email') IN (SELECT email FROM consented_email WHERE audio='t' AND permission='t' AND consent='t')
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