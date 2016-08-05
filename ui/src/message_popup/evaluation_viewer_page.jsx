/* @flow weak */
import _ from 'lodash';
import React from 'react';

import AppBar from 'material-ui/AppBar';
import * as Colors from 'material-ui/styles/colors';

import * as Api from '../helpers/api.js';
import ScoringQuestionContext from './scoring_question_context.jsx';
import MessageResponseCard from './message_response_card.jsx';
import MessageEvaluationCard from './message_evaluation_card.jsx';



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
    Api.evaluationsWithEvidenceQuery().then(this.onDataReceived);
  },

  // This is over-fetching to get all evidence and evaluations, and filtering
  // down to a specific evaluation and the log it refers to.
  onDataReceived(evaluations) {
    const {evaluationId} = this.props;
    const evaluation = _.find(evaluations, evaluation => evaluation.id.toString() === evaluationId);
    const {log} = evaluation;

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
    return (
      <div>
        <ScoringQuestionContext
          question={evaluation.json.question}
          indicator={evaluation.json.indicator}
        />
        <MessageResponseCard log={log} />
        <MessageEvaluationCard evaluation={evaluation} />
        <pre style={{color: Colors.grey300}}>{JSON.stringify({evaluation, log}, null, 2)}</pre>
      </div>
    );
  }
});
