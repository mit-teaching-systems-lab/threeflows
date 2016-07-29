import React from 'react';

import {withLearningObjectiveAndIndicator} from '../transformations.jsx';

import {ListItem} from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';

import SchoolIcon from 'material-ui/svg-icons/social/school';

export default React.createClass({
  displayName: 'ArchivedQuestionButton',

  propTypes: {
    question: React.PropTypes.object.isRequired,
    checking: React.PropTypes.bool,
    checked: React.PropTypes.bool,
    onTouchQuestion: React.PropTypes.func.isRequired,
    onSetDialog: React.PropTypes.func
  }, 

  getDefaultProps(){
    return ({
      checking: false,
      checked: false,
    });
  },

  onTouch(){
    this.props.onTouchQuestion(this.props.question.id);
  },

  render(){
    const question = withLearningObjectiveAndIndicator(this.props.question);
    return (
      <div>
        {!this.props.checking && 
          <ListItem
            style={{cursor: 'pointer', fontSize: 14}}
            leftIcon={<SchoolIcon />}
            onTouchTap={function(){
              this.onTouch();
              this.props.onSetDialog();
            }.bind(this)}
            primaryText={"#" + question.id + " " + question.learningObjective.competencyGroup}
            secondaryText={question.text}
            secondaryTextLines={2}
          />
        }
        {this.props.checking && 
          <ListItem
            style={{cursor: 'pointer', fontSize: 14}}
            leftCheckbox={<Checkbox checked={this.props.checked} onCheck={this.onTouch}/>}
            primaryText={"#" + question.id + " " + question.learningObjective.competencyGroup}
            secondaryText={question.text}
            secondaryTextLines={2}
          />
        }
      </div>
    );
  }
});