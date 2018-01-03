/* @flow weak */
import React from 'react';
import uuid from 'uuid';

import * as Api from '../../helpers/api.js';
import LinearSession from '../linear_session/linear_session.jsx';
import SessionFrame from '../linear_session/session_frame.jsx';
import IntroWithEmail from '../linear_session/intro_with_email.jsx';
import MixedQuestion from '../renderers/mixed_question.jsx';

import LikertResponse from '../responses/likert_response.jsx';
import OpenThenClassifyResponse from '../linear_session/open_then_classify_response.jsx';
import OkResponse from '../responses/ok_response.jsx';
import MinimalOpenResponse from '../renderers/minimal_open_response.jsx';
import {ExperimentOneScenarios} from './discipline_scenarios.jsx';
import type {QuestionT} from './discipline_scenarios.jsx';



type ResponseT = {
  choice:string,
  question:QuestionT
};



/*
Adapted from Okonofua 2016
http://www.pnas.org/content/113/19/5221.full.pdf
http://www.pnas.org/content/suppl/2016/04/21/1523698113.DCSupplemental/pnas.201523698SI.pdf#nameddest=STXT
*/
export default React.createClass({
  displayName: 'DisciplinePage',

  contextTypes: {
    auth: React.PropTypes.object.isRequired
  },

  getInitialState() {
    const contextEmail = this.context.auth.userProfile.email;
    const email = contextEmail === "unknown@mit.edu" ? '' : contextEmail;
    const cohortKey = ExperimentOneScenarios.cohortKey(email);

    return {
      email,
      cohortKey,
      questions: null,
      sessionId: uuid.v4()
    };
  },

  // Making the cohort and questions is the key bit here.
  onStart(email) {
    const cohortKey = ExperimentOneScenarios.cohortKey(email);
    const questions = ExperimentOneScenarios.questionsFor(cohortKey);
    this.setState({
      email,
      questions,
      cohortKey
    });
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
      summaryEl={this.renderSummaryEl}
      onLogMessage={this.onLogMessage}
    />;
  },

  renderIntro() {
    return (
      <IntroWithEmail defaultEmail={this.state.email} onDone={this.onStart}>
        {ExperimentOneScenarios.renderIntro()}
      </IntroWithEmail>
    );
  },

  // Only ask for audio on questions with choices, otherwise let them continue
  renderQuestionEl(question:QuestionT, onLog, onResponseSubmitted) {
    return (
      <div>
        <MixedQuestion question={question} />
        {this.renderInteractionEl(question, onLog, onResponseSubmitted)}
      </div>
    );
  },

  renderInteractionEl(question, onLog, onResponseSubmitted) {
    const key = JSON.stringify(question);
    if (question.likert) {
      return <LikertResponse
        key={key}
        onLogMessage={onLog}
        onResponseSubmitted={onResponseSubmitted}
      />;
    }

    if (question.open) {
      return <MinimalOpenResponse
        key={key}
        responsePrompt=""
        recordText="Click then speak"
        onLogMessage={onLog}
        forceResponse={true}
        onResponseSubmitted={onResponseSubmitted}
      />;
    }

    if (question.choices && question.choices.length > 0) {
      return <OpenThenClassifyResponse
        key={key}
        choices={question.choices}
        onLogMessage={onLog}
        onResponseSubmitted={onResponseSubmitted}
      />;
    }

    return <OkResponse
      key={key}
      onLogMessage={onLog}
      onResponseSubmitted={onResponseSubmitted}
    />;
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