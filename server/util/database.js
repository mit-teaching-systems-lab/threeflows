const {Pool} = require('pg');


// For querying the database
function createPool(connectionString) {
  return new Pool({connectionString});
}

module.exports = {createPool};