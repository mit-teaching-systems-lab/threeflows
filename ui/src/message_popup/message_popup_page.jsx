// @flow
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
import request from 'superagent';
import TextChangeEvent from '../types/dom_types.js';
import {allStudents} from '../data/virtual_school.js';
import {learningObjectives} from '../data/learning_objectives.js';
import {allQuestions} from './questions.js';
import VelocityTransitionGroup from "velocity-react/velocity-transition-group";

const ALL_COMPETENCY_GROUPS = 'ALL_COMPETENCY_GROUPS';

function withStudents(questions) {
  return questions.map((question) => {
    const student = _.find(allStudents, {id: question.studentId });
    return _.extend({student}, question);
  });
}

function questionsForCompetencies(competencyGroup) {
  const withCompetencyGroups = _.compact(allQuestions.map((question) => {
    const learningObjective = _.find(learningObjectives, { id: question.learningObjectiveId });
    if (learningObjective.competencyGroup !== competencyGroup) return null;
    return {
      ...question,
      competencyGroup: learningObjective.competencyGroup
    };
  }));

  return _.shuffle(withStudents(withCompetencyGroups));
}

function logLocalStorage(type, record) {
  const KEY = 'messagePopupResponses';
  const string = window.localStorage.getItem(KEY);
  const records = string ? JSON.parse(string) : [];
  const updatedRecords = records.concat(record);
  const updatedString = JSON.stringify(updatedRecords);
  window.localStorage.setItem(KEY, updatedString);
}

// For now, this fires and forgets and does not retry or
// notify the user on success or failure.
function logDatabase(type, record) {
  request
    .post(Routes.evidencePath({
      app: 'threeflows',
      type: type,
      version: 2
    }))
    .set('Content-Type', 'application/json')
    .send(record)
    .end();
}

/*
Shows the MessagePopup game
*/
export default React.createClass({
  displayName: 'MessagePopupPage',

  propTypes: {
    query: React.PropTypes.object.isRequired
  },

  getInitialState: function() {
    const isSolutionMode = _.has(this.props.query, 'solution');
    const helpType = isSolutionMode ? 'none' : 'feedback';
    const shouldShowStudentCards = isSolutionMode ? false : _.has(this.props.query, 'cards');
    
    return {
      shouldShowStudentCards,
      helpType,
      isSolutionMode,
      competencyGroupValue: ALL_COMPETENCY_GROUPS,
      questions: [],
      name: '',
      hasStarted: false,
      questionsAnswered: 0,
    };
  },

  onStartPressed() {
    const {competencyGroupValue, isSolutionMode} = this.state;
    const questions = (isSolutionMode || competencyGroupValue === ALL_COMPETENCY_GROUPS)
      ? _.shuffle(withStudents(allQuestions))
      : questionsForCompetencies(competencyGroupValue);

    this.setState({
      questions,
      hasStarted: true
    });
  },

  onCompetencyGroupChanged(e, competencyGroupValue) {
    this.setState({competencyGroupValue});
  },

  onLog(type, response:Response) {
    const logFn = (window.location.host.indexOf('localhost') === 0)
      ? logLocalStorage : logDatabase;
    logFn(type, {
      ...response,
      name: this.state.name,
      clientTimestampMs: new Date().getTime()
    });
  },
  
  onQuestionDone() {
    this.setState({ questionsAnswered: this.state.questionsAnswered + 1 });
  },

  onDonePressed() {
    Routes.navigate(Routes.Home);
  },

  onStudentCardsToggled() {
    this.setState({ shouldShowStudentCards: !this.state.shouldShowStudentCards });
  },
  
  onHelpToggled(event, value){
    this.setState({ helpType: value});
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
      helpType
    } = this.state;
    if (!hasStarted) return this.renderInstructions();
    if (questionsAnswered >= questions.length) return this.renderDone();

    const question = this.state.questions[questionsAnswered];
    return (
      <div style={styles.container}>
        <VelocityTransitionGroup enter={{animation: "slideDown"}} leave={{animation: "slideUp"}} runOnMount={true}>
          <PopupQuestion
            key={JSON.stringify(question)}
            question={question}
            shouldShowStudentCard={shouldShowStudentCards}
            helpType={helpType}
            limitMs={90000}
            onLog={this.onLog}
            onDone={this.onQuestionDone}/>
        </VelocityTransitionGroup>
      </div>
    );
  },

  renderDone() {
    return (
      <VelocityTransitionGroup enter={{animation: "slideDown"}} leave={{animation: "slideUp"}} runOnMount={true}>
        <div style={_.merge(_.clone(styles.container), styles.done)}>
          <div>You finished!</div>
          <RaisedButton
            onTouchTap={this.onDonePressed}
            style={styles.button}
            primary={true}
            label="Done" />
        </div>
      </VelocityTransitionGroup>
    );
  },

  renderInstructions() {
    return (
      <VelocityTransitionGroup enter={{animation: "slideDown"}} leave={{animation: "slideUp"}} runOnMount={true}>
        <div style={_.merge(_.clone(styles.container), styles.instructions)}>
          <div style={styles.title}>Message Popup</div>
          {this.state.isSolutionMode &&
            <p style={styles.paragraph}>Clear 15 minutes.  Your work is timed, so being able to focus is important.</p>
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
              primary={true}
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
        <div style={styles.optionTitle}>Scaffolding</div>
        <div style={_.merge({ padding: 20 }, styles.option)}>
          <Toggle
            label="With student cards"
            labelPosition="right"
            toggled={this.state.shouldShowStudentCards}
            onToggle={this.onStudentCardsToggled} />
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
  }
};