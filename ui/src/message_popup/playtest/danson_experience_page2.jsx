/* @flow weak */
import _ from 'lodash';
import React from 'react';
import uuid from 'uuid';
import VelocityTransitionGroup from "velocity-react/velocity-transition-group";

import Divider from 'material-ui/Divider';

import * as Api from '../../helpers/api.js';
import LinearSession from '../linear_session/linear_session.jsx';
import SessionFrame from '../linear_session/session_frame.jsx';
import IntroWithEmail from '../linear_session/intro_with_email.jsx';
import RecordThenClassifyQuestion from '../linear_session/record_then_classify_question.jsx';
import {InsubordinationScenarios} from './danson_scenarios.js';
import type {QuestionT} from './danson_scenarios.js';
import ReadMore from '../renderers/read_more.jsx';



type ResponseT = {
  choice:string,
  question:QuestionT
};



// The top-level page, manages logistics around email, questions,
// and the display of instructions, questions, and summary.
export default React.createClass({
  displayName: 'DansonExperiencePage2',

  contextTypes: {
    auth: React.PropTypes.object.isRequired
  },

  getInitialState() {
    const contextEmail = this.context.auth.userProfile.email;
    const email = contextEmail === "unknown@mit.edu" ? '' : contextEmail;

    return {
      email,
      questions: null,
      sessionId: uuid.v4()
    };
  },

  onStart(email) {
    const questions = InsubordinationScenarios.questions();
    this.setState({
      email,
      questions
    });
  },

  onResetSession() {
    this.setState(this.getInitialState());
  },

  onLogMessage(type, response:ResponseT) {
    const {email, sessionId} = this.state;
    Api.logEvidence(type, {
      ...response,
      sessionId,
      email,
      name: email,
      clientTimestampMs: new Date().getTime(),
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
      summaryEl={this.renderSummaryEl}
      onLogMessage={this.onLogMessage}
    />;
  },

  renderIntro() {
    return (
      <IntroWithEmail defaultEmail={this.state.email} onDone={this.onStart}>
        <div>
            <p>Welcome!</p>
            <p>You will go through a set of scenarios that simulate the conversation between you and Mrs. Danson.</p>
            <p>You need to provide an audio response to each prompt. Please respond as quickly as possible (like you would do in a real conversation).</p>
            <p>This may feel uncomfortable at first, but it's better to feel uncomfortable here than with a real parent.</p>
        </div>
      </IntroWithEmail>
    );
  },

  // Only ask for audio on questions with choices, otherwise let them continue
  renderQuestionEl(question:QuestionT, onLog, onResponseSubmitted) {
    return <RecordThenClassifyQuestion
        key={question.id}
        question={question}
        onLogMessage={onLog}
        onResponseSubmitted={onResponseSubmitted}
        forceResponse={true}
      />;
  },

  renderSummaryEl(questions:[QuestionT], responses:[ResponseT]) {
    return (
      <div className="done">
        <VelocityTransitionGroup enter={{animation: "slideDown"}} leave={{animation: "slideUp"}} runOnMount={true}>
          <div style={styles.doneTitle}>
            <p style={styles.paragraph}>You've finished the simulation.</p>
            <p style={styles.paragraph}><strong>Do not close this page</strong>. You will need it for the reflection.</p>
            <p style={styles.paragraph}>Please return to the form for the post-simulation reflection.</p>
          </div>
          <p style={styles.summaryTitle}>Summary</p>
          <Divider />

          {responses.map((response, i) => 
            <div key={"question-" + i} style ={_.merge(styles.instructions, styles.summaryQuestion)}>
              <ReadMore fulltext={questions[i].text}/>
              <audio key={'response-' + i} controls={true} src={response.audioResponse.downloadUrl} style={{paddingTop: 10, paddingBottom: 20}}/>
              <Divider />
            </div>
          
          )}
          <div style={styles.container} />
        </VelocityTransitionGroup>
      </div> 
    );
  }
});

const styles = {
  done: {
    padding: 20,
  },
  container: {
    fontSize: 20,
    padding: 0,
    margin:0,
    paddingBottom: 45
  },
  button: {
    marginTop: 20
  },
  doneTitle: {
    padding: 20,
    paddingBottom: 0,
    margin:0,
  },
  instructions: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  paragraph: {
    marginTop: 20,
    marginBottom: 20
  },
  summaryTitle: {
    fontSize: 20,
    padding: 20,
    paddingBottom: 5,
    margin: 0,
    fontWeight: 'bold'
  },
  summaryQuestion: {
    whiteSpace: 'pre-wrap',
    fontSize: 16,
    lineHeight: 1.2,
    paddingTop: 10,
    paddingBottom: 10
  }
};