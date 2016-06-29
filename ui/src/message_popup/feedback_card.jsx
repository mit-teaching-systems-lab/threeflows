/* @flow weak */
import React from 'react';
import _ from 'lodash';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';
import TextChangeEvent from '../types/dom_types.js';

/*
This shows a feedback card after the user first presses save
*/
export default React.createClass({
  displayName: 'FeedbackCard',

  getInitialState: function(){
    var example = _.shuffle(this.props.examples)[0];
    const initialResponseText = this.props.initialResponseText;
    return ({
      finalResponseText: initialResponseText,
      example: example
    });
  },
  
  propTypes: {
    initialResponseText: React.PropTypes.string.isRequired,
    onRevised: React.PropTypes.func.isRequired,
    onPassed: React.PropTypes.func.isRequired,
    examples: React.PropTypes.array.isRequired
  },
  
  onTextChanged({target:{value}}:TextChangeEvent){
    this.setState({ finalResponseText: value });
  },
  
  onRevise(){
    this.props.onRevised(this.state.finalResponseText);
    
  },
  
  onPass(){
    this.props.onPassed();
  },

  render() {
    return (<div>
      <div style={{margin: 10}}><Divider /></div>
      <div style={styles.exampleBox}>
        <div style={styles.exampleTitle}>Good Example</div>
        <div style={styles.exampleText}>{this.state.example}</div>
      </div>  
      <div style={{margin: 10}}><Divider /></div>
        
      <div style={styles.textAreaContainer}>
        <TextField
          style={styles.textField}
          textareaStyle={styles.textareaInner}
          underlineShow={false}
          floatingLabelText='Revise your response'
          onChange={this.onTextChanged}
          defaultValue={this.props.initialResponseText}
          multiLine={true} 
          rows={2}/>
      </div>
      <div style={styles.buttonRow}>
        <RaisedButton
          onTouchTap={this.onRevise}
          style={styles.button}
          secondary={true}
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