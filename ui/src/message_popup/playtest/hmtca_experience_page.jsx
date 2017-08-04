/* @flow weak */
import React from 'react';
import uuid from 'uuid';
import _ from 'lodash';

import * as Api from '../../helpers/api.js';
import hash from '../../helpers/hash.js';
import LinearSession from '../linear_session/linear_session.jsx';
import SessionFrame from '../linear_session/session_frame.jsx';
import VelocityTransitionGroup from "velocity-react/velocity-transition-group";
import 'velocity-animate/velocity.ui';
import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField';


import QuestionInterpreter from '../renderers/question_interpreter.jsx';
import type {QuestionT} from './pairs_scenario.jsx';
import HMTCAScenarios from './hmtca_scenario.jsx';
import HMTCAGroupReview from './hmtca_group_review.jsx';

type ResponseT = {
  choice:string,
  question:QuestionT,
  sceneNumber?:number,
  anonymizedText?:string
};



// This is the flow for the HMTCA breakout session
export default React.createClass({
  displayName: 'HMTCAExperiencePage',

  propTypes: {
    query: React.PropTypes.shape({
      cohort: React.PropTypes.string,
      p: React.PropTypes.string,
      text: React.PropTypes.string,
      review: React.PropTypes.string
    }).isRequired
  },

  // Cohort comes from URL
  getInitialState() {
    const isReviewing = this.props.query.review === 'true' || false;

    return {
      cohortKey: '',
      isReviewing,
      questions: null,
      sessionId: uuid.v4()
    };
  },

  onCohortKeyChanged(e) {
    this.setState({ cohortKey: e.target.value });
  },

  // Making questions from the cohort
  onStart(e) {
    e.preventDefault();
    const {cohortKey} = this.state;
    const allQuestions = HMTCAScenarios.questionsFor(cohortKey);

    const startQuestionIndex = this.props.query.p || 0; // for testing or demoing
    const questions = allQuestions.slice(startQuestionIndex);
    const questionsHash = hash(JSON.stringify(questions));
    this.setState({
      questions,
      questionsHash
    });
  },

  onResetSession() {
    this.setState(this.getInitialState());
  },

  onLogMessage(type, response) {
    const {cohortKey, sessionId, questionsHash} = this.state;
    
    // Watch for a particular message, then add in the applesKey and double-log
    // it, stripping out all the identifiers from the log message so we can read it
    // back later safely anonymized.
    if (type === 'anonymized_apples_to_apples_partial') {
      Api.logApplesText({
        applesKey: cohortKey,
        sceneNumber: response.sceneNumber,
        sceneText: response.question.text,
        anonymizedText: response.anonymizedText
      });
    }

    Api.logEvidence(type, {
      ...response,
      sessionId,
      cohortKey,
      questionsHash
    });
  },

  render() {
    return (
      <SessionFrame onResetSession={this.onResetSession}>
        {this.renderContent()}
      </SessionFrame>
    );
  },

  renderContent() {
    const {questions} = this.state;
    if (!questions) return this.renderIntro();

    return <LinearSession
      questions={questions}
      questionEl={this.renderQuestionEl}
      summaryEl={this.renderClosingEl}
      onLogMessage={this.onLogMessage}
    />;
  },


  renderIntro() {
    return (
      <VelocityTransitionGroup enter={{animation: "callout.pulse", duration: 500}} leave={{animation: "slideUp"}} runOnMount={true}>
        <div>
          <div style={styles.instructions}>
            <p>Welcome!</p>
            <p>...</p>
          </div>
          <Divider />
          <div style={{...styles.instructions, padding: 20}}>
            <div>... consent phrase and information goes here ...</div>
            <form onSubmit={this.onStart}>
              <div style={styles.buttonRow}>
                <TextField
                  name="cohortKey"
                  style={{width: '100%'}}
                  underlineShow={false}
                  floatingLabelText="What's your team code?"
                  value={this.state.cohortKey}
                  onChange={this.onCohortKeyChanged}
                  rows={2} />
                <RaisedButton
                  disabled={this.state.cohortKey === ''}
                  onTouchTap={this.onStart}
                  type="submit"
                  style={styles.button}
                  secondary={true}
                  label="Start" />
              </div>    
            </form>
          </div>
        </div>
      </VelocityTransitionGroup>
    );
  },

  renderQuestionEl(question:QuestionT, onLog, onResponseSubmitted) {
    const forceText = _.has(this.props.query, 'text');
    return <QuestionInterpreter
      question={question}
      onLog={onLog}
      forceText={forceText}
      onResponseSubmitted={onResponseSubmitted} />;
  },

  renderClosingEl(questions:[QuestionT], responses:[ResponseT]) {
    const {cohortKey} = this.state;
    return <HMTCAGroupReview applesKey={cohortKey} />;
  }
});

const styles = {
  instructions: {
    fontSize: 18,
    padding: 0,
    margin:0,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 10
  },
  buttonRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end'
  },
  button: {
    marginTop: 20
  }
};