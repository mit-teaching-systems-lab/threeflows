function dataEndpoint(pool, request, response) {
  // const test_location = request.headers['x-teachermoments-location'];
  // console.log(test_location)

  const location = 'http://localhost:3000/teachermoments/turner?KevinTesting20180319';

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
        console.log('found data');
        console.log(results);
        response.set('Content-Type', 'application/json');
        response.json({
          evidence: {rows: results.rows} 
        });
        return response.status(200).end();
      }
      else{
        console.log('Could not find data with url:', location);
        return response.status(500).end();
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