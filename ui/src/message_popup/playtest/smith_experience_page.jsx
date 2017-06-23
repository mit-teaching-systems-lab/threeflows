/* 
Experience page for the Mr. Smith Microaggression simulation
Code adapted from the Turner_scenarios.js file
MIT Teaching Systems Lab
 */

import React from 'react';
import uuid from 'uuid';

import * as Api from '../../helpers/api.js';
import LinearSession from '../linear_session/linear_session.jsx';
import SessionFrame from '../linear_session/session_frame.jsx';
import IntroWithEmail from '../linear_session/intro_with_email.jsx';
import {smithScenarios} from './smithTurner_scenarios.jsx';
import type {QuestionT} from './smithTurner_scenarios.jsx';
import type {ResponseT} from './smithTurner_scenarios.jsx';
import VideoSummary from './video_summary.jsx';
import MinimalTextResponse from '../renderers/minimal_text_response.jsx';
import MixedQuestion from '../renderers/mixed_question.jsx';
import ChoiceForBehaviorResponse from '../renderers/choice_for_behavior_response.jsx';
import * as Routes from '../../routes.js';

type NextQuestionT = {
  id:number,
  question:QuestionT,
};

// The top-level page, manages logistics around email, questions,
// and the display of instructions, questions, and summary.
export default React.createClass({
  displayName: 'SmithExperiencePage',

  propTypes: {
    query: React.PropTypes.shape({
      p: React.PropTypes.string
    }).isRequired
  },

  contextTypes: {
    auth: React.PropTypes.object.isRequired
  },

  getInitialState() {
    const contextEmail = this.context.auth.userProfile.email;
    const email = contextEmail === "unknown@mit.edu" ? '' : contextEmail;

    return {
      email,
      questions: null,
      sessionId: uuid.v4(),
      recording: false
    };
  },

  onStart(email) {
    const startQuestionIndex = this.props.query.p || 0; // for testing or demoing
    const allQuestions = smithScenarios.questions();
    const questions = allQuestions.slice(startQuestionIndex);
    this.setState({
      email,
      questions,
      recording: false
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

  onGetNextQuestion(questions:[QuestionT], responses:[ResponseT]) {
    if (responses.length >= questions.length) {
      return null;
    }
    const question = questions[responses.length];
    return {id: question.id, question:question, responses:responses};
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
      allowUnsafeHtml={true}
      questions={questions}
      questionEl={this.renderQuestionEl}
      getNextQuestion={this.onGetNextQuestion}
      summaryEl={this.renderSummaryEl}
      onLogMessage={this.onLogMessage}
    />;
  },

  renderIntro() {
    return (
      <IntroWithEmail defaultEmail={this.state.email} onDone={this.onStart}>
        <div>
          <p>Welcome!</p>
          <p>The teacher moments scenario that follows is deisgned to give you an opportuinty to observe and give feedback on interactions in a CS classroom. </p>
          <p></p>
          <p>This activity would take about 30 minutes.</p>
        </div>
      </IntroWithEmail>
    );
  },

  renderQuestionEl(nextQuestion:NextQuestionT, onLog, onResponseSubmitted) {
    const {question} = nextQuestion;


    if (question.stage === 'scene') {
      return (
        <div key={JSON.stringify(question)}>
          <MixedQuestion question={question} />
          <MinimalTextResponse
            allowUnsafeHtml={true}
            forceResponse={true}
            responsePrompt="Notes:"
            recordText="NEXT"
            onLogMessage={onLog}
            onResponseSubmitted={onResponseSubmitted}
          />
        </div>
      );
    }

    if (question.stage === 'smithResponse') {
      return (
        <div key={JSON.stringify(question)}>
          <MixedQuestion question={question} />
          <MinimalTextResponse
            allowUnsafeHtml={true}
            forceResponse={true}
            responsePrompt="Your Response"
            recordText="NEXT"
            onLogMessage={onLog}
            onResponseSubmitted={onResponseSubmitted}
          />
        </div>
      );
    }


    // info
    return (
      <div key={JSON.stringify(question)}>
        <MixedQuestion question={question} />
        <ChoiceForBehaviorResponse
          choices={['NEXT']}
          onLogMessage={onLog}
          onResponseSubmitted={onResponseSubmitted}
        />
      </div>
    );

  },

  renderSummaryEl(questions:[QuestionT], responses:[ResponseT]) {
    return (
      
      <div className="done">
        <b style={{
          display: 'block',
          padding: '15px 20px 15px',
          background: '#09407d',
          color: 'white'
        }}>Done</b>
        <div style={styles.doneTitle}>
          <p style={styles.paragraph}>You have now completed the simulation and personal reflections</p>
          <p style={styles.paragraph}><a href={Routes.Home}>Back to Home</a></p>
        </div>
      </div> 
    );
  },

  renderScenarioResponsesEl(questions:[QuestionT], responses:[ResponseT], onLog) {
    return (
      <VideoSummary
        questions={questions}
        responses={responses}
        onLogMessage={onLog}
        delayRenderingMs={500} /> 
    );
  }
});

const styles = {
  doneTitle: {
    padding: 20,
    paddingBottom: 0,
    margin:0,
  },
  paragraph: {
    marginTop: 20,
    marginBottom: 20
  }
};