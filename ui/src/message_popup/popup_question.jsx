/* @flow weak */
import React from 'react';
import _ from 'lodash';
import VelocityTransitionGroup from "velocity-react/velocity-transition-group";

import SummaryCard from './summary_card.jsx';
import ScenarioRenderer from './renderers/scenario_renderer.jsx';
import PromptsRenderer from './renderers/prompts_renderer.jsx';
import ResponseRenderer from './renderers/response_renderer.jsx';


/*
Defines the layout and flow through a single question, using renderer components
for the different pieces of the question (eg., scenario, response).  This lets it
delegate to different representation formats and questions.
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
  
  // Allow pieces of the UI to log data for particular event types, along
  // with an opaque set of params.
  logData(type, params = {}) {
    const {question, scaffolding} = this.props;
    const response:Response = {
      question,
      shouldShowStudentCard: scaffolding.shouldShowStudentCard,
      helpType: scaffolding.helpType,
      ...params
    };
    this.props.onLog(type, response);
  },
  
  onResponseSubmitted(response) {
    this.setState({response});
  },

  onDone() {
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