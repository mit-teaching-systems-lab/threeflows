/* @flow weak */
import PropTypes from 'prop-types';

import React from 'react';

import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField';

export default React.createClass({
  displayName: 'Examples',

  propTypes: {
    type: PropTypes.string.isRequired,
    examplesText: PropTypes.string.isRequired,
    onExamplesChange: PropTypes.func.isRequired
  },

  onChange(e) {
    this.props.onExamplesChange(e.target.value);
  },

  render(){
    const {type, examplesText} = this.props;
    return (
      <Paper style={styles.container}>
        <div style={styles.title}>{type} Examples</div>
        <Divider />
        <TextField
          id="good-examples"
          style={styles.examplesTextArea}
          floatingLabelText="Separate examples with an empty line"
          floatingLabelFixed={true}
          textareaStyle={styles.examplesTextAreaInner}
          multiLine={true}
          value={examplesText}
          underlineShow={false}
          onChange={this.onChange} />
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
  examplesTextArea: {
    width: '100%'
  },
  examplesTextAreaInner: {
    border: '1px solid #eee',
    rows: 2,
    padding: 5,
    fontSize: 14 
  },
};