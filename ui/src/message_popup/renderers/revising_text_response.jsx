/* @flow weak */
import React from 'react';
import _ from 'lodash';
import VelocityTransitionGroup from "velocity-react/velocity-transition-group";

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';

import FeedbackCard from '../feedback_card.jsx';

// This response supports responding with text, and revising the text.
export default React.createClass({
  displayName: 'RevisingTextResponse',

  propTypes: {
    question: React.PropTypes.object.isRequired,
    scaffolding: React.PropTypes.object.isRequired,
    limitMs: React.PropTypes.number.isRequired,
    elapsedMs: React.PropTypes.number.isRequired,
    onLogMessage: React.PropTypes.func.isRequired,
    onResponseSubmitted: React.PropTypes.func.isRequired
  },

  getInitialState() {
    return {
      isRevising: false,
      isDoneRevising: false,
      didRevise: false,
      initialResponseText: '',
      finalResponseText: ''
    };
  },

  logMessage(type) {
    const {initialResponseText, finalResponseText} = this.state;    
    this.props.onLogMessage(type, {
      initialResponseText,
      finalResponseText
    });
  },

  submitResponse() {
    const {initialResponseText, finalResponseText, didRevise} = this.state;
    this.props.onResponseSubmitted({
      initialResponseText,
      finalResponseText,
      didRevise
    });
  },

  onTextChanged(e) {
    const initialResponseText = e.target.value;
    this.setState({
      initialResponseText,
      finalResponseText: initialResponseText
    });
  },

  // This transitions to either: (revising mode) or (done).
  onRespondClicked() {
    const {isDoneRevising} = this.state;    
    const {scaffolding} = this.props;
    const {examples} = this.props.question;

    // Capture response either way
    this.logMessage('message_popup_response');

    // Transition to revising or to being done
    if (scaffolding.helpType === 'feedback' && examples.length > 0 && !isDoneRevising) {
      this.setState({ isRevising: true });
    } else {
      this.submitResponse();
    }
  },

  onRevised(finalResponseText) {
    const {initialResponseText} = this.state;
    const didRevise = !_.isEqual(finalResponseText, initialResponseText);
    this.setState({finalResponseText, didRevise}, () => {
      this.logMessage('message_popup_revision');
      this.submitResponse();
    });
  },

  onPassed() {
    this.logMessage('message_popup_revision_declined');
    this.submitResponse();
  },

  onRequestClose() {
    //This empty function is meant to cancel out the closing of the toast without having to use
    //an extremely large autoHideDuration
  },

  render() {
    const {scaffolding, limitMs, elapsedMs} = this.props;
    const {examples} = this.props.question;
    const {isRevising, initialResponseText} = this.state;
    const seconds = Math.round(elapsedMs / 1000);

    return (
      <div>
        <div style={styles.textAreaContainer}>
          <TextField
            style={styles.textField}
            textareaStyle={styles.textareaInner}
            underlineShow={false}
            floatingLabelText='Speak directly to the student'
            onChange={this.onTextChanged}
            multiLine={true}
            disabled={isRevising} 
            rows={2}/>
        </div>
        <div style={styles.buttonRow}>
          <RaisedButton
            onTouchTap={this.onRespondClicked}
            style={styles.button}
            secondary={true}
            label={scaffolding.helpType === 'feedback' ? 'Save Response' : 'Respond'}
            disabled={isRevising || initialResponseText === ''}/>
          {seconds > 0 && <div style= {styles.ticker}>{seconds}s</div>
          }
        </div>
        <VelocityTransitionGroup enter={{animation: "slideDown"}} runOnMount={true}>
          {this.state.isRevising &&
            <div style={styles.feedbackCard}>
              <FeedbackCard
                initialResponseText={initialResponseText}
                onRevised={this.onRevised}
                onPassed={this.onPassed}
                examples={examples}/>  
            </div>}
        </VelocityTransitionGroup>
        <Snackbar
          open={seconds >= (limitMs/1000)}
          message="Remember, these are supposed to be quick responses."
          onRequestClose={this.onRequestClose}
          />
      </div>
    );
  }
});

const styles = {
  feedbackCard: {
    marginTop: 5,
    marginBottom: 10
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
  },
  ticker: {
    display: 'inline-block',
    marginLeft: 15
  }
};