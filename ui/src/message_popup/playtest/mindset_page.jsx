/* @flow weak */
import React from 'react';
import uuid from 'uuid';
import hash from '../../helpers/hash.js';

import * as Api from '../../helpers/api.js';
import LinearSession from '../linear_session/linear_session.jsx';
import SessionFrame from '../linear_session/session_frame.jsx';
import IntroWithEmail from '../linear_session/intro_with_email.jsx';
import PlainTextQuestion from '../renderers/plain_text_question.jsx';
import MinimalOpenResponse from '../renderers/minimal_open_response.jsx';




// Sourced from https://www.mindsetkit.org/belonging/cues-belonging/quiz-classroom-scenarios
const Scenarios = {
  questions() {
    const questionTexts = [
      'An administrator emails you in the morning to tell you that you\'ll have a new student in your classroom today.  She says the student\'s name is Madhuvanti and has just moved into town.  Before that class period, Madhuvanti arrives to class a minute before everyone else.'
    ];

    return questionTexts.map((text) => {
      return {
        id: hash(text),
        condition: 0,
        text: text
      };
    });
  }
};





// Single-shot scenarios, around belonging mindset.
export default React.createClass({
  displayName: 'MindsetPage',

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

  // Making the cohort and questions is the key bit here.
  onStart(email:string) {
    const questions = Scenarios.questions();
    this.setState({
      email,
      questions
    });
  },

  onLogMessage(type:string, response:any) {
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
        <div>
          <p>Welcome!</p>
          <p>Imagine you're a high school math teacher in an urban public school.</p>
          <p>You will go through short scenarios that come up throughout a school day.</p>
          <p>Provide an audio response to each prompt. Please respond like you would in a real conversation.</p>
        </div>
      </IntroWithEmail>
    );
  },

  renderQuestionEl(question, onLog, onResponseSubmitted) {
    return (
      <div key={question.id}>
        <PlainTextQuestion question={question} />
        <MinimalOpenResponse
          responsePrompt=""
          onLogMessage={onLog}
          onResponseSubmitted={onResponseSubmitted} />
      </div>
    );
  },

  renderSummaryEl(questions, responses) {
    const quizUrl = 'https://www.mindsetkit.org/belonging/cues-belonging/quiz-classroom-scenarios';
    return (
      <div style={{padding: 20}}>
        <div style={{fontWeight: 'bold'}}>Thanks!</div>
        <div style={{marginTop: 20, marginBottom: 50}}>This scenario was adapted from a <a href={quizUrl}>MindsetKit quiz</a>.</div>
      </div>
    );
  }
});