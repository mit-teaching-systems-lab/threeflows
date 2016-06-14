import React from 'react';
import * as Routes from '../routes';

import Paper from 'material-ui/Paper';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
// https://design.google.com/icons/
import People from 'material-ui/svg-icons/social/people';
import Home from 'material-ui/svg-icons/action/home';
import Help from 'material-ui/svg-icons/action/help';
import VideoCall from 'material-ui/svg-icons/av/video-call';
import Chat from 'material-ui/svg-icons/communication/chat';
import Schedule from 'material-ui/svg-icons/action/schedule';
import Folder from 'material-ui/svg-icons/file/folder-shared';
import Settings from 'material-ui/svg-icons/action/settings';
import Search from 'material-ui/svg-icons/action/search';
import Divider from 'material-ui/Divider';

/*
The SideMenu used on each page.
*/
export default React.createClass({
  displayName: 'SideMenu',

  propTypes: {
    videoUrl: React.PropTypes.string,
    chatUrl: React.PropTypes.string,
    driveUrl: React.PropTypes.string,
  },

  getInitialState: function() {
    return {
      stepIndex: 0
    };
  },

  render() {
    return (
      <div style={{width: 190}}>
        <Paper style={styles.paper}>
          <Menu>
            <MenuItem
              primaryText="Home"
              onTouchTap={() => Routes.navigate(Routes.Home)}
              leftIcon={<Home />} />
            <MenuItem
              primaryText="Search"
              disabled={true}
              leftIcon={<Search />} />
            <Divider />
            <MenuItem
              primaryText="Chat"
              disabled={!this.props.chatUrl}
              onTouchTap={() => Routes.newTab(this.props.chatUrl)}
              leftIcon={<Chat />} />
            <MenuItem
              primaryText="Video"
              disabled={!this.props.videoUrl}
              onTouchTap={() => Routes.newTab(this.props.videoUrl)}
              leftIcon={<VideoCall />}
              rightIcon={<People />} />
            <MenuItem
              primaryText="Drive"
              disabled={!this.props.driveUrl}
              onTouchTap={() => Routes.newTab(this.props.driveUrl)}
              leftIcon={<Folder />} />
            <Divider />
            <MenuItem
              primaryText="Settings"
              disabled={true}
              leftIcon={<Settings />} />
            <MenuItem
              primaryText="Help"
              onTouchTap={() => Routes.newTab(Routes.chatMessage('kevin'))}
              leftIcon={<Help />} />
          </Menu>
        </Paper>
        <Paper style={styles.paper}>
          <Menu>
            <MenuItem
              primaryText="Calendar"
              onTouchTap={() => Routes.newTab(Routes.googleCalendar())}
              leftIcon={<Schedule />} />
            <div style={styles.calendarContainer}>
              <iframe src="https://calendar.google.com/calendar/embed?showTitle=0&amp;showNav=0&amp;showDate=0&amp;showPrint=0&amp;showTabs=0&amp;showCalendars=0&amp;showTz=0&amp;mode=AGENDA&amp;height=600&amp;wkst=2&amp;bgcolor=%23FFFFFF&amp;src=9fbucpr2tm6b5vmkm5bkb57ffs%40group.calendar.google.com&amp;color=%23B1440E&amp;ctz=America%2FNew_York" style={{border: 0}} width="100%" height="100%" frameborder="0" scrolling="no"></iframe>
            </div>
          </Menu>
        </Paper>
      </div>
    );
  }
});

const styles = {
  paper: {
    display: 'inline-block',
    margin: '16px 32px 16px 0',
  },
  rightIcon: {
    textAlign: 'center',
    lineHeight: 24,
  },
  calendarContainer: {
    width: 168,
    height: 400
  }
};