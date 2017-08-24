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
import type {QuestionT} from './ecs_scenario.jsx';
import {EcsScenario} from './ecs_scenario.jsx';
import ResearchConsent from '../../components/research_consent.jsx';
import AudioCapture from '../../components/audio_capture.jsx';
import MinimalTextResponse from '../renderers/minimal_text_response.jsx';


type ResponseT = {
  choice:string,
  question:QuestionT
};



// The top-level page, manages logistics around email, cohorts and questions,
// and the display of instructions, questions, and summary.
//
// This is a CS scenario around pair programming dynamics, modified for ECS workshops.
export default React.createClass({
  displayName: 'EcsExperiencePage',

  propTypes: {
    query: React.PropTypes.shape({
      cohort: React.PropTypes.string,
      p: React.PropTypes.string,
      text: React.PropTypes.string
    }).isRequired,
    isForMeredith: React.PropTypes.bool
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
    const allQuestions = (isForMeredith)
      ? EcsScenario.meredithQuestionsFor(cohortKey)
      : EcsScenario.questionsFor(cohortKey);

    const startQuestionIndex = this.props.query.p || 0; // for testing or demoing
    const questions = allQuestions.slice(startQuestionIndex);
    const questionsHash = hash(JSON.stringify(questions));
    this.setState({
      email,
      questions,
      questionsHash
    });
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
      <SessionFrame>
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
          <p>You'll review the context of the lesson briefly, share what you anticipate about the lesson, and then try it out!  Afterward you'll reflect on your experience, and then discuss your experience in the workshop tomorrow.</p>
          <p>Please use <a href="https://www.google.com/chrome/">Chrome</a> on a laptop or desktop computer.</p>
        </div>
      </IntroWithEmail>
    );
  },

  // Show overview and context, ask for open response for scenario.
  renderQuestionEl(question:QuestionT, onLog, onResponseSubmitted) {
    return (
      <div key={JSON.stringify(question)}>
        <MixedQuestion question={question} />
        {this.renderInteractionEl(question, onLog, onResponseSubmitted)}
      </div>
    );
  },

  renderInteractionEl(question, onLogMessage, onResponseSubmitted) {
    const key = JSON.stringify(question);
    const forceText = this.props.query.text || false;

    if (question.ask && !forceText) {
      const buttonText = AudioCapture.isAudioSupported()
        ? "Click then speak"
        : "Respond";
      return <MinimalOpenResponse
        key={key}
        forceResponse={question.force || false}
        responsePrompt=""
        recordText={buttonText}
        ignoreText="Move on"
        onLogMessage={onLogMessage}
        onResponseSubmitted={onResponseSubmitted}
        />;
    } else if (question.ask && forceText) {
      return <MinimalTextResponse
        key={key}
        forceResponse={question.force || false}
        responsePrompt=""
        recordText="Respond"
        ignoreText="Move on"
        onLogMessage={onLogMessage}
        onResponseSubmitted={onResponseSubmitted}
        />;
    }

    if (question.write) {
      return <MinimalTextResponse
        key={key}
        forceResponse={true}
        responsePrompt=""
        recordText="OK"
        textHeight={220}
        onLogMessage={onLogMessage}
        onResponseSubmitted={onResponseSubmitted}
      />;
    }

    return <ChoiceForBehaviorResponse
      key={key}
      choices={['OK']}
      onLogMessage={onLogMessage}
      onResponseSubmitted={onResponseSubmitted}
    />;
  },

  renderClosingEl(questions:[QuestionT], responses:[ResponseT]) {
    const {email} = this.state;
    return <ResearchConsent email={email} onLogMessage={this.onLogMessage} />;
  }
});