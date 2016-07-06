/* @flow weak */
import _ from 'lodash';
import React from 'react';

import AppBar from 'material-ui/AppBar';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import * as Colors from 'material-ui/styles/colors';


// Injects form asking the user for their email address,
// saves userTokens in localStorage afterward.
//
// Provides userProfile.email as context to children components.
export default React.createClass({
  displayName: 'AuthContainer',

  propTypes: {
    children: React.PropTypes.element.isRequired,
    localStorageKey: React.PropTypes.string
  },

  getDefaultProps() {
    return {
      localStorageKey: 'threeflows_email_registration'
    };
  },

  lock: null,

  getInitialState() {
    return {
      userEmail: '',
      hasConfirmedEmail: false,
      isNavigatingAway: false
    };
  },

  childContextTypes: {
    auth: React.PropTypes.shape({
      userProfile: React.PropTypes.object,
      doLogout: React.PropTypes.func
    }).isRequired
  },

  getChildContext() {
    const userProfile = (this.state.hasConfirmedEmail) ? {
      email: this.state.userEmail
    } : null;

    return {
      auth: {
        userProfile,
        doLogout: this.doLogout
      }
    };
  },

  doLogout() {
    window.localStorage.removeItem(this.props.localStorageKey);
    this.setState({
      hasConfirmedEmail: false,
      userEmail: ''
    });
  },

  componentWillMount(prevProps, prevState) {
    // Check local storage cache
    const storedValues = window.localStorage.getItem(this.props.localStorageKey);
    if (!storedValues) return;
    const {userEmail} = JSON.parse(storedValues);
    if (!userEmail) return;

    this.setState({
      userEmail,
      hasConfirmedEmail: true
    });
  },

  componentDidUpdate(prevProps, prevState) {
    const {userEmail, hasConfirmedEmail} = this.state;
    if (hasConfirmedEmail && userEmail) {
      window.localStorage.setItem(this.props.localStorageKey, JSON.stringify({userEmail, hasConfirmedEmail}));
    }
  },

  validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  },

  onTextChanged(e) {
    const userEmail = e.target.value;
    this.setState({userEmail});
  },

  onDoneEmail(e) {
    this.setState({ hasConfirmedEmail: true });
  },

  onDecline(e) {
    this.setState({ isNavigatingAway: true });
    window.location = 'http://tsl.mit.edu/';
  },

  render() {
    const {
      userEmail,
      hasConfirmedEmail,
      isNavigatingAway
    } = this.state;

    if (isNavigatingAway) return <div style={{margin: 20}}>Loading...</div>;
    return (
      <div>
        {hasConfirmedEmail && !_.isEmpty(userEmail)
          ? this.props.children
          : this.renderEmailForm()}
      </div>
    );
  },

  renderEmailForm() {
    const {userEmail} = this.state;
    const shouldShowWarning = userEmail.length > 10 && !this.validateEmail(userEmail);

    return (
      <div style={{height: '100%', position: 'fixed', backgroundColor: '#ccc'}}>
        <AppBar
          title="MIT Teaching Systems Lab"
          iconElementLeft={
            <IconButton onTouchTap={this.onDecline}>
              <NavigationClose />
            </IconButton>
          }
        />
        <Paper style={{padding: 20}}>
          <p>Please enter your email address.</p>
          <p>It will only be used to identify your responses, and not shared or used in any other way.</p>
          <div style={{marginBottom: 20}}>
            <TextField
              name="userEmail"
              fullWidth={true}
              hintText="Your email address"
              errorText={shouldShowWarning && "Please enter a valid email address."}
              errorStyle={{color: Colors.orange500}}
              onChange={this.onTextChanged}
            />
          </div>
          <div>
            <RaisedButton
              label="Start"
              primary={true}
              onTouchTap={this.onDoneEmail}
              disabled={!this.validateEmail(userEmail)}
            />
          </div>
        </Paper>
      </div>
    );
  }
});