const httpMocks = require('node-mocks-http');
const {Pool} = require('pg');
const {EventEmitter} = require('events');



function truncate(pool) {
  return pool.query('TRUNCATE links; TRUNCATE whitelist; TRUNCATE tokens');
}

function seed(pool) {
  return pool.query('INSERT INTO whitelist(email) VALUES($1)', ['kevin@mit.edu']);
}

function abortUnlessTest() {
  if (process.env.NODE_ENV !== 'test') {
    console.log('Aborting, this only works in test mode.');
    return process.exit(1); // eslint-disable-line no-process-exit
  }
}

// This provides a real EventEmitter implementation so that we
// can say request.on('end', () => ... ) in tests
function testResponse() {
  return httpMocks.createResponse({ eventEmitter: EventEmitter });
}

// A pool for connecting to the test database
function testPool() {
  abortUnlessTest();
  const connectionString = process.env.DATABASE_URL;
  return new Pool({connectionString});
}

// This resets the test database and re-seeds it.
function resetTestDatabase() {
  abortUnlessTest();
  const pool = testPool();

  return truncate(pool)
    .then(results => seed(pool))
    .then(results => pool.end())
    .catch(err => console.log('resetTestDatabase error:', err));
}

module.exports = {
  testPool,
  testResponse,
  resetTestDatabase
};