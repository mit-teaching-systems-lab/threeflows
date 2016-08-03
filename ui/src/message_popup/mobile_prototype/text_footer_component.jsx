import React from 'react';

import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

export default React.createClass({
  displayName: 'TextFooter',
  
  propTypes: {
    onQuestionDone: React.PropTypes.func.isRequired,
    setInitialResponse: React.PropTypes.func.isRequired,
    setRevisedResponse: React.PropTypes.func.isRequired,
    setPassedResponse: React.PropTypes.func.isRequired,
    log: React.PropTypes.object.isRequired,
    isReadyToMoveOn: React.PropTypes.bool.isRequired,
    helpType: React.PropTypes.string.isRequired,
    elapsedMs: React.PropTypes.number.isRequired,
    nextButtonLabel: React.PropTypes.string.isRequired,
    nextExample: React.PropTypes.func.isRequired,
    onShowExampleClicked: React.PropTypes.func.isRequired,
    mainStudent: React.PropTypes.object
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
    const mainButtonLabel = this.props.isReadyToMoveOn ? this.props.nextButtonLabel : this.props.helpType !== 'feedback' ? 'Respond to ' + (this.props.mainStudent !== undefined ? this.props.mainStudent.name : 'Class') : this.state.initialMessageSent ? 'Revise Response' : 'Save Response';
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
            disabled={this.props.isReadyToMoveOn}
            value={this.state.text === undefined ? '' : this.state.text}
            hintText="Type something you would say"
            style={styles.responseTextField}
            textareaStyle={styles.responseTextAreaInner}
            />
        </div>
        <div style={styles.responseButtonRow}>  
          <div>
            <RaisedButton
              style={styles.responseButton}
              label={mainButtonLabel}
              primary={this.props.isReadyToMoveOn}
              secondary={!this.props.isReadyToMoveOn}
              onTouchTap={this.props.isReadyToMoveOn ? this.onNextQuestion : this.state.initialMessageSent ?  this.onRevisionSendMessage : this.onSendMessage}
              disabled={(this.state.text === undefined || this.state.text === '') && !this.props.isReadyToMoveOn}
              />
            {this.props.helpType === 'feedback' && this.state.initialMessageSent && !this.props.isReadyToMoveOn &&
            <RaisedButton
              style={styles.responseButton}
              label="Pass"
              onTouchTap={this.onPassSendMessage}
              />
            }
            {this.props.helpType === 'hints' && !this.props.isReadyToMoveOn &&
            <RaisedButton
              style={styles.responseButton}
              label="Show Example"
              disabled={this.props.nextExample(false) === null}
              onTouchTap={this.props.onShowExampleClicked}
              />
            }
          </div>
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
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    marginLeft: 15,
    marginRight: 20,
  },
  responseButtons: {
    display: 'flex',
  },
  responseButton: {
    marginLeft: 5,
    marginRight: 5
  },
  responseTimer: {
    fontSize: 18
  }
};