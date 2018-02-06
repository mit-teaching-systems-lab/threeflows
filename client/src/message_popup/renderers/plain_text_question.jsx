/* @flow weak */
import React from 'react';
import PropTypes from 'prop-types';
import createReactClass from 'create-react-class';
import ReactQuestion from './react_question.jsx';


// Render a plain text question, nothing else.
export default createReactClass({
  displayName: 'PlainTextQuestion',

  propTypes: {
    question: PropTypes.shape({
      text: PropTypes.string.isRequired
    }).isRequired
  },

  render() {
    const {question} = this.props;
    return <ReactQuestion el={<div>{question.text}</div>} />;
  }
});
