/* @flow weak */
import React from 'react';
import VelocityTransitionGroup from "velocity-react/velocity-transition-group";
import 'velocity-animate/velocity.ui';


// Manages the flow through a list of questions.
// Starts with `introEl`, then moves through showing `questionEl` for each
// question and collecting a response and logging it, then showing
// `summaryEl` when done.
export default React.createClass({
  displayName: 'LinearSession',

  propTypes: {
    questions: React.PropTypes.array.isRequired,
    questionEl: React.PropTypes.func,
    nextQuestionEl: React.PropTypes.func,
    summaryEl: React.PropTypes.func.isRequired,
    onLogMessage: React.PropTypes.func.isRequired
  },

  getInitialState() {
    return {
      responses: []
    };
  },

  onResetSession() {
    this.setState(this.getInitialState());
  },

  // Mixes in question to payload
  onLogMessageWithQuestion(question, type, rawResponse) {
    this.props.onLogMessage(type, {...rawResponse, question});
  },

  // Logs and transitions
  onResponseSubmitted(question, response) {
    this.onLogMessageWithQuestion(question, 'on_response_submitted', response);
    this.setState({
      responses: this.state.responses.concat(response)
    });
  },

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
  },

  renderContent() {
    if(this.props.nextQuestionEl !== undefined) {
      return this.props.nextQuestionEl(this.props.questions, 
      this.state.responses, 
      this.onLogMessageWithQuestion, 
      this.onResponseSubmitted);
    }

    const {questions} = this.props;
    const {responses} = this.state;
    if (responses.length >= questions.length) return this.props.summaryEl(questions, responses);

    const question = questions[responses.length];
    return (
      <div key={question.id}>
        {this.props.questionEl(question, this.onLogMessageWithQuestion.bind(this, question), this.onResponseSubmitted.bind(this, question))}
      </div>
    );
  }
});

