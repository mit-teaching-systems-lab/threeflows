/* @flow weak */
import _ from 'lodash';
import React from 'react';
import * as Routes from '../routes';
import type {Response} from './popup_question.jsx';
import RaisedButton from 'material-ui/RaisedButton';
import Toggle from 'material-ui/Toggle';
import Divider from 'material-ui/Divider';
import PopupQuestion from './popup_question.jsx';
import TextField from 'material-ui/TextField';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import LinearProgress from 'material-ui/LinearProgress';
import Slider from 'material-ui/Slider';
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
    //I changed the bottom to true since the feedback listed it as a bug but I thought that not
    //showing the student cards in solution mode was the initial intention since the users would
    //have known each of the students by then..?
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
    return (
      <VelocityTransitionGroup enter={{animation: "callout.pulse", duration: 500}} leave={{animation: "slideUp"}} runOnMount={true}>
        <div style={_.merge(_.clone(styles.container), styles.instructions)}>
          <div style={styles.title}>Message Popup</div>
          {this.state.isSolutionMode &&
            <p style={styles.paragraph}>Clear 15 minutes.  Your work is timed, so being able to focus is important.</p>
          }
          {!this.state.isSolutionMode && 
            <p style={styles.paragraph}>This will feel uncomfortable at first, but better to get comfortable here than with real students.</p>
          }
          <p style={styles.paragraph}>You may be asked to write, sketch or say your responses aloud.</p>
          <p style={styles.paragraph}>Each question is timed to simulate responding in the moment in the classroom.  You'll have 90 seconds to respond to each question.</p>
          <Divider />
          {!this.state.isSolutionMode && this.renderScaffoldingOptions()}
          <TextField
            underlineShow={false}
            floatingLabelText="What's your name?"
            onChange={this.onTextChanged}
            multiLine={true}
            rows={2}/>
          <div style={{display: 'flex', flexDirection: 'row', alignItems: 'flex-end'}}>
            <RaisedButton
              disabled={this.state.name === ''}
              onTouchTap={this.onStartPressed}
              style={styles.button}
              secondary={true}
              label="Start" />
          </div>
        </div>
      </VelocityTransitionGroup>
    );
  },

  renderScaffoldingOptions() {
    const {competencyGroupValue} = this.state;
    const competencyGroups = _.uniq(_.map(allQuestions, 'learningObjectiveId')).map((id) => {
      return _.find(learningObjectives, {id}).competencyGroup;
    });
    return (
      <div>
        <div style={styles.optionTitle}>Learning objectives to practice</div>
        <RadioButtonGroup
          name="competencyGroupValue"
          valueSelected={competencyGroupValue}
          onChange={this.onCompetencyGroupChanged}
          style={_.merge({ padding: 20 }, styles.option)}>
          <RadioButton
            value={ALL_COMPETENCY_GROUPS}
            label="All" />
          {competencyGroups.map((competencyGroup) => {
            return <RadioButton
              key={competencyGroup}
              value={competencyGroup}
              label={competencyGroup} />;
          })}
        </RadioButtonGroup>
        <Divider />
        <div>
          <div style={styles.optionTitle}>Session Length: {this.state.sessionLength} {this.state.sessionLength===1 ? "question" : "questions"}</div>
          <Slider key={competencyGroupValue} value={this.state.sessionLength} min={1} max={this.state.questions.length} step={1} onChange={this.onSliderChange}/>
        </div>
        <Divider />
        <div style={styles.optionTitle}>Scaffolding</div>
        <div style={_.merge({ padding: 20 }, styles.option)}>
          <Toggle
            label="With student cards"
            labelPosition="right"
            toggled={this.state.shouldShowStudentCards}
            onToggle={this.onStudentCardsToggled} />
          <Toggle
            label="Show summary after each question"
            labelPosition="right"
            toggled={this.state.shouldShowSummary}
            onToggle={this.onSummaryToggled}/>
          <div style={{margin: 10}}><Divider /></div>
          <RadioButtonGroup name="helpOptions" valueSelected={this.state.helpType} onChange={this.onHelpToggled}>
            <RadioButton
              value="feedback"
              label="With feedback and revision"
              style={styles.radioButton}
              />
            <RadioButton
              value="hints"
              label="With hints available"
              style={styles.radioButton}
              />
            <RadioButton
              value="none"
              label="With no help available"
              style={styles.radioButton}
              />
          </RadioButtonGroup>
        </div>
        <Divider />
      </div>
    );
  }
});

const styles = {
  done: {
    padding: 20,
    width: 360
  },
  instructions: {
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20
  },
  paragraph: {
    marginTop: 20,
    marginBottom: 20
  },
  option: {
    fontSize: 16
  },
  optionTitle: {
    padding: 10,
    fontSize: 16,
    paddingTop: 20,
    paddingBottom: 0
  },
  button: {
    marginTop: 20
  },
  doneTitle: {
    marginBottom: 10
  }
};