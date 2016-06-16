// @flow
import _ from 'lodash';
import React from 'react';
import * as Routes from '../routes';
import * as PropTypes from '../prop_types.js';
import RaisedButton from 'material-ui/RaisedButton';
import PopupQuestion from './popup_question.jsx';
import TextField from 'material-ui/TextField';
import request from 'superagent';
import TextChangeEvent from '../types/dom_types.js';


const allQuestions = [
  { text: 'At the conclusion of your lesson plan for this challenge, you seed a group discussion by asking "What are you curious about related to photosynthesis?"  Hayin says "Why are plants green?"  What do you do?' },
  { text: `Imagine a new student, Sasha, joins your classroom during the lesson plan you developed for this challenge.  As part of helping her feel comfortable, you pull her aside and give her a quick overview of what's happening at the beginning of the class.  She interrupts and asks, "I do better with visuals, can you draw me a picture of photosynthesis?"  What could you quickly sketch to directly answer to her question?` },
  { text: 'In the context of the lesson plan you developed for this challenge, Floyd says "why are we even doing this?"  Respond in way that engages his natural curiosity and tendency towards asking questions' }
];

/*
[{"elapsedMs":1000,"responseText":"ok","name":"Kevin","timestamp":1466011218718}
 {"elapsedMs":6000,"responseText":"wat","name":"Kevin","timestamp":1466011224811}
 {"elapsedMs":2000,"responseText":"i dunno","name":"Kevin","timestamp":1466011227651}]
*/
function logLocalStorage(record) {
  const KEY = 'messagePopupResponses';
  const string = window.localStorage.getItem(KEY);
  const records = string ? JSON.parse(string) : [];
  const updatedRecords = records.concat(record);
  const updatedString = JSON.stringify(updatedRecords);
  window.localStorage.setItem(KEY, updatedString);
}

type Question = {text:string};
function logDatabase(record) {
  request
    .post(Routes.evidencePath({
      app: 'threeflows',
      type: 'message_popup',
      version: 2
    }))
    .set('Content-Type', 'application/json')
    .send(record)
    .end(function(err, res) { if (err) console.log({err}); });
}

/*
Shows the MessagePopup game
*/
export default React.createClass({
  displayName: 'MessagePopupPage',

  getInitialState: function() {
    return {
      name: '',
      hasStarted: false,
      totalQuestions: Math.min(10, allQuestions.length),
      questionsAnswered: 0,
      questions: _.shuffle(allQuestions)
    };
  },

  onStartPressed() {
    this.setState({ hasStarted: true });
  },

  onResponse({question, elapsedMs, responseText}:{question:Question,elapsedMs:number,responseText:string}) {
    const logFn = (window.location.host.indexOf('localhost') === 0)
      ? logLocalStorage : logDatabase;
    logFn({
      question,
      elapsedMs,
      responseText,
      name: this.state.name,
      clientTimestampMs: new Date().getTime()
    });
    this.setState({ questionsAnswered: this.state.questionsAnswered + 1 });
  },

  onDonePressed() {
    Routes.navigate(Routes.Home);
  },

  onTextChanged({target:{value}}:TextChangeEvent) {
    this.setState({ name: value });
  },

  render() {
    const {hasStarted, totalQuestions, questionsAnswered} = this.state;
    if (!hasStarted) return this.renderInstructions();
    if (questionsAnswered >= totalQuestions) return this.renderDone();

    const question = this.state.questions[questionsAnswered];
    return (
      <div style={styles.container}>
        <PopupQuestion
          key={JSON.stringify(question)}
          question={question}
          limitMs={60000}
          onResponse={this.onResponse} />
      </div>
    );
  },

  renderDone() {
    return (
      <div style={styles.container}>
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
      <div style={styles.container}>
        <div style={styles.title}>Message Popup</div>
        <p style={styles.paragraph}>Clear 10 minutes.  Your work is timed, so being able to focus is important.</p>
        <p style={styles.paragraph}>You may be asked to write, sketch or say your responses aloud.</p>
        <p style={styles.paragraph}>Each question is timed to simulate responding in the moment in the classroom.  You'll have 60 seconds to respond to each question.</p>
        <div style={{display: 'flex', justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center'}}>
          <TextField
            underlineShow={false}
            floatingLabelText="What's your name?"
            onChange={this.onTextChanged}
            multiLine={true}
            rows={2}/>
          <RaisedButton
            disabled={this.state.name === ''}
            onTouchTap={this.onStartPressed}
            style={styles.button}
            primary={true}
            label="Start" />
          </div>
      </div>
    );
  }
});

const styles = {
  container: {
    border: '1px solid #ccc',
    padding: 20,
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
  },
  allDone: {}
}