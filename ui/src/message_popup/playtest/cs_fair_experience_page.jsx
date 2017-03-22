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
import CsFairScoreResponse from '../renderers/cs_fair_score_response.jsx';
import CsFairSummary from './cs_fair_summary.jsx';
import MinimalOpenResponse from '../renderers/minimal_open_response.jsx';
import MinimalTextResponse from '../renderers/minimal_text_response.jsx';
import type {QuestionT} from './cs_fair_scenario.jsx';
import {CsFairScenario} from './cs_fair_scenario.jsx';


type ResponseT = {
  choice:string,
  question:QuestionT
};



// This is a CS fair around giving feedback on projects.
export default React.createClass({
  displayName: 'CsFairExperiencePage',

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
    const cohortKey = CsFairScenario.cohortKey(email);

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
    const questions = CsFairScenario.questionsFor(cohortKey).slice(this.props.query.p || 0);
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
      summaryEl={this.renderSummaryEl}
      onLogMessage={this.onLogMessage}
    />;
  },

  renderIntro() {
    return (
      <IntroWithEmail defaultEmail={this.state.email} onDone={this.onStart}>
        {CsFairScenario.renderIntroEl()}
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

  renderInteractionEl(question:QuestionT, onLog, onResponseSubmitted) {
    const key = JSON.stringify(question);

    if (question.scores) {
      return <CsFairScoreResponse
        key={key}
        scores={question.scores}
        studentName={question.studentName}
        projectLabel={question.projectLabel}
        onLogMessage={onLog}
        onResponseSubmitted={onResponseSubmitted}
      />;
    }

    if (question.textResponse) {
      return <MinimalTextResponse
        key={key}
        forceResponse={true}
        responsePrompt="Your thoughts:"
        recordText="Submit"
        onLogMessage={onLog}
        onResponseSubmitted={(response) => onResponseSubmitted({...response, isTextResponse: true, questionText: question.text})}
      />;
    }

    if (question.ask) {
      return <MinimalOpenResponse
        key={key}
        forceResponse={question.force || false}
        responsePrompt=""
        recordText="Click then speak"
        ignoreText="Move on"
        onLogMessage={onLog}
        onResponseSubmitted={onResponseSubmitted}
      />;
    }

    return <ChoiceForBehaviorResponse
      key={key}
      choices={['OK']}
      onLogMessage={onLog}
      onResponseSubmitted={onResponseSubmitted}
    />;
  },

  renderSummaryEl(questions:[QuestionT], responses:[ResponseT]) {
    return <CsFairSummary responses={responses} />;
  }
});