/* @flow weak */
import PropTypes from 'prop-types';

import React from 'react';

import IconButton from 'material-ui/IconButton';
import RefreshIcon from 'material-ui/svg-icons/navigation/refresh';

import NavigationAppBar from '../components/navigation_app_bar.jsx';
import ResponsiveFrame from '../components/responsive_frame.jsx';
import * as Routes from '../routes.js';



// Frame for the Home page screens, with nav bar, logo and layout.
export default React.createClass({
  displayName: 'HomeFrame',

  propTypes: {
    children: PropTypes.node
  },

  onTappedMenu(e) {
    Routes.navigate('/');
  },

  render() {
    return (
      <div className="HomeFrame">
        <ResponsiveFrame>
          <div style={styles.page}>
            <NavigationAppBar
              title="Teacher Moments"
              iconElementLeft={
                <IconButton onTouchTap={this.onTappedMenu} >
                  <RefreshIcon />
                </IconButton>
              }
            />
            {this.renderContent()}
          </div>
        </ResponsiveFrame>
      </div>
    );
  },

  renderContent() {
    const {children} = this.props;

    return (
      <div style={styles.content}>
        <div style={styles.textBlock}>
          <h2><a style={styles.nolink} href="http://tsl.mit.edu/practice-spaces-for-teacher-preparation/">Practice spaces for teacher preparation programs</a></h2>
          {children}
        </div>
        <div style={styles.logoBlock}>
          <a href="http://tsl.mit.edu">
            <img
              style={styles.logo}
              src="https://tsl-public.s3.amazonaws.com/threeflows/teacher-moments-tsl-logo.png" />
          </a>
        </div>
      </div>
    );
  }
});

const styles = {
  page: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    height: '100%'
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%'
  },
  textBlock: {
    flex: 1,
    margin: 20,
    marginTop: 0
  },
  logo: {
    width: '80%',
    margin: 20
  },
  nolink: {
    textDecoration: 'none',
    color: 'black'
  }
};
