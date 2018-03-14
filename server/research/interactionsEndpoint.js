// For getting all interactions
function interactionsEndpoint(pool, req, res) {
  console.log('up to here is fine');
  const sql = `SELECT * FROM interactions`;

  pool.query(sql)
    .then(results => {
      res.set('Content-Type', 'application/json');
      res.json(results.rows);
      return res.status(200).end();

    })
    .catch(err => {
      console.log('query error in grabbing interactions: ', err);
    });
}

module.exports = {
  interactionsEndpoint
};
