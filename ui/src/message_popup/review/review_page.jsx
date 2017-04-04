/* @flow weak */
import React from 'react';

import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

import * as Routes from '../../routes.js';
import SessionFrame from '../linear_session/session_frame.jsx';
import * as Api from '../../helpers/api.js';
import ReadMore from '../renderers/read_more.jsx';


const STATUS = {
  READY: 'ready',
  LOADING: 'loading',
  VIEWING: 'viewing',
  ERROR: 'error'
};

// Takes a token from an email.
// Asks for confirmation of email address and requests data from the server.
// Then shows that data to the user.
export default React.createClass({
  displayName: 'ReviewPage',

  propTypes: {
    token: React.PropTypes.string.isRequired
  },

  getInitialState() {
    return {
      emailAddress: '',
      lastStatus: STATUS.READY,
      responseBody: null,
      error: null
    };
  },

  // Remove key in querystring from URL bar
  componentDidMount() {
    Routes.navigate(window.location.pathname, true);
  },

  onResetSession() {
    this.setState(this.getInitialState());
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

  render() {
    return (
      <SessionFrame onResetSession={this.onResetSession}>
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
    const {responseBody} = this.state;
    return (
      <div style={styles.container}>
        <div style={styles.instructions}>Here's a summary of your responses:</div>
        <div>
          {responseBody.filter(row => row.audio_url).map((row) => {
            const audioUrl = row.audio_url;
            const {token} = this.props;
            const {emailAddress} = this.state;
            const audioUrlWithTokens = Api.audioUrlWithTokens(audioUrl, token, emailAddress);
            const questionText = row.question.text;
            return (
              <div key={audioUrlWithTokens}>
                <ReadMore fulltext={questionText}/>
                <audio
                  controls={true}
                  src={audioUrlWithTokens}
                  style={{paddingTop: 10, paddingBottom: 20}} />
              </div>
            );
          }, this)}
        </div>
        <pre>{JSON.stringify(responseBody, null, 2)}</pre>
      </div>
    );
  },

  renderError(error) {
    return (
      <div style={styles.container}>
      <p>We're sorry, we couldn't confirm your email address.</p>
      <p>Check with your facilitator to get the review link for your cohort, and use that to try sending yourself a new login link.</p>
      <p>If you're still stuck, email krob@mit.edu or open an issue on <a href="https://github.com/mit-teaching-systems-lab/threeflows/issues/new" target="_blank">GitHub</a>.</p>
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