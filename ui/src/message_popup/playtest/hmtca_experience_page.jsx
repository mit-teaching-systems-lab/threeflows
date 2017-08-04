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
import TextField from 'material-ui/TextField';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';

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
      p: React.PropTypes.string
    }).isRequired
  },

  // User types cohort for team
  getInitialState() {
    return {
      cohortKey: this.props.query.cohort || '',
      bucketId: HMTCAScenarios.BUCKETS[0].id.toString(),
      questions: null,
      sessionId: uuid.v4()
    };
  },

  onCohortKeyChanged(e) {
    this.setState({ cohortKey: e.target.value });
  },

  onBucketChanged(e) {
    this.setState({ bucketId: e.target.value });
  },

  // Making questions from the cohort
  onStart(e) {
    e.preventDefault();
    const {cohortKey, bucketId} = this.state;
    const allQuestions = HMTCAScenarios.questionsFor(cohortKey, parseInt(bucketId, 10));

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
    const {cohortKey, bucketId, sessionId, questionsHash} = this.state;
    
    // Watch for a particular message, then add in the applesKey and double-log
    // it, stripping out all the identifiers from the log message so we can read it
    // back later safely anonymized.
    //
    // The appleKey is built from (cohort, bucket), so that each of those has its own
    // scene number space (the number is used for ordering and is user-facing).
    if (type === 'anonymized_apples_to_apples_partial') {
      Api.logApplesText({
        applesKey: [cohortKey, bucketId].join(':'),
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
    const {bucketId} = this.state;
    return (
      <VelocityTransitionGroup enter={{animation: "callout.pulse", duration: 500}} leave={{animation: "slideUp"}} runOnMount={true}>
        <form onSubmit={this.onStart}>
          <div style={styles.instructions}>
            <p>Welcome!</p>
            <p>This is an online practice space made just for HMTCA.</p>
          </div>
          <div style={styles.instructions}>
            <div>
              <TextField
                name="cohortKey"
                style={{width: '100%', marginBottom: 15}}
                underlineShow={true}
                floatingLabelText="What's your team's code?"
                floatingLabelFixed={true}
                value={this.state.cohortKey}
                onChange={this.onCohortKeyChanged}
                rows={2} />
            </div>
            <div>What would you like to practice?</div>
            <RadioButtonGroup
              style={{margin: 10}}
              name="bucket"
              valueSelected={bucketId}
              onChange={this.onBucketChanged}
            >
              {HMTCAScenarios.BUCKETS.map(bucket =>
                <RadioButton
                  key={bucket.id.toString()}
                  value={bucket.id.toString()}
                  style={{fontSize: 14}}
                  label={bucket.text}
                />
              )}
            </RadioButtonGroup>
            <p>In this practice space, you'll have to improvise and adapt to make the best of the situation.  Some scenarios might not exactly match your grade level and subject.</p>
            <RaisedButton
              disabled={this.state.cohortKey === ''}
              onTouchTap={this.onStart}
              type="submit"
              style={styles.button}
              secondary={true}
              label="Start" />
          </div>
        </form>
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
  button: {
    marginTop: 20
  }
};