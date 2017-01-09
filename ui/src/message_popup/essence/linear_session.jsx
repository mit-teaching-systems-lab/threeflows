/* @flow weak */
import React from 'react';
import uuid from 'uuid';


// Manages the flow through a list of questions.
// Starts with `introEl`, then moves through showing `questionEl` for each
// question and collecting a response and logging it, then showing
// `summaryEl` when done.
//
// Also stamps every call through `onLogMessage` with a unique sessionId and
// client timestamp.
//
// TODO(kr) animations
// TODO(kr) timing question - has to be done by questionEl
export default React.createClass({
  displayName: 'LinearSession',

  propTypes: {
    questions: React.PropTypes.array.isRequired,
    questionEl: React.PropTypes.func.isRequired,
    summaryEl: React.PropTypes.func.isRequired,
    onLogMessage: React.PropTypes.func.isRequired,
  },

  getInitialState() {
    return {
      sessionId: uuid.v4(),
      responses: []
    };
  },

  onResetSession() {
    this.setState(this.getInitialState());
  },

  onResponseSubmitted(question, rawResponse) {
    const response = {
      question,
      sessionId: this.state.sessionId,
      clientTimestampMs: new Date().getTime(),
      ...rawResponse
    };

    this.props.onLogMessage('on_response_submitted', response);
    this.setState({
      responses: this.state.responses.concat(response)
    });
  },

  render() {
    const {questions} = this.props;
    const {responses} = this.state;
    if (responses.length >= questions.length) return this.props.summaryEl(questions, responses);

    const question = questions[responses.length];
    return this.props.questionEl(question, this.props.onLogMessage, this.onResponseSubmitted.bind(this, question));
  }
});

