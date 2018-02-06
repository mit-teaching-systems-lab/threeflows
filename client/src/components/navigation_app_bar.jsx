/* @flow weak */
import PropTypes from 'prop-types';

import React from 'react';

import Drawer from 'material-ui/Drawer';
import Divider from 'material-ui/Divider';
import MenuItem from 'material-ui/MenuItem';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import HomeIcon from 'material-ui/svg-icons/action/home';
import MenuIcon from 'material-ui/svg-icons/navigation/menu';

import * as Routes from '../routes.js';

/*
Shows an AppBar for the screen title, with a drawer for navigating elsewhere.
*/
export default React.createClass({
  displayName: 'NavigationAppBar',

  propTypes: {
    title: PropTypes.string.isRequired,
    style: PropTypes.object,
    iconElementLeft: PropTypes.element,
    iconElementRight: PropTypes.element
  },

  contextTypes: {
    auth: PropTypes.object.isRequired
  },

  getInitialState() {
    return {
      isOpen: false
    };
  },

  doCloseDrawer() {
    this.setState({ isOpen: false });
  },

  onToggled() {
    this.setState({isOpen: !this.state.isOpen});
  },

  onNavigationTapped(url) {
    Routes.navigate(url);
    this.doCloseDrawer();
  },

  render() {
    const {userProfile, doLogout} = this.context.auth;
    const {iconElementLeft, iconElementRight} = this.props;

    return (
      <div>
        <AppBar
          title={this.props.title}
          style={this.props.style}
          iconElementLeft={iconElementLeft || 
            <IconButton onTouchTap={this.onToggled}>
              <MenuIcon />
            </IconButton>
          }
          iconElementRight={iconElementRight}
        />
        <Drawer
          docked={false}
          open={this.state.isOpen}
          onRequestChange={(isOpen) => this.setState({isOpen})}
        >
          <MenuItem leftIcon={<HomeIcon />} onTouchTap={this.onNavigationTapped.bind(this, '/')} primaryText="Home" />
          <Divider />
          {userProfile &&
            <div>
              <Divider />
              <MenuItem
                leftIcon={<div style={{height: 24, width: 24, padding: 12}} />}
                primaryText="Logout"
                onTouchTap={doLogout} />
            </div>
          }
        </Drawer>
      </div>
    );
  }
});