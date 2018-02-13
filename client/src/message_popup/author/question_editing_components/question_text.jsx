/* @flow weak */
import PropTypes from 'prop-types';

import React from 'react';

import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField';

export default class extends React.Component {
  props: {
    originalText?: string,
    questionText: string,
    onQuestionTextChange: Function,
  };

  static displayName = 'QuestionText';

  static propTypes = {
    originalText: PropTypes.string,
    questionText: PropTypes.string.isRequired,
    onQuestionTextChange: PropTypes.func.isRequired
  };

  onTextChange = (e) => {
    this.props.onQuestionTextChange(e.target.value);
  };

  render() {
    const {originalText, questionText} = this.props;
    return (
      <Paper style={styles.container}>
        <div style={styles.title}>Question Text</div>
        <Divider />
        {originalText !== undefined && <div style={styles.originalQuestionTitle}>Original Question Text</div>}
        {originalText !== undefined && <div className="originalQuestionText" style={styles.originalQuestionText}>{originalText}</div>}
        <TextField 
          id='new-text'
          value={questionText}
          fullWidth={true}
          multiLine={true}
          onChange={this.onTextChange}
          floatingLabelText='Type out the question text here.'/>
      </Paper>
    );
  }
}

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