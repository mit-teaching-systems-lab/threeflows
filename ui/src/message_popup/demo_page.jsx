/* @flow weak */
import _ from 'lodash';
import React from 'react';
import VelocityTransitionGroup from "velocity-react/velocity-transition-group";
import 'velocity-animate/velocity.ui';
import uuid from 'node-uuid';
import Media from 'react-media';

import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';
import LinearProgress from 'material-ui/LinearProgress';
import Snackbar from 'material-ui/Snackbar';
import IconButton from 'material-ui/IconButton';
import RefreshIcon from 'material-ui/svg-icons/navigation/refresh';

import PopupQuestion from './popup_question.jsx';
import type {ResponseT} from './popup_question.jsx';
import {withStudents} from './transformations.jsx';
import * as Api from '../helpers/api.js';
import NavigationAppBar from '../components/navigation_app_bar.jsx';
import MobileInterface from './mobile_prototype/mobile_interface.jsx';
import {allQuestions} from './questions.js';
import AudioCapture from '../components/audio_capture.jsx';

/*
For public demos.
*/
export default React.createClass({
  displayName: 'DemoPage',

  propTypes: {
    feedbackFormUrl: React.PropTypes.string
  },

  contextTypes: {
    auth: React.PropTypes.object.isRequired
  },

  getDefaultProps() {
    return {
      feedbackFormUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSdC7CrSkmA8Y2ZEmKwuzfeaijMoO-KZMbgEz9Q-Ay2f8u8Klw/viewform'
    };
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
        drawStudentCard: this.drawStudentCard,
        sessionId: uuid.v4(),
        questions: withStudents(demoQuestions),
        questionsAnswered: 0,
        msResponseTimes: []
      },
    });
  },

  render() {
    return <Media query="(min-width: 400px) and (min-height: 400px)">{this.renderResponsiveFrame}</Media>;
  },

  renderResponsiveFrame(isNotWide) {
    const outerFrameStyles = (isNotWide)
      ? styles.desktopOuterFrame
      : {};
    const innerFrameStyles = (isNotWide)
      ? styles.desktopInnerFrame
      : {};

    return (
      <div className="outer-frame" style={outerFrameStyles}>
        <div className="inner-frame" style={innerFrameStyles}>
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
      </div>
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
    if (questionsAnswered >= sessionLength) return this.renderDone();

    // question screen
    return this.renderPopupQuestion();
  },

  renderDone() {
    const {feedbackFormUrl} = this.props;

    return (
      <div className="done">
        <VelocityTransitionGroup enter={{animation: "slideDown"}} leave={{animation: "slideUp"}} runOnMount={true}>
          <div style={_.merge(_.clone(styles.container), styles.done)}>
            <div style={styles.doneTitle}>Thanks!</div>
            <div style={styles.doneTitle}>If you're at a workshop and have a feedback capture grid, please share your thoughts with us!</div>
            <Divider style={{marginTop: 20}} />
            <div style={{paddingTop: 20, fontSize: 18}}>
              If you ran into this online, we'd love to
              <a
                href={feedbackFormUrl}
              > hear from you</a> too. :)
            </div>
          </div>
        </VelocityTransitionGroup>
      </div>
    );
  },

  renderFeedbackForm() {
    const {feedbackFormUrl} = this.props;
    if (!feedbackFormUrl) return;
    
    return <iframe
      src={`${feedbackFormUrl}?embedded=true`}
      width="100%"
      height={600}
      frameBorder={0}
      marginHeight={0}
      marginWidth={0}>Loading...</iframe>;
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
    const {questions, questionsAnswered, drawResponseMode, drawStudentCard} = gameSession;
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
  desktopOuterFrame: {
    background: 'black',
    paddingTop: 20,
    height: 2000,
    display: 'flex',
    justifyContent: 'center'
  },
  desktopInnerFrame: {
    width: 375,
    height: 667,
    background: 'white',
    border: '1px solid #999'
  },
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