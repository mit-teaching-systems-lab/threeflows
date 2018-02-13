/* @flow weak */
import PropTypes from 'prop-types';

import React from 'react';
import VelocityTransitionGroup from "velocity-react/velocity-transition-group";
import 'velocity-animate/velocity.ui';


// Manages the flow through a list of questions.
// Moves through showing `questionEl` for each question and 
// collecting a response and logging it, then showing
// `summaryEl` when done.
export default class extends React.Component {
  props: {
    questions: Array<Object>,
    questionEl: Function,
    summaryEl: Function,
    onLogMessage: Function,
    getNextQuestion?: Function,
  };

  static displayName = 'LinearSession';

  static propTypes = {
    questions: PropTypes.array.isRequired,
    questionEl: PropTypes.func.isRequired,
    summaryEl: PropTypes.func.isRequired,
    onLogMessage: PropTypes.func.isRequired,
    getNextQuestion: PropTypes.func
  };

  state = {
    responses: []
  };

  defaultGetNextQuestion = (questions, responses) => {
    if (responses.length >= questions.length) {
      return null;
    }
    return questions[responses.length];
  };

  mergedResponse = (rawResponse, question) => {
    return {...rawResponse, question};
  };

  // Mixes in question to payload
  onLogMessageWithQuestion = (question, type, rawResponse) => {
    const mergedResponse = this.mergedResponse(rawResponse, question);
    this.props.onLogMessage(type, mergedResponse);
  };

  // Logs and transitions
  onResponseSubmitted = (question, rawResponse) => {
    this.onLogMessageWithQuestion(question, 'on_response_submitted', rawResponse);
    const mergedResponse = this.mergedResponse(rawResponse, question);
    this.setState({
      responses: this.state.responses.concat(mergedResponse)
    });
  };

  // Animation wrapper
  render() {
    return (
      <VelocityTransitionGroup
        leave={{animation: "slideUp", duration: 200}}
        enter={{animation: "slideDown", duration: 200}}
        runOnMount={true}
      >
        {this.renderContent()}
      </VelocityTransitionGroup>
    );
  }

  renderContent = () => {
    const {questions} = this.props;
    const {responses} = this.state;

    const question = (this.props.getNextQuestion)
      ? this.props.getNextQuestion(questions, responses)
      : this.defaultGetNextQuestion(questions, responses);

    if (!question) {
      return this.props.summaryEl(questions, responses);
    }

    return (
      <div key={question.id}>
        {this.props.questionEl(question, this.onLogMessageWithQuestion.bind(this, question), this.onResponseSubmitted.bind(this, question), {responses})}
      </div>
    );
  };
}

