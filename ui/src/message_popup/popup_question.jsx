/* @flow weak */
import React from 'react';
import _ from 'lodash';
import SetIntervalMixin from '../helpers/set_interval_mixin.js';
import StudentCard from './student_card.jsx';
import HintCard from './renderers/hint_card.jsx';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';
import FeedbackCard from './feedback_card.jsx';
import SummaryCard from './summary_card.jsx';
import VelocityTransitionGroup from "velocity-react/velocity-transition-group";
const ONE_SECOND = 1000;


const ScenarioRenderer = React.createClass({
  displayName: 'ScenarioRenderer',

  propTypes: {
    question: React.PropTypes.object.isRequired
  },

  render() {
    const {question} = this.props;
    return <div style={styles.question}>{question.text}</div>;
  }
});


const PromptsRenderer = React.createClass({
  displayName: 'PromptsRenderer',

  propTypes: {
    scaffolding: React.PropTypes.object.isRequired,
    question: React.PropTypes.object.isRequired,
    student: React.PropTypes.object
  },

  render() {
    const {scaffolding, student, question} = this.props;
    const {examples, nonExamples} = question;

    return (
      <div>
        {scaffolding.shouldShowStudentCard && student &&
          <StudentCard useCardStyles={true} student={student} />}
        {scaffolding.helpType === 'hints' && 
          <div style={styles.hintCard}>
            <HintCard examples={examples} nonExamples={nonExamples} />
          </div>}
      </div>
    );
  }
});

const ResponseRenderer = React.createClass({
  displayName: 'ResponseRenderer',

  mixins: [SetIntervalMixin],

  propTypes: {
    question: React.PropTypes.object.isRequired,
    scaffolding: React.PropTypes.object.isRequired,
    limitMs: React.PropTypes.number.isRequired,
    onLogMessage: React.PropTypes.func.isRequired,
    onResponseSubmitted: React.PropTypes.func.isRequired
  },

  getInitialState() {
    return {
      isRevising: false,
      isDoneRevising: false,
      didRevise: false,
      initialResponseText: '',
      finalResponseText: '',
      elapsedMs: 0
    };
  },

  componentDidMount() {
    this.setInterval(this.onTimerTick, ONE_SECOND);
  },
  
  logMessage(type) {
    const {initialResponseText, finalResponseText, elapsedMs} = this.state;    
    this.props.onLogMessage(type, {
      initialResponseText,
      finalResponseText,
      elapsedMs
    });
  },

  submitResponse() {
    const {
      initialResponseText,
      finalResponseText,
      elapsedMs,
      didRevise
    } = this.state;
    this.props.onResponseSubmitted({
      initialResponseText,
      finalResponseText,
      elapsedMs,
      didRevise
    });
  },

  onTimerTick() {
    if (!this.state.isDoneRevising) {
      this.setState({ elapsedMs: this.state.elapsedMs + ONE_SECOND });
    }
  },

  onTextChanged(e) {
    const initialResponseText = e.target.value;
    this.setState({
      initialResponseText,
      finalResponseText: initialResponseText
    });
  },

  // State transitions:
  //   initial -> revising
  //   initial -> done
  //   revising -> done
  onRespondClicked() {
    const {isDoneRevising} = this.state;    
    const {scaffolding} = this.props;
    const {examples} = this.props.question;

    // Capture initial response, transition to revising.
    if (scaffolding.helpType === 'feedback' && examples.length > 0 && !isDoneRevising) {
      this.logMessage('message_popup_response');
      this.setState({ isRevising: true });
      return;
    }
  },

  onRevised(finalResponseText) {
    const {initialResponseText} = this.state;
    const didRevise = !_.isEqual(finalResponseText, initialResponseText);
    this.setState({finalResponseText, didRevise}, () => {
      this.logMessage('message_popup_revision');
      this.submitResponse();
    });
  },

  onPassed() {
    this.logMessage('message_popup_revision_declined');
    this.submitResponse();
  },

  render() {
    const {scaffolding, limitMs} = this.props;
    const {examples} = this.props.question;
    const {isRevising, initialResponseText, elapsedMs} = this.state;
    const seconds = Math.round(elapsedMs / 1000);

    return (
      <div>
        <div style={styles.textAreaContainer}>
          <TextField
            style={styles.textField}
            textareaStyle={styles.textareaInner}
            underlineShow={false}
            floatingLabelText='Speak directly to the student'
            onChange={this.onTextChanged}
            multiLine={true}
            disabled={isRevising} 
            rows={2}/>
        </div>
        <div style={styles.buttonRow}>
          <RaisedButton
            onTouchTap={this.onRespondClicked}
            style={styles.button}
            secondary={true}
            label={scaffolding.helpType === 'feedback' ? 'Save Response' : 'Respond'}
            disabled={isRevising || initialResponseText === ''}/>
          {seconds > 0 && <div style= {styles.ticker}>{seconds}s</div>
          }
        </div>
        <VelocityTransitionGroup enter={{animation: "slideDown"}} runOnMount={true}>
          {this.state.isRevising &&
            <div style={styles.feedbackCard}>
              <FeedbackCard
                initialResponseText={initialResponseText}
                onRevised={this.onRevised}
                onPassed={this.onPassed}
                examples={examples}/>  
            </div>}
        </VelocityTransitionGroup>
        <Snackbar
          open={seconds >= (limitMs/1000)}
          message="Remember, these are supposed to be quick responses."
          onRequestClose={this.onRequestClose}
          />
      </div>
    );
  }
});

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
      students: React.PropTypes.array.isRequired
    }).isRequired,
    onLog: React.PropTypes.func.isRequired,
    onDone: React.PropTypes.func.isRequired,
    isLastQuestion: React.PropTypes.bool.isRequired
  },


  getInitialState: function() {
    return {
      response: null
    };
  },
  
  logData(type, params = {}) {
    const {question, scaffolding} = this.props;
    const {finalResponseText, initialResponseText, elapsedMs} = params;
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
  
  onRequestClose() {
    //This empty function is meant to cancel out the closing of the toast without having to use
    //an extremely large autoHideDuration
  },

  onResponseSubmitted(response) {
    console.log('onResponseSubmitted', response);
    this.setState({response});
  },

  onDone(finalResponseText) {
    console.log('finalResponseText', finalResponseText);
    this.props.onDone(this.state.response.elapsedMs * 1000);
  },

  render() {
    const {response} = this.state;
    const {scaffolding} = this.props;  

    const shouldRenderQuestion = (
      (!scaffolding.shouldShowSummary) ||
      (!response && scaffolding.shouldShowSummary)
    );

    return (
      <div>
        <VelocityTransitionGroup leave={{animation: "slideUp"}} runOnMount={true}>
          {shouldRenderQuestion && this.renderQuestion()}
        </VelocityTransitionGroup>
        <VelocityTransitionGroup enter={{animation: "slideDown"}} runOnMount={true}>
          {response && scaffolding.shouldShowSummary && this.renderSummary()}
        </VelocityTransitionGroup>
      </div>
    );
  },
  
  renderQuestion(){
    const {scaffolding, limitMs, question} = this.props;
    const student = _.first(question.students || []);
    
    return (
      <div>
        <ScenarioRenderer
          question={this.props.question} />
        <PromptsRenderer
          scaffolding={scaffolding}
          student={student}
          question={this.props.question}
        />
        <ResponseRenderer
          scaffolding={scaffolding}
          question={question}
          limitMs={limitMs}
          onResponseSubmitted={this.onResponseSubmitted}
          onLogMessage={this.logData}
        />
      </div>
    );
  },
  
  renderSummary() {
    const {elapsedMs, finalResponseText, initialResponseText} = this.state.response;
    const {question, scaffolding, isLastQuestion} = this.props;

    return (
      <SummaryCard 
        onDone={this.onDone} 
        question={question} 
        response={scaffolding.helpType ==='feedback' ? finalResponseText : initialResponseText} 
        elapsedSeconds={Math.round(elapsedMs / 1000)} 
        buttonLabel={isLastQuestion ? "Finish" : "Next Question"}/>
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