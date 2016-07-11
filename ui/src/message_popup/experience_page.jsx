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

import PopupQuestion from './popup_question.jsx';
import * as Routes from '../routes';
import type {Response} from './popup_question.jsx';

import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import ArrowBackIcon from 'material-ui/svg-icons/navigation/arrow-back';
import RefreshIcon from 'material-ui/svg-icons/navigation/refresh';
import MenuIcon from 'material-ui/svg-icons/navigation/menu';
import {allQuestions} from './questions.js';

import {withStudents} from './transformations.jsx';
import * as Api from '../helpers/api.js';
import FinalSummaryCard from './final_summary_card.jsx';
import InstructionsCard from './instructions_card.jsx';

import MobilePrototypeCard from './mobile_prototype_card.jsx';

const ALL_COMPETENCY_GROUPS = 'ALL_COMPETENCY_GROUPS';

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

  getInitialState: function() {
    const isSolutionMode = _.has(this.props.query, 'solution');
    const helpType = isSolutionMode ? 'none' : 'feedback';
    const shouldShowStudentCard = isSolutionMode ? _.has(this.props.query, 'cards') : true;
    const shouldShowSummary = !isSolutionMode;
    const sessionId = uuid.v4();
    return {
      shouldShowStudentCard,
      shouldShowSummary,
      helpType,
      isSolutionMode,
      sessionId,
      competencyGroupValue: ALL_COMPETENCY_GROUPS,
      questions: allQuestions,
      email: this.context.auth.userProfile.email,
      hasStarted: false,
      questionsAnswered: 0,
      sessionLength: 10,
      toastRevision: false,
      limitMs: 90000,
      responseTimes: []
    };
  },

  onStartPressed(email, sessionLength, questions, shouldShowStudentCard,shouldShowSummary, helpType) {
    this.setState({
      email,
      sessionLength,
      questions,
      shouldShowStudentCard,
      shouldShowSummary,
      helpType,
      hasStarted: true
    });
  },
  
  playToast(){
    if(this.state.helpType === 'feedback' && !this.state.shouldShowSummary){
      this.setState({toastRevision: true});
    }
  },
  
  removeToast(){
    this.setState({toastRevision: false});
  },
  
  addResponseTime(time){
    this.setState({responseTimes: this.state.responseTimes.concat(time)});
  },

  onLog(type, response:Response) {
    Api.logEvidence(type, {
      ...response,
      name: this.state.email,
      sessionId: this.state.sessionId,
      clientTimestampMs: new Date().getTime()
    });
  },
  
  onQuestionDone(elapsedSeconds) {
    this.playToast();
    this.addResponseTime(elapsedSeconds);
    this.setState({ questionsAnswered: this.state.questionsAnswered + 1 });
  },

  onDonePressed() {
    Routes.navigate(Routes.Home);
  },
  
  resetExperience(){
    this.setState(this.getInitialState());
  },

  render() {
    const {
      hasStarted,
      questionsAnswered,
      sessionLength
    } = this.state;
    
    if (_.has(this.props.query, 'mobilePrototype')) return this.renderMobilePrototype();
    
    return (
      <div>
        <AppBar 
          title='Message PopUp Practice'
          iconElementLeft=
          {
            <IconButton
              onTouchTap={this.resetExperience}
              >
              {!hasStarted ? <MenuIcon/> : questionsAnswered >= sessionLength ? <RefreshIcon /> : <ArrowBackIcon />}
            </IconButton>
          }
          />
        {!hasStarted && this.renderInstructions()}
        {questionsAnswered >= sessionLength && this.renderDone()}
        {hasStarted && questionsAnswered < sessionLength && this.renderPopupQuestion()}
      </div>
    );
  },

  renderDone() {
    return (
      <div>
        <VelocityTransitionGroup enter={{animation: "slideDown"}} leave={{animation: "slideUp"}} runOnMount={true}>
          <div style={_.merge(_.clone(styles.container), styles.done)}>
            <div style={styles.doneTitle}>You finished!</div>
            <Divider />
            <FinalSummaryCard 
              responseTimes={this.state.responseTimes} 
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
    return (
      <InstructionsCard 
        sessionLength={this.state.sessionLength}
        onStartPressed={this.onStartPressed}
        email={this.state.email}
        itemsToShow={this.props.query}
        helpType={this.state.helpType}
        />);
  },
  
  renderPopupQuestion() {
    const {
      questions,
      questionsAnswered,
      shouldShowStudentCard,
      shouldShowSummary,
      helpType,
      sessionLength
    } = this.state;
    const question = questions[questionsAnswered];
    return (
      <div style={styles.container}>        
        <LinearProgress color="#EC407A" mode="determinate" value={questionsAnswered} max={sessionLength} />
        <VelocityTransitionGroup enter={{animation: "slideDown"}} leave={{animation: "slideUp"}} runOnMount={true}>
          <PopupQuestion
            key={JSON.stringify(question)}
            question={question}
            shouldShowStudentCard={shouldShowStudentCard}
            shouldShowSummary={shouldShowSummary}
            helpType={helpType}
            limitMs={this.state.limitMs}
            onLog={this.onLog}
            onDone={this.onQuestionDone}
            isLastQuestion={questionsAnswered+1===sessionLength ? true : false}/>
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
    return (
      <MobilePrototypeCard 
        question={_.shuffle(withStudents(this.state.questions))[0]}
        />
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