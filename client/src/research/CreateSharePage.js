import React, { Component } from 'react';
import './LoginPage.css';
import BackgroundColor from './BackgroundColor.js';


// The page for users to login for accessing research data.
class CreateSharePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      shareId: this.props.shareId
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
        return response.status(200).end();
      })
      .catch(err => {
        console.log('redirect sharelink failed');
      });
  }

  render() {
    return (
      <div className='CreateSessionPage'>
        <BackgroundColor/>
        <h2> REDIRECT TO SHARE PAGE</h2>
        <h2> {this.state.shareId} </h2>
      </div>
    );
  }
}

export default CreateSharePage;
