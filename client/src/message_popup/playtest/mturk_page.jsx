/* @flow weak */
import PropTypes from 'prop-types';

import React from 'react';
import uuid from 'uuid';

import ResponsiveFrame from '../../components/responsive_frame.jsx';
import * as Api from '../../helpers/api.js';
import superagent from 'superagent';
import SuperagentPromise from 'superagent-promise';
const request = SuperagentPromise(superagent, Promise);


export default class extends React.Component {
  props: {
    query: {
      assignmentId: string,
      hitId: string,
      turkSubmitTo?: string,
      workerId?: string,
    },
    experimentFactory: Function,
  };

  static displayName = 'MTurkPage';

  static propTypes = {
    query: PropTypes.shape({
      assignmentId: PropTypes.string.isRequired,
      hitId: PropTypes.string.isRequired,
      turkSubmitTo: PropTypes.string,
      workerId: PropTypes.string
    }).isRequired,
    experimentFactory: PropTypes.func.isRequired
  };

  state = {
    mTurkWrapperUuid: uuid.v4()
  };

  doEndExperiment = () => {
    console.log('Submitting...'); // eslint-disable-line no-console
    const {assignmentId, turkSubmitTo} = this.props.query;
    request
      .post(turkSubmitTo)
      .send({assignmentId})
      .end();
  };

  onLogMessage = (type, response) => {
    const {query} = this.props; 
    const {mTurkWrapperUuid} = this.state;

    Api.logEvidence(type, {
      ...response,
      mTurkParams: query,
      mTurkWrapperUuid: mTurkWrapperUuid,
      clientTimestampMs: new Date().getTime(),
    });
  };

  onExperimentDone = (payload) => {
    this.onLogMessage('mturk_experiment_done', payload);
    this.doEndExperiment();
  };

  // In preview, only assignmentId is provided and it is ASSIGNMENT_ID_NOT_AVAILABLE
  render() {
    const {assignmentId, workerId} = this.props.query;
    const userIdentifier = (assignmentId === 'ASSIGNMENT_ID_NOT_AVAILABLE')
      ? null
      : workerId;

    return (
      <ResponsiveFrame>
        <div style={{padding: 20}}>
          {React.createElement(this.props.experimentFactory, {
            userIdentifier,
            onLogMessage: this.onLogMessage,
            onExperimentDone: this.onExperimentDone
          })}
        </div>
      </ResponsiveFrame>
    );
  }
}