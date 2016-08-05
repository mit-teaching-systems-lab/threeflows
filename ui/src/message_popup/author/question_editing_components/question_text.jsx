/* @flow weak */
import React from 'react';

import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField';

export default React.createClass({
  displayName: "QuestionText",

  propTypes: {
    originalText: React.PropTypes.string,
    questionText: React.PropTypes.string.isRequired,
    onQuestionTextChange: React.PropTypes.func.isRequired
  },

  render(){
    const {originalText, questionText, onQuestionTextChange} = this.props;
    return (
      <Paper style={styles.container}>
        <div style={styles.title}>Question Text</div>
        <Divider />
        {originalText !== undefined && <div style={styles.originalQuestionTitle}>Original Question Text</div>}
        {originalText !== undefined && <div style={styles.originalQuestionText}>{originalText}</div>}
        <TextField 
          id='new-text'
          value={questionText}
          fullWidth={true}
          multiLine={true}
          onChange={onQuestionTextChange}
          floatingLabelText='Type out the question text here.'/>
      </Paper>
      );
  }
});

const styles = {
  container: {
    margin: 5,
    padding: 10,
    fontSize: 14
  },
  title: {
    marginBottom: 5,
    fontSize: 18,
    fontWeight: 'bold'
  },
  originalQuestionTitle: {
    marginTop: 10,
    fontSize: 14,
  },
  originalQuestionText: {
    padding: 10,
    paddingTop: 5
  },
};