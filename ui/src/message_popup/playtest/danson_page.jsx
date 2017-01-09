/* @flow weak */
import React from 'react';
import uuid from 'uuid';

import {dansonQuestions} from '../questions.js';
import * as Api from '../../helpers/api.js';
import LinearSession from '../essence/linear_session.jsx';
import SessionFrame from '../essence/session_frame.jsx';
import IntroWithEmail from '../essence/intro_with_email.jsx';
import PlainTextQuestion from '../renderers/plain_text_question.jsx';
import MinimalAudioResponse from '../renderers/minimal_audio_response.jsx';
import AudioResponseSummary from '../renderers/audio_response_summary.jsx';


type QuestionT = {
  id:number,
  text:string
};
type ResponseT = {
  question:QuestionT,
  blobUrl:string
};


// This adapts Ben Dotger's Lori Danson simulation.
// The top-level page, manages logistics around email, cohorts and questions,
// and the display of instructions, questions, and summary.
export default React.createClass({
  displayName: 'DansonPage',

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
    this.setState({
      email,
      questions: dansonQuestions
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

  renderQuestionEl(question:QuestionT, onLog, onResponseSubmitted) {
    return  (
      <div key={question.id}>
        <PlainTextQuestion question={question} />
        <MinimalAudioResponse
          responsePrompt="Respond to Mrs. Danson"
          forceResponse={true}
          onLogMessage={this.onLogMessage}
          onResponseSubmitted={onResponseSubmitted}
        />
      </div>
    );
  },

  renderSummaryEl(questions:[QuestionT], responses:[ResponseT]) {
    const audioResponses = responses.map((response, i) => {
      return {
        ...response,
        question: questions[i]
      };
    });
    return <AudioResponseSummary audioResponses={audioResponses} />;
  }
});