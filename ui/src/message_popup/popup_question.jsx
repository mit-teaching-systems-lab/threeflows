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
export type Response = {
  question:Question,
  elapsedMs:number,
  responseText:string,
  shouldShowStudentCard:boolean,
  allowedToToggleHint:boolean
};
export default React.createClass({
  displayName: 'PopupQuestion',
  mixins: [SetIntervalMixin],

  propTypes: {
    shouldShowStudentCard: React.PropTypes.bool.isRequired,
    allowedToToggleHint: React.PropTypes.bool.isRequired,
    limitMs: React.PropTypes.number.isRequired,
    question: React.PropTypes.shape({
      text: React.PropTypes.string.isRequired,
      student: React.PropTypes.object.isRequired
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
    const {question, shouldShowStudentCard, allowedToToggleHint} = this.props;
    const response:Response = {
      question,
      shouldShowStudentCard,
      allowedToToggleHint,
      elapsedMs,
      responseText
    }
    this.props.onResponse(response);
  },

  render() {
    const {elapsedMs} = this.state;
    const {limitMs, shouldShowStudentCard} = this.props;
    const {text, student} = this.props.question;

    return (
      <div>
        <div style={styles.question}>{text}</div>
        {shouldShowStudentCard &&
          <div style={styles.studentCard}>
            <StudentCard student={student} />
          </div>}
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