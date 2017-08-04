/* @flow weak */
import * as Routes from '../routes.js';
import superagent from 'superagent';
import SuperagentPromise from 'superagent-promise';

import ES6Promise from 'es6-promise';
ES6Promise.polyfill();
const request = SuperagentPromise(superagent, Promise);
import crypto from 'crypto';
import qs from 'querystring';


export function logEvaluation(type, record) {
  const app = 'threeflows';
  const version = 1;

  request
    .post(Routes.evaluationPath({
      app: app,
      type: type,
      version: 1
    }))
    .set('Content-Type', 'application/json')
    .send(record)
    .end();

  return {
    app,
    version,
    type,
    json: record
  };
}

// For now, this fires and forgets and does not retry or
// notify the user on success or failure.
// It also mixes in some global params.
export function logEvidence(type, record) {
  const extendedRecord = {
    ...record,
    GLOBAL: {
      clientTimestampMs: new Date().getTime(),
      location: window.location.toString()
    }
  };
  request
    .post(Routes.evidencePath({
      app: 'threeflows',
      type: type,
      version: 3
    }))
    .set('Content-Type', 'application/json')
    .send(extendedRecord)
    .end();
}

// Log evidence for an Apples-to-Apples style response, just plain text
// associated with a particular key.
export function logApplesText(params) {
  const {applesKey, sceneNumber, sceneText, anonymizedText} = params;
  return logEvidence('anonymized_apples_to_apples', {applesKey, sceneNumber, sceneText, anonymizedText});
}

// Query for responses for doing Apples-to-Apples style reviewing for a particular `applesKey`
export function getApples(applesKey) {
  return request
    .get(`/server/apples/${applesKey}`)
    .set('Content-Type', 'application/json');
}

// Query for questions
export function questionsQuery() {
  return request
    .get('/server/questions')
    .set('Content-Type', 'application/json');
}

export function saveQuestions(questions) {
  return request
    .post('/server/questions')
    .set('Content-Type', 'application/json')
    .send(questions)
    .end();
}

export function createReview(formData:{review_key:string, access_code:string, email_address:string}) {
  return request
    .post('/server/reviews/create')
    .set('Content-Type', 'application/json')
    .send(formData)
    .end();
}

// Small obfuscation, not actually secure since this is client-side
function hashEmail(emailAddress) {
  const shasum = crypto.createHash('sha256');
  shasum.update(emailAddress);
  return shasum.digest('hex');
}

// Take an audioUrl and add on a query string for authorization
export function audioUrlWithTokens(audioUrl, token, emailAddress) {
  const hid = hashEmail(emailAddress);
  const queryString = qs.stringify({token, hid});
  return `${audioUrl}?${queryString}`;
}

export function getReview(query) {
  const {token, emailAddress}:{token:string, emailAddress:string} = query;
  const hid = hashEmail(emailAddress);
  return request
    .get('/server/reviews')
    .query({token, hid})
    .set('Content-Type', 'application/json')
    .end();
}