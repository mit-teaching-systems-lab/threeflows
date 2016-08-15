/* @flow weak */
import React from 'react';


// Supports rendering a scenario as text
export default React.createClass({
  displayName: 'ScenarioRenderer',

  propTypes: {
    question: React.PropTypes.object.isRequired
  },

  render() {
    const {question} = this.props;
    return <div style={styles.question}>{question.text}</div>;
  }
});

const styles = {
  question: {
    whiteSpace: 'pre-wrap',
    padding: 20
  }
};
