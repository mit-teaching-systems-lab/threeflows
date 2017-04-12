/* @flow weak */
import React from 'react';
import uuid from 'uuid';

import * as Api from '../../helpers/api.js';
import hash from '../../helpers/hash.js';
import LinearSession from '../linear_session/linear_session.jsx';
import SessionFrame from '../linear_session/session_frame.jsx';
import IntroWithEmail from '../linear_session/intro_with_email.jsx';

import MixedQuestion from '../renderers/mixed_question.jsx';
import ChoiceForBehaviorResponse from '../renderers/choice_for_behavior_response.jsx';
import MinimalOpenResponse from '../renderers/minimal_open_response.jsx';
import type {QuestionT} from './pairs_scenario.jsx';
import {PairsScenario} from './pairs_scenario.jsx';
import ResearchConsent from '../../components/research_consent.jsx';


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
    query: React.PropTypes.object.isRequired,
    isForMeredith: React.PropTypes.bool,
  },

  contextTypes: {
    auth: React.PropTypes.object.isRequired
  },

  getDefaultProps() {
    return {
      isForMeredith: false
    };
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
    const {isForMeredith} = this.props;
    const questions = (isForMeredith)
      ? PairsScenario.meredithQuestionsFor(cohortKey)
      : PairsScenario.questionsFor(cohortKey);
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
    const {isForMeredith} = this.props;
    const afterwardText = (isForMeredith)
      ? "Afterward you'll reflect and bring one part of the reflection to share in class on Tuesday 4/4."
      : "Afterward you'll reflect before heading back to debrief with the group or share online.";
    return (
      <IntroWithEmail defaultEmail={this.state.email} onDone={this.onStart}>
        <div>
          <p>Welcome!</p>
          <p>This is an interactive case study simulating a small part of a high school computer science lesson.</p>
          <p>You'll review the context of the lesson briefly, share what you anticipate about the lesson, and then try it out!  {afterwardText}</p>
          <p>Please use <a href="https://www.google.com/chrome/">Chrome</a> on a laptop or desktop computer.</p>
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
        <MixedQuestion question={question} />
        {interactionEl}
      </div>
    );
  },

  renderClosingEl(questions:[QuestionT], responses:[ResponseT]) {
    const {email} = this.state;
    return <ResearchConsent email={email} onLogMessage={this.onLogMessage} />;
  }
});