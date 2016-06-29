import request from 'superagent';
import * as Routes from '../routes.js';


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
export function logEvidence(type, record) {
  request
    .post(Routes.evidencePath({
      app: 'threeflows',
      type: type,
      version: 2
    }))
    .set('Content-Type', 'application/json')
    .send(record)
    .end();
}

export function evidenceQuery() {
  return request
    .get('/server/query')
    .set('Content-Type', 'application/json');
}

export function evaluationsQuery() {
  return request
    .get('/server/evaluations')
    .set('Content-Type', 'application/json');
}