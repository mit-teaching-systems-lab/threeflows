// @flow
import React from 'react';
import SetIntervalMixin from '../helpers/set_interval_mixin.js';
import TextChangeEvent from '../types/dom_types.js';
import StudentCard from './student_card.jsx';
import HintCard from './hint_card.jsx';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FeedbackCard from './feedback_card.jsx';
import VelocityTransitionGroup from "velocity-react/velocity-transition-group";
const ONE_SECOND = 1000;

/*
Shows a single question.
*/
type Question = {text:string};
export type Response = {
  question:Question,
  elapsedMs:number,
  shouldShowStudentCard:boolean,
  helpType:string,
  initialResponseText:string,
  finalResponseText:string
};
export default React.createClass({
  displayName: 'PopupQuestion',
  mixins: [SetIntervalMixin],

  propTypes: {
    shouldShowStudentCard: React.PropTypes.bool.isRequired,
    helpType: React.PropTypes.string.isRequired,
    limitMs: React.PropTypes.number.isRequired,
    question: React.PropTypes.shape({
      text: React.PropTypes.string.isRequired,
      examples: React.PropTypes.array.isRequired,
      nonExamples: React.PropTypes.array.isRequired,
      student: React.PropTypes.object.isRequired
    }).isRequired,
    onLog: React.PropTypes.func.isRequired
  },


  getInitialState: function() {
    return {
      elapsedMs: 0,
      initialResponseText: '',
      isRevising: false
    };
  },

  componentDidMount() {
    this.setInterval(this.updateTimer, ONE_SECOND);
  },

  updateTimer() {
    this.setState({ elapsedMs: this.state.elapsedMs + ONE_SECOND });
  },

  onTextChanged({target:{value}}:TextChangeEvent) {
    this.setState({ initialResponseText: value });
  },

  onSavePressed() {
    const {helpType} = this.props;
    this.logResponse();
    if(helpType === 'feedback'){
      this.setState({isRevising:true});
    }else{
      this.props.onDone();
    }
  },
  
  onDonePressed(revised, text) {
    if(revised){
      this.logRevision(text);
    }else{
      this.logRevisionDeclined();
    }
    this.props.onDone();
  },
  
  logResponse() {
    this.logData('message_popup_response');
  },
  
  logRevision(finalText) {
    this.logData('message_popup_revision', {finalResponseText: finalText});
  },
  
  logRevisionDeclined(){
    this.logData('message_popup_revision_declined');
  },
  
  logData(type, params = {}) {
    const {elapsedMs, initialResponseText} = this.state;
    const {question, shouldShowStudentCard, helpType} = this.props;
    const {finalResponseText} = params;
    const response:Response = {
      question,
      shouldShowStudentCard,
      helpType,
      elapsedMs,
      initialResponseText,
      finalResponseText
    };
    this.props.onLog(type, response);
  },

  render() {
    const {elapsedMs} = this.state;
    const {limitMs, shouldShowStudentCard, helpType} = this.props;
    const {text, student, examples, nonExamples} = this.props.question;

    return (
      <div>
        <div style={styles.question}>{text}</div>
        {shouldShowStudentCard &&
          <div style={styles.studentCard}>
            <StudentCard student={student} />
          </div>}
        {helpType === 'hints' && 
          <div style={styles.hintCard}>
            <HintCard examples={examples} nonExamples={nonExamples} />
          </div>}
        <div style={styles.textAreaContainer}>
          <TextField
            style={styles.textField}
            textareaStyle={styles.textareaInner}
            underlineShow={false}
            floatingLabelText='Speak directly to the student'
            onChange={this.onTextChanged}
            multiLine={true}
            disabled={this.state.isRevising} 
            rows={2}/>
        </div>
        <div style={styles.buttonRow}>
          <RaisedButton
            onTouchTap={this.onSavePressed}
            style={styles.button}
            primary={true}
            label={this.props.helpType === 'feedback' ? 'Save' : 'Send'}
            disabled={this.state.isRevising}/>
          <div style={styles.ticker}>0:{Math.round((limitMs - elapsedMs) / 1000)}s</div>
        </div>
        <VelocityTransitionGroup enter={{animation: "slideDown"}} runOnMount={true}>
          {this.state.isRevising &&
            <div style={styles.feedbackCard}>
              <FeedbackCard initialResponseText={this.state.initialResponseText} onDonePressed={this.onDonePressed} examples={examples}/>  
            </div>}
        </VelocityTransitionGroup>
      </div>
    );
  }
});


const styles = {
  feedbackCard: {
    marginTop: 5,
    marginBottom: 10
  },
  hintCard: {
    marginTop: 5,
    padding: 10,
    paddingBottom: 0
  },
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
    marginTop: 10,
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