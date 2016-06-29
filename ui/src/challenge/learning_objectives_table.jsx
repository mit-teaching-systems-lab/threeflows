/* @flow weak */
import _ from 'lodash';
import React from 'react';
import * as PropTypes from '../prop_types.js';
import {
  Table,
  TableBody,
  TableRow,
  TableRowColumn
} from 'material-ui/Table';


export default React.createClass({
  displayName: 'LearningObjectivesTable',

  propTypes: {
    learningObjectives: React.PropTypes.arrayOf(PropTypes.LearningObjective).isRequired
  },

  collapseLearningObjectives(learningObjectives) {
    const sortedLearningObjectives = _.sortBy(learningObjectives, (objective) => {
      if (objective.key.indexOf('PP') === 0) return [10, objective.key];
      if (objective.key.indexOf('IN') === 0) return [20, objective.key];
      if (objective.key.indexOf('BIO') === 0) return [30, objective.key];
      return [40, objective.key];
    });
    return _.map(_.groupBy(sortedLearningObjectives, 'competencyGroup'), (objectives, competencyGroup) => {
      return {
        competencyGroup,
        text: _.map(objectives, objective => `${objective.text}  ${objective.key}`).join("\n\n")
      };
    });
  },

  render() {
    const collapsedLearningObjectives = this.collapseLearningObjectives(this.props.learningObjectives);
    return (
      <Table>
        <TableBody displayRowCheckbox={false}>
          {collapsedLearningObjectives.map(function(learningObjective) {
            return (
              <TableRow key={learningObjective.competencyGroup} style={{height: 'auto'}}>
                <TableRowColumn style={{verticalAlign: 'top', whiteSpace: 'pre-wrap', paddingTop: 10, paddingBottom: 10, width: '30%'}}>
                  <div style={{fontSize: 18}}>{learningObjective.competencyGroup}</div>
                  <div style={{fontSize: 10}}>{learningObjective.key}</div>
                </TableRowColumn>
                <TableRowColumn style={{verticalAlign: 'top', whiteSpace: 'pre-wrap', paddingTop: 10, paddingBottom: 10}}>{learningObjective.text}</TableRowColumn>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    );
  }
});
