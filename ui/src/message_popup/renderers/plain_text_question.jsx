/* @flow weak */
import React from 'react';


// Render a plain text question, nothing else.
export default React.createClass({
  displayName: 'PlainTextQuestion',

  propTypes: {
    question: React.PropTypes.object.isRequired,
    italic: React.PropTypes.bool
  },

  render() {
    const {question, italic} = this.props;
    const mergedStyles = {
      ...styles.textQuestion,
      ...(italic) ? { fontStyle: 'italic' } : {}
    };
    return <div style={mergedStyles}>{question.text}</div>;
  }
});

const styles = {
  textQuestion: {
    whiteSpace: 'pre-wrap',
    fontSize: 16,
    lineHeight: 1.2,
    padding: 20
  }
};
