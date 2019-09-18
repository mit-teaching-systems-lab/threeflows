/* @flow weak */
import PropTypes from 'prop-types';

import React from 'react';
import uuid from 'uuid';

import * as Api from '../../helpers/api.js';
import LinearSession from '../linear_session/linear_session.jsx';
import SessionFrame from '../linear_session/session_frame.jsx';
import IntroWithEmail from '../linear_session/intro_with_email.jsx';
import {Roster2VScenarios} from './roster_two_v_scenarios.js';
import type {QuestionT} from './roster_two_v_scenarios.js';
import type {ResponseT} from './roster_two_v_scenarios.js';
import VideoSummary from './video_summary.jsx';
import InstantResponseScenario from '../renderers/instant_response_scenario.jsx';
import MinimalTextResponse from '../renderers/minimal_text_response.jsx';
import MixedQuestion from '../renderers/mixed_question.jsx';
import OkResponse from '../responses/ok_response.jsx';


// The top-level page, manages logistics around email, questions,
// and the display of instructions, questions, and summary.
export default class extends React.Component {
  props: {query: {p?: string}};
  state: *;
  static displayName = 'RosterPart2VExperiencePage';


  static propTypes = {
    query: PropTypes.shape({
      p: PropTypes.string
    }).isRequired
  };

  static contextTypes = {
    auth: PropTypes.object.isRequired
  };

  constructor(props, context) {
    super(props, context);
    const contextEmail = context.auth.userProfile.email;
    const email = contextEmail === "unknown@mit.edu" ? '' : contextEmail;

    this.state = {
      email,
      questions: null,
      sessionId: uuid.v4(),
      recording: false
    };
  }

  onStart = (email) => {
    const startQuestionIndex = this.props.query.p || 0; // for testing or demoing
    const allQuestions = Roster2VScenarios.questions();
    const questions = allQuestions.slice(startQuestionIndex);
    this.setState({
      email,
      questions,
      recording: false
    });
  };

  onLogMessage = (type, response:ResponseT) => {
    const {email, sessionId} = this.state;
    Api.logEvidence(type, {
      ...response,
      sessionId,
      email,
      name: email,
      clientTimestampMs: new Date().getTime(),
    });
  };

  onRecordingDone = (onResponseSubmitted, response) => {
    this.setState({recording: false});
    onResponseSubmitted(response);
  };

  render() {
    return (
      <SessionFrame>
        {this.renderContent()}
      </SessionFrame>
    );
  }

  renderContent = () => {
    const {questions} = this.state;
    if (!questions) return this.renderIntro();

    return <LinearSession
      questions={questions}
      questionEl={this.renderQuestionEl}
      summaryEl={this.renderSummaryEl}
      onLogMessage={this.onLogMessage}
    />;
  };

  renderIntro = () => {
    return (
      <IntroWithEmail defaultEmail={this.state.email} onDone={this.onStart}>
        <div>
          <p><b>Roster Justice -- Part 2</b></p>
          <p>Welcome!</p>
          <p>This is part 2 of an interactive case study simulating an interaction between you as teacher and your principal, Mr. Holl.</p>
          <p>If you have NOT completed part 1 yet, do NOT continue. You must finish part 1 before starting part 2. </p>
          <p>Write your responses in the textboxes shown. </p>
        </div>
      </IntroWithEmail>
    );
  };

  renderQuestionEl = (question:QuestionT, onLog, onResponseSubmitted, options = {}) => {
    const {responses} = options;

    if (question.stage === 'scenario') {
      return (
        <InstantResponseScenario 
          onLogMessage={onLog}
          onResponseSubmitted={this.onRecordingDone.bind(this, onResponseSubmitted)}
          question={question}
        />
      );
    }

    if (question.stage === 'prereflect') {
      return (
        <div key={JSON.stringify(question)}>
          <MixedQuestion question={question} />
          <MinimalTextResponse
            forceResponse={true}
            responsePrompt="Your Answer"
            recordText="NEXT"
            onLogMessage={onLog}
            onResponseSubmitted={onResponseSubmitted}
          />
        </div>
      );
    }

    if (question.stage === 'postreflect') {
      return (
        <div key={JSON.stringify(question)}>
          <MixedQuestion question={question} />
          <MinimalTextResponse
            forceResponse={true}
            responsePrompt="Your Answer"
            recordText="NEXT"
            onLogMessage={onLog}
            onResponseSubmitted={onResponseSubmitted}
          />
          {this.renderScenarioResponsesEl(this.state.questions, responses, onLog)}
        </div>
      );
    }

    // info
    return (
      <div key={JSON.stringify(question)}>
        <MixedQuestion question={question} />
        <OkResponse
          label="NEXT"
          onLogMessage={onLog}
          onResponseSubmitted={onResponseSubmitted}
        />
      </div>
    );

  };

  renderSummaryEl = (questions:[QuestionT], responses:[ResponseT]) => {
    return (
      
      <div className="done">
        <b style={{
          display: 'block',
          padding: '15px 20px 15px',
          background: '#09407d',
          color: 'white'
        }}>Done</b>
        <div style={styles.doneTitle}>
          <p style={styles.paragraph}>Thank you for participating in our playtest!</p>
          <p style={styles.paragraph}>This practice space is being made in collaboration with a Teacher Preparation program as part of the pre-service teacher’s curriculum on diversity, equity, and inclusion. </p>
          <p style={styles.paragraph}>Your participation will help improve this practice space for future use. Thanks!</p>
        </div>
      </div> 
    );
  };

  renderScenarioResponsesEl = (questions:[QuestionT], responses:[ResponseT], onLog) => {
    return (
      <VideoSummary
        questions={questions}
        responses={responses}
        onLogMessage={onLog}
        delayRenderingMs={500} /> 
    );
  };
}

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