/* @flow weak */
import React from 'react';
import uuid from 'uuid';

import Divider from 'material-ui/Divider';

import LinearSession from '../linear_session/linear_session.jsx';
import RaisedButton from 'material-ui/RaisedButton';
import ClassifyQuestion from '../linear_session/classify_question.jsx';
import RecordThenClassifyQuestion from '../linear_session/record_then_classify_question.jsx';
import {InsubordinationScenarios} from './insubordination_scenarios.js';



// And experiment page, handles forming a cohort and displaying the substance of the experiment.
export default React.createClass({
  displayName: 'InsubordinationExperiment',

  propTypes: {
    userIdentifier: React.PropTypes.string.isRequired,
    onLogMessage: React.PropTypes.func.isRequired,
    onExperimentDone: React.PropTypes.func.isRequired
  },

  getInitialState() {
    const {userIdentifier} = this.props;
    const cohortKey = InsubordinationScenarios.cohortKey(userIdentifier);
    const questions = InsubordinationScenarios.questionsFor(cohortKey);

    return {
      questions,
      hasStarted: false,
      experimentUuid: uuid.v4()
    };
  },

  onStart() {
    this.setState({ hasStarted: true });
  },

  onExperimentDone(questions, responses) {
    this.props.onExperimentDone({questions, responses});
  },

  render() {
    const {hasStarted, questions} = this.state;
    const {onLogMessage} = this.props;
    if (!hasStarted) return this.renderIntro();

    return <LinearSession
      questions={questions}
      questionEl={this.renderQuestionEl}
      summaryEl={this.renderSummaryEl}
      onLogMessage={onLogMessage}
    />;
  },

  renderIntro() {
    return (
      <div>
        <div>
          <p>Welcome!</p>
          <p>Imagine you're a middle school math teacher in an urban public school.</p>
          <p>You will go through a set of scenarios that simulate a conversation between you and a student.</p>
          <p>Provide an audio response to each prompt. Please respond like you would in a real conversation.</p>
        </div>
        <RaisedButton
          onTouchTap={this.onStart}
          secondary={true}
          label="Start" />
      </div>
    );
  },

  // Only ask for audio on questions with choices, otherwise let them continue
  renderQuestionEl(question, onLog, onResponseSubmitted) {
    if (question.choices.length === 0) {
      return <ClassifyQuestion
        key={question.id}
        question={question}
        choices={['OK']}
        onLogMessage={onLog}
        onResponseSubmitted={onResponseSubmitted}
      />;
    } else {
      return <RecordThenClassifyQuestion
        key={question.id}
        question={question}
        choices={question.choices}
        onLogMessage={onLog}
        onResponseSubmitted={onResponseSubmitted}
      />;
    }
  },

  renderSummaryEl(questions, responses) {
    return (
      <div style={{padding: 20}}>
        <div style={{paddingBottom: 20, fontWeight: 'bold'}}>Thanks!  Here are your responses:</div>
        <div style={{paddingBottom: 30}}>
          {responses.map((response, i) =>
            <div key={i} style={{paddingTop: 10}}>
              <div>{questions[i].text}</div>
              <div>> {response.choice}</div>
              <Divider style={{marginTop: 15}} />
            </div>
          )}
        </div>
        <RaisedButton
          onTouchTap={this.onExperimentDone.bind(this, questions, responses)}
          secondary={true}
          label="Done" />
      </div>
    );
  }
});