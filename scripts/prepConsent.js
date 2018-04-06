const fs = require('fs');
const path = require('path');
const syncCsvParse = require('csv-parse/lib/sync');
const _ = require('lodash');
const moment = require('moment');


// Check command line arguments
if (process.argv.length !== 3) {
  console.log('Command line argument missing, aborting...');
  console.log('');
  console.log('Usage: node scripts/prepConsent.js tmp/consented-latest-raw.csv');
  process.exit(1);
}

const csvFilename = process.argv[2];
const csvString = fs.readFileSync(csvFilename).toString();
const rows = syncCsvParse(csvString, { columns: true});

// Take most recent entry only, if participant filled it
// out several times.
const rowsByEmail = _.groupBy(rows, 'Email');
const latestRows = _.values(rowsByEmail).map(rows => _.last(rows));

const KEYS = {
  'photos': 'May we include you in photographs taken during this event in our materials (website,  brochures)?',
  'audio': 'I give my permission to be.....',
  'permission': 'I give my permission for the following information to be included in publications resulting from this study:',
  'email': 'Email',
  'consent': 'Consent'
};

const VALUES = {
  'audioRecording': 'audio recorded during testing activities and interviews',
  'allRecording': 'audio recorded during testing activities and interviews., video recorded during testing activities and interviews.',
  'allPermission': 'my name., my title., direct quotes.',
  'directQuotes': 'direct quotes',
  'giveConsent': 'Yes, I consent to be a part of this study.'
}

// The actual substance of the filters are here
// TODO(kr) should defer these to each analysis
const consentedRows = latestRows.filter((row) => {
  if (row[KEYS.audio].indexOf(VALUES.audioRecording) === -1) return false;
  if (row[KEYS.permission].indexOf(VALUES.directQuotes) === -1) return false;
  if (row[KEYS.consent] !== VALUES.giveConsent) return false;

  return true;
});
console.log(`Of ${rows.length} total rows, found ${consentedRows.length} consented email addresses.`);


// Write out to disk
function writeConsentToDisk(consentedRows, filename) {
  console.log(`Writing consent information to ${filename}...`);
  const output = JSON.stringify({
    consented: consentedRows.map(row => row[KEYS.email].toLowerCase())
  }, null, 2);
  fs.writeFileSync(filename, output);
}

const dateString = moment().format('YYYY-MM-DD');
const filenameWithDate = path.resolve(__dirname, `../tmp/consented-${dateString}.json`);
const filenameLatest = path.resolve(__dirname, `../tmp/consented-latest.json`);
writeConsentToDisk(consentedRows, filenameLatest);
writeConsentToDisk(consentedRows, filenameWithDate);
console.log('Done.');