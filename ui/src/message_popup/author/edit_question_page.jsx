/* @flow weak */
import React from 'react';
import _ from 'lodash';

import {allQuestions} from '../questions.js';
import {withStudents, withLearningObjectiveAndIndicator} from '../transformations.jsx';

import QuestionPage from './question_page.jsx';

export default React.createClass({
  displayName: 'EditQuestionPage',

  propTypes: {
    questionId: React.PropTypes.string.isRequired
  },

  render(){
    const question = withLearningObjectiveAndIndicator(_.find(withStudents(allQuestions), question => question.id.toString()===this.props.questionId));
    return (
      <QuestionPage 
        originalQuestion={question}
        />
      );
  }
});