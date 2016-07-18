/* @flow weak */
import React from 'react';

import Drawer from 'material-ui/Drawer';
import Divider from 'material-ui/Divider';
import MenuItem from 'material-ui/MenuItem';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import HomeIcon from 'material-ui/svg-icons/action/home';
import GroupIcon from 'material-ui/svg-icons/social/group';
import AssessmentIcon from 'material-ui/svg-icons/action/assessment';
import ChatBubble from 'material-ui/svg-icons/communication/chat-bubble-outline';
import MenuIcon from 'material-ui/svg-icons/navigation/menu';

import * as Routes from '../routes.js';

/*
Shows an AppBar for the screen title, with a drawer for navigating elsewhere.
*/
export default React.createClass({
  displayName: 'NavigationDrawer',

  propTypes: {
    title: React.PropTypes.string.isRequired,
    style: React.PropTypes.object,
    iconElementRight: React.PropTypes.element
  },

  contextTypes: {
    auth: React.PropTypes.object.isRequired
  },

  getInitialState() {
    return {
      isOpen: false
    };
  },

  onToggled() {
    this.setState({isOpen: !this.state.isOpen});
  },

  onNavigationTapped(url) {
    Routes.navigate(url);
    this.setState({isOpen: false});
  },

  render() {
    const demoCandidateEmail = 'kevin.robinson.0@gmail.com';
    const {userProfile, doLogout} = this.context.auth;
    const {iconElementRight} = this.props;

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
          <Divider />
          <MenuItem onTouchTap={this.onNavigationTapped.bind(this, Routes.messagePopupPracticePath())} leftIcon={<ChatBubble />} primaryText="Practice" />
          <MenuItem onTouchTap={this.onNavigationTapped.bind(this, Routes.messagePopupSolutionPath())} leftIcon={<ChatBubble />} primaryText="Solution" />
          <MenuItem onTouchTap={this.onNavigationTapped.bind(this, Routes.messagePopupScoringPath())} leftIcon={<ChatBubble />} primaryText="Scoring" />
          <Divider />
          <MenuItem onTouchTap={this.onNavigationTapped.bind(this, Routes.doSomethingPath())} leftIcon={<GroupIcon />} primaryText="Do Something" />
          <Divider />
          <MenuItem onTouchTap={this.onNavigationTapped.bind(this, Routes.ecdRaw())} leftIcon={<AssessmentIcon />} primaryText="Raw data" />
          <MenuItem onTouchTap={this.onNavigationTapped.bind(this, Routes.ecdCandidate(demoCandidateEmail))} leftIcon={<AssessmentIcon />} primaryText="Candidate page" />
          {userProfile &&
            <div>
              <Divider />
              <MenuItem onTouchTap={doLogout} primaryText="Logout"/>
            </div>
          }
        </Drawer>
      </div>
    );
  }
});