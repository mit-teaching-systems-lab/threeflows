/* @flow weak */
import React from 'react';

import AppBar from 'material-ui/AppBar';
import Paper from 'material-ui/Paper';
import {List} from 'material-ui/List';
import * as muiColors from 'material-ui/styles/colors.js';
import * as Routes from '../routes.js';


// CSS Equity Workshop home page
export default React.createClass({
  displayName: 'EquityPage',

  // getInitialState() {
  //   return {
  //     href: null
  //   };
  // },

  onTappedMenu(e) {
    window.location.reload();
  },

  onTappedItem(href, linkText, e) {
    // this.setState({href});
    // Routes.navigate(href);
  },

  render() {
    return (
      <div style={styles.page}>
        <AppBar title="Teacher Moments" iconElementLeft={<div />} />
        {this.renderScenarios()}
      </div>
    );
  },

  renderScenarios() {
    return (
      <div style={styles.content}>
      <h2>Equity practice spaces</h2>
        <p style={{marginBottom: 40}}>These interactive case studies can be used to seed conversation during in-person workshops, as homework to seed class discussions, or within online PLCs.</p>
        <Paper zDepth={2} style={{padding: 10, marginTop: 30, marginBottom: 30}}>
          <div style={styles.header}>Inclusive excellence</div>
          <List style={{display: 'flex'}}>
            {this.renderScenarioItem("/teachermoments/hmtca?equity", '1: Gendered or racialized student comments', 'Johnny: "Why was 6 afraid of 7?"', muiColors.red300)}
            {this.renderScenarioItem("/teachermoments/smithB", '2: Noticing student belonging in the classroom', 'Mr. Smith: "That’s great! It is cool isn’t it? Thanks for sharing, Tim."', muiColors.red300)}
            {this.renderScenarioItem("/teachermoments/sub?frombias", '3: Positioning students in the classroom', 'Terrell and Dustin are sitting next to each other.', muiColors.red300)}
          </List>
        </Paper>
        <Paper zDepth={2} style={{padding: 10, marginTop: 30, marginBottom: 30}}>
          <div style={styles.header}>Seeing the whole student</div>
          <List style={{display: 'flex'}}>
            {this.renderScenarioItem("https://swipe-right-for-cs.herokuapp.com/play?equity", '4: Connecting student strengths to academics', 'Carlos is incredibly good at reading people, connecting with adults and being persistent in working to convince them.', muiColors.indigo300)}
            {this.renderScenarioItem("/teachermoments/rosa?frombias", '5: Counseling and identity', 'Jayden: "I only took this class because nothing else worked in my schedule."', muiColors.indigo300)}
            {this.renderScenarioItem("/teachermoments/sub?frombias", '6: Assumptions about students', 'Terrell and Dustin are sitting next to each other.', muiColors.indigo300)}
          </List>
        </Paper>
        <div style={{marginTop: 50}}>New idea?  Reach out at <a href="https://twitter.com/mit_tsl">@mit_tsl</a>.</div>
      </div>
    );
  },

  renderScenarioItem(href, linkText, text, backgroundColor) {
    return (
      <Paper zDepth={2} style={{flex: 1, margin: 20, backgroundColor}}>
        <a style={{padding: 20, display: 'inline-block', textDecoration: 'none', color: '#333'}} href={href}>
          <div style={{height: 120, alignItems: 'flex-start', justifyContent: 'flex-start', display: 'flex', flexDirection: 'column'}} onClick={this.onTappedItem.bind(this, href, linkText)}>
            <div style={{fontSize: 18, fontWeight: 'bold', marginBottom: 10}}>{linkText}</div>
            <div style={{fontSize: 14}}>{text}</div>
          </div>
        </a>
      </Paper>
    );
  }
});

const styles = {
  page: {
    width: 1024,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 20,
    marginBottom: 20
  },
  content: {
    padding: 20,
    paddingTop: 10,
    backgroundColor: 'white'
  },
  header: {
    margin: 10,
    marginBottom: 0,
    fontSize: 24
  },
  listItem: {
    padding: 5,
    paddingLeft: 10
  }
};
