/* @flow weak */
import PropTypes from 'prop-types';

import React from 'react';

import createReactClass from 'create-react-class';

import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

import SessionFrame from '../linear_session/session_frame.jsx';
import * as Api from '../../helpers/api.js';


const STATUS = {
  READY: 'ready',
  SENDING: 'sending',
  SENT: 'sent',
  ERROR: 'error'
};


// The landing page for a learner to login and review their
// responses.  They'll get an email with a one-time token valid for a fixed
// time window, and need to re-authenticate each time.
export default createReactClass({
  displayName: 'ReviewLoginPage',

  propTypes: {
    reviewKey: PropTypes.string.isRequired
  },

  getInitialState() {
    return {
      emailAddress: '',
      accessCode: '',
      lastStatus: STATUS.READY,
      token: null,
      error: null
    };
  },

  onResetSession() {
    this.setState(this.getInitialState());
  },

  onEmailAddressChanged(e) {
    this.setState({ emailAddress: e.target.value });
  },

  onAccessCodeChanged(e) {
    this.setState({ accessCode: e.target.value });
  },

  onSubmit(e) {
    e.preventDefault();
    this.onLoginTapped();
  },

  onLoginTapped() {
    const {emailAddress, accessCode} = this.state;
    const {reviewKey} = this.props;
    /* eslint-disable camelcase */
    const formData = {
      review_key: reviewKey,
      email_address: emailAddress,
      access_code: accessCode
    };

    /* eslint-enable camelcase */
    this.setState({ lastStatus: STATUS.SENDING });
    Api.createReview(formData)
      .then(this.onEmailSent, this.onError);
  },

  onEmailSent(token) {
    this.setState({ lastStatus: STATUS.SENT });
  },

  onError(err) {
    this.setState({
      lastStatus: STATUS.ERROR,
      error: err
    });
  },

  render() {
    return (
      <SessionFrame>
        {this.renderContent()}
      </SessionFrame>
    );
  },

  renderContent() {
    const {emailAddress, accessCode, lastStatus, error} = this.state;
    const {reviewKey} = this.props;
    if (lastStatus === STATUS.ERROR || error) return this.renderError(error);
    if (lastStatus === STATUS.SENDING) return this.renderSending();
    if (lastStatus === STATUS.SENT) return this.renderCheckEmail();

    return (
      <div style={styles.container}>
        <div style={styles.instructions}>To review your work, enter your email address and access code.</div>
        <form onSubmit={this.onSubmit}>
          <TextField
            name="email_address"
            style={styles.textField}
            floatingLabelText="Email address"
            floatingLabelFixed={true}
            hintText="kevin@school.edu"
            value={emailAddress}
            onChange={this.onEmailAddressChanged}
            autoFocus={true}
          />
          <TextField
            name="access_code"
            floatingLabelText="Access code"
            floatingLabelFixed={true}
            hintText="xyz"
            value={accessCode}
            onChange={this.onAccessCodeChanged}
          />
          <div style={styles.buttonRow}>
            <RaisedButton
              disabled={emailAddress.length == 0 || reviewKey.length == 0 || accessCode.length == 0}
              onTouchTap={this.onLoginTapped}
              type="submit"
              style={styles.button}
              secondary={true}
              label="Send login email" />
          </div>    
        </form>
      </div>
    );
  },

  renderSending() {
    return (
      <div style={styles.container}>
        <p>Confirming...</p>
        <p>Checking your access code and sending you an email with a login link...</p>
      </div>
    );
  },

  renderCheckEmail() {
    return (
      <div style={styles.container}>
        <p>Great!</p>
        <p>Check your email for a secure login link, it's heading your way right now.</p>
      </div>
    );
  },

  renderError(error) {
    return (
      <div style={styles.container}>
        <p>We're sorry, we couldn't find that access code.</p>
        <p>Check with your facilitator, and if you're still stuck email krob@mit.edu or open an issue on <a href="https://github.com/mit-teaching-systems-lab/threeflows/issues/new" target="_blank">GitHub</a>.</p>
        <RaisedButton
          onTouchTap={this.onResetSession}
          style={styles.button}
          secondary={true}
          label="Retry" />
      </div>
    );
  }
});

const styles = {
  container: {
    margin: 20
  },
  instructions: {
    marginBottom: 20
  },
  textField: {
    width: '100%'
  },
  buttonRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end'
  },
  button: {
    marginTop: 20
  }
};