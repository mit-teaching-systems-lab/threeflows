import React, { Component } from 'react';
import './LoginPage.css';
import BackgroundColor from './BackgroundColor.js';


// The page for users to login for accessing research data.
class CreateSharePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      shareId: this.props.shareId,
      shareLink: ""
    };
  }

  componentDidMount() {
    fetch('/server/research/share', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'x-teachermoments-share-id': this.state.shareId,
      },
      method: 'GET'
    })
      .then(response => {
        console.log("redirect to:", response.url);
        this.setState({shareLink: response.url});
        return response.url;
      })
      .catch(err => {
        console.log('redirect sharelink failed', err);
      });
  }

  render() {
    return (
      <div className='CreateSessionPage'>
        <BackgroundColor/>
        <h2> REDIRECT TO SHARE PAGE</h2>
        <h2> ShareId: {this.state.shareId} </h2>
        <h2> ShareLink: {this.state.shareLink} </h2>
      </div>
    );
  }
}

export default CreateSharePage;
