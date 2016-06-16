// @flow
import _ from 'lodash';
import React from 'react';
import * as Routes from '../routes';
import * as PropTypes from '../prop_types.js';
import RaisedButton from 'material-ui/RaisedButton';
import PopupQuestion from './popup_question.jsx';
import type {Response} from './popup_question.jsx';
import TextField from 'material-ui/TextField';
import request from 'superagent';
import TextChangeEvent from '../types/dom_types.js';


const allStudents = [
  { 
    id: 1,
    name: 'Kevin',
    grade: '7th grade',
    gender: 'male',
    race: 'Hispanic',
    behavior: 'Disruptive in class',
    ell: null,
    learningDisabilities: null,
    academicPerformance: 'Grades are C/D and borderline failing. Failed science the last two semesters. Reading and writing is at the 5th grade level. Arrives late to class most of the time.',
    interests: null,
    familyBackground: null,
    ses: null,
  },
  {
    id: 2,
    name: 'Floyd',
    grade: '7th grade',
    gender: 'male',
    race: 'Caucasian',
    behavior: 'Attendance issues',
    ell: null,
    learningDisabilities: 'ADHD',
    academicPerformance: null,
    interests: 'Wants to be a firefighter',
    familyBackground: 'Divorced parents, younger brother',
    ses: 'Free and reduced lunch'
  },
  {
    id: 3,
    name: 'Maia',
    grade: '7th grade',
    gender: 'female',
    race: 'Caucasian',
    behavior: 'Discipline report',
    ell: null,
    learningDisabilities: null,
    academicPerformance: null,
    interests: 'In theater and loves art',
    familyBackground: 'Single mom, two olders sisters',
    ses: null
  },
  { 
    id: 4, 
    name: 'Hayin',
    grade: '7th grade',
    gender: 'female',
    race: 'Korean',
    behavior: null,
    ell: null,
    learningDisabilities: null,
    academicPerformance: null,
    interests: 'Plays the flute, very involved in church, loves coding',
    familyBackground: '1st generation parents, twin sister',
    ses: 'Free and reduced lunch'
    
  },
  {
    id: 5,
    name: 'Mike',
    grade: '7th grade',
    gender: 'male',
    race: 'African American',
    behavior: null,
    ell: null,
    learningDisabilities: null,
    academicPerformance: null,
    interests: 'Plays in a band, sings in the school chorus',
    familyBackground: '1 older brother',
    ses: null,
  },
  {
    id: 6,
    name: 'Jasmine',
    grade: '7th grade',
    gender: 'female',
    race: 'African American',
    behavior: 'Quiet',
    ell: null,
    learningDisabilities: null,
    academicPerformance: null,
    interests: 'Plays tennis and soccer',
    familyBackground: 'Divorced parents, only child',
    ses: 'Free and reduced lunch'
  },
  {
    id: 7,
    name: 'Miquel',
    grade: '7th grade',
    gender: 'male',
    race: 'Latino',
    behavior: 'Attendance issues',
    ell: 'Yes, Spanish is native language',
    learningDisabilities: null,
    academicPerformance: null,
    interests: 'Has an after school job',
    familyBackground: '3 younger siblings',
    ses: 'Free and reduced lunch'
  },
  {
    id: 8,
    name: 'Ada',
    grade: '7th grade',
    gender: 'female',
    race: 'Haitian',
    behavior: null,
    ell: 'Yes, Haitian Creole is native language',
    learningDisabilities: 'Auditory disability',
    academicPerformance: null,
    interests: 'High-achiever, teacher\'s pet. Wants to be a doctor, is in yearbook',
    familyBackground: 'Aunt is guardian',
    ses: null
  },
  {
    id: 9,
    name: 'Steve',
    grade: '7th grade',
    gender: 'male',
    race: 'Caucasian',
    behavior: 'Often tired in class',
    ell: null,
    learningDisabilities: null,
    academicPerformance: null,
    interests: 'Prefers ELA over math and science. Plays drums at home with his family. Has an after school job',
    familyBackground: 'Younger sister',
    ses: null
  },
  { 
    id: 10, 
    name: 'Sasha',
    grade: '7th grade',
    gender: 'female',
    race: '?'
  }
];

const allQuestions = [
  { studentId: 4, text: 'At the conclusion of your lesson plan for this challenge, you seed a group discussion by asking "What are you curious about related to photosynthesis?"  Hayin says "Why are plants green?"  What do you do?' },
  { studentId: 10, text: `Imagine a new student, Sasha, joins your classroom during the lesson plan you developed for this challenge.  As part of helping her feel comfortable, you pull her aside and give her a quick overview of what's happening at the beginning of the class.  She interrupts and asks, "I do better with visuals, can you draw me a picture of photosynthesis?"  What could you quickly sketch to directly answer to her question?` },
  { studentId: 2, text: 'In the context of the lesson plan you developed for this challenge, Floyd says "why are we even doing this?"  Respond in way that engages his natural curiosity and tendency towards asking questions' }
];


function randomizedQuestionsWithStudents() {
  return _.shuffle(allQuestions).map((question) => {
    const student = _.find(allStudents, {id: question.studentId });
    return _.extend({student}, question);
  });
}


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
    const questions = randomizedQuestionsWithStudents();
    return {
      name: '',
      hasStarted: false,
      totalQuestions: Math.min(10, questions.length),
      questionsAnswered: 0,
      questions: questions
    };
  },

  onStartPressed() {
    this.setState({ hasStarted: true });
  },

  onResponse({question, elapsedMs, responseText}:Response) {
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
  },
  allDone: {}
}