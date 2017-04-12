/* @flow weak */
import React from 'react';

import RaisedButton from 'material-ui/RaisedButton';
import * as Routes from '../routes.js';
import HomeFrame from './home_frame.jsx';


// The home page for the whole site.
export default React.createClass({
  displayName: 'HomePage',

  onTryItTapped(e) {
    e.preventDefault();
    Routes.navigate('/demos');
  },

  render() {
    return <HomeFrame>{this.renderQuoteAndLinks()}</HomeFrame>;
  },

  renderQuoteAndLinks() {
    return (
      <div>
        <div style={styles.quote}>
          "We conclude that, in the program we studied, prospective teachers have fewer opportunities to engage in approximations that focus on contingent, interactive practice than do novices in the other two professions we studied."
        </div>
        <div>Grossman et al. (<a target="_blank" href="https://cset.stanford.edu/sites/default/files/files/documents/publications/Grossman-TeachingPracticeACross-ProfessionalPerspective.pdf">2009</a>)</div>
        <div style={styles.links}>
          <RaisedButton
            onTouchTap={this.onTryItTapped}
            type="submit"
            style={{marginTop: 20, marginRight: 10}}
            secondary={true}
            label="Demos" />
          <a style={{padding: 10}} href="http://tsl.mit.edu/practice-spaces-for-teacher-preparation/">Learn more</a>
          <a style={{padding: 10}} href="https://github.com/mit-teaching-systems-lab/threeflows">Source code</a>

        </div>
      </div>
    );
  }
});

const styles = {
  quote: {
    fontStyle: 'italic'
  },
  links: {
    marginTop: 20
  }
};
