/* @flow weak */
import React from 'react';
import AppearIn from 'appearin-sdk';
import * as Colors from 'material-ui/styles/colors';
import NavigationAppBar from '../home/navigation_app_bar.jsx';



/*
Experimental game page
*/
const APPEAR_IN_CONTAINER = 'appear-in-container';
export default React.createClass({
  displayName: 'DoSomethingPage',

  appearIn: null,

  getInitialState() {
    return {
      roomName: null
    };
  },

  componentDidMount() {
    this.appearIn = new AppearIn();
    this.appearIn.getRandomRoomName().then(roomName => this.setState({roomName}));
  },

  componentDidUpdate(prevProps, prevState) {
    const {roomName} = this.state;
    if (prevState.roomName === null && roomName !== null && this.appearIn) {
      this.appearIn.addRoomToElementById(APPEAR_IN_CONTAINER, roomName);
    }
  },

  render() {
    const {roomName} = this.state;
    const url = roomName ? `https://appear.in${roomName}` : null;

    return (
      <div>
        <NavigationAppBar title="Do Something Not Nothing" style={{backgroundColor: Colors.pink500}}/>
        <iframe height="300" width="100%" id={APPEAR_IN_CONTAINER} />
        {url && <a style={{padding: 20}} target="_blank" href={url}>{url}</a>}
      </div>
    );
  }
});