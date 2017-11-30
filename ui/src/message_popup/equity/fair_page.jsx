/* @flow weak */
import React from 'react';

import AppBar from 'material-ui/AppBar';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import {List} from 'material-ui/List';
import * as muiColors from 'material-ui/styles/colors.js';
import * as Routes from '../../routes.js';

// CSS Equity Workshop home page
export default React.createClass({
  displayName: 'EquityPage',

  onClicked(href, e) {
    Routes.navigate(href);
    e.preventDefault();
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
        <p style={{marginBottom: 40}}>These interactive case studies can be used to spark conversation during in-person workshops, as homework to seed work in class, or within online PLCs.  They can be used for initial exposure to challenges teachers face in classrooms, or as formative assessments.</p>
        <Divider style={{marginTop: 30, marginBottom: 30}} />
        <div style={styles.header}>Inclusive excellence</div>
        <List style={{display: 'flex'}}>
          {this.renderScenarioItem("/equity/climate?equity", '1: Gendered or racialized student comments', '"Climate"', muiColors.red500)}
          {this.renderScenarioItem("/teachermoments/smithB", '2: Noticing student belonging in the classroom', '"Mr. Smith"', muiColors.red500)}
          {this.renderScenarioItem("/teachermoments/sub?frombias", '3: Positioning students in the classroom', '"Lego pairs"', muiColors.red500)}
        </List>
        <Divider style={{marginTop: 30, marginBottom: 30}} />
        <div style={styles.header}>Seeing the whole student</div>
        <List style={{display: 'flex'}}>
          {this.renderScenarioItem("https://swipe-right-for-cs.herokuapp.com/play?equity", '4: Connecting student strengths to academics', '"Swipe Right for CS"', muiColors.indigo500)}
          {this.renderScenarioItem("/teachermoments/rosa?frombias", '5: Counseling and identity', '"Rosa"', muiColors.indigo500)}
          <div style={{flex: 1}}></div>
        </List>
        <Divider style={{marginTop: 30, marginBottom: 30}} />
        <div>New idea?  Reach out at <a href="https://twitter.com/mit_tsl">@mit_tsl</a>.</div>
      </div>
    );
  },

  renderScenarioItem(href, linkText, text, backgroundColor) {
    return (
      <Paper zDepth={3} style={{flex: 1, marginRight: 20, marginLeft: 10, backgroundColor}}>
        <a style={{padding: 30, display: 'inline-block', textDecoration: 'none', color: '#333'}} href={href} onClick={this.onClicked.bind(this, href)} >
          <div style={{height: 180, alignItems: 'flex-start', justifyContent: 'space-between', display: 'flex', flexDirection: 'column'}}>
            <div style={{color: '#eee', fontSize: 24, fontWeight: 'bold', marginBottom: 10}}>{linkText}</div>
            <div style={{color: '#eee', fontSize: 18}}>{text}</div>
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
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 10,
    backgroundColor: 'white'
  },
  header: {
    margin: 0,
    marginBottom: 10,
    fontSize: 24
  }
};
