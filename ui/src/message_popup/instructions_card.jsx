/* @flow weak */
import React from "react";
import _ from "lodash";
import Divider from 'material-ui/Divider';

export default React.createClass({
  displayName: "InstructionsCard",
  
  propTypes: {
    itemsToShow: React.PropTypes.object.isRequired,
  },
  
  getInitialState(){
    return ({
      isSolutionMode: _.has(this.props.itemsToShow, "solution"),
    });
  },
  
  render(){
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
        {_.has(this.props.itemsToShow, "mobilePrototype") &&
          <p style={styles.paragraph}>You can tap on the icons in the left margin to see more information about the question's students.</p>
        }
        <Divider />
      </div>
    );
  }
});

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