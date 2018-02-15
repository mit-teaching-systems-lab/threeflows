/* @flow weak */
import PropTypes from 'prop-types';

import React from 'react';

import createReactClass from 'create-react-class';

import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';

import SessionFrame from '../linear_session/session_frame.jsx';
import * as Api from '../../helpers/api.js';
import ReviewStep from './review_step.jsx';


const STATUS = {
  READY: 'ready',
  LOADING: 'loading',
  VIEWING: 'viewing',
  ERROR: 'error'
};

// Takes a token from an email.
// Asks for confirmation of email address and requests data from the server.
// Then shows that data to the user.
export default createReactClass({
  displayName: 'ReviewPage',

  propTypes: {
    token: PropTypes.string.isRequired,
  },

  getInitialState() {
    return {
      emailAddress: '',
      lastStatus: STATUS.READY,
      responseBody: null,
      error: null,
      showDebugging: false
    };
  },

  // Remove key in querystring from URL bar
  componentDidMount() {
    window.history.replaceState({}, window.document.title, window.location.pathname);
  },

  onEmailAddressChanged(e) {
    this.setState({ emailAddress: e.target.value });
  },

  onSubmit(e) {
    e.preventDefault();
    this.onConfirmTapped();
  },

  onConfirmTapped() {
    const {emailAddress} = this.state;
    const {token} = this.props;
    const query = {
      token: token,
      emailAddress: emailAddress
    };

    this.setState({ lastStatus: STATUS.LOADING });
    Api.getReview(query)
      .then(this.onReceivedReview, this.onError);
  },

  onReceivedReview(response) {
    this.setState({
      lastStatus: STATUS.VIEWING,
      responseBody: response.body
    });
  },

  onError(err) {
    console.log('onError', err); //eslint-disable-line no-console
    this.setState({
      lastStatus: STATUS.ERROR,
      error: err
    });
  },

  onDebugTapped() {
    console.log('onDebugTapped', this.state); // eslint-disable-line no-console
    this.setState({ showDebugging: true });
  },

  render() {
    return (
      <SessionFrame>
        {this.renderContent()}
      </SessionFrame>
    );
  },

  renderContent() {
    const {emailAddress, lastStatus, error} = this.state;
    if (lastStatus === STATUS.ERROR || error) return this.renderError(error);
    if (lastStatus === STATUS.VIEWING) return this.renderViewing();

    return (
      <div style={styles.container}>
        <div>Please confirm your email address one last time.</div>
        <form onSubmit={this.onSubmit}>
          <TextField
            name="email_address"
            style={styles.textField}
            floatingLabelText="Confirm your email address"
            floatingLabelFixed={true}
            hintText="kevin@school.edu"
            value={emailAddress}
            onChange={this.onEmailAddressChanged}
            autoFocus={true}
          />
          <div style={styles.buttonRow}>
            <RaisedButton
              disabled={emailAddress.length === 0}
              onTouchTap={this.onConfirmTapped}
              type="submit"
              style={styles.button}
              secondary={true}
              label="Confirm" />
          </div>    
        </form>
      </div>
    );
  },

  renderViewing() {
    const {responseBody, showDebugging} = this.state;
    return (
      <div style={styles.container}>
        <div>Here's a summary of your responses:</div>
        <div style={styles.responsesContainer}>
          {responseBody.map((row) => {            
            const {token} = this.props;
            const {emailAddress} = this.state;
            return (
              <ReviewStep
                key={JSON.stringify(row)}
                token={token}
                emailAddress={emailAddress}
                row={row}
              />
            );
          }, this)}
        </div>
        <Divider />
        {showDebugging
          ? <pre>{JSON.stringify(responseBody, null, 2)}</pre>
          : <RaisedButton
            onTouchTap={this.onDebugTapped}
            style={styles.button}
            label="Debug" />
        }
      </div>
    );
  },

  renderError(error) {
    return (
      <div style={styles.container}>
        <p>We're sorry, we couldn't confirm your email address.</p>
        <p>Check with your facilitator to get the review link for your cohort, and use that to try sending yourself a new login link.</p>
        <p>If you're still stuck, email krob@mit.edu or open an issue on <a href="https://github.com/mit-teaching-systems-lab/threeflows/issues/new" target="_blank" rel="noopener noreferrer">GitHub</a>.</p>
      </div>
    );
  }
});

const styles = {
  container: {
    margin: 20
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
  },
  responsesContainer: {
    marginTop: 40,
    marginBottom: 40
  }
};