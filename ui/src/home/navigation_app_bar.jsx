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
    style: React.PropTypes.object
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
          title={this.props.title}
          style={this.props.style}
          iconElementLeft={
            <IconButton onTouchTap={this.onToggled} >
              <MenuIcon />
            </IconButton>
          }
        />
        <Drawer
          docked={false}
          open={this.state.isOpen}
          onRequestChange={(isOpen) => this.setState({isOpen})}
        >
          {<MenuItem leftIcon={<HomeIcon />} onTouchTap={() => Routes.navigate('/')} primaryText="Home" />}
          <Divider />
          <MenuItem onTouchTap={() => Routes.navigate(Routes.messagePopupPracticePath())} leftIcon={<ChatBubble />} primaryText="Practice" />
          <MenuItem onTouchTap={() => Routes.navigate(Routes.messagePopupSolutionPath())} leftIcon={<ChatBubble />} primaryText="Solution" />
          <MenuItem onTouchTap={() => Routes.navigate(Routes.messagePopupScoringPath())} leftIcon={<ChatBubble />} primaryText="Scoring" />
          <Divider />
          <MenuItem onTouchTap={() => Routes.navigate(Routes.doSomethingPath())} leftIcon={<GroupIcon />} primaryText="Do Something" />
          <Divider />
          <MenuItem onTouchTap={() => Routes.navigate(Routes.ecdRaw())} leftIcon={<AssessmentIcon />} primaryText="Raw data" />
          <MenuItem onTouchTap={() => Routes.navigate(Routes.ecdCandidate(demoCandidateEmail))} leftIcon={<AssessmentIcon />} primaryText="Candidate page" />
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