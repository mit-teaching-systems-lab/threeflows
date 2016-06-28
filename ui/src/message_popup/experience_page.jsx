/* @flow weak */
import _ from 'lodash';
import React from 'react';
import * as Routes from '../routes';
import type {Response} from './popup_question.jsx';
import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';
import PopupQuestion from './popup_question.jsx';
import LinearProgress from 'material-ui/LinearProgress';
import Snackbar from 'material-ui/Snackbar';
import TextChangeEvent from '../types/dom_types.js';
import {learningObjectives} from '../data/learning_objectives.js';
import {allQuestions} from './questions.js';
import VelocityTransitionGroup from "velocity-react/velocity-transition-group";
import {withStudents, questionsForCompetencies} from './transformations.jsx';
import * as Api from '../helpers/api.js';
import 'velocity-animate/velocity.ui';
import uuid from 'node-uuid';
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

  getInitialState: function() {
    const isSolutionMode = _.has(this.props.query, 'solution');
    const helpType = isSolutionMode ? 'none' : 'feedback';
    const shouldShowStudentCards = isSolutionMode ? _.has(this.props.query, 'cards') : true;
    const shouldShowSummary = !isSolutionMode;
    const sessionId = uuid.v4();
    return {
      shouldShowStudentCards,
      shouldShowSummary,
      helpType,
      isSolutionMode,
      sessionId,
      competencyGroupValue: ALL_COMPETENCY_GROUPS,
      questions: allQuestions,
      name: '',
      hasStarted: false,
      questionsAnswered: 0,
      sessionLength: 20,
      toastRevision: false,
      limitMs: 90000,
      responseTimes: []
    };
  },

  onStartPressed() {
    const questions = this.getQuestions();
    this.setState({
      questions,
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
  
  getQuestions(competencyGroup=""){
    var {competencyGroupValue, isSolutionMode} = this.state;
    if(competencyGroup !== ""){
      competencyGroupValue = competencyGroup;
    }
    const questions = (isSolutionMode || competencyGroupValue === ALL_COMPETENCY_GROUPS)
      ? _.shuffle(withStudents(allQuestions))
      : questionsForCompetencies(competencyGroupValue);
    return questions;
  },

  onCompetencyGroupChanged(e, competencyGroupValue) {
    const questions = this.getQuestions(competencyGroupValue);
    const newLength = questions.length;
    var sessionLength = this.state.sessionLength;
    if(sessionLength > newLength){
      sessionLength = newLength;
    }
    this.setState({questions, competencyGroupValue, sessionLength});
    
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

  onStudentCardsToggled() {
    this.setState({ shouldShowStudentCards: !this.state.shouldShowStudentCards });
  },
  
  onSummaryToggled(){
    this.setState({ shouldShowSummary: !this.state.shouldShowSummary });
  },
  
  onHelpToggled(event, value){
    this.setState({ helpType: value});
  },
  
  onSliderChange(event, value){
    this.setState({ sessionLength: value});
  },
  
  onTextChanged({target:{value}}:TextChangeEvent) {
    this.setState({ name: value });
  },

  render() {
    const {
      hasStarted,
      questions,
      questionsAnswered,
      shouldShowStudentCards,
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
            shouldShowStudentCard={shouldShowStudentCards}
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
    const {isSolutionMode, name, competencyGroupValue, sessionLength, questions, shouldShowStudentCards, shouldShowSummary, helpType} = this.state;
    const competencyGroups = _.uniq(_.map(allQuestions, 'learningObjectiveId')).map((id) => {
      return _.find(learningObjectives, {id}).competencyGroup;
    });
    return (
      <InstructionsCard 
        isSolutionMode={isSolutionMode}
        onTextChanged={this.onTextChanged}
        onStartPressed={this.onStartPressed}
        name={name}
        competencyGroupValue={competencyGroupValue}
        competencyGroups={competencyGroups}
        onCompetencyGroupChanged={this.onCompetencyGroupChanged}
        sessionLength={sessionLength}
        questions={questions}
        onSliderChange={this.onSliderChange}
        shouldShowStudentCards={shouldShowStudentCards}
        onStudentCardsToggled={this.onStudentCardsToggled}
        shouldShowSummary={shouldShowSummary}
        onSummaryToggled={this.onSummaryToggled}
        helpType={helpType}
        onHelpToggled={this.onHelpToggled}
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