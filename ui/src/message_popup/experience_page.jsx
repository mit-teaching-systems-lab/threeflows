/* @flow weak */
import _ from 'lodash';
import React from 'react';
import VelocityTransitionGroup from "velocity-react/velocity-transition-group";
import 'velocity-animate/velocity.ui';
import uuid from 'uuid';

import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';
import LinearProgress from 'material-ui/LinearProgress';
import Snackbar from 'material-ui/Snackbar';
import MenuItem from 'material-ui/MenuItem';

import PopupQuestion from './popup_question.jsx';
import * as Routes from '../routes';
import type {ResponseT} from './popup_question.jsx';

import RefreshIcon from 'material-ui/svg-icons/navigation/refresh';

import {withStudents} from './transformations.jsx';

import * as Api from '../helpers/api.js';
import FinalSummaryCard from './final_summary_card.jsx';
import InstructionsCard from './instructions_card.jsx';
import NavigationAppBar from '../components/navigation_app_bar.jsx';

import MobileInterface from './mobile_prototype/mobile_interface.jsx';

import ScaffoldingCard from './scaffolding_card.jsx';

/*
Shows the MessagePopup game
*/
export default React.createClass({
  displayName: 'MessagePopupExperiencePage',

  propTypes: {
    query: React.PropTypes.object.isRequired
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
      limitMs: 90000
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

  onLog(type, response:ResponseT) {
    Api.logEvidence(type, {
      ...response,
      name: this.state.gameSession.email,
      email: this.state.gameSession.email,
      sessionId: this.state.gameSession.sessionId,
      clientTimestampMs: new Date().getTime()
    });
  },
  
  onQuestionDone(elapsedMs) {
    this.playToast();
    this.addResponseTime(elapsedMs);
    var gameSession = {...this.state.gameSession};
    gameSession.questionsAnswered += 1;
    this.setState({ gameSession });
  },

  onDonePressed() {
    Routes.navigate(Routes.Home);
  },
  
  onSaveScaffoldingAndSession(scaffoldingSessionParams){
    const {
      scaffolding,
      email,
      questionsForSession,
      drawResponseMode,
      drawStudentCard
    } = scaffoldingSessionParams;
    this.setState({
      scaffolding,
      gameSession: {
        email,
        drawResponseMode,
        drawStudentCard,
        sessionId: uuid.v4(),
        questions: questionsForSession,
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
            <div style={styles.doneTitle}>You finished!</div>
            <Divider />
            <FinalSummaryCard 
              msResponseTimes={this.state.gameSession.msResponseTimes} 
              limitMs={this.state.limitMs} />
            <RaisedButton
              onTouchTap={this.onDonePressed}
              style={styles.button}
              secondary={true}
              label="Done" />
          </div>
        </VelocityTransitionGroup>
      </div>
    );
  },

  renderInstructions() {
    const {scaffolding} = this.state;
    const {query} = this.props;

    return (
      <VelocityTransitionGroup enter={{animation: "callout.pulse", duration: 500}} leave={{animation: "slideUp"}} runOnMount={true}>
        <div className="instructions">
          <InstructionsCard 
           query={query}
           />
          <ScaffoldingCard
            initialEmail={this.context.auth.userProfile.email}
            scaffolding={scaffolding}
            query={query}
            onSessionConfigured={this.onSaveScaffoldingAndSession}
           />
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
  }
};