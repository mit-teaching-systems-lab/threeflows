/* @flow weak */
import React from 'react';
import _ from 'lodash';
import Velocity from 'velocity-react/lib/velocity-animate-shim';
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
    drawResponseMode: React.PropTypes.func.isRequired
  },

  getInitialState: function() {
    const {question, scaffolding} = this.props;
    const responseMode = this.props.drawResponseMode(question, scaffolding);

    return {
      responseMode,
      elapsedMs: 0,
      allowResponding: false,
      response: null
    };
  },

  // If transitioning between the scenario and being able to respond for the
  // first time, animate the scrolling to bring the response UI into view.
  componentDidUpdate(prevProps, prevState) {
    if (!prevState.allowResponding && this.state.allowResponding && this.responseContainerEl) {
      Velocity(this.responseContainerEl, 'scroll');
    }
  },

  responseContainerEl: null,

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

  // For now, this does not log to the server.  Individual response components
  // are responsible for handling logging about their particular
  // response types.
  onResponseSubmitted(response:ResponseT) {
    this.clearIntervals();

    if (!this.props.scaffolding.shouldShowSummary) return this.onDone();
    if (this.state.responseMode === 'audio') return this.onDone();
    this.setState({response});
  },

  onDone() {
    this.props.onDone(this.state.elapsedMs);
  },

  render() {
    const hasResponded = (this.state.response);
    const {responseMode} = this.state;
    const {scaffolding} = this.props;  
    const shouldRenderQuestion = (
      (!scaffolding.shouldShowSummary) ||
      (!hasResponded && scaffolding.shouldShowSummary)
    );
    const shouldRenderSummary = (responseMode === 'text' && hasResponded && scaffolding.shouldShowSummary);

    return (
      <div>
        <VelocityTransitionGroup leave={{animation: "slideUp"}} runOnMount={true}>
          {shouldRenderQuestion && this.renderQuestion()}
        </VelocityTransitionGroup>
        <VelocityTransitionGroup enter={{animation: "slideDown"}} runOnMount={true}>
          {shouldRenderSummary && this.renderSummaryForTextResponse()}
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
        {allowResponding &&
          <div ref={el => this.responseContainerEl = el}>{this.renderResponse()}</div>
        }
      </div>
    );
  },

  // Each response is responsible for logging interaction data
  // to the server.
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
  
  // This is just for text responses, since we can summarize them in a way
  // we can't summarize audio responses.  This could be moved into
  // `RevisingTextResponse`.
  renderSummaryForTextResponse() {
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