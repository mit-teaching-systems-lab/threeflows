import React, { Component } from 'react';
//import queryString from 'query-string';
import ResearcherDataPage from './ResearcherDataPage.js';
//import BackgroundColor from './BackgroundColor.js';

// fetch request should happen in here.


class AccessibleScenarios extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: this.props.token,
      email: this.props.email,
    };
  }


  componentDidMount() {
    //const email = this.state.email;
    const token = this.state.token;
    fetch('/server/natalie', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'x-teachermoments-token': token,
      },
      method: 'GET'
    })
      .then(response => response.json())
      .then(this.onGotten.bind(this));

  }


  filter(json) {
    const rows = json.rows;
    //const email = 'nmionis@mit.edu';
    console.log("this is rows");
    console.log(rows);
    this.setState({rows: rows});
    return {rows: rows};
  }

  onGotten(json) {
    console.log("this is the json");
    console.log(json);
    const filtered = this.filter(json);
    this.setState({ json: filtered });
  }

  render() {
    const {token, email, rows} = this.state;
    if (rows === undefined) {
      return 'Loading...';
    }
    const analyses2 = rows.map(row => {
      const url = row.url;
      return [url, {
        description: url,
        filter(row) {
          return row;
        },
        location: url.substring(21) //was just URL
      }];
    });
    return (
      <ResearcherDataPage email={email.toLowerCase()} token={token} analyses2={analyses2}/>
    );
  }

}


export default AccessibleScenarios;
