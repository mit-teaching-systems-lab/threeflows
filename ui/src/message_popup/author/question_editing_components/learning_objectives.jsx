/* @flow weak */
import React from 'react';

import {learningObjectives} from '../../../data/learning_objectives.js';

import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

export default React.createClass({
  displayName: 'LearningObjectives',

  propTypes: {
    learningObjective: React.PropTypes.object.isRequired,
    onChangeLearningObjective: React.PropTypes.func.isRequired
  },

  render(){
    const {learningObjective, onChangeLearningObjective} = this.props;
    return (
      <Paper style={styles.container}>
        <div style={styles.title}>Learning Objective</div>
        <Divider />
        <div style={styles.learningObjectiveTitle}>{learningObjective.key + " " + learningObjective.competencyGroup}</div>
        <div style={styles.learningObjectiveText}>{learningObjective.text}</div>
        <DropDownMenu value={learningObjective.id} style={{width:'100%'}} onChange={onChangeLearningObjective}>
          {learningObjectives.map(otherLearningObjective => <MenuItem value={otherLearningObjective.id} key={otherLearningObjective.key} primaryText={otherLearningObjective.key}/>)}
        </DropDownMenu>
      </Paper>
      );
  }
});

const styles = {
  container: {
    margin: 5,
    padding: 10,
    fontSize: 14
  },
  title: {
    marginBottom: 5,
    fontSize: 18,
    fontWeight: 'bold'
  },
  learningObjectiveTitle: {
    marginTop:10,
    fontSize: 14
  },
  learningObjectiveText: {
    padding: 10,
    paddingTop: 5,
  },
};