/* @flow weak */
import React from 'react';
import ReactQuestion from './react_question.jsx';


// Render a plain text question, nothing else.
export default React.createClass({
  displayName: 'PlainTextQuestion',

  propTypes: {
    question: React.PropTypes.shape({
      text: React.PropTypes.string.isRequired
    }).isRequired
  },

  render() {
    const {question} = this.props;
    return <ReactQuestion el={<div>{question.text}</div>} />;
  }
});
