/* @flow weak */
import React from 'react';

import {List, ListItem} from 'material-ui/List';
import HomeFrame from './home_frame.jsx';
import * as Routes from '../routes.js';


// A list of demos to try, aimed to CS bias folks.
export default React.createClass({
  displayName: 'CsBiasPage',

  onTappedMenu(e) {
    window.location.reload();
  },

  onTappedItem(linkEl) {
    Routes.navigate(linkEl.props.href);
  },

  render() {
    return <HomeFrame>{this.renderScenarios()}</HomeFrame>;
  },

  renderScenarios() {
    return (
      <div>
        <p>These interactive case studies can be used to seed conversation during in-person workshops, as homework to seed class discussions, or within online PLCs.</p>
        <img width="95%" style={{padding: 10}} src="https://mit-teaching-systems-lab.github.io/unconscious-bias/assets/cycle.jpg" />
        <h3 style={styles.header}>Equity in computer science</h3>
        <List>
          {this.renderScenarioItem(<a href="/teachermoments/sub?frombias">Bias in facilitating pair work</a>)}
          {this.renderScenarioItem(<a href="/teachermoments/rosa?frombias">Checking in with a student</a>)}
          {this.renderScenarioItem(<a href="/teachermoments/jayden?frombias">Talking with a student considering dropping the course</a>)}
          {this.renderScenarioItem(<a href="/teachermoments/smithB">Noticing student belonging in class</a>)}
        </List>
        <h3 style={styles.header}>Parent conversations</h3>
        <List>
          {this.renderScenarioItem(<a href="/teachermoments/danson">Supporting a special needs student</a>)}
          {this.renderScenarioItem(<a href="/teachermoments/turner">Parent doesn't value school</a>)}
        </List>
        <div style={{marginTop: 50}}>New idea?  Reach out at <a href="https://twitter.com/mit_tsl">@mit_tsl</a>.</div>
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
    marginTop: 30,
    marginBottom: 5
  },
  listItem: {
    padding: 5,
    paddingLeft: 10
  }
};
