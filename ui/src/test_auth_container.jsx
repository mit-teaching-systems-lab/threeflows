/* @flow weak */
import React from 'react';
import AuthContainer from './auth_container.jsx';
import sinon from 'sinon';


// Testing only, used to inject an auth context.
export default React.createClass({
  displayName: 'TestAuthContainer',

  propTypes: {
    children: React.PropTypes.element.isRequired
  },

  childContextTypes: AuthContainer.childContextTypes,

  getChildContext() {
    return {
      auth: {
        userProfile: {
          email: 'user@foo.com'
        },
        doLogout: sinon.spy()
      }
    };
  },

  render() {
    return this.props.children;
  }
});