/* @flow weak */
import React from 'react';
import _ from 'lodash';
import StudentCard from './student_card.jsx';
import HintCard from './renderers/hint_card.jsx';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';
import FeedbackCard from './feedback_card.jsx';
import SummaryCard from './summary_card.jsx';
import VelocityTransitionGroup from "velocity-react/velocity-transition-group";
import RevisingResponseRenderer from './renderers/revising_response_renderer.jsx';



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
        <RevisingResponseRenderer
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
  // prompt
  hintCard: {
    marginTop: 5,
    padding: 10,
    paddingBottom: 0
  },

  // scenario
  question: {
    whiteSpace: 'pre-wrap',
    padding: 20
  }
};
