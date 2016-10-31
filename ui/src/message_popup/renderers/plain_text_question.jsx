/* @flow weak */
import React from 'react';


// Render a plain text question, nothing else.
export default React.createClass({
  displayName: 'PlainTextQuestion',

  propTypes: {
    question: React.PropTypes.object.isRequired,
  },

  render() {
    const {question} = this.props;

    return <div style={styles.textQuestion}>{question.text}</div>;
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
