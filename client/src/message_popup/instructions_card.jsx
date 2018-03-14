/* @flow weak */
import PropTypes from 'prop-types';

import React from "react";
import _ from "lodash";
import Divider from 'material-ui/Divider';

export default class extends React.Component {
  props: {query: Object};
  static displayName = "InstructionsCard";

  static propTypes = {
    query: PropTypes.object.isRequired,
  };

  state = {
    isSolutionMode: _.has(this.props.query, "solution"),
  };

  render() {
    const{isSolutionMode} = this.state;
    return (
      <div style ={_.merge(_.clone(styles.container), styles.instructions)}>
        {isSolutionMode &&
          <p style={styles.paragraph}>Clear 15 minutes.  Your work is timed, so being able to focus is important.</p>
        }
        {!isSolutionMode && 
          <p style={styles.paragraph}>This will feel uncomfortable at first, but better to get comfortable here than with real students.</p>
        }
        <p style={styles.paragraph}>You may be asked to write, sketch or say your responses aloud.</p>
        <p style={styles.paragraph}>Each question is timed to simulate responding in the moment in the classroom.  Aim to respond to each scenario in about 90 seconds.</p>
        {_.has(this.props.query, "mobilePrototype") &&
          <p style={styles.paragraph}>You can tap on the icons in the left margin to see more information about the question's students.</p>
        }
        <Divider />
      </div>
    );
  }
}

const styles = {
  instructions: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  container: {
    margin: 0,
    fontSize: 20,
    padding: 0
  },
  paragraph: {
    marginTop: 20,
    marginBottom: 20
  }
};