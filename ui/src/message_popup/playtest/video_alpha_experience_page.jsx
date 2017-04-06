/* @flow weak */
import _ from 'lodash';
import React from 'react';
import uuid from 'uuid';
import VelocityTransitionGroup from "velocity-react/velocity-transition-group";

import * as Api from '../../helpers/api.js';
import LinearSession from '../linear_session/linear_session.jsx';
import SessionFrame from '../linear_session/session_frame.jsx';
import IntroWithEmail from '../linear_session/intro_with_email.jsx';
import {VideoAlphaScenarios} from './video_alpha_scenarios.js';
import type {QuestionT} from './video_alpha_scenarios.js';
import YouTube from 'react-youtube';
import MinimalOpenResponse from '../renderers/minimal_open_response.jsx';


type ResponseT = {
  choice:string,
  question:QuestionT
};



// The top-level page, manages logistics around email, questions,
// and the display of instructions, questions, and summary.
export default React.createClass({
  displayName: 'VideoAlphaExperiencePage',

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
    const questions = VideoAlphaScenarios.questions();
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

  onScenarioDone() {
    this.setState({recording: true});
  },

  onRecordingDone(onResponseSubmitted, response) {
    this.setState({recording: false});
    onResponseSubmitted(response);
  },

  onGetNextQuestion(questions:[QuestionT], responses:[ResponseT]) {
    if (responses.length >= questions.length) {
      return null;
    }
    return questions[responses.length];
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
            <p>You will go through a set of video scenarios that simulate the conversation between you and a parent.</p>
            <p>You need to provide an audio response to each prompt. Please respond as quickly as possible (like you would do in a real conversation).</p>
            <p>This may feel uncomfortable at first, but it's better to feel uncomfortable here than with a real parent.</p>
        </div>
      </IntroWithEmail>
    );
  },

  renderQuestionEl(question:QuestionT, onLog, onResponseSubmitted) {
    return (
      <div>
        <div>
          {this.renderScenarioEl(question)}
        </div>
        <div>
          {this.renderResponseEl(onLog, onResponseSubmitted)}
        </div>
      </div>
    ); 
  },

  renderScenarioEl(question) {
    return (
      <div style={styles.videoContainer}>
        <YouTube
          videoId={question.youTubeId}
          onEnd={this.onScenarioDone}
          opts={{
            height: '100%',
            width: '100%',
            playerVars: { // https://developers.google.com/youtube/player_parameters
              autoplay: 1,
              controls: 0,
              rel: 0,
              showinfo: 0,
              start: question.start,
              end: question.end
            }
          }} 
        />
      </div>
    );    
  },

  renderResponseEl(onLog, onResponseSubmitted) {
    if (this.state.recording) {
      return (
        <VelocityTransitionGroup enter={{animation: "slideDown"}} runOnMount={true}>
          <MinimalOpenResponse
            responsePrompt=""
            recordText="Respond"
            onLogMessage={onLog}
            forceResponse={true}
            onResponseSubmitted={this.onRecordingDone.bind(this, onResponseSubmitted)}
          /> 
        </VelocityTransitionGroup>
        );
    } else {
      return null;
    }
  },

  renderSummaryEl(questions:[QuestionT], responses:[ResponseT]) {
    return (
      <div className="done">
        <VelocityTransitionGroup enter={{animation: "slideDown"}} leave={{animation: "slideUp"}} runOnMount={true}>
          <div style={styles.doneTitle}>
            <p style={styles.paragraph}>You've finished the simulation.</p>
            <p style={styles.paragraph}><strong>Do not close this page</strong>. You will need it for the reflection.</p>
            <p style={styles.paragraph}>Please return to the form for the post-simulation reflection.</p>
          </div>
          <p style={styles.summaryTitle}>Summary</p>

          {responses.map((response, i) => 
            <div key={"question-" + i} style ={_.merge(styles.instructions, styles.summaryQuestion)}>
              <div style={styles.videoContainer}>
                <YouTube
                  videoId={questions[i].youTubeId}
                  opts={{
                    height: '100%',
                    width: '100%',
                    playerVars: { // https://developers.google.com/youtube/player_parameters
                      autoplay: 0,
                      controls: 0,
                      rel: 0,
                      showinfo: 0,
                      start: questions[i].start,
                      end: questions[i].end
                    }
                  }} 
                />
              </div>
              <p style={styles.summaryParagraph}>Response:</p>
              <audio key={'response-' + i} controls={true} src={response.audioResponse.downloadUrl} style={{paddingTop: 0, paddingBottom: 20}}/>
            </div>
          
          )}
          <div style={styles.container} />
        </VelocityTransitionGroup>
      </div> 
    );
  }
});

const styles = {
  done: {
    padding: 20,
  },
  container: {
    fontSize: 20,
    padding: 0,
    margin:0,
    paddingBottom: 45
  },
  button: {
    marginTop: 20
  },
  doneTitle: {
    padding: 20,
    paddingBottom: 0,
    margin:0,
  },
  instructions: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  paragraph: {
    marginTop: 20,
    marginBottom: 20
  },
  summaryTitle: {
    fontSize: 20,
    padding: 20,
    paddingBottom: 5,
    margin: 0,
    fontWeight: 'bold'
  },
  summaryQuestion: {
    whiteSpace: 'pre-wrap',
    fontSize: 16,
    lineHeight: 1.2,
    paddingTop: 10,
    paddingBottom: 10
  },
  summaryParagraph: {
    marginTop: 10,
    marginBottom: 0
  },
  videoContainer: {
    height: 230
  }
};