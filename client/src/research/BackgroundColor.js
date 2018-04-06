import React, { Component } from 'react';

//Teacher Moments sets background color based on users' screen size (see: public/index.html)
//This component sets the background color of Teacher Moments to white for all of the research related pages. 
class BackgroundColor extends Component {
  componentWillMount() {
    document.body.style.backgroundColor = "white";
  }

  componentWillUnmount() {
    document.body.style.backgroundColor = null;
  }

  render() {
    return (
      <div></div>
    );
  }
}

export default BackgroundColor;