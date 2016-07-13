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
import RefreshIcon from 'material-ui/svg-icons/navigation/refresh';

import PopupQuestion from './popup_question.jsx';
import * as Routes from '../routes';
import type {Response} from './popup_question.jsx';
import {allQuestions} from './questions.js';
import {withStudents} from './transformations.jsx';
import * as Api from '../helpers/api.js';
import FinalSummaryCard from './final_summary_card.jsx';
import InstructionsCard from './instructions_card.jsx';
import NavigationAppBar from '../components/navigation_app_bar.jsx';

import MobilePrototypeCard from './mobile_prototype_card.jsx';

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
    const email = this.context.auth.userProfile.email;
    const questions = allQuestions;
    const helpType = isSolutionMode ? 'none' : 'feedback';
    const shouldShowStudentCard = isSolutionMode ? _.has(this.props.query, 'cards') : true;
    const shouldShowSummary = !isSolutionMode;
    const sessionLength = 10;
    const scaffolding = {email, questions, shouldShowStudentCard, shouldShowSummary, helpType, sessionLength};
    return {
      scaffolding,
      sessionId: uuid.v4(),
      hasStarted: false,
      questionsAnswered: 0,
      toastRevision: false,
      limitMs: 90000,
      responseTimes: []
    };
  },

  onStartPressed(scaffolding) {
    this.setState({
      scaffolding,
      hasStarted: true
    });
  },
  
  playToast(){
    if(this.state.scaffolding.helpType === 'feedback' && !this.state.scaffolding.shouldShowSummary){
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
      name: this.state.scaffolding.email,
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
      scaffolding
    } = this.state;
    
    if (_.has(this.props.query, 'mobilePrototype')) return this.renderMobilePrototype();
    
    return (
      <div>
        <NavigationAppBar
          title="Message PopUp Practice"
          prependMenuItems={
            <MenuItem
              onTouchTap={this.resetExperience}
              leftIcon={<RefreshIcon />}
              primaryText="Restart game" />
          }
        />
        {!hasStarted && this.renderInstructions()}
        {questionsAnswered >= scaffolding.sessionLength && this.renderDone()}
        {hasStarted && questionsAnswered < scaffolding.sessionLength && this.renderPopupQuestion()}
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
        sessionLength={this.state.scaffolding.sessionLength}
        onStartPressed={this.onStartPressed}
        email={this.state.scaffolding.email}
        itemsToShow={this.props.query}
        helpType={this.state.scaffolding.helpType}
        />);
  },
  
  renderPopupQuestion() {
    const {
      scaffolding,
      questionsAnswered,
    } = this.state;
    const question = scaffolding.questions[questionsAnswered];
    return (
      <div style={styles.container}>        
        <LinearProgress color="#EC407A" mode="determinate" value={questionsAnswered} max={scaffolding.sessionLength} />
        <VelocityTransitionGroup enter={{animation: "slideDown"}} leave={{animation: "slideUp"}} runOnMount={true}>
          <PopupQuestion
            key={JSON.stringify(question)}
            question={question}
            shouldShowStudentCard={scaffolding.shouldShowStudentCard}
            shouldShowSummary={scaffolding.shouldShowSummary}
            helpType={scaffolding.helpType}
            limitMs={this.state.limitMs}
            onLog={this.onLog}
            onDone={this.onQuestionDone}
            isLastQuestion={questionsAnswered+1===scaffolding.sessionLength ? true : false}/>
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
        question={_.shuffle(withStudents(this.state.scaffolding.questions))[0]}
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