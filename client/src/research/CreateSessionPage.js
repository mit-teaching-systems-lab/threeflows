import React, { Component } from 'react';
import './LoginPage.css';
import BackgroundColor from './BackgroundColor.js';


// The page for users to login for accessing research data.
class CreateSessionPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      url: "",
      description: "",
      message: "",
      link: "",
    };

    this.onUpdateUrl = this.onUpdateUrl.bind(this);
    this.onUpdateDescription = this.onUpdateDescription.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
    const token = this.props.token;
    const url = this.state.url;
    const description = this.state.description;
    this.setState({ message: "Creating your link..."});
    fetch('/server/research/create', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'x-teachermoments-token': token,
        'x-teachermoments-location': url,
        'x-teachermoments-description': description
      },
      method: 'GET'
    })
      .then(response => {
        return response.json()
          .then(json => {
            if (response.status === 200) {
              this.setState({ message: "Great! Send the following share link to your students:"});
              this.setState({ link: json.shareLink});
            }
            else {
              this.setState({ message: "There was an error."});
            }   
          });     
      })
      .catch(err => {
        this.setState({ message: "An error occurred."});
      });
  }

  onUpdateUrl(e) {
    const { value } = e.target;
    this.setState({ url : value });
  }

  onUpdateDescription(e) {
    const { value } = e.target;
    this.setState({ description : value });
  }

  render() {
    const url = this.state.url;
    const description = this.state.description;
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
            <label htmlFor="description"><b>Name your description: </b></label>
          </div>
          <div className='LoginPage-Block'>
            <input type="text" placeholder="Enter description here" name="description" value={description} onChange={this.onUpdateDescription} required></input>
          </div>

          <div className='LoginPage-Block'>
            <button type="submit"> Create Session </button>
          </div>

          <div className='LoginPage-Block'>
            <h3>{this.state.message}</h3>
            <div>{<a href = {this.state.link}> {this.state.link}</a>}</div>
          </div>
        </form>
      </div>
    );
  }
}


export default CreateSessionPage;
