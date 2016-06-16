// @flow
import React from 'react';
import SetIntervalMixin from '../helpers/set_interval_mixin.js';
import * as PropTypes from '../prop_types.js';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import TextChangeEvent from '../types/dom_types.js';
import StudentCard from './student_card.jsx';
const ONE_SECOND = 1000;

/*
Shows a single question.
*/
type Question = {text:string};
export type Response = {question:Question,elapsedMs:number,responseText:string};
export default React.createClass({
  displayName: 'PopupQuestion',
  mixins: [SetIntervalMixin],

  propTypes: {
    limitMs: React.PropTypes.number.isRequired,
    question: React.PropTypes.shape({
      text: React.PropTypes.string.isRequired,
      student: React.PropTypes.shape({
        name: React.PropTypes.string.isRequired
      }).isRequired
    }).isRequired,
    onResponse: React.PropTypes.func.isRequired
  },


  getInitialState: function() {
    return {
      elapsedMs: 0,
      responseText: ''
    };
  },

  componentDidMount() {
    this.setInterval(this.updateTimer, ONE_SECOND);
  },

  updateTimer() {
    this.setState({ elapsedMs: this.state.elapsedMs + ONE_SECOND });
  },

  onTextChanged({target:{value}}:TextChangeEvent) {
    this.setState({ responseText: value })
  },

  onSendPressed() {
    const {elapsedMs, responseText} = this.state;
    const {question} = this.props;
    const response:Response = {question, elapsedMs, responseText};
    this.props.onResponse(response);
  },

  render() {
    const {elapsedMs} = this.state;
    const {limitMs} = this.props;
    const {text, student} = this.props.question;

    return (
      <div>
        <div style={styles.question}>{text}</div>
        <div style={styles.studentCard}><StudentCard {...student} /></div>
        <div style={styles.textAreaContainer}>
          <TextField
            style={styles.textField}
            textareaStyle={styles.textareaInner}
            underlineShow={false}
            floatingLabelText='Speak directly to the student'
            onChange={this.onTextChanged}
            multiLine={true}
            rows={2}/>
        </div>
        <div style={styles.buttonRow}>
          <RaisedButton
            onTouchTap={this.onSendPressed}
            style={styles.button}
            primary={true}
            label="Send" />
          <div style={styles.ticker}>0:{Math.round((limitMs - elapsedMs) / 1000)}s</div>
        </div>
      </div>
    );
  },

  renderStudentCard(student) {
    const {
      name,
      grade,
      gender,
      race,
      behavior,
      learningDisabilities,
      interests,
      familyBackground,
      ses
    } = student;

    return (
      <div>
        <div>{name}</div>
        <div>{`${grade} ${gender}, ${race}`}</div>
        {behavior && <div>{behavior}</div>}
        {learningDisabilities && <div>{learningDisabilities}</div>}
        {interests && <div>{interests}</div>}
        {familyBackground && <div>{familyBackground}</div>}
        {ses && <div>{ses}</div>}
      </div>
    );
  }
});


const styles = {
  studentCard: {
    backgroundColor: '#F1C889',
    marginTop: 5,
    padding: 10
  },
  question: {
    whiteSpace: 'pre-wrap',
    padding: 20
  },
  textAreaContainer: {
    margin: 20,
    marginBottom: 10
  },
  textField: {
    width: '100%'
  },
  textareaInner: {
    border: '1px solid #eee',
    marginBottom: 0
  },
  buttonRow: {
    margin: 20,
    marginTop: 10
  },
  button: {
    display: 'inline-block',
  },
  ticker: {
    display: 'inline-block',
    marginLeft: 15
  }
};