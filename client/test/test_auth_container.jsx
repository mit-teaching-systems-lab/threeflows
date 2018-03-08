/* @flow weak */
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import AuthContainer from '../src/auth_container.jsx';
import sinon from 'sinon';


// Testing only, used to inject an auth context.
export default createReactClass({
  displayName: 'TestAuthContainer',

  propTypes: {
    children: PropTypes.element
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