/* @flow weak */
import React from 'react';

import * as Colors from 'material-ui/styles/colors';


/*
Pure UI component showing an evaluation for a question.
*/
export default React.createClass({
  displayName: 'MessageEvaluationCard',

  propTypes: {
    evaluation: React.PropTypes.object.isRequired
  },

  render() {
    const {evaluation} = this.props;
    const scoreColor = (evaluation.json.scoreValue === 0)
      ? Colors.orange500
      : Colors.green500;

    return (
      <div style={{backgroundColor: scoreColor, padding: 10}}>
        <div>Scored by: {evaluation.json.email}</div>
        <div>Score: {evaluation.json.scoreValue}</div>
        <div>Comment: {evaluation.json.scoreComment}</div>
      </div>
    );
  }
});
