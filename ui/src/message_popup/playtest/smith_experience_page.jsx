/* @flow weak */
import React from 'react';
import uuid from 'uuid';
import _ from 'lodash';

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
      p: React.PropTypes.string,
      consent: React.PropTypes.string
    }).isRequired,
    facilitated: React.PropTypes.bool.isRequired
  },

  contextTypes: {
    auth: React.PropTypes.object.isRequired
  },




  getDefaultProps() {
    return {
      facilitated: false
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

  getNextQuestion(questions, responses) {
    if (responses.length >= questions.length) {
      return null;
    }
    const question = questions[responses.length];

    // Special case for reviewing past notes when giving feedback.
    if (question.feedback) {
      const pastNotes = this.getNotesBeforeFeedbackIndex(questions, responses, responses.length);
      return {...question, pastNotes};
    }

    return question;
  },

  // Returns an array of past notes for review as part of a feedback question.
  // This looks at all `notes` responses prior to `feedbackQuestionIndex`, only 
  // looking back until a previous `feedback` question, since there may be multiple
  // in the same scenario.
  getNotesBeforeFeedbackIndex(questions, responses, feedbackQuestionIndex) {
    const lastFeedbackIndex = _.findLastIndex(questions, 'feedback', feedbackQuestionIndex - 1);
    const startIndex = (lastFeedbackIndex === -1) ? 0 : lastFeedbackIndex + 1;
    const noteResponses = responses.slice(startIndex, feedbackQuestionIndex).filter(response => response.question.notes && response.responseText !== undefined);
    return noteResponses.map(response => response.responseText);
  },

  // Making questions from the cohort
  onStart(email) {
    const {cohortKey} = this.state;
    const {facilitated} = this.props;
    const allQuestions = smithScenario.questionsFor(cohortKey, {isFacilitated: facilitated});
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
      getNextQuestion={this.getNextQuestion}
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
          <p>This is an interactive case study simulating the observation of a high school computer science classroom.</p>
          <p>You'll review the context of the lesson briefly, and then get to try it out! Note that the simulation is split into two parts. After each part you'll be given the chance to reflect with the group or share online.</p>
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
    const {consent} = this.props.query;
    if (consent && consent.toLowerCase() === 'false') {
      return (
        <div>
          <b style={styles.doneTitle}>Done</b>
          <div style={styles.doneText}>
            <p style={styles.paragraph}>Thanks!  You've finished the scenario.</p>
            <p style={styles.paragraph}>When everyone's finished, we'll come together to do a final group discussion so be ready to share and discuss.</p>
          </div>
        </div>
      );      
    }

    return <ResearchConsent email={email} onLogMessage={this.onLogMessage} />;
  }
});

const styles = {
  doneTitle: {
    display: 'block',
    padding: '15px 20px 15px',
    background: '#09407d',
    color: 'white'
  },
  doneText: {
    padding: 20,
    paddingBottom: 0,
    margin:0,
  },
  paragraph: {
    marginTop: 20,
    marginBottom: 20
  }
};