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
  }
  render() {
    return (
      <div className='LoginPage'>
        <h2> Copy Tables Here!</h2>
      </div>
    );
  }
}


export default LoginPage;
