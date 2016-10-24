/* @flow weak */
import _ from 'lodash';
import React from 'react';
import VelocityTransitionGroup from "velocity-react/velocity-transition-group";
import 'velocity-animate/velocity.ui';
import uuid from 'node-uuid';

import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';
import LinearProgress from 'material-ui/LinearProgress';
import Snackbar from 'material-ui/Snackbar';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';

import PopupQuestion from './popup_question.jsx';
import type {ResponseT} from './popup_question.jsx';

import RefreshIcon from 'material-ui/svg-icons/navigation/refresh';

import {withStudents} from './transformations.jsx';

import * as Api from '../helpers/api.js';
import FinalSummaryCard from './final_summary_card.jsx';
import NavigationAppBar from '../components/navigation_app_bar.jsx';

import MobileInterface from './mobile_prototype/mobile_interface.jsx';
import {allQuestions} from './questions.js';

/*
For public demos.
*/
export default React.createClass({
  displayName: 'DemoPage',

  propTypes: {},

  contextTypes: {
    auth: React.PropTypes.object.isRequired
  },

  getInitialState() {
    return {
      scaffolding: {
        helpType: 'none',
        shouldShowStudentCard: true,
        shouldShowSummary: true
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

  drawResponseMode(question, scaffolding) {
    // Start with text and alternate
    const {questionsAnswered} = this.state.gameSession;
    return (questionsAnswered % 2 === 0) ? 'text' : 'audio';
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
    const scaffolding = {
      helpType: 'none',
      shouldShowStudentCard: false,
      shouldShowSummary: false,
    };

    const demoQuestionIds = [
      120,
      305,
      306,
      3001
    ];
    const demoQuestions = allQuestions.filter(question => demoQuestionIds.indexOf(question.id) !== -1);
    this.setState({
      scaffolding,
      gameSession: {
        email,
        drawResponseMode: this.drawResponseMode,
        sessionId: uuid.v4(),
        questions: withStudents(demoQuestions),
        questionsAnswered: 0,
        msResponseTimes: []
      },
    });
  },

  render() {
    return (
      <div style={styles.frame}>
        <div style={styles.mobile}>
          <NavigationAppBar
            title="Teacher Moments"
            prependMenuItems={
              <MenuItem
                onTouchTap={this.resetExperience}
                leftIcon={<RefreshIcon />}
                primaryText="Restart game" />
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
    return (
      <div className="done">
        <VelocityTransitionGroup enter={{animation: "slideDown"}} leave={{animation: "slideUp"}} runOnMount={true}>
          <div style={_.merge(_.clone(styles.container), styles.done)}>
            <div style={styles.doneTitle}>Thanks, you've finished!</div>
            <div style={styles.doneTitle}>If you're working with a group, turn and share your experience.</div>
            <Divider style={{marginTop: 20}} />
            <div style={{paddingTop: 20, fontSize: 18}}>We'd love to hear from you, please complete this <a target="_blank" href="https://docs.google.com/forms/d/e/1FAIpQLSfDuvAqwhhgWZJsGPvog6nrS_cecuqdzX-kMo41Goco1I3tPg/viewform?c=0&w=1">feedback survey</a>!</div>
          </div>
        </VelocityTransitionGroup>
      </div>
    );
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
    const {questions, questionsAnswered, drawResponseMode} = gameSession;
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
  frame: {
    background: 'black',
    paddingTop: 20,
    height: 2000,
    display: 'flex',
    justifyContent: 'center'
  },
  mobile: {
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