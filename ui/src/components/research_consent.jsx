/* @flow weak */
import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

import * as Routes from '../routes.js';


const STATUS = {
  EXPLAINING: 'EXPLAINING',
  CONTINUED: 'CONTINUED',
  DECLINED: 'DECLINED'
};


// Show information and ask for consent
export default React.createClass({
  displayName: 'ResearchConsent',

  propTypes: {
    onLogMessage: React.PropTypes.func.isRequired
  },

  getInitialState() {
    return {
      status: STATUS.EXPLAINING
    };
  },

  onContinue() {
    this.props.onLogMessage('research_consent_has_continued');
    this.setState({ status: STATUS.CONTINUED });
  },

  onDecline() {
    this.props.onLogMessage('research_consent_has_declined');
    this.setState({ status: STATUS.DECLINED });
  },

  render() {
    const {status} = this.state;

    return (
      <div>
        {status === STATUS.EXPLAINING && this.renderAsk()}
        {status === STATUS.CONTINUED && this.renderForm()}
        {status === STATUS.DECLINED && this.renderThanks()}
      </div>
    );
  },

  renderAsk() {
    return (
      <div className="explain-consent" style={styles.container}>
        <div style={styles.instructions}>
          <b>Consent for research</b>
          <p>Educators and researchers in the <a target="_blank" href="http://tsl.mit.edu/">MIT Teaching Systems Lab</a> would like to use your responses here to improve this experience and learn how to better prepare teachers.</p>
          <p>All data you enter is protected by <a target="_blank" href={Routes.readMoreAboutConsent()}>MIT's IRB review procedures</a>.  None of your personal information will be shared.</p>
        </div>
        <div style={styles.buttonRow}>
          <RaisedButton
            onTouchTap={this.onContinue}
            secondary={true}
            label="Show consent form" />
          <RaisedButton
            onTouchTap={this.onDecline}
            label="Decline" />
        </div>
      </div>
    );
  },

  renderForm() {
    return <iframe
      src="https://docs.google.com/forms/d/e/1FAIpQLSdsSuLuAEAvBhxtRDuHXDrP1jj_tbeYLd9u3_aBGbLjO3BNRg/viewform?embedded=true"
      width="100%"
      height={600}
      frameBorder={0}
      marginHeight={0}
      marginWidth={0}>Loading...</iframe>;
  },

  renderThanks() {
    return <div style={styles.container}>Thanks!  Your responses will not be used for any research.</div>;
  }
});

const styles = {
  container: {
    padding: 20
  },
  instructions: {
    paddingBottom: 20,
  },
  buttonRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end'
  }
};