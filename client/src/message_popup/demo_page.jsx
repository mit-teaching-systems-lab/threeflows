import _ from 'lodash';

/* @flow weak */
import PropTypes from 'prop-types';

import React from 'react';
import VelocityTransitionGroup from "velocity-react/velocity-transition-group";
import 'velocity-animate/velocity.ui';
import uuid from 'uuid';

import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';
import LinearProgress from 'material-ui/LinearProgress';
import Snackbar from 'material-ui/Snackbar';
import IconButton from 'material-ui/IconButton';
import RefreshIcon from 'material-ui/svg-icons/navigation/refresh';

import ResponsiveFrame from '../components/responsive_frame.jsx';
import PopupQuestion from './popup_question.jsx';
import type {ResponseT} from './popup_question.jsx';
import {withStudents} from './transformations.jsx';
import * as Api from '../helpers/api.js';
import NavigationAppBar from '../components/navigation_app_bar.jsx';
import MobileInterface from './mobile_prototype/mobile_interface.jsx';
import {allQuestions} from './questions.js';
import AudioCapture from '../components/audio_capture.jsx';
import FeedbackForm from './feedback_form.jsx';

/*
For public demos.
*/
export default React.createClass({
  displayName: 'DemoPage',

  contextTypes: {
    auth: PropTypes.object.isRequired
  },

  getInitialState() {
    return {
      scaffolding: {
        helpType: 'none',
        shouldShowSummary: false
      },
      gameSession: null,
      toastRevision: false,
      limitMs: 90000,
      email: this.context.auth.userProfile.email
    };
  },
  
  playToast(){
    if(this.state.scaffolding.helpType === 'feedback' && !this.state.scaffolding.shouldShowSummary){
      this.setState({toastRevision: true});
    }
  },
  
  removeToast(){
    this.setState({toastRevision: false});
  },
  
  addResponseTime(elapsedMs){
    var gameSession = {...this.state.gameSession};
    gameSession.msResponseTimes.push(elapsedMs);
    this.setState({ gameSession });
  },

  resetExperience(){
    this.setState(this.getInitialState());
  },

  // Tied to the specific scenarios
  // but mobile doesn't support audio, so fall back
  drawResponseMode(question, scaffolding) {
    const isAudioSupported = AudioCapture.isAudioSupported();
    if (!isAudioSupported) return 'text';

    const {questionsAnswered} = this.state.gameSession;
    return ['text', 'text', 'audio', 'audio'][questionsAnswered];
  },

  drawResponsePrompt(question, scaffolding) {
    return 'Speak directly to the student';
  },

  drawStudentCard(question, scaffolding) {
    // Tied to the specific scenarios
    const {questionsAnswered} = this.state.gameSession;
    return [true, false, false, true][questionsAnswered];
  },

  onLog(type, response:ResponseT) {
    Api.logEvidence(type, {
      ...response,
      name: this.state.gameSession.email,
      email: this.state.gameSession.email,
      sessionId: this.state.gameSession.sessionId,
      clientTimestampMs: new Date().getTime()
    });
  },

  onTextChanged(e) {
    const email = e.target.value;
    this.setState({email});
  },
  
  onQuestionDone(elapsedMs) {
    this.playToast();
    this.addResponseTime(elapsedMs);
    var gameSession = {...this.state.gameSession};
    gameSession.questionsAnswered += 1;
    this.setState({ gameSession });
  },

  onSave(){
    const {email} = this.state;  
    const demoQuestionIds = [
      120,
      305,
      306,
      3001
    ];
    const demoQuestions = allQuestions.filter(question => demoQuestionIds.indexOf(question.id) !== -1);
    this.setState({
      gameSession: {
        email,
        drawResponseMode: this.drawResponseMode,
        drawResponsePrompt: this.drawResponsePrompt,
        drawStudentCard: this.drawStudentCard,
        sessionId: uuid.v4(),
        questions: withStudents(demoQuestions),
        questionsAnswered: 0,
        msResponseTimes: []
      },
    });
  },

  render() {
    return (
      <ResponsiveFrame>
        <div>
          <NavigationAppBar
            title="Teacher Moments"
            iconElementLeft={
              <IconButton onTouchTap={this.resetExperience} >
                <RefreshIcon />
              </IconButton>
            }
          />
          {this.renderMainScreen()}
        </div>
      </ResponsiveFrame>
    );
  },

  renderMainScreen() {
    // configure the game
    const {gameSession} = this.state;
    const hasStarted = gameSession !== null;
    if (!hasStarted) return this.renderInstructions();

    // all done!
    const questionsAnswered = hasStarted ? gameSession.questionsAnswered : 0;
    const questions = hasStarted ? gameSession.questions : [];
    const sessionLength = hasStarted ? questions.length : 0;
    if (questionsAnswered >= sessionLength) return <FeedbackForm />;

    // question screen
    return this.renderPopupQuestion();
  },

  renderInstructions() {
    return (
      <VelocityTransitionGroup enter={{animation: "callout.pulse", duration: 500}} leave={{animation: "slideUp"}} runOnMount={true}>
        <div className="instructions">
          <div style ={_.merge(_.clone(styles.container), styles.instructions)}>
            <p style={styles.paragraph}>Welcome!</p>
            <p style={styles.paragraph}>This station is about responding to students in the moment. It is set in the context of a 7th grade classroom.</p>
            <p style={styles.paragraph}>This may feel uncomfortable at first, but it's better to get comfortable here than with real students.</p>
            <p style={styles.paragraph}>You may be asked to write or say your responses aloud.</p>
            <p style={styles.paragraph}>Each question is timed to simulate responding in the moment in the classroom. Aim to respond to each scenario in about 90 seconds.</p>
            <Divider />
          </div>
        </div>
        <div style={{padding: 20}}>
          <div style={{display: 'flex', flexDirection: 'row', alignItems: 'flex-end'}}>
            <RaisedButton
              disabled={this.state.email === ''}
              onTouchTap={this.onSave}
              style={styles.button}
              secondary={true}
              label="Start" />
          </div>    
        </div>
        
      </VelocityTransitionGroup>

      );
  },
  
  renderPopupQuestion() {
    const {scaffolding, gameSession, limitMs} = this.state;
    const {questions, questionsAnswered, drawResponseMode, drawResponsePrompt, drawStudentCard} = gameSession;
    const sessionLength = questions.length;
    const question = questions[questionsAnswered];

    return (
      <div className="question" style={styles.container}>        
        <LinearProgress color="#EC407A" mode="determinate" value={questionsAnswered} max={sessionLength} />
        <VelocityTransitionGroup enter={{animation: "slideDown"}} leave={{animation: "slideUp"}} runOnMount={true}>
          <PopupQuestion
            key={JSON.stringify(question)}
            question={question}
            scaffolding={scaffolding}
            limitMs={limitMs}
            onLog={this.onLog}
            onDone={this.onQuestionDone}
            drawResponseMode={drawResponseMode}
            drawResponsePrompt={drawResponsePrompt}
            drawStudentCard={drawStudentCard}
            isLastQuestion={(questionsAnswered + 1 === sessionLength)}/>
        </VelocityTransitionGroup>
        <Snackbar
          open={this.state.toastRevision}
          message="Response recorded for feedback"
          autoHideDuration={2000}
          onRequestClose={this.removeToast}
        />
      </div>
    );
  },
  
  renderMobilePrototype() {
    const {scaffolding, gameSession, limitMs} = this.state;
    const {questions, questionsAnswered} = gameSession;
    const sessionLength = questions.length;
    const question = withStudents(questions)[questionsAnswered];
    return ( 
      <div className="prototype">
        <LinearProgress color="#EC407A" mode="determinate" value={questionsAnswered} max={sessionLength} />
        <MobileInterface
          key={JSON.stringify(question)}
          scaffolding={scaffolding}
          question={question}
          onQuestionDone={this.onQuestionDone}
          limitMs={limitMs}
          onLog={this.onLog}
          isLastQuestion={questionsAnswered+1===sessionLength ? true : false}
          />
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
    paddingBottom: 0
  },
  button: {
    marginTop: 20
  },
  doneTitle: {
    marginBottom: 10
  },
  instructions: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  paragraph: {
    marginTop: 20,
    marginBottom: 20
  }

};