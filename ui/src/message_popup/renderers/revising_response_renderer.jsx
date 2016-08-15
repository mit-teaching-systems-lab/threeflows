/* @flow weak */
import React from 'react';
import _ from 'lodash';
import VelocityTransitionGroup from "velocity-react/velocity-transition-group";

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';

import SetIntervalMixin from '../../helpers/set_interval_mixin.js';
import FeedbackCard from '../feedback_card.jsx';


const ONE_SECOND = 1000;
export default React.createClass({
  displayName: 'RevisingResponseRenderer',

  mixins: [SetIntervalMixin],

  propTypes: {
    question: React.PropTypes.object.isRequired,
    scaffolding: React.PropTypes.object.isRequired,
    limitMs: React.PropTypes.number.isRequired,
    onLogMessage: React.PropTypes.func.isRequired,
    onResponseSubmitted: React.PropTypes.func.isRequired
  },

  getInitialState() {
    return {
      isRevising: false,
      isDoneRevising: false,
      didRevise: false,
      initialResponseText: '',
      finalResponseText: '',
      elapsedMs: 0
    };
  },

  componentDidMount() {
    this.setInterval(this.onTimerTick, ONE_SECOND);
  },
  
  logMessage(type) {
    const {initialResponseText, finalResponseText, elapsedMs} = this.state;    
    this.props.onLogMessage(type, {
      initialResponseText,
      finalResponseText,
      elapsedMs
    });
  },

  submitResponse() {
    const {
      initialResponseText,
      finalResponseText,
      elapsedMs,
      didRevise
    } = this.state;
    this.props.onResponseSubmitted({
      initialResponseText,
      finalResponseText,
      elapsedMs,
      didRevise
    });
  },

  onTimerTick() {
    if (!this.state.isDoneRevising) {
      this.setState({ elapsedMs: this.state.elapsedMs + ONE_SECOND });
    }
  },

  onTextChanged(e) {
    const initialResponseText = e.target.value;
    this.setState({
      initialResponseText,
      finalResponseText: initialResponseText
    });
  },

  // This transitions from one of:
  //   initial -> revising
  //   initial -> done
  onRespondClicked() {
    const {isDoneRevising} = this.state;    
    const {scaffolding} = this.props;
    const {examples} = this.props.question;

    // Capture initial response, transition to revising.
    if (scaffolding.helpType === 'feedback' && examples.length > 0 && !isDoneRevising) {
      this.logMessage('message_popup_response');
      this.setState({ isRevising: true });
      return;
    }

    this.submitResponse();
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

  render() {
    const {scaffolding, limitMs} = this.props;
    const {examples} = this.props.question;
    const {isRevising, initialResponseText, elapsedMs} = this.state;
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