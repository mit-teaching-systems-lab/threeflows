/* @flow weak */
/* eslint-disable react/prop-types */
// not sure why, but eslint is failing propTypes on this file
import PropTypes from 'prop-types';

import React from 'react';
import _ from 'lodash';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';


/*
This shows a feedback card after the user first presses save
*/
export default React.createClass({
  displayName: 'FeedbackCard',

  propTypes: {
    initialResponseText: PropTypes.string.isRequired,
    onRevised: PropTypes.func.isRequired,
    onPassed: PropTypes.func.isRequired,
    examples: PropTypes.array.isRequired
  },

  getInitialState() {
    var example = _.shuffle(this.props.examples)[0];
    const initialResponseText = this.props.initialResponseText;
    return ({
      finalResponseText: initialResponseText,
      example: example
    });
  },
  
  onTextChanged({target:{value}}:{target: {value: string}}){
    this.setState({ finalResponseText: value });
  },
  
  onRevise(){
    this.props.onRevised(this.state.finalResponseText);
  },
  
  onPass(){
    this.props.onPassed();
  },

  render() {
    const {initialResponseText} = this.props;
    const {finalResponseText, example} = this.state;

    return (<div>
      <div style={{margin: 10}}><Divider /></div>
      <div style={styles.exampleBox}>
        <div style={styles.exampleTitle}>Good Example</div>
        <div style={styles.exampleText}>{example}</div>
      </div>  
      <div style={{margin: 10}}><Divider /></div>
        
      <div style={styles.textAreaContainer}>
        <TextField
          style={styles.textField}
          textareaStyle={styles.textareaInner}
          underlineShow={false}
          floatingLabelText='Revise your response'
          onChange={this.onTextChanged}
          defaultValue={initialResponseText}
          multiLine={true} 
          rows={2}/>
      </div>
      <div style={styles.buttonRow}>
        <RaisedButton
          onTouchTap={this.onRevise}
          style={styles.button}
          secondary={true}
          disabled={_.isEqual(initialResponseText, finalResponseText)}
          label='Revise Response'/>
        <RaisedButton
          onTouchTap={this.onPass}
          style={styles.button}
          label='Pass'/>
      </div>
    </div>);
  }
});

const styles = {
  exampleBox: {
    display: 'flex',
    flexDirection: 'column',
    margin: 20
  },
  exampleTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 6,
    marginBottom: 15
  },
  exampleText: {
    marginBottom: 10,
    fontSize: 14
  },
  textAreaContainer: {
    marginTop: 10,
    margin: 20,
    marginBottom: 10
  },
  textField: {
    width: '100%'
  },
  textareaInner: {
    border: '1px solid #eee',
    marginBottom: 0
  },
  buttonRow: {
    margin: 20,
    marginTop: 10
  },
  button: {
    display: 'inline-block',
    marginRight: 10
  },
};