const {Pool} = require('pg');

function makeCreateQuery(dbName) {
  if (dbName === 'teacher-moments-db') return 'CREATE DATABASE "teacher-moments-db";';
  if (dbName === 'teacher-moments-db-test') return 'CREATE DATABASE "teacher-moments-db-test";';
  throw new Error('unexpected database name: ', dbName);
}

function createDatabase(databaseName) {
  const pool = new Pool();
  const sql = makeCreateQuery(databaseName);
  console.log(`Creating database ${databaseName}...`);
  return pool.query(sql);
}

function createTables(database) {
  const pool = new Pool({database});
  const sql = `
    CREATE TABLE evidence (
      id serial primary key,
      app text,
      type text,
      version integer,
      timestamp timestamp,
      json jsonb
    );
    CREATE TABLE evaluations (
      id serial primary key,
      app text,
      type text,
      version integer,
      timestamp timestamp,
      json jsonb
    );
    CREATE TABLE message_popup_questions (
      id serial primary key,
      timestamp timestamp,
      questions jsonb
    );
    CREATE TABLE reviews (
      id serial primary key,
      timestamp timestamp,
      review_key text,
      access_code text
    );
    CREATE TABLE review_tokens (
      id serial primary key,
      timestamp timestamp,
      review_id integer,
      email_address text,
      hid text,
      token text
    );
    CREATE TABLE links (
      id serial primary key,
      email text,
      link text,
      timestamp timestamptz
    );
    CREATE TABLE whitelist (
      id serial primary key,
      email text
    );
    CREATE TABLE tokens (
      id serial primary key,
      email text,
      token text,
      timestamp timestamptz
    );
    CREATE TABLE consented_email (
      id serial primary key,
      email text UNIQUE,
      audio boolean DEFAULT FALSE,
      permission boolean DEFAULT FALSE,
      consent boolean DEFAULT FALSE
    );
    CREATE TABLE transcripts (
      email text,
      audio_id text UNIQUE,
      transcript text
    );`;
  console.log(`Creating tables...`);
  return pool.query(sql);
}


// Create a new database for test or development mode, and 
// create the tables for the database.
const databaseName = process.argv[2];
createDatabase(databaseName)
  .then(results => createTables(databaseName))
  .then(results => {
    console.log('Done.');
    process.exit(0); // eslint-disable-line no-process-exit
  })
  .catch(err => {
    console.log('error', err);
    process.exit(1); // eslint-disable-line no-process-exit
  });

