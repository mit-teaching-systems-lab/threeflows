/* @flow weak */
import React from 'react';
import uuid from 'uuid';

import * as Api from '../../helpers/api.js';
import LinearSession from '../linear_session/linear_session.jsx';
import SessionFrame from '../linear_session/session_frame.jsx';
import IntroWithEmail from '../linear_session/intro_with_email.jsx';
import PlainTextQuestion from '../renderers/plain_text_question.jsx';
import ReactQuestion from '../renderers/react_question.jsx';

import ChoiceForBehaviorResponse from '../renderers/choice_for_behavior_response.jsx';
import MinimalOpenResponse from '../renderers/minimal_open_response.jsx';
import type {QuestionT} from './pairs_scenario.jsx';
import {PairsScenario} from './pairs_scenario.jsx';



type ResponseT = {
  choice:string,
  question:QuestionT
};



// The top-level page, manages logistics around email, cohorts and questions,
// and the display of instructions, questions, and summary.
//
// This is a CS scenario around pair programming dynamics.
export default React.createClass({
  displayName: 'PairsExperiencePage',

  propTypes: {
    query: React.PropTypes.object.isRequired
  },

  contextTypes: {
    auth: React.PropTypes.object.isRequired
  },

  // Cohort comes from URL
  getInitialState() {
    const contextEmail = this.context.auth.userProfile.email;
    const email = contextEmail === "unknown@mit.edu" ? '' : contextEmail;
    const cohortKey = this.props.query.cohort || 'default';

    return {
      email,
      cohortKey,
      questions: null,
      sessionId: uuid.v4()
    };
  },

  // Making questions from the cohort
  onStart(email) {
    const {cohortKey} = this.state;
    const questions = PairsScenario.questionsFor(cohortKey);
    this.setState({
      email,
      questions
    });
  },

  onResetSession() {
    this.setState(this.getInitialState());
  },

  onLogMessage(type, response:ResponseT) {
    const {email, cohortKey, sessionId} = this.state;
    Api.logEvidence(type, {
      ...response,
      sessionId,
      email,
      cohortKey,
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
          <p>This is an interactive case study simulating a small part of a high school computer science lesson.</p>
          <p>You'll review the context of the lesson briefly, share what you anticipate about the lesson, and then try it out!  Afterward you'll reflect before heading back to debrief with the group or share online.</p>
        </div>
      </IntroWithEmail>
    );
  },

  // Show overview and context, ask for open response for scenario.
  renderQuestionEl(question:QuestionT, onLog, onResponseSubmitted) {
    const interactionEl = (question.ask)
      ? <MinimalOpenResponse
          forceResponse={question.force || false}
          responsePrompt=""
          recordText="Click then speak"
          ignoreText="Move on"
          onLogMessage={onLog}
          onResponseSubmitted={onResponseSubmitted}
        />
      : <ChoiceForBehaviorResponse
          choices={['OK']}
          onLogMessage={onLog}
          onResponseSubmitted={onResponseSubmitted}
        />;

    return (
      <div key={JSON.stringify(question)}>
        <b style={{
          display: 'block',
          padding: '15px 20px 15px',
          background: '#09407d',
          color: 'white'
        }}>{question.type}</b>
        {question.el && <ReactQuestion el={question.el} />}
        {question.text && <PlainTextQuestion question={{text: question.text}} />}
        {interactionEl}
      </div>
    );
  },

  renderSummaryEl(questions:[QuestionT], responses:[ResponseT]) {
    return (
      <div style={{padding: 20}}>
        <div>Thanks!</div>
        <div style={{paddingTop: 20}}>You can close the computer and head on back to the group.</div>
      </div>
    );
  }
});