/* @flow weak */
import React from 'react';

import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import {List} from 'material-ui/List';
import * as muiColors from 'material-ui/styles/colors.js';
import * as Routes from '../../routes.js';


// Equity Workshop home page.  Intended for use in an in-person workshop,
// or as a landing page that can be shared publicly.
export default class extends React.Component {
  static displayName = 'EquityFairPage';

  onClicked = (href) => {
    if (href.indexOf('http') === 0) {
      window.location = href;
    } else {
      Routes.navigate(href);
    }
  };

  onTryItTapped = (e) => {
    e.preventDefault();
    Routes.navigate('/demos');
  };

  render() {
    return (
      <div style={styles.page}>
        <div style={styles.content}>
          <a href="http://tsl.mit.edu">
            <img
              alt="TSL logo"
              style={styles.logo}
              src="https://tsl-public.s3.amazonaws.com/threeflows/teacher-moments-tsl-logo.png" />
          </a>
        </div>
        <Divider style={{marginTop: 30, marginBottom: 30}} />
        <h2>Equity practice spaces</h2>
        <p style={{marginTop: 10, marginBottom: 20}}>These interactive case studies can be used to spark conversation during in-person workshops, as homework to seed work in class, or within online PLCs.  They can be used for initial exposure to challenges teachers face in classrooms, or as formative assessments.</p>
        <div>
          <div style={styles.themes}>Themes:</div>
          <ul>
            <li style={styles.themes}>Creating inclusiveness and belonging</li>
            <li style={styles.themes}>Seeing the whole student</li>
            <li style={styles.themes}>Surfacing assumptions and bias</li>
            <li style={styles.themes}>Disrupting privilege and power</li>
          </ul>
        </div>
        <div style={{marginTop: 40, marginBottom: 30}}>Question or new idea?  Reach out at <b>krob@mit.edu</b> or <a href="https://twitter.com/mit_tsl">@mit_tsl</a>.</div>
        {this.renderPanels()}
        {this.renderMoreInfo()}
      </div>
    );
  }

  renderPanels() {
    const scholasticaBlue = '#0B3662'; // from their website
    return (
      <div>
        <Divider style={{marginTop: 30, marginBottom: 30}} />
        <div style={styles.header}>Field-tested practice spaces</div>
        <List style={styles.list}>
          {this.renderPanel("/equity/climate?fromequity", '1: Gendered or racialized student comments', '"Climate"', muiColors.red400)}
          {this.renderPanel("/teachermoments/smith?fromequity", '2: Noticing student belonging in the classroom', '"Mr. Smith"', muiColors.blueGrey500)}
        </List>
        <List style={styles.list}>
          {this.renderPanel("/teachermoments/sub?fromequity", '3: Positioning students in the classroom', '"Lego pairs"', muiColors.green500)}
          {this.renderPanel("/teachermoments/rosa?fromequity", '4: Talking about identity', '"Rosa"', muiColors.indigo400)}
        </List>
        <List style={styles.list}>
          {this.renderPanel("https://swipe-right-for-cs.herokuapp.com/play?fromequity", '5: Connecting student strengths to academics', '"Swipe Right for CS"', muiColors.brown400)}
          {this.renderPanel("/teachermoments/jayden?fromequity", '6: Encouraging student growth', '"Jayden"', muiColors.orange700)}
        </List>
        <List style={styles.list}>
          {this.renderPanel("/teachermoments/turner?fromequity", '7: High expecations with parents', '"Jennifer Turner" (Dotger 2013)', muiColors.deepPurple500)}
          <div style={{flex: 1}} />
        </List>
        <Divider style={{marginTop: 30, marginBottom: 30}} />
        <div style={styles.header}>Paper prototypes: MIT</div>
        <List style={styles.list}>
          {this.renderPanel("/equity/paper/group-unfair?fromequity", 'Prototype: Coaching students about group work', '"Mark and Tyshawn"', muiColors.grey700)}
          {this.renderPanel("/equity/paper/mixing-languages?fromequity", 'Prototype: Languages in the classroom', '"Rosario"', muiColors.grey700)}
        </List>
        <List style={styles.list}>
          {this.renderPanel("/equity/paper/cell-posters?fromequity", 'Prototype: Facilitating group work', '"Lexi and Angel"', muiColors.grey700)}
          {this.renderPanel("/equity/paper/coordinates-privilege?fromequity", 'Prototype: Facilitating group work', '"Huey and Noah"', muiColors.grey700)}
        </List>
        <List style={styles.list}>
          {this.renderPanel("/equity/paper/asian-population-growth?fromequity", 'Prototype: Comments about nationality', '"Population growth"', muiColors.grey700)}
          {this.renderPanel("/equity/paper/maria-absent?fromequity", 'Prototype: Late to class', '"Maria"', muiColors.grey700)}
        </List>
        <List style={styles.list}>
          {this.renderPanel("/teachermoments/darius?fromequity", 'Prototype: Student concerns about equity', '"Darius" (Self 2016)', muiColors.grey700)}
          <div style={{flex: 1}} />
        </List>
        <Divider style={{marginTop: 30, marginBottom: 30}} />
        <div style={styles.header}>Paper prototypes: College of St. Scholastica</div>
        <List style={styles.list}>
          {this.renderPanel("/equity/paper/tom-absent?fromequity", 'Prototype: Equity within policies', '"Tom absent"', scholasticaBlue)}
          {this.renderPanel("/equity/paper/inclusion-special-ed?fromequity", 'Prototype: Talking about inclusion with colleagues', '"Mr. Johnson"', scholasticaBlue)}
        </List>
        <List style={styles.list}>
          {this.renderPanel("/equity/paper/math-questions?fromequity", 'Prototype: Academic classroom culture', '"Shawna"', scholasticaBlue)}
          {this.renderPanel("/equity/paper/bethany-conference-ela?fromequity", 'Prototype: Parent conference about grades (ELA)', '"Bethany, 10th grade ELA"', scholasticaBlue)}
        </List>
        <List style={styles.list}>
          {this.renderPanel("/equity/paper/bethany-conference-elementary-science?fromequity", 'Prototype: Parent conference about grades (science)', '"Bethany, 7th grade science"', scholasticaBlue)}
          <div style={{flex: 1}} />
        </List>
        <Divider style={{marginTop: 30, marginBottom: 30}} />
      </div>
    );
  };

  renderMoreInfo() {
    return (
      <div>
        <div style={styles.header}>Play more</div>
        <div style={styles.links}>
          <a style={styles.link} href="/demos">Try other practice spaces!</a>
          <div style={styles.link}><a href="http://tsl.mit.edu/practice-spaces-for-teacher-preparation/">Game-based practice spaces</a></div>
          <div style={styles.link}><a href="https://threeflows-blockly.herokuapp.com/">Prototype your own scenarios</a></div>
          <div style={styles.link}><a href="https://github.com/mit-teaching-systems-lab/threeflows">github.com/mit-teaching-systems-lab</a></div>
          <a style={styles.link} href="http://csteachingtips.org/tip-sheets" target="_blank" rel="noopener noreferrer">CSTeachingTips game: Practice responding to microaggressions</a>
        </div>
        <Divider style={{marginTop: 30, marginBottom: 30}} />
        <div style={styles.header}>Read more papers</div>
        <div style={styles.links}>
          <div style={styles.link}>Using Online Practice Spaces to Investigate Challenges in Enacting Principles of Equitable Computer Science Teaching (<a href="https://osf.io/preprints/socarxiv/ygazx/">Robinson and Reich, forthcoming</a>)</div>
          <div style={styles.link}>Using "Teacher Moments" as an Online Practice Space for Parent-Teacher Conference Simulation in Preservice Teacher Education (<a href="https://osf.io/preprints/socarxiv/9y5cd/">Owho-Ovuakporie 2017</a>)</div>
          <div style={styles.link}>Exposing Conditional Inclusive Ideologies Through Simulated Interactions (<a href="https://www.academia.edu/725220/Exposing_conditional_inclusive_ideologies_through_simulated_interactions?auto=download">Dotger and Ashby 2010</a>)</div>
          <div style={styles.link}>Designing and Using Clinical Simulations to Prepare Teachers for Culturally Responsive Teaching (<a href="http://etd.library.vanderbilt.edu/available/etd-03022016-165211/unrestricted/Self.pdf">Self 2016</a>)</div>
          <div style={styles.link}><a href="http://blogs.edweek.org/edweek/edtechresearcher/2017/03/helping_teachers_surface_and_address_bias_with_online_practice_spaces.html">Helping Teachers Surface and Address Bias with Online Practice Spaces</a></div>
          <div style={styles.link}><a href="https://mit-teaching-systems-lab.github.io/unconscious-bias/">Bias in teaching</a></div>
        </div>
        <div style={styles.header}>Read more books</div>
        <div style={{display: 'flex', flexDirection: 'row', width: '95%', padding: 20}}>
          <a style={{paddingRight: 10}} href="https://mitpress.mit.edu/books/stuck-shallow-end">
            <img width="159" height="240" alt="Stuck in the Shallow End book" src="https://s3-us-west-2.amazonaws.com/tsl-public/threeflows/equity_fair/stuck.jpg" />
          </a>
          <a style={{paddingRight: 10}} href="https://eric.ed.gov/?id=ED515443">
            <img width="160" height="240" alt="Start Where You Are But Don't Stay There book" src="https://s3-us-west-2.amazonaws.com/tsl-public/threeflows/equity_fair/start.jpg" />
          </a>
          <a style={{paddingRight: 10}} href="https://www.amazon.com/Had-No-Idea-Simulations-Development/dp/1623961955">
            <img width="186" height="240" alt="I Had No Idea! Clinical Simulations for Teacher Development book" src="https://s3-us-west-2.amazonaws.com/tsl-public/threeflows/equity_fair/noidea.jpg" />
          </a>
          <a style={{paddingRight: 10}} href="https://www.tcpress.com/culturally-sustaining-pedagogies-9780807758335">
            <img width="162" height="240" alt="Culturally Sustaining Pedagogies book" src="https://s3-us-west-2.amazonaws.com/tsl-public/threeflows/equity_fair/csp.jpg" />
          </a>
        </div>
        <Divider style={{marginTop: 30, marginBottom: 30}} />
        <div style={{marginTop: 20}}>
          <a href="http://tsl.mit.edu">
            <img
              style={styles.logo}
              alt="TSL logo"
              src="https://tsl-public.s3.amazonaws.com/threeflows/teacher-moments-tsl-logo.png" />
          </a>
        </div>
      </div>
    );
  };

  renderPanel = (href, linkText, text, backgroundColor) => {
    return (
      <Paper zDepth={3} style={{flex: 1, margin: 15, backgroundColor}}>
        <div style={{cursor: 'pointer', padding: 30, display: 'inline-block', textDecoration: 'none', color: '#333'}} onClick={this.onClicked.bind(this, href)}>
          <div style={{height: 180, alignItems: 'flex-start', justifyContent: 'space-between', display: 'flex', flexDirection: 'column'}}>
            <div style={{color: '#eee', fontSize: 24, marginBottom: 10}}>{linkText}</div>
            <div style={{color: '#eee', fontSize: 18}}>{text}</div>
          </div>
        </div>
      </Paper>
    );
  };
}

const styles = {
  page: {
    width: 740,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 20,
    marginBottom: 20,
    padding: 30,
    backgroundColor: 'white'
  },
  content: {
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
    fontSize: 20,
    marginTop: 30
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
