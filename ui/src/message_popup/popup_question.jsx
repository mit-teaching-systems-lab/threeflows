/* @flow weak */
import React from 'react';
import _ from 'lodash';
import VelocityTransitionGroup from "velocity-react/velocity-transition-group";
import SetIntervalMixin from '../helpers/set_interval_mixin.js';

import type {QuestionT} from './question.js';
import SummaryCard from './summary_card.jsx';
import ScenarioRenderer from './renderers/scenario_renderer.jsx';
import PromptsRenderer from './renderers/prompts_renderer.jsx';
import RevisingTextResponse from './renderers/revising_text_response.jsx';
import AudioResponse from './renderers/audio_response.jsx';


// Type definitions around responses
export type ResponseT = RevisingTextResponseT | AudioResponseT;
export type RevisingTextResponseT = {
  question:QuestionT,
  elapsedMs:number,
  shouldShowStudentCard:boolean,
  helpType:string,
  initialResponseText:string,
  finalResponseText:string
};
export type AudioResponseT = {
  question:QuestionT,
  elapsedMs:number,
  shouldShowStudentCard:boolean,
  helpType:string,
  audioUrl:string
};
const ONE_SECOND = 1000;


/*
Defines the layout and flow through a single question, using renderer components
for the different pieces of the question (eg., scenario, response).  This lets it
delegate to different representation formats and questions.
*/
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
      text: React.PropTypes.string,
      youTubeId: React.PropTypes.string,
      examples: React.PropTypes.array.isRequired,
      nonExamples: React.PropTypes.array.isRequired,
      students: React.PropTypes.array.isRequired
    }).isRequired,
    onLog: React.PropTypes.func.isRequired,
    onDone: React.PropTypes.func.isRequired,
    isLastQuestion: React.PropTypes.bool.isRequired,
    drawResponseMode: React.PropTypes.func // for testing
  },

  getInitialState: function() {
    const {question, scaffolding} = this.props;
    const responseMode = (this.props.drawResponseMode)
      ? this.props.drawResponseMode(question, scaffolding)
      : this.drawResponseMode(question, scaffolding);

    return {
      responseMode,
      elapsedMs: 0,
      allowResponding: false,
      response: null
    };
  },

  // This is not a pure function, it's not idempotent and can include
  // randomness.  It shouldn't be called within render methods.
  drawResponseMode(question, scaffolding) {
    return Math.random() > 0.5 ? 'audio' : 'text';
  },

  // Allow pieces of the UI to log data for particular event types, along
  // with an opaque set of params.
  logData(type, params = {}) {
    const {question, scaffolding} = this.props;
    const {elapsedMs} = this.state;
    const response:Response = {
      question,
      elapsedMs,
      shouldShowStudentCard: scaffolding.shouldShowStudentCard,
      helpType: scaffolding.helpType,
      ...params
    };
    this.props.onLog(type, response);
  },
  
  onScenarioDone() {
    this.setState({ allowResponding: true });
    this.setInterval(this.onTimerTick, ONE_SECOND);
  },
  
  onTimerTick() {
    this.setState({ elapsedMs: this.state.elapsedMs + ONE_SECOND });
  },

  onResponseSubmitted(response:ResponseT) {
    this.clearIntervals();
    this.setState({response}, () => {
      if (!this.props.scaffolding.shouldShowSummary) return this.onDone();
      if (this.state.responseMode === 'audio') return this.onDone();
    });
  },

  onDone() {
    this.props.onDone(this.state.elapsedMs);
  },

  render() {
    const hasResponded = (this.state.response);
    const {scaffolding} = this.props;  
    const shouldRenderQuestion = (
      (!scaffolding.shouldShowSummary) ||
      (!hasResponded && scaffolding.shouldShowSummary)
    );

    return (
      <div>
        <VelocityTransitionGroup leave={{animation: "slideUp"}} runOnMount={true}>
          {shouldRenderQuestion && this.renderQuestion()}
        </VelocityTransitionGroup>
        <VelocityTransitionGroup enter={{animation: "slideDown"}} runOnMount={true}>
          {hasResponded && scaffolding.shouldShowSummary && this.renderSummary()}
        </VelocityTransitionGroup>
      </div>
    );
  },
  
  renderQuestion(){
    const {scaffolding, question} = this.props;
    const {allowResponding} = this.state;
    const student = _.first(question.students || []);

    return ( 
      <div>
        <ScenarioRenderer
          question={question}
          onScenarioDone={this.onScenarioDone}
        />
        <PromptsRenderer
          scaffolding={scaffolding}
          student={student}
          question={question}
        />
        {allowResponding && this.renderResponse()}
      </div>
    );
  },

  renderResponse() {
    const {responseMode, elapsedMs} = this.state;
    const {scaffolding, limitMs, question} = this.props;
    const responseProps = {
      scaffolding,
      question,
      limitMs,
      elapsedMs,
      onResponseSubmitted: this.onResponseSubmitted,
      onLogMessage: this.logData
    };
    if (responseMode === 'text') return <RevisingTextResponse {...responseProps} />;
    if (responseMode === 'audio') return <AudioResponse {...responseProps} />;
  },
  
  renderSummary() {
    const {elapsedMs} = this.state;
    const {finalResponseText, initialResponseText} = this.state.response;
    const {question, scaffolding, isLastQuestion} = this.props;
    const responseText = (scaffolding.helpType ==='feedback')
      ? finalResponseText
      : initialResponseText;

    return (
      <SummaryCard 
        onDone={this.onDone} 
        question={question} 
        responseText={responseText} 
        elapsedSeconds={Math.round(elapsedMs / 1000)} 
        buttonLabel={isLastQuestion ? "Finish" : "Next Question"}
      />
    );
  }
});