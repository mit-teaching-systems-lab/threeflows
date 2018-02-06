import _ from 'lodash';

/* @flow weak */
import PropTypes from 'prop-types';

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
export default class extends React.Component {
  static displayName = 'AuthContainer';

  static propTypes = {
    children: PropTypes.element.isRequired,
    isEmailRequired: PropTypes.bool.isRequired,
    localStorageKey: PropTypes.string
  };

  static childContextTypes = {
    auth: PropTypes.shape({
      userProfile: PropTypes.object,
      doLogout: PropTypes.func
    }).isRequired
  };

  static defaultProps = {
    localStorageKey: 'threeflows_email_registration'
  };

  state = {
    userEmail: 'unknown@mit.edu',
    hasConfirmedEmail: !this.props.isEmailRequired,
    isNavigatingAway: false
  };

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
  }

  componentWillMount() {
    // Check local storage cache
    const storedValues = window.localStorage.getItem(this.props.localStorageKey);
    if (!storedValues) return;
    const {userEmail} = JSON.parse(storedValues);
    if (!userEmail) return;

    this.setState({
      userEmail,
      hasConfirmedEmail: true
    });
  }

  componentDidUpdate() {
    const {userEmail, hasConfirmedEmail} = this.state;
    if (hasConfirmedEmail && userEmail) {
      window.localStorage.setItem(this.props.localStorageKey, JSON.stringify({userEmail, hasConfirmedEmail}));
    }
  }

  doLogout = () => {
    window.localStorage.removeItem(this.props.localStorageKey);
    this.setState({
      hasConfirmedEmail: false,
      userEmail: ''
    });
  };

  validateEmail = (email) => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };

  onTextChanged = (e) => {
    const userEmail = e.target.value;
    this.setState({userEmail});
  };

  onDoneEmail = () => {
    this.setState({ hasConfirmedEmail: true });
  };

  onDecline = () => {
    this.setState({ isNavigatingAway: true });
    window.location = 'http://tsl.mit.edu/';
  };

  onKeyDown = (e) => {
    if (e.keyCode !== 13) return;
    if (!this.validateEmail(this.state.userEmail)) return;
    this.onDoneEmail();
  };

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
  }

  renderEmailForm = () => {
    const {userEmail} = this.state;
    const shouldShowWarning = userEmail.length > 10 && !this.validateEmail(userEmail);

    return (
      <div style={{height: 2000, paddingTop: 20, width: '100%', display: 'flex', justifyContent: 'center', backgroundColor: 'black'}}>
        <div style={{width: 450}}>
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
                ref={(el) => el && el.focus()}
                onKeyDown={this.onKeyDown}
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
      </div>
    );
  };
}