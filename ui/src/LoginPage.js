import React, { Component } from 'react';
// import './LoginPage.css';


// The page for users to login for accessing research data.
class LoginPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      message: ""
    };

    this.onUpdateEmail = this.onUpdateEmail.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onUpdateEmail(e) {
    const { value } = e.target;
    this.setState({ email : value });
  }

  onSubmit(e) {
    e.preventDefault();
    fetch('/api/research/login', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({
        email: this.state.email.toLowerCase()
      })
    })
      .then(result => {
        // The server shouldn't leak whether it's a whitelisted email address or not
        this.setState({ message: "Check your email.  If you are authorized, you should see a login link within a few seconds!"});
      })
      .catch(err => {
        this.setState({ message: "An error occurred."});
      });
  }

  render() {
    const email = this.state.email;
    return (
      <div className='LoginPage'>
        <h2> Welcome to the Swipe Right for CS Researcher Portal</h2>
        <h3>{this.state.message}</h3>
        <form name="loginForm" onSubmit={this.onSubmit}>
          <div className='LoginPage-Block'>
            <label htmlFor="email"><b>Enter authorized email address: </b></label>
          </div>
          <div className='LoginPage-Block'>
            <input type="email" placeholder="Enter email here" name="email" value={email} onChange={this.onUpdateEmail} required></input>
          </div>
          <div className='LoginPage-Block'>
            <button type="submit"> Get Link </button>
          </div>
        </form>
      </div>
    );
  }
}


export default LoginPage;
