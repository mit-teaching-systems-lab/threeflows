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

import PopupQuestion from '../popup_question.jsx';
import type {ResponseT} from '../popup_question.jsx';

import RefreshIcon from 'material-ui/svg-icons/navigation/refresh';

import {withStudents} from '../transformations.jsx';

import * as Api from '../../helpers/api.js';
import FinalSummaryCard from '../final_summary_card.jsx';
import NavigationAppBar from '../../components/navigation_app_bar.jsx';

import MobileInterface from '../mobile_prototype/mobile_interface.jsx';
import {playtestQuestions} from '../questions.js';

/*
Shows the MessagePopup game
*/
export default React.createClass({
  displayName: 'MessagePopupExperiencePage',

  propTypes: {
    query: React.PropTypes.object.isRequired,
    cohortKey: React.PropTypes.string.isRequired
  },

  contextTypes: {
    auth: React.PropTypes.object.isRequired
  },

  getInitialState() {
    const isSolutionMode = _.has(this.props.query, 'solution');
    return {
      scaffolding: {
        helpType: isSolutionMode ? 'none' : 'feedback',
        shouldShowSummary: !isSolutionMode,
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
    // Alternates between groups of text and audio responses. The order gets reversed if you're in cohort B instead of A. 
    const isReversedOrder = this.props.cohortKey.toLowerCase() === 'b';
    const questionGroupSize = 2;
    if (isReversedOrder) {
      return (Math.floor((this.state.gameSession.questionsAnswered / questionGroupSize) % 2) === 0) ?  'text' : 'audio';
    } else {
      return (Math.floor((this.state.gameSession.questionsAnswered / questionGroupSize) % 2) === 0) ?  'audio' : 'text';
    }
  },

  // This implementation is static
  drawStudentCard(question, scaffolding) {
    return true;
  },
  
  onLog(type, response:ResponseT) {
    Api.logEvidence(type, {
      ...response,
      name: this.state.gameSession.email,
      email: this.state.gameSession.email,
      sessionId: this.state.gameSession.sessionId,
      clientTimestampMs: new Date().getTime(),
      cohortKey: this.props.cohortKey
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
      helpType: 'feedback', // feedback, hints or none
      shouldShowSummary: false,
    };

    this.setState({
      scaffolding,
      gameSession: {
        email,
        drawResponseMode: this.drawResponseMode,
        drawStudentCard: this.drawStudentCard,
        sessionId: uuid.v4(),
        questions: withStudents(playtestQuestions),
        questionsAnswered: 0,
        msResponseTimes: []
      },
    });
  },

  render() {
    return (
      <div>
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

    // text-messaging prototype
    if (_.has(this.props.query, 'mobilePrototype')) return this.renderMobilePrototype();

    // question screen
    return this.renderPopupQuestion();
  },

  renderDone() {
    return (
      <div className="done">
        <VelocityTransitionGroup enter={{animation: "slideDown"}} leave={{animation: "slideUp"}} runOnMount={true}>
          <div style={_.merge(_.clone(styles.container), styles.done)}>
            <div style={styles.doneTitle}>You've finished! Please complete the feedback survey in the next browser tab.</div>
            <Divider />
            <p style={styles.paragraph}>Cohort: {this.props.cohortKey}</p>
            <Divider />
            <FinalSummaryCard 
              msResponseTimes={this.state.gameSession.msResponseTimes} 
              limitMs={this.state.limitMs} />
            
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
          <TextField
          name="email"
          style={{width: '100%'}}
          underlineShow={false}
          floatingLabelText="What's your email address?"
          value={this.state.email}
          onChange={this.onTextChanged}
          multiLine={true}
          rows={2}/>
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