/* @flow weak */
import React from 'react';
import uuid from 'uuid';

import * as Api from '../../helpers/api.js';
import hash from '../../helpers/hash.js';
import LinearSession from '../linear_session/linear_session.jsx';
import SessionFrame from '../linear_session/session_frame.jsx';
import IntroWithEmail from '../linear_session/intro_with_email.jsx';

import QuestionInterpreter from '../renderers/question_interpreter.jsx';
import type {QuestionT} from './pairs_scenario.jsx';
import {smithScenario} from './smith_scenario.jsx';
import ResearchConsent from '../../components/research_consent.jsx';

type ResponseT = {
  choice:string,
  question:QuestionT
};



// This is a scenario around detecting microaggressions within the classroom.
export default React.createClass({
  displayName: 'SmithExperiencePage',

  propTypes: {
    query: React.PropTypes.shape({
      cohort: React.PropTypes.string,
      p: React.PropTypes.string
    }).isRequired
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
    const allQuestions = smithScenario.questionsFor(cohortKey);

    const startQuestionIndex = this.props.query.p || 0; // for testing or demoing
    const questions = allQuestions.slice(startQuestionIndex);
    const questionsHash = hash(JSON.stringify(questions));
    this.setState({
      email,
      questions,
      questionsHash
    });
  },

  onResetSession() {
    this.setState(this.getInitialState());
  },

  onLogMessage(type, response:ResponseT) {
    const {email, cohortKey, sessionId, questionsHash} = this.state;
    
    Api.logEvidence(type, {
      ...response,
      sessionId,
      email,
      cohortKey,
      questionsHash,
      name: email
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
      <IntroWithEmail defaultEmail={this.state.email} onDone={this.onStart}>
        <div>
          <p>Welcome!</p>
          <p>This is an interactive case study simulating a small part of a high school computer science lesson.</p>
          <p>You'll review the context of the lesson briefly, share what you anticipate about the lesson, and then try it out!  Afterward you'll reflect before heading back to debrief with the group or share online.</p>
          <p>Please use <a href="https://www.google.com/chrome/">Chrome</a> on a laptop or desktop computer.</p>
        </div>
      </IntroWithEmail>
    );
  },

  renderQuestionEl(question:QuestionT, onLog, onResponseSubmitted) {
    return <QuestionInterpreter
      question={question}
      onLog={onLog}
      onResponseSubmitted={onResponseSubmitted} />;
  },

  renderClosingEl(questions:[QuestionT], responses:[ResponseT]) {
    const {email} = this.state;
    return <ResearchConsent email={email} onLogMessage={this.onLogMessage} />;
  }
});