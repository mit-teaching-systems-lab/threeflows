/* @flow weak */
import React from 'react';

import Drawer from 'material-ui/Drawer';
import Divider from 'material-ui/Divider';
import MenuItem from 'material-ui/MenuItem';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import HomeIcon from 'material-ui/svg-icons/action/home';
import AssessmentIcon from 'material-ui/svg-icons/action/assessment';
import ChatBubble from 'material-ui/svg-icons/communication/chat-bubble-outline';
import MenuIcon from 'material-ui/svg-icons/navigation/menu';
import SchoolIcon from 'material-ui/svg-icons/social/school';

import * as Routes from '../routes.js';

/*
Shows an AppBar for the screen title, with a drawer for navigating elsewhere.
*/
export default React.createClass({
  displayName: 'NavigationAppBar',

  propTypes: {
    title: React.PropTypes.string.isRequired,
    style: React.PropTypes.object,
    iconElementRight: React.PropTypes.element,
    prependMenuItems: React.PropTypes.element
  },

  contextTypes: {
    auth: React.PropTypes.object.isRequired
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
    const {iconElementRight, prependMenuItems} = this.props;

    return (
      <div>
        <AppBar
          title={this.props.title}
          style={this.props.style}
          iconElementLeft={
            <IconButton onTouchTap={this.onToggled} >
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
          {<MenuItem leftIcon={<HomeIcon />} onTouchTap={this.onNavigationTapped.bind(this, '/')} primaryText="Home" />}
          <MenuItem onTouchTap={this.onNavigationTapped.bind(this, Routes.virtualSchoolPath())} leftIcon={<SchoolIcon />} primaryText="Virtual school" />
          {prependMenuItems && <div onClick={this.doCloseDrawer}>{prependMenuItems}</div>}
          <Divider />
          <MenuItem onTouchTap={this.onNavigationTapped.bind(this, Routes.messagePopupPracticePath())} leftIcon={<ChatBubble />} primaryText="Practice" />
          <MenuItem onTouchTap={this.onNavigationTapped.bind(this, Routes.messagePopupSolutionPath())} leftIcon={<ChatBubble />} primaryText="Solution" />
          <MenuItem onTouchTap={this.onNavigationTapped.bind(this, Routes.messagePopupScoringPath())} leftIcon={<ChatBubble />} primaryText="Scoring" />
          <Divider />
          <MenuItem onTouchTap={this.onNavigationTapped.bind(this, Routes.ecdRaw())} leftIcon={<AssessmentIcon />} primaryText="Raw data" />
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