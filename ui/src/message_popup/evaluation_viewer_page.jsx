/* @flow weak */
import _ from 'lodash';
import React from 'react';

import AppBar from 'material-ui/AppBar';
import * as Colors from 'material-ui/styles/colors';

import * as Api from '../helpers/api.js';
import ScoringQuestionContext from './scoring_question_context.jsx';
import MessageResponseCard from './message_response_card.jsx';


/*
UI for viewing Message PopUp evaluations that have been completed previously.
*/
export default React.createClass({
  displayName: 'MessagePopup.EvaluationViewerPage',

  propTypes: {
    evaluationId: React.PropTypes.string.isRequired
  },

  getInitialState() {
    return {
      evaluation: null,
      log: null
    };
  },
  
  componentWillMount() {
    Promise.all([
      Api.evaluationsQuery(),
      Api.evidenceQuery()
    ]).then(this.onDataReceived);
  },

  // This is over-fetching to get all evidence and evaluations, and filtering
  // down to a specific evaluation and the log it refers to.
  onDataReceived([evaluationsResponse, evidenceResponse]) {
    const {evaluationId} = this.props;
    const evaluations = JSON.parse(evaluationsResponse.text).rows;
    const evaluation = _.find(evaluations, evaluation => evaluation.id.toString() === evaluationId);
    const logs = JSON.parse(evidenceResponse.text).rows;
    const log = _.find(logs, log => log.id.toString() === evaluation.json.logId.toString());

    this.setState({evaluation, log});
  },

  render() {
    const {evaluation, log} = this.state;
    const hasLoaded = evaluation && log;

    return (
      <div>
        <AppBar title="Evaluation" />
        {hasLoaded
          ? this.renderEvaluation(evaluation, log)
          : <div key="loading">Loading...</div>}
      </div>
    );
  },

  renderEvaluation(evaluation, log) {
    const scoreColor = (evaluation.json.scoreValue === 0)
      ? Colors.orange500
      : Colors.green500;

    return (
      <div>
        <ScoringQuestionContext
          question={evaluation.json.question}
          indicator={evaluation.json.indicator}
          learningObjective={evaluation.json.learningObjective}
        />
        <MessageResponseCard log={log} />
        <div style={{backgroundColor: scoreColor, padding: 10}}>
          <div>Scored by: {evaluation.json.email}</div>
          <div>Score: {evaluation.json.scoreValue}</div>
          <div>Comment: {evaluation.json.scoreComment}</div>
        </div>
        <pre style={{color: Colors.grey300}}>{JSON.stringify({evaluation, log}, null, 2)}</pre>
      </div>
    );
  }
});
