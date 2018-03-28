const {getDomain} = require('./domain.js');

//Endpoint to handle requests to access participant data
//queries databse for a specific url corresponding to a certain group 
//of users and returns all rows in the evidence table with that url
//Returns 200 unless there was an error with the database query
function dataEndpoint(pool, request, response) {
  const domain = getDomain(request);
  const location = `${domain}/teachermoments/turner?KevinTesting20180319`;

  const values = [location];
  const sql = `
    SELECT *
    FROM evidence
    WHERE 1=1
      AND json->'GLOBAL'->>'location' = $1
    ORDER BY json->>'sessionId', id ASC;`;

  pool.query(sql,values)
    .then(results => {
      if (results.rowCount >= 1){
        response.set('Content-Type', 'application/json');
        response.json({
          evidence: {rows: results.rows} 
        });
        return response.status(200).end();
      }
      else{
        console.log('Could not find data with url:', location);
        return response.status(200).end();
      }
    })
    .catch(err => {
      console.log('Error with database query:', err);
      return response.status(500).end();
    });
}

module.exports = {
  dataEndpoint
};