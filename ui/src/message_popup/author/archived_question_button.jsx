import React from 'react';

import {withStudents, withLearningObjectiveAndIndicator} from '../transformations.jsx';

import {ListItem} from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';

import SchoolIcon from 'material-ui/svg-icons/social/school';

export default React.createClass({
  displayName: 'ArchivedQuestionButton',

  propTypes: {
    question: React.PropTypes.object.isRequired,
    onTouchQuestion: React.PropTypes.func.isRequired
  }, 

  onTouch(){
    this.props.onTouchQuestion(withLearningObjectiveAndIndicator(withStudents([this.props.question])[0]));
  },

  render(){
    const question = withLearningObjectiveAndIndicator(this.props.question);
    return (
      <div>
        <ListItem
          style={{cursor: 'pointer', fontSize: 14}}
          leftIcon={<SchoolIcon />}
          onTouchTap={this.onTouch}
          primaryText={"#" + question.id + " " + question.learningObjective.competencyGroup}
          secondaryText={question.text}
          secondaryTextLines={2}
        />
      </div>
    );
  }
});