/* @flow weak */
import React from 'react';

import IconButton from 'material-ui/IconButton';
import DescriptionIcon from 'material-ui/svg-icons/action/description';

import NavigationAppBar from './components/navigation_app_bar.jsx';
import ResponsiveFrame from './components/responsive_frame.jsx';



export default React.createClass({
  displayName: 'HomePage',

  onTappedDoc(e) {
    window.location = 'http://tsl.mit.edu';
  },

  render() {
    return (
      <div className="HomePage">
        <ResponsiveFrame>
          <div style={styles.page}>
            <NavigationAppBar
              title="Teacher Moments"
              iconElementLeft={
                <IconButton onTouchTap={this.onTappedDoc} >
                  <DescriptionIcon />
                </IconButton>
              }
            />
            {this.renderContent()}
          </div>
        </ResponsiveFrame>
      </div>
    );
  },

  renderContent() {
    return (
      <div style={styles.content}>
        <div style={styles.textBlock}>
          <h2><a style={styles.nolink} href="http://tsl.mit.edu/practice-spaces-for-teacher-preparation/">Practice spaces for teacher preparation programs</a></h2>
          <div style={styles.quote}>
            "We conclude that, in the program we studied, prospective teachers have fewer opportunities to engage in approximations that focus on contingent, interactive practice than do novices in the other two professions we studied."
          </div>
          <div>Grossman et al. (<a target="_blank" href="https://cset.stanford.edu/sites/default/files/files/documents/publications/Grossman-TeachingPracticeACross-ProfessionalPerspective.pdf">2009</a>)</div>
          <div style={styles.links}>
            <div><a href="http://tsl.mit.edu">Lab website</a></div>
            <div><a href="https://github.com/mit-teaching-systems-lab">Source code</a></div>
          </div>
        </div>
        <div style={styles.logoBlock}>
          <a href="http://tsl.mit.edu">
            <img
              style={styles.logo}
              src="http://tsl.mit.edu/wp-content/uploads/2016/10/cropped-teachingsystemslab_equalfocuslogo_blkteal-for-web.png" />
          </a>
        </div>
      </div>
    );
  }
});

const styles = {
  page: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    height: '100%'
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%'
  },
  textBlock: {
    flex: 1,
    margin: 20,
    marginTop: 0
  },
  logoBlock: {
  },
  logo: {
    width: '80%',
    margin: 20
  },
  quote: {
    fontStyle: 'italic'
  },
  links: {
    marginTop: 20
  },
  nolink: {
    textDecoration: 'none',
    color: 'black'
  }
};
