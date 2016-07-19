/* @flow weak */
import React from 'react';
import _ from 'lodash';

import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import {StudentMessage, UserMessage, InfoMessage} from './message_components.jsx';

export const TextBody = React.createClass({
  displayName: 'TextBody',

  propTypes: {
    question: React.PropTypes.object.isRequired,
    messages: React.PropTypes.array.isRequired,
    onOpenStudentDialog: React.PropTypes.func.isRequired,
    onOpenInfoDialog: React.PropTypes.func.isRequired
  },
  
  render(){
    const {messages} = this.props;
    return (
      <div>
        {_.map(messages, (message) => { 
          if(message.type === 'user'){
            return (<UserMessage text={message.text}  key={message.key} />);
          }else if(message.type === 'student'){
            return (<StudentMessage text={message.text} question={this.props.question} onOpenStudentDialog={this.props.onOpenStudentDialog} key={message.key} />);
          }else{
            return (<InfoMessage text={message.text} onOpenInfoDialog={this.props.onOpenInfoDialog} key={message.key} />);
          }
        })}
      </div>
    );
  }
});

export const TextFooter = React.createClass({
  displayName: 'TextFooter',
  
  propTypes: {
    onQuestionDone: React.PropTypes.func.isRequired,
    setInitialResponse: React.PropTypes.func.isRequired,
    setRevisedResponse: React.PropTypes.func.isRequired,
    setPassedResponse: React.PropTypes.func.isRequired,
    log: React.PropTypes.object.isRequired,
    isReadyToMoveOn: React.PropTypes.func.isRequired,
    helpType: React.PropTypes.string.isRequired,
    elapsedMs: React.PropTypes.number.isRequired,
    nextButtonLabel: React.PropTypes.string.isRequired,
    nextExample: React.PropTypes.func.isRequired,
    showExample: React.PropTypes.func.isRequired
  },
  
  getInitialState(){
    return ({
      text: undefined,
      initialMessageSent: false,
    });
  },
  
  onTextChange(event, value){
    this.setState({text: value});
  },
  
  onSendMessage(){
    this.props.setInitialResponse(this.state.text);
    this.setState({initialMessageSent: true});
    this.props.log.logResponse();
  },
  
  onRevisionSendMessage(){
    this.props.setRevisedResponse(this.state.text);
    this.props.log.logRevision();
  },
  
  onPassSendMessage(){
    this.props.setPassedResponse('');
    this.props.log.logRevisionDeclined();
  },
  
  onNextQuestion(){
    this.props.onQuestionDone();
  },
  
  render(){
    const mainButtonLabel = this.props.isReadyToMoveOn() ? this.props.nextButtonLabel : this.props.helpType !== 'feedback' ? 'Send' : this.state.initialMessageSent ? 'Revise Response' : 'Save Response';
    return (
      <div>
        <Divider />
        <div style={styles.responseTextBox}>
          <TextField 
            id="Response"
            multiLine={true}
            underlineShow={false}
            rows={2}
            rowsMax={2}
            onChange={this.onTextChange}
            disabled={this.props.isReadyToMoveOn()}
            value={this.state.text === undefined ? '' : this.state.text}
            hintText="Type something you would say"
            style={styles.responseTextField}
            textareaStyle={styles.responseTextAreaInner}
            />
        </div>
        <div style={styles.responseButtonRow}>  
          <RaisedButton
            style={styles.responseButton}
            label={mainButtonLabel}
            primary={this.props.isReadyToMoveOn()}
            secondary={!this.props.isReadyToMoveOn()}
            onTouchTap={this.props.isReadyToMoveOn() ? this.onNextQuestion : this.state.initialMessageSent ?  this.onRevisionSendMessage : this.onSendMessage}
            disabled={(this.state.text === undefined || this.state.text === '') && !this.props.isReadyToMoveOn()}
            />
          {this.props.helpType === 'feedback' && this.state.initialMessageSent && !this.props.isReadyToMoveOn() &&
          <RaisedButton
            style={styles.responseButton}
            label="Pass"
            onTouchTap={this.onPassSendMessage}
            />
          }
          {this.props.helpType === 'hints' && !this.props.isReadyToMoveOn() &&
          <RaisedButton
            style={styles.responseButton}
            label="Show Example"
            disabled={this.props.nextExample(false) === null}
            onTouchTap={this.props.showExample}
            />
          }
          <div style={styles.responseTimer}>
            {this.props.elapsedMs/1000 + 's'}
          </div>
        </div>
      </div>
    );
  }
});

const styles = {
  responseTextBox: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  responseTextField: {
    width: '100%',
    paddingLeft: 20,
    paddingRight: 20,
  },
  responseTextAreaInner: {
    border: '1px solid #eee',
    marginBottom: 0
  },
  responseButtonRow: {
    marginTop: 20,
    marginLeft: 15,
    marginRight: 15,
  },
  responseButton: {
    marginLeft: 5,
    marginRight: 5
  },
  responseTimer: {
    position: 'fixed',
    right: 20,
    bottom: 20,
    fontSize: 18
  }
};