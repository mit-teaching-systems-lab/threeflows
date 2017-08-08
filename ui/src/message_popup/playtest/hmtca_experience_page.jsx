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
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
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
      p: React.PropTypes.string
    }).isRequired
  },

  // User types cohort for team
  getInitialState() {
    return {
      cohortKey: this.props.query.cohort || '',
      identifier: '',
      bucketId: HMTCAScenarios.BUCKETS[0].id.toString(),
      didSkipAhead: false,
      questions: null,
      sessionId: uuid.v4()
    };
  },

  // This is the key for a "game session we want to later review."
  // It's built from (cohort, bucket), so that each of those has its own
  // scene number space (the number is used for ordering and is user-facing).
  //
  // This means that if the same team code plays again later, the number of
  // responses will keep growing over time (as opposed to "start a new game").
  applesKey() {
    const {cohortKey, bucketId} = this.state;
    return [cohortKey, bucketId].join(':');
  },

  // Could make this smarter and have it coordinate across different users to
  // allow them all to advance n minutes after the first session started.
  shouldAllowJumpAhead() {
    return true;
  },

  onCohortKeyChanged(e, menuItemKey, cohortKey) {
    this.setState({cohortKey});
  },

  onIdentifierChanged(e) {
    this.setState({ identifier: e.target.value });
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

  onReviewTapped() {
    this.setState({didSkipAhead: true});
  },

  onLogMessage(type, response) {
    const {
      identifier,
      cohortKey,
      sessionId,
      questionsHash
    } = this.state;
    
    // Watch for a particular message, then add in the applesKey and double-log
    // it, stripping out all the identifiers from the log message so we can read it
    // back later safely anonymized.
    if (type === 'anonymized_apples_to_apples_partial') {
      Api.logApplesText({
        applesKey: this.applesKey(),
        sceneNumber: response.sceneNumber,
        sceneText: response.question.text,
        anonymizedText: response.anonymizedText
      });
    }

    Api.logEvidence(type, {
      ...response,
      sessionId,
      cohortKey,
      questionsHash,
      identifier
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
    const {questions, didSkipAhead} = this.state;
    if (!questions) return this.renderIntro();
    if (didSkipAhead) return this.renderGroupReview();

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
          <div style={{...styles.instructions, marginBottom: 15}}>
            <p>Welcome!  This is an online practice space made just for HMTCA.</p>
          </div>
          <div style={styles.instructions}>
            <div>What's your anonymous identifier?</div>
            <TextField
              name="identifier"
              style={{width: '100%', marginBottom: 20}}
              underlineShow={true}
              hintText="orange-surprised-dolphin-73"
              value={this.state.identifier}
              onChange={this.onIdentifierChanged}
              rows={1} />
          </div>
          <div style={{...styles.instructions, paddingBottom: 0}}>
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
          </div>
          <div style={styles.instructions}>
            <SelectField
              maxHeight={250}
              style={{width: '100%'}}
              floatingLabelText="Select your team code"
              value={this.state.cohortKey}
              onChange={this.onCohortKeyChanged}
            >
              <MenuItem key={''} value={''} primaryText={''} />
              {HMTCAScenarios.TEAM_CODES.map(code => <MenuItem key={code} value={code} primaryText={code} />)}
            </SelectField>
          </div>
          <div style={styles.instructions}>
            <p>In this practice space, you'll have to improvise and adapt to make the best of the situation.  Some scenarios might not exactly match your grade level and subject.</p>
            <RaisedButton
              disabled={this.state.cohortKey === '' || this.state.identifier === ''}
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
    return (
      <div>
        <QuestionInterpreter
          question={question}
          onLog={onLog}
          forceText={forceText}
          onResponseSubmitted={onResponseSubmitted} />
        {this.shouldAllowJumpAhead() && this.renderJumpAhead()}
      </div>
    );
  },

  renderJumpAhead() {
    return (
      <div style={{marginTop: 200}}>
        <Divider />
        <div style={{margin: 35}}>
          <div style={{paddingBottom: 20}}>If the rest of your group has already finished, jump to the discussion round.</div>
          <RaisedButton
            label="Start discussion round"
            onTouchTap={this.onReviewTapped} />
        </div>
      </div>
    );
  },

  renderClosingEl(questions:[QuestionT], responses:[ResponseT]) {
    return this.renderGroupReview();
  },

  renderGroupReview() {
    return <HMTCAGroupReview applesKey={this.applesKey()} />;
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