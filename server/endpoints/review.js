const dateFns = require('date-fns');
const uuid = require('uuid');
const Mustache = require('mustache');
const fs = require('fs');
const path = require('path');
const qs = require('querystring');
const request = require('superagent');
const crypto = require('crypto');
const {getDomain} = require('../domain.js');
const {insecureStreamAudioFileFromS3} = require('./audio.js');


// Global kill switch for sensitive reviews, overridding all other settings.
function isSensitiveReviewingEnabled() {
  return (process.env.IS_SENSITIVE_REVIEWING_ENABLED.toLowerCase() === 'true');
}

function createDatabaseTimestamp() {
  return Math.floor(new Date().getTime() / 1000);
}

// Gatekeeper authorizing whether (token, hid) pair
// is within valid time window where we should allow them access
// to learner data for the hid.
// Also requires ENABLE_REVIEWS environment variable to equal 'true',
// as a global switch.
//
// Calls back with {reviewTokenRow}, which may be null.
function getReviewTokenRow(params, cb) {
  if (!isSensitiveReviewingEnabled()) {
    console.log('getReviewTokenRow: not isSensitiveReviewingEnabled');
    return cb(null, null);
  }

  const {queryDatabase, token, hid} = params;
  const timestamp = createDatabaseTimestamp();
  const values = [token, hid, timestamp];
  const sql = `
    SELECT *
    FROM review_tokens
    WHERE token=$1
      AND hid=$2
      AND to_timestamp($3) > timestamp
      AND to_timestamp($3) < (timestamp + INTERVAL '24 hours')
    ORDER BY id ASC LIMIT 1`;
  queryDatabase(sql, values, (err, result) => {
    if (err) {
      console.log('getReviewTokenRow: error', JSON.stringify(err));
      return cb(err);
    }

    const reviewTokenRow = result.rows[0];
    cb(null, {reviewTokenRow});
  });
}


// Get all responses from all sessions for an (emailAddress, locationUrl) pair,
// sorted in the order they were logged.  Calls back with {rows} of db rows.
function getResponseRows(params, cb) {
  const {queryDatabase, emailAddress, locationUrl} = params;

  const sql = `
    SELECT
      json->>'sessionId' as session_id,
      timestamp,
      type,
      json->'question' as question,
      json->>'audioUrl' as audio_url
    FROM evidence
    WHERE 1=1
      AND json->>'email' = $1
      AND json->'GLOBAL'->>'location' = $2
    ORDER BY json->>'sessionId', id ASC;`;
  const values = [emailAddress, locationUrl];
  queryDatabase(sql, values, (err, result) => {
    if (err) {
      console.log('getResponseRows: error', JSON.stringify(err));
      return cb(err);
    }

    const {rows} = result;
    return cb(null, {rows});
  });
}


module.exports = {
  isSensitiveReviewingEnabled,

  // Returns user data describing responses, if (token, hid) pair is valid
  // and within time window.
  sensitiveGetReview({queryDatabase}) {
    return (request, response) => {
      const {token, hid} = request.query;

      // Are the token and hid valid and within the time window?
      getReviewTokenRow({queryDatabase, token, hid}, function(err, result){
        if (err) {
          console.log('sensitiveGetReview: error on getReviewTokenRow', JSON.stringify(err));
          response.status(500);
          response.json({ status: 'error' });
          return;
        }

        // 403 back
        if (!result || !result.reviewTokenRow) {
          console.log('getReview: unauthorized', JSON.stringify({token, hid}));
          response.status(403);
          response.json({ status: 'unauthorized' });
          return;
        }
        
        // TODO(kr) generalize this and include this in `review` table
        const domain = getDomain(request);
        const locationUrl = `${domain}/teachermoments/sub?group=css`;

        // Return results
        const emailAddress = result.reviewTokenRow.email_address;
        const getParams = {queryDatabase, emailAddress, locationUrl};
        console.log('getReview: sending data...', JSON.stringify(getParams));
        getResponseRows(getParams, (err, result) => {
          if (err) {
            console.log('getReview: error', JSON.stringify(err));
            response.status(500);
            reponse.json({ status: 'error' });
            return;
          }

          const {rows} = result;
          console.log(`getReview: returning ${rows.length} rows...`);
          response.status(200);
          response.json(rows);
          return;
        });
      });
    }
  },

  // Streams an audio file of user recordings from S3, if (token, hid) pair
  // is valid and within time window.
  sensitiveGetAudioFile({queryDatabase, s3}) {
    return (request, response) => {
      const {token, hid} = request.query;

      // Check that token and hid are valid
      getReviewTokenRow({queryDatabase, token, hid}, function(err, result){
        if (err) {
          console.log('getAudio: error', JSON.stringify(err));
          response.status(500);
          response.json({ status: 'error' });
          return;
        }

        // 403 back
        if (!result || !result.reviewTokenRow) {
          console.log('getAudio: unauthorized', JSON.stringify({token, hid}));
          response.status(403);
          response.json({ status: 'unauthorized' });
          return;
        }

        // Stream the audio file from S3
        const {id} = request.params;
        insecureStreamAudioFileFromS3({s3, id}, request, response);
      });
    }
  }
};
