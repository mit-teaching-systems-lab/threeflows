/* @flow weak */
import PropTypes from 'prop-types';

import React from 'react';
import VelocityTransitionGroup from "velocity-react/velocity-transition-group";
import 'velocity-animate/velocity.ui';

import Divider from 'material-ui/Divider';

/*
Component asking for feedback and linking out to Google form.
*/
export default React.createClass({
  displayName: 'Feedback',

  propTypes: {
    feedbackFormUrl: PropTypes.string
  },

  getDefaultProps() {
    return {
      feedbackFormUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSdC7CrSkmA8Y2ZEmKwuzfeaijMoO-KZMbgEz9Q-Ay2f8u8Klw/viewform'
    };
  },

  render() {
    const {feedbackFormUrl} = this.props;

    return (
      <div className="done">
        <VelocityTransitionGroup enter={{animation: "slideDown"}} leave={{animation: "slideUp"}} runOnMount={true}>
          <div style={{...styles.container, ...styles.done}}>
            <div style={styles.doneTitle}>Thanks!</div>
            <div style={styles.doneTitle}>If you're at a workshop and have a feedback capture grid, please share your thoughts with us!</div>
            <Divider style={{marginTop: 20}} />
            <div style={{paddingTop: 20, fontSize: 18}}>
              If you ran into this online, we'd love to
              <a
                href={feedbackFormUrl}
              > hear from you</a> too. :)
            </div>
          </div>
        </VelocityTransitionGroup>
      </div>
    );
  }
});

const styles = {
  container: {
    fontSize: 20,
    padding: 0,
    margin:0,
    paddingBottom: 0
  },
  done: {
    padding: 20,
  },
  doneTitle: {
    marginBottom: 10
  }
};