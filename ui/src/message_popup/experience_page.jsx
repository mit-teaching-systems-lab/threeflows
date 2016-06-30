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
import {allQuestions} from './questions.js';
import * as Api from '../helpers/api.js';
import FinalSummaryCard from './final_summary_card.jsx';
import InstructionsCard from './instructions_card.jsx';

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
      name: this.context.auth.userProfile.name,
      hasStarted: false,
      questionsAnswered: 0,
      sessionLength: 20,
      toastRevision: false,
      limitMs: 90000,
      responseTimes: []
    };
  },

  onStartPressed(name, sessionLength, questions, shouldShowStudentCard,shouldShowSummary, helpType) {
    this.setState({
      name,
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
      name: this.state.name,
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

  render() {
    const {
      hasStarted,
      questions,
      questionsAnswered,
      shouldShowStudentCard,
      shouldShowSummary,
      helpType,
      sessionLength
    } = this.state;
    if (!hasStarted) return this.renderInstructions();
    if (questionsAnswered >= sessionLength) return this.renderDone();

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

  renderDone() {
    return (
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
    );
  },

  renderInstructions() {
    return (
      <InstructionsCard 
        onStartPressed={this.onStartPressed}
        name={this.state.name}
        itemsToShow={this.props.query}
        />);
  }
});

const styles = {
  done: {
    padding: 20,
    width: 360
  },
  container: {
    border: '1px solid #ccc',
    margin: 20,
    width: 400,
    fontSize: 20,
    padding: 0
  },
  button: {
    marginTop: 20
  },
  doneTitle: {
    marginBottom: 10
  }
};