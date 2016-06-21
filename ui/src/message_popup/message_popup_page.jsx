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
import { allStudents, allQuestions } from './data_lists.jsx';

function randomizedQuestionsWithStudents() {
  return _.shuffle(allQuestions).map((question) => {
    const student = _.find(allStudents, {id: question.studentId });
    return _.extend({student}, question);
  });
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
    .send(record);
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
    const questions = randomizedQuestionsWithStudents();
    const {query} = this.props;
    const help = query.solution ? 'none' : query.feedback ? 'feedback' : query.hints ? 'hints' : 'none';
    return {
      name: '',
      shouldShowStudentCards: !query.solution && query.cards || false,
      helpType: help,
      isSolutionMode: query.solution || false,
      hasStarted: false,
      totalQuestions: Math.min(10, questions.length),
      questionsAnswered: 0,
      questions: questions
    };
  },

  onStartPressed() {
    this.setState({ hasStarted: true });
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
    this.setState({ questionsAnswered: this.state.questionsAnswered + 1 })
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
      totalQuestions,
      questionsAnswered,
      shouldShowStudentCards,
      helpType
    } = this.state;
    if (!hasStarted) return this.renderInstructions();
    if (questionsAnswered >= totalQuestions) return this.renderDone();

    const question = this.state.questions[questionsAnswered];
    return (
      <div style={styles.container}>
        <PopupQuestion
          key={JSON.stringify(question)}
          question={question}
          shouldShowStudentCard={shouldShowStudentCards}
          helpType={helpType}
          limitMs={60000}
          onLog={this.onLog}
          onDone={this.onQuestionDone}/>
      </div>
    );
  },

  renderDone() {
    return (
      <div style={_.merge(styles.done, styles.container)}>
        <div>You finished!</div>
        <RaisedButton
          onTouchTap={this.onDonePressed}
          style={styles.button}
          primary={true}
          label="Done" />
      </div>
    );
  },

  renderInstructions() {
    return (
      <div style={_.merge(styles.instructions, styles.container)}>
        <div style={styles.title}>Message Popup</div>
        <p style={styles.paragraph}>Clear 10 minutes.  Your work is timed, so being able to focus is important.</p>
        <p style={styles.paragraph}>You may be asked to write, sketch or say your responses aloud.</p>
        <p style={styles.paragraph}>Each question is timed to simulate responding in the moment in the classroom.  You'll have 60 seconds to respond to each question.</p>
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
    );
  },

  renderScaffoldingOptions() {
    return (
      <div>
        <div style={{fontSize: 16, padding: 20}}>
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
    padding: 20
  },
  instructions: {
    padding: 20
  },
  container: {
    border: '1px solid #ccc',
    margin: 20,
    width: 400,
    fontSize: 18
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
  button: {
    marginTop: 20
  }
};