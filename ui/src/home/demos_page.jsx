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
    Routes.navigate(linkEl.props.href);
  },

  render() {
    return <HomeFrame>{this.renderScenarios()}</HomeFrame>;
  },

  renderScenarios() {
    return (
      <div>
        <h3 style={styles.header}>Scenarios</h3>
        <List>
          {this.renderScenarioItem(<a href="/teachermoments/sub">Computer science substitute</a>)}
          {this.renderScenarioItem(<a href="/teachermoments/csfair">Computer science projects</a>)}
          {this.renderScenarioItem(<a href="/teachermoments/danson">Parent meeting</a>)}
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
