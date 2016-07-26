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
    var goodExamplesText = '';
    _.forEach(question.examples, example => {goodExamplesText += (goodExamplesText === '' ? '' : '\n\n') + example;});
    var badExamplesText = '';
    _.forEach(question.nonExamples, example => {badExamplesText += (badExamplesText === '' ? '' : '\n\n') + example;});
    return (
      <QuestionPage 
        originalQuestion={question}
        questionText={question.text}
        students={question.students}
        learningObjective={question.learningObjective}
        indicator={question.indicator}
        goodExamplesText={goodExamplesText}
        badExamplesText={badExamplesText}
        />
      );
  }
});