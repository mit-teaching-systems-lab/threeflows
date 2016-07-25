/* @flow weak */
import React from 'react';
import SetIntervalMixin from '../helpers/set_interval_mixin.js';
import TextChangeEvent from '../types/dom_types.js';
import StudentCard from './student_card.jsx';
import HintCard from './hint_card.jsx';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';
import FeedbackCard from './feedback_card.jsx';
import SummaryCard from './summary_card.jsx';
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
    scaffolding: React.PropTypes.shape({
      helpType: React.PropTypes.string.isRequired,
      shouldShowStudentCard: React.PropTypes.bool.isRequired,
      shouldShowSummary: React.PropTypes.bool.isRequired
    }).isRequired,
    limitMs: React.PropTypes.number.isRequired,
    question: React.PropTypes.shape({
      text: React.PropTypes.string.isRequired,
      examples: React.PropTypes.array.isRequired,
      nonExamples: React.PropTypes.array.isRequired,
      students: React.PropTypes.array
    }).isRequired,
    onLog: React.PropTypes.func.isRequired,
    onDone: React.PropTypes.func.isRequired,
    isLastQuestion: React.PropTypes.bool.isRequired
  },


  getInitialState: function() {
    return {
      elapsedMs: 0,
      initialResponseText: '',
      finalResponseText: undefined,
      isRevising: false,
      isDoneRevising: false
    };
  },

  componentDidMount() {
    this.setInterval(this.updateTimer, ONE_SECOND);
  },

  updateTimer() {
    if(!this.state.isDoneRevising){
      this.setState({ elapsedMs: this.state.elapsedMs + ONE_SECOND });
    }
  },

  onTextChanged({target:{value}}:TextChangeEvent) {
    this.setState({ initialResponseText: value });
  },
  
  onDonePressed(text=undefined) {
    if(!this.props.scaffolding.shouldShowSummary){
      this.props.onDone(this.state.elapsedMs);
      return;
    }
    
    if(this.state.isDoneRevising){
      this.props.onDone(this.state.elapsedMs);
      return;
    }
    
    if(!this.state.isDoneRevising){
      var finalText = (text === undefined ? this.state.initialResponseText : text);
      this.setState({finalResponseText: finalText});
      this.setState({isDoneRevising: true});
      return;
    }
  },

  onSavePressed() {
    this.logResponse();
    const {scaffolding} = this.props;
    const {examples} = this.props.question;
    if(scaffolding.helpType === 'feedback' && examples.length > 0) {
      this.setState({ isRevising: true });
    } else{
      this.onDonePressed();
    }
  },
  
  onRevised(text) {
    this.logRevision(text);
    this.onDonePressed(text);
  },
  onPassed() {
    this.logRevisionDeclined();
    this.onDonePressed();
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
    const {question, scaffolding} = this.props;
    const {finalResponseText} = params;
    const response:Response = {
      question,
      shouldShowStudentCard: scaffolding.shouldShowStudentCard,
      helpType: scaffolding.helpType,
      elapsedMs,
      initialResponseText,
      finalResponseText
    };
    this.props.onLog(type, response);
  },

  render() {
    const {isDoneRevising} = this.state;
    const {scaffolding} = this.props;  
    return (
      <div>
        <VelocityTransitionGroup leave={{animation: "slideUp"}} runOnMount={true}>
          {!scaffolding.shouldShowSummary && this.renderQuestion()}
          {!isDoneRevising && scaffolding.shouldShowSummary && this.renderQuestion()}
        </VelocityTransitionGroup>
        <VelocityTransitionGroup enter={{animation: "slideDown"}} runOnMount={true}>
          {isDoneRevising && scaffolding.shouldShowSummary && this.renderSummary()}
        </VelocityTransitionGroup>
      </div>
    );
  },
  
  renderQuestion(){
    const {elapsedMs} = this.state;
    const {scaffolding} = this.props;
    const {text, students, examples, nonExamples} = this.props.question;
    const seconds = Math.round(elapsedMs / 1000);
    const student = students[0];
    
    return (
      <div>
        <div style={styles.question}>{text}</div>
        {scaffolding.shouldShowStudentCard && student &&
          <StudentCard useCardStyles={true} student={student} />}
        {scaffolding.helpType === 'hints' && 
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
            secondary={true}
            label={scaffolding.helpType === 'feedback' ? 'Save Response' : 'Respond'}
            disabled={this.state.isRevising || this.state.initialResponseText === ''}/>
          {seconds > 0 &&
            <div style={styles.ticker}>{seconds}s</div>
          }
        </div>
        <VelocityTransitionGroup enter={{animation: "slideDown"}} runOnMount={true}>
          {this.state.isRevising &&
            <div style={styles.feedbackCard}>
              <FeedbackCard
                initialResponseText={this.state.initialResponseText}
                onRevised={this.onRevised}
                onPassed={this.onPassed}
                examples={examples}/>  
            </div>}
        </VelocityTransitionGroup>
        <Snackbar
          open={seconds >= (this.props.limitMs/1000)}
          message="Remember, these are supposed to be quick responses."
          onRequestClose={function(reason){
            //This empty function is meant to cancel out the closing of the toast without having to use
            //an extremely large autoHideDuration
          }}
          />
      </div>
    );
  },
  
  renderSummary(){
    return (
      <SummaryCard 
        onDone={this.onDonePressed} 
        question={this.props.question} 
        response={this.props.scaffolding.helpType==='feedback' ? this.state.finalResponseText : this.state.initialResponseText} 
        elapsedSeconds={Math.round(this.state.elapsedMs / 1000)} 
        buttonLabel={this.props.isLastQuestion ? "Finish" : "Next Question"}/>
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