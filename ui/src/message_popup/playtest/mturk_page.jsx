/* @flow weak */
import React from 'react';
import uuid from 'uuid';

import ResponsiveFrame from '../../components/responsive_frame.jsx';
import * as Api from '../../helpers/api.js';
import superagent from 'superagent';
import SuperagentPromise from 'superagent-promise';
const request = SuperagentPromise(superagent, Promise);


export default React.createClass({
  displayName: 'MTurkPage',

  propTypes: {
    query: React.PropTypes.shape({
      assignmentId: React.PropTypes.string.isRequired,
      hitId: React.PropTypes.string.isRequired,
      turkSubmitTo: React.PropTypes.string.isRequired,
      workerId: React.PropTypes.string.isRequired
    }).isRequired,
    experimentFactory: React.PropTypes.func.isRequired
  },

  getInitialState() {
    return {
      mTurkWrapperUuid: uuid.v4()
    };
  },

  doEndExperiment() {
    console.log('Submitting...'); // eslint-disable-line no-console
    const {turkSubmitTo} = this.props.query;
    request
      .post(turkSubmitTo)
      .end();
  },

  onLogMessage(type, response) {
    const {query} = this.props; 
    const {mTurkWrapperUuid} = this.state;

    Api.logEvidence(type, {
      ...response,
      mTurkParams: query,
      mTurkWrapperUuid: mTurkWrapperUuid,
      clientTimestampMs: new Date().getTime(),
    });
  },

  onExperimentDone(payload) {
    this.onLogMessage('mturk_experiment_done', payload);
    this.doEndExperiment();
  },

  render() {
    return (
      <ResponsiveFrame>
        <div style={{padding: 20}}>
          {React.createElement(this.props.experimentFactory, {
            userIdentifier: this.props.query.workerId,
            onLogMessage: this.onLogMessage,
            onExperimentDone: this.onExperimentDone
          })}
        </div>
      </ResponsiveFrame>
    );
  }
});