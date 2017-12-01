/* @flow weak */
import React from 'react';

import {List, ListItem} from 'material-ui/List';
import HomeFrame from './home_frame.jsx';
import * as Routes from '../routes.js';


// A list of demos to try.
export default React.createClass({
  displayName: 'DemosPage',

  onTappedMenu(e) {
    window.location.reload();
  },

  onTappedItem(linkEl) {
    const href = linkEl.props.href;
    if (href.indexOf('http') === 0) {
      window.location = href;
    } else {
      Routes.navigate(href);
    }
  },

  render() {
    return <HomeFrame>{this.renderScenarios()}</HomeFrame>;
  },

  renderScenarios() {
    return (
      <div>
        <h3 style={styles.header}>Equity and bias</h3>
        <List>
          {this.renderScenarioItem(<a href="/equity/climate?fromequity">Gendered or racialized student comments</a>)}
          {this.renderScenarioItem(<a href="/teachermoments/smith?fromequity">Noticing student belonging in the classroom</a>)}
          {this.renderScenarioItem(<a href="/teachermoments/sub?fromequity">Positioning students in the classroom</a>)}
          {this.renderScenarioItem(<a href="/teachermoments/rosa?fromequity">Talking about identity</a>)}
          {this.renderScenarioItem(<a href="https://swipe-right-for-cs.herokuapp.com/play?fromequity">Connecting student strengths to academics</a>)}
          {this.renderScenarioItem(<a href="/teachermoments/jayden?fromequity">Encouraging student growth</a>)}
          {this.renderScenarioItem(<a href="/teachermoments/csfair">Computer science projects</a>)}
        </List>
        <List>
        <h3 style={styles.header}>Parent conversations</h3>
          {this.renderScenarioItem(<a href="/teachermoments/danson?frombias">Supporting a special needs student</a>)}
          {this.renderScenarioItem(<a href="/teachermoments/turner?frombias">Parent doesn't value school</a>)}
        </List>
        <h3 style={styles.header}>Early prototypes</h3>
        <List>
          {this.renderScenarioItem(<a href="/teachermoments/original">Choose your skill</a>)}
          {this.renderScenarioItem(<a href="/teachermoments/darius">Darius</a>)}
          {this.renderScenarioItem(<a href="/teachermoments/discipline">Middle school classroom management</a>)}
          {this.renderScenarioItem(<a href="/teachermoments/mentoring">Mentoring session</a>)}
          {this.renderScenarioItem(<a href="/teachermoments/alpha">Mini: Tired in class</a>)}
          {this.renderScenarioItem(<a href="/teachermoments/mindset">Mini: New student</a>)}
          {this.renderScenarioItem(<a href="/teachermoments/twine">Twine integration: Greeting students</a>)}
          {this.renderScenarioItem(<a href="/teachermoments/demo">Technical demo</a>)}
          {this.renderScenarioItem(<a href="/teachermoments/chat">Chat-based interface</a>)}
        </List>
        <div style={{marginTop: 20}}>New idea?  Reach out at <a href="https://twitter.com/mit_tsl">@mit_tsl</a>.</div>
      </div>
    );
  },

  renderScenarioItem(linkEl) {
    return (
      <ListItem
        innerDivStyle={styles.listItem}
        onTouchTap={this.onTappedItem.bind(this, linkEl)}
        primaryText={linkEl} />
    );
  }
});

const styles = {
  header: {
    margin: 0,
    marginTop: 25
  },
  listItem: {
    padding: 5
  }
};
