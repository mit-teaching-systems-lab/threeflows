/* @flow weak */
import React from 'react';

import {ListItem} from 'material-ui/List';
import SchoolIcon from 'material-ui/svg-icons/social/school';

import {withIndicator} from '../transformations.jsx';
import * as Routes from '../../routes.js';


export default React.createClass({
  displayName: 'QuestionButton',

  propTypes: {
    question: React.PropTypes.object.isRequired,
    doNavigate: React.PropTypes.func.isRequired
  }, 

  onItemClicked(){
    const url = Routes.messagePopupAuthorQuestionsEditPath(this.props.question.id);
    this.props.doNavigate(url);
  },

  render(){
    const question = withIndicator(this.props.question);
    return (
      <ListItem
        style={{cursor: 'pointer', fontSize: 14}} 
        leftIcon={<SchoolIcon />}
        primaryText={"#" + question.id + " " + question.indicator.text}
        secondaryText={question.text}
        secondaryTextLines={2}
        onTouchTap={this.onItemClicked}
      />
    );
  }
});