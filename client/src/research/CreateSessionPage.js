import React, { Component } from 'react';
import './LoginPage.css';
import BackgroundColor from './BackgroundColor.js';


// The page for users to login for accessing research data.
class CreateSessionPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      url: "",
      session: "",
      email: "",
      message: "",
      link: ""
    };

    this.onUpdateUrl = this.onUpdateUrl.bind(this);
    this.onUpdateSession = this.onUpdateSession.bind(this);
    this.onUpdateEmail = this.onUpdateEmail.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
    this.setState({ message: "Creating your link..."});
    fetch('/server/research/create', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({
        url: this.state.url.toLowerCase(),
        session: this.state.session.toLowerCase(),
        email: this.state.email.toLowerCase()
      })
    })
      .then(result => {
        console.log(result.status);
        if (result.status === 200) {
          this.setState({ message: "Great! Here's your short link"});
        }
        else {
          this.setState({ message: "There was an error. Make sure email is correct."});
        }        
      })
      .catch(err => {
        this.setState({ message: "An error occurred."});
      });
  }

  onUpdateUrl(e) {
    const { value } = e.target;
    this.setState({ url : value });
  }

  onUpdateSession(e) {
    const { value } = e.target;
    this.setState({ session : value });
  }

  onUpdateEmail(e) {
    const { value } = e.target;
    this.setState({ email : value });
  }

  render() {
    const url = this.state.url;
    const session = this.state.session;
    const email = this.state.email;
    return (
      <div className='CreateSessionPage'>
        <BackgroundColor/>
        <h2> Create Session Page</h2>
        <form name="loginForm" onSubmit={this.onSubmit}>
          <div className='LoginPage-Block'>
            <label htmlFor="url"><b>Paste the URL for the scenario you want to use: </b></label>
          </div>
          <div className='LoginPage-Block'>
            <input type="text" placeholder="Paste URL here" name="url" value={url} onChange={this.onUpdateUrl} required></input>
          </div>

          <div className='LoginPage-Block'>
            <label htmlFor="session"><b>Name your session: </b></label>
          </div>
          <div className='LoginPage-Block'>
            <input type="text" placeholder="Enter session here" name="session" value={session} onChange={this.onUpdateSession} required></input>
          </div>

          <div className='LoginPage-Block'>
            <label htmlFor="email"><b>Enter authorized email address: </b></label>
          </div>
          <div className='LoginPage-Block'>
            <input type="email" placeholder="Enter email here" name="email" value={email} onChange={this.onUpdateEmail} required></input>
          </div>

          <div className='LoginPage-Block'>
            <button type="submit"> Create Session </button>
          </div>

          <h3>{this.state.message}</h3>
          <h3>{this.state.link}</h3>
        </form>
      </div>
    );
  }
}


export default CreateSessionPage;
