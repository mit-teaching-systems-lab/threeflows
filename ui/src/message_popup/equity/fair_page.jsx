/* @flow weak */
import React from 'react';

import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import {List} from 'material-ui/List';
import * as muiColors from 'material-ui/styles/colors.js';
import * as Routes from '../../routes.js';


// Equity Workshop home page
export default React.createClass({
  displayName: 'EquityPage',

  onClicked(href) {
    if (href.indexOf('http') === 0) {
      window.location = href;
    } else {
      Routes.navigate(href);
    }
  },

  onTryItTapped(e) {
    e.preventDefault();
    Routes.navigate('/demos');
  },

  render() {
    return (
      <div style={styles.page}>
        {this.renderScenarios()}
      </div>
    );
  },

  renderScenarios() {
    return (
      <div style={styles.content}>
      <div style={{marginTop: 20}}>
        <a href="http://tsl.mit.edu">
          <img
            style={styles.logo}
            src="https://tsl-public.s3.amazonaws.com/threeflows/teacher-moments-tsl-logo.png" />
        </a>
      </div>
      <Divider style={{marginTop: 20, marginBottom: 30}} />
      <h2>Equity practice spaces</h2>
        <p style={{marginTop: 10, marginBottom: 20}}>These interactive case studies can be used to spark conversation during in-person workshops, as homework to seed work in class, or within online PLCs.  They can be used for initial exposure to challenges teachers face in classrooms, or as formative assessments.</p>
        <div>
         <div style={styles.themes}>Themes:</div>
          <ul>
            <li style={styles.themes}>Inclusive excellence</li>
            <li style={styles.themes}>Seeing the whole student</li>
          </ul>
        </div>
        <div style={{marginTop: 40}}>Question or new idea?  Reach out at <b>krob@mit.edu</b> or <a href="https://twitter.com/mit_tsl">@mit_tsl</a>.</div>
        <Divider style={{marginTop: 40, marginBottom: 30}} />
        <List style={styles.list}>
          {this.renderScenarioItem("/equity/climate?fromequity", '1: Gendered or racialized student comments', '"Climate"', muiColors.red400)}
          {this.renderScenarioItem("/teachermoments/smith?fromequity", '2: Noticing student belonging in the classroom', '"Mr. Smith"', muiColors.blueGrey500)}
        </List>
        <List style={styles.list}>
          {this.renderScenarioItem("/teachermoments/sub?fromequity", '3: Positioning students in the classroom', '"Lego pairs"', muiColors.green500)}
          {this.renderScenarioItem("/teachermoments/rosa?fromequity", '4: Talking about identity', '"Rosa"', muiColors.indigo400)}
        </List>
        <List style={styles.list}>
          {this.renderScenarioItem("https://swipe-right-for-cs.herokuapp.com/play?fromequity", '5: Connecting student strengths to academics', '"Swipe Right for CS"', muiColors.brown400)}
          {this.renderScenarioItem("/teachermoments/jayden?fromequity", '6: Encouraging student growth', '"Jayden"', muiColors.orange700)}
        </List>
        <Divider style={{marginTop: 30, marginBottom: 30}} />
        <List style={styles.list}>
          {this.renderScenarioItem("/equity/paper/tom-absent?text", 'Prototype: Assumptions about students', '"Tom absent"', '#0B3662')}
          <div style={{flex: 1}} />
        </List>
        <Divider style={{marginTop: 30, marginBottom: 30}} />
        <div style={styles.header}>Play some more!</div>
        <div style={styles.links}>
          <a style={styles.link} href="/demos">Try other practice spaces!</a>
          <div style={styles.link}><a href="http://tsl.mit.edu/practice-spaces-for-teacher-preparation/">Game-based practice spaces</a></div>
          <div style={styles.link}><a href="https://threeflows-blockly.herokuapp.com/">Prototype your own scenarios</a></div>
          <div style={styles.link}><a href="https://github.com/mit-teaching-systems-lab/threeflows">github.com/mit-teaching-systems-lab</a></div>
        </div>
        <Divider style={{marginTop: 30, marginBottom: 30}} />
        <div style={styles.header}>Read more!</div>
        <div style={styles.links}>
          <div style={styles.link}>Using Online Practice Spaces to Investigate Challenges in Enacting Principles of Equitable Computer Science Teaching (<a href="https://osf.io/preprints/socarxiv/ygazx/">Robinson and Reich, forthcoming</a>)</div>
          <div style={styles.link}>Using "Teacher Moments" as an Online Practice Space for Parent-Teacher Conference Simulation in Preservice Teacher Education (<a href="https://osf.io/preprints/socarxiv/9y5cd/">Owho-Ovuakporie 2017</a>)</div>
          <div style={styles.link}>Exposing Conditional Inclusive Ideologies Through Simulated Interactions (<a href="https://www.academia.edu/725220/Exposing_conditional_inclusive_ideologies_through_simulated_interactions?auto=download">Dotger and Ashby 2010</a>)</div>
          <div style={styles.link}>Designing and Using Clinical Simulations to Prepare Teachers for Culturally Responsive Teaching (<a href="http://etd.library.vanderbilt.edu/available/etd-03022016-165211/unrestricted/Self.pdf">Self 2016</a>)</div>
          <div style={styles.link}><a href="http://blogs.edweek.org/edweek/edtechresearcher/2017/03/helping_teachers_surface_and_address_bias_with_online_practice_spaces.html">Helping Teachers Surface and Address Bias with Online Practice Spaces</a></div>
          <div style={styles.link}><a href="https://mit-teaching-systems-lab.github.io/unconscious-bias/">Bias in teaching</a></div>
        </div>
        <Divider style={{marginTop: 30, marginBottom: 30}} />
        <div style={{marginTop: 20}}>
          <a href="http://tsl.mit.edu">
            <img
              style={styles.logo}
              src="https://tsl-public.s3.amazonaws.com/threeflows/teacher-moments-tsl-logo.png" />
          </a>
        </div>
      </div>
    );
  },

  renderScenarioItem(href, linkText, text, backgroundColor) {
    return (
      <Paper zDepth={3} style={{flex: 1, margin: 15, backgroundColor}}>
        <div style={{cursor: 'pointer', padding: 30, display: 'inline-block', textDecoration: 'none', color: '#333'}} onClick={this.onClicked.bind(this, href)}>
          <div style={{height: 180, alignItems: 'flex-start', justifyContent: 'space-between', display: 'flex', flexDirection: 'column'}}>
            <div style={{color: '#eee', fontSize: 24, fontWeight: 'bold', marginBottom: 10}}>{linkText}</div>
            <div style={{color: '#eee', fontSize: 18}}>{text}</div>
          </div>
        </div>
      </Paper>
    );
  }
});

const styles = {
  page: {
    width: 800,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 20,
    marginBottom: 20
  },
  content: {
    padding: 30,
    paddingTop: 10,
    backgroundColor: 'white'
  },
  quote: {
    fontStyle: 'italic'
  },
  list: {
    display: 'flex'
  },
  themes: {
    fontSize: 18
  },
  header: {
    margin: 0,
    marginBottom: 0,
    fontSize: 20
  },
  links: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 10,
    marginBottom: 40
  },
  link: {
    padding: 5,
    paddingLeft: 20
  }
};
