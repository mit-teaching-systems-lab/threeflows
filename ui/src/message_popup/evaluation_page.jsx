// @flow
import React from 'react';
import VelocityTransitionGroup from "velocity-react/velocity-transition-group";
import 'velocity-animate/velocity.ui';


/*
UI for evaluating Message PopUp responses
*/
export default React.createClass({
  displayName: 'MessagePopupEvaluationPage',

  propTypes: {
    query: React.PropTypes.object.isRequired
  },

  render() {
    return (
      <div style={styles.container}>
        <VelocityTransitionGroup enter={{animation: "slideDown"}} leave={{animation: "slideUp"}} runOnMount={true}>
          <div style={styles.message}>No scores ready yet!</div>
        </VelocityTransitionGroup>
      </div>
    );
  }
});

const styles = {
  container: {
    border: '1px solid #ccc',
    margin: 20,
    width: 400,
    fontSize: 20,
    padding: 0
  },
  message: {
    padding: 20,
    fontSize: 32
  }
};