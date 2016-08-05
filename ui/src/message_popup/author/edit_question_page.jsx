/* @flow weak */
import React from 'react';
import _ from 'lodash';

import {allQuestions} from '../questions.js';
import {withStudents, withIndicator} from '../transformations.jsx';

import QuestionPage from './question_page.jsx';

export default React.createClass({
  displayName: 'EditQuestionPage',

  propTypes: {
    questionId: React.PropTypes.string.isRequired
  },

  render(){
    const question = withIndicator(withStudents([_.find(allQuestions, question => question.id.toString() === this.props.questionId)])[0]);
    return (
      <QuestionPage 
        originalQuestion={question}
        />
      );
  }
});