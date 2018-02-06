/* @flow weak */
import PropTypes from 'prop-types';

import React from 'react';

import {withStudents, withIndicator} from '../transformations.jsx';

import {ListItem} from 'material-ui/List';

import SchoolIcon from 'material-ui/svg-icons/social/school';

export default React.createClass({
  displayName: 'ArchivedQuestionButton',

  propTypes: {
    question: PropTypes.object.isRequired,
    onTouchQuestion: PropTypes.func.isRequired
  }, 

  onTouch(){
    this.props.onTouchQuestion(withIndicator(withStudents([this.props.question])[0]));
  },

  render(){
    const question = withIndicator(this.props.question);
    return (
      <div>
        <ListItem
          style={{cursor: 'pointer', fontSize: 14}}
          leftIcon={<SchoolIcon />}
          onTouchTap={this.onTouch}
          primaryText={"#" + question.id + " " + question.indicator.text}
          secondaryText={question.text}
          secondaryTextLines={2}
        />
      </div>
    );
  }
});