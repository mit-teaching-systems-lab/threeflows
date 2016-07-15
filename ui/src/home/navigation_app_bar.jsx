/* @flow weak */
import React from 'react';

import Drawer from 'material-ui/Drawer';
import Divider from 'material-ui/Divider';
import MenuItem from 'material-ui/MenuItem';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import HomeIcon from 'material-ui/svg-icons/action/home';
import AsessmentIcon from 'material-ui/svg-icons/action/assessment';
import ChatBubble from 'material-ui/svg-icons/communication/chat-bubble-outline';
import MenuIcon from 'material-ui/svg-icons/navigation/menu';

import * as Routes from '../routes.js';

/*
Shows an AppBar for the screen title, with a drawer for navigating elsewhere.
*/
export default React.createClass({
  displayName: 'NavigationDrawer',

  propTypes: {
    title: React.PropTypes.string.isRequired
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

  handleClose() {
    this.setState({isOpen: false});
  },

  render() {
    const demoCandidateEmail = 'kevin.robinson.0@gmail.com';
    const {userProfile, doLogout} = this.context.auth;
    return (
      <div>
        <AppBar
          title="threeflows"
          iconElementLeft={
            <IconButton onTouchTap={this.onToggled} >
              <MenuIcon />
            </IconButton>
          }
        />
        <Drawer
          docked={false}
          width={250}
          open={this.state.isOpen}
          onRequestChange={(isOpen) => this.setState({isOpen})}
        >
          {<MenuItem leftIcon={<HomeIcon />} onClick={Routes.navigate.bind(Routes, '/')} primaryText="Home" />}
          <Divider />
          <MenuItem onTouchTap={() => Routes.navigate(Routes.messagePopupPracticePath())} leftIcon={<ChatBubble />} primaryText="Practice" />
          <MenuItem onTouchTap={() => Routes.navigate(Routes.messagePopupSolutionPath())} leftIcon={<ChatBubble />} primaryText="Solution" />
          <MenuItem onTouchTap={() => Routes.navigate(Routes.messagePopupScoringPath())} leftIcon={<ChatBubble />} primaryText="Scoring" />
          <MenuItem onTouchTap={() => Routes.navigate(Routes.messagePopupExplorationPath())} leftIcon={<ChatBubble />} primaryText="Exploration" />
          <Divider />
          <MenuItem onTouchTap={() => Routes.navigate(Routes.ecdRaw())} leftIcon={<AsessmentIcon />} primaryText="Raw data" />
          <MenuItem onTouchTap={() => Routes.navigate(Routes.ecdCandidate(demoCandidateEmail))} leftIcon={<AsessmentIcon />} primaryText="Candidate page" />
          {userProfile &&
            <div>
              <Divider />
              <MenuItem onClick={doLogout} primaryText="Logout"/>
            </div>
          }
        </Drawer>
      </div>
    );
  }
});