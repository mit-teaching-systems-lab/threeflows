/* @flow weak */
import React from 'react';
import Auth0Lock from 'auth0-lock';
import Auth0Variables from './auth0_config.js';

// Injects Auth0 login screen, bounces over to OAuth provider for login,
// saves userTokens in localStorage afterward.
//
// Provides auth state as context to children components.
export default React.createClass({
  displayName: 'AuthContainer',

  propTypes: {
    children: React.PropTypes.element.isRequired,
    localStorageKey: React.PropTypes.string
  },

  getDefaultProps() {
    return {
      localStorageKey: 'threeflows_auth_container'
    };
  },

  lock: null,

  getInitialState() {
    return {
      loginError: null,
      userToken: null,
      accessToken: null,
      authHash: null,
      userProfile: null
    };
  },

  childContextTypes: {
    auth: React.PropTypes.shape({
      loginError: React.PropTypes.object,
      userToken: React.PropTypes.string,
      accessToken: React.PropTypes.string,
      userProfile: React.PropTypes.object,
      authHash: React.PropTypes.object,
      doLogout: React.PropTypes.func
    }).isRequired
  },

  getChildContext() {
    return {
      auth: {
        loginError: this.state.loginError,
        userToken: this.state.userToken,
        accessToken: this.state.accessToken,
        authHash: this.state.authHash,
        userProfile: this.state.userProfile,
        doLogout: this.doLogout
      }
    };
  },

  componentDidMount(props, state) {
    this.lock = new Auth0Lock(Auth0Variables.AUTH0_CLIENT_ID, Auth0Variables.AUTH0_DOMAIN);
    this.setProfileOrShowLogin();
  },

  doLogout() {
    window.localStorage.removeItem(this.props.localStorageKey);
    window.location.reload();
  },

  setProfileOrShowLogin() {
    const {lock} = this;

    // Check hash from redirect
    const authHash = lock && lock.parseHash(window.location.hash);
    if (authHash) {
      window.history.replaceState({}, document.title, '/');
      
      const {error} = authHash;
      const idToken = authHash.id_token;
      const accessToken = authHash.access_token;
      if (error) return this.setState({ loginError: error });
      if (idToken && lock) {
        return lock.getProfile(idToken, this.onSignInDone.bind(this, {
          authHash,
          accessToken,
          userToken: idToken
        }));
      }
    }

    // Check local storage cache
    const storedValues = window.localStorage.getItem(this.props.localStorageKey);
    if (storedValues) {
      const {userToken, userProfile} = JSON.parse(storedValues);
      if (userToken && userProfile) return this.setState({userToken, userProfile});
    }

    // Do a new login
    return this.showLogin();
  },

  showLogin() {
    this.lock && this.lock.show({
      connections: ['google-oauth2'],
      socialBigButtons: true,
      icon: 'http://ram.raritanassets.com/images/global/why-power-icon_airflow.png',
      closable: false,
      popup: false,
      responseType: 'token',
      callbackOnLocationHash: true
    });
  },

  componentDidUpdate(prevProps, prevState) {
    const {userToken, userProfile} = this.state;
    if (userToken !== prevState.userToken || userProfile !== prevState.userProfile) {
      window.localStorage.setItem(this.props.localStorageKey, JSON.stringify({userToken, userProfile}));
    }
  },

  onSignInDone({authHash, accessToken, userToken}, loginError, userProfile) {
    this.setState({authHash, accessToken, userToken, loginError, userProfile});
  },

  render() {
    const {loginError, userProfile} = this.state;

    return <div>
      {loginError && <div>There was an error logging in.</div>}
      {userProfile && this.props.children}
    </div>;
  }
});