/* @flow weak */
import React from 'react';

import {List, ListItem} from 'material-ui/List';
import HomeFrame from './home_frame.jsx';
import * as Routes from '../routes.js';


// A list of demos to try.
export default class extends React.Component {
  static displayName = 'DemosPage';

  onTappedMenu = (e) => {
    window.location.reload();
  };

  onTappedItem = (linkEl) => {
    const href = linkEl.props.href;
    if (href.indexOf('http') === 0) {
      window.location = href;
    } else {
      Routes.navigate(href);
    }
  };

  render() {
    return <HomeFrame>{this.renderScenarios()}</HomeFrame>;
  }

  renderScenarios = () => {
    return (
      <div>
        <h3 style={styles.header}>Equity and bias</h3>
        <List>
          {this.renderScenarioItem(<a href="/equity/climate?fromdemos">Gendered or racialized student comments</a>)}
          {this.renderScenarioItem(<a href="/teachermoments/smith?fromdemos">Noticing student belonging in the classroom</a>)}
          {this.renderScenarioItem(<a href="/teachermoments/sub?fromdemos">Positioning students in the classroom</a>)}
          {this.renderScenarioItem(<a href="/teachermoments/rosa?fromdemos">Talking about identity</a>)}
          {this.renderScenarioItem(<a href="https://swipe-right-for-cs.herokuapp.com/play?fromdemos">Connecting student strengths to academics</a>)}
          {this.renderScenarioItem(<a href="/teachermoments/jayden?fromdemos">Encouraging student growth</a>)}
          {this.renderScenarioItem(<a href="/teachermoments/csfair?fromdemos">Computer science projects</a>)}
        </List>
        <List>
          <h3 style={styles.header}>Parent conversations</h3>
          {this.renderScenarioItem(<a href="/teachermoments/danson?fromdemos">Supporting a special needs student</a>)}
          {this.renderScenarioItem(<a href="/teachermoments/turner?fromdemos">Parent doesn't value school</a>)}
        </List>
        <h3 style={styles.header}>Prototypes and experiments</h3>
        <List>
          {this.renderScenarioItem(<a href="/teachermoments/original?fromdemos">Choose your skill</a>)}
          {this.renderScenarioItem(<a href="/teachermoments/darius?fromdemos">Darius</a>)}
          {this.renderScenarioItem(<a href="/teachermoments/discipline?fromdemos">Middle school classroom management</a>)}
          {this.renderScenarioItem(<a href="/teachermoments/mentoring?fromdemos">Mentoring session</a>)}
          {this.renderScenarioItem(<a href="/teachermoments/alpha?fromdemos">Mini: Tired in class</a>)}
          {this.renderScenarioItem(<a href="/teachermoments/mindset?fromdemos">Mini: New student</a>)}
          {this.renderScenarioItem(<a href="/teachermoments/twine?fromdemos">Twine integration: Greeting students</a>)}
          {this.renderScenarioItem(<a href="/teachermoments/demo?fromdemos">Technical demo</a>)}
          {this.renderScenarioItem(<a href="/teachermoments/chat?fromdemos">Chat-based interface</a>)}
        </List>
        <div style={{marginTop: 20}}>New idea?  Reach out at <a href="https://twitter.com/mit_tsl">@mit_tsl</a>.</div>
      </div>
    );
  };

  renderScenarioItem = (linkEl) => {
    return (
      <ListItem
        innerDivStyle={styles.listItem}
        onTouchTap={this.onTappedItem.bind(this, linkEl)}
        primaryText={linkEl} />
    );
  };
}

const styles = {
  header: {
    margin: 0,
    marginTop: 25
  },
  listItem: {
    padding: 5
  }
};
