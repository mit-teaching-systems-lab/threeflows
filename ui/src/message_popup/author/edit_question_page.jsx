/* @flow weak */
import React from 'react';
import _ from 'lodash';

import * as Api from '../../helpers/api.js';
import {withStudents, withIndicator} from '../transformations.jsx';

import QuestionPage from './question_page.jsx';

export default React.createClass({
  displayName: 'EditQuestionPage',

  propTypes: {
    questionId: React.PropTypes.string.isRequired,
    loaded: React.PropTypes.bool,
    allQuestions: React.PropTypes.object
  },

  componentDidMount(){
    this.props.onReloadQuestions();
  },

  getNewID(){
    const {allQuestions} = this.props;
    const allQuestionsFlat = allQuestions.currentQuestions.concat(allQuestions.archivedQuestions);
    const largestID = _.maxBy(allQuestionsFlat, question => question.id).id;
    return largestID + 1;
  },

  onEditQuestion(newQuestion, originalQuestion){
    const {currentQuestions, archivedQuestions} = this.props.allQuestions;
    const question = {id: this.getNewID(), ...newQuestion};
    const newCurrentQuestions = currentQuestions.filter(question => question.id !== originalQuestion.id).concat(question);
    const newArchivedQuestions = archivedQuestions.concat(originalQuestion);
    console.log('Replacing...');
    console.log(originalQuestion);
    console.log('With...');
    console.log(question);
    Api.saveQuestions({currentQuestions: newCurrentQuestions, archivedQuestions: newArchivedQuestions});
  },

  onDeleteQuestion(originalQuestion){
    const {currentQuestions, archivedQuestions} = this.props.allQuestions;
    const newCurrentQuestions = currentQuestions.filter(question => question.id !== originalQuestion.id);
    const newArchivedQuestions = archivedQuestions.concat(originalQuestion);
    console.log('Archiving the question...');
    console.log(originalQuestion);
    Api.saveQuestions({currentQuestions: newCurrentQuestions, archivedQuestions: newArchivedQuestions});
  },

  render(){
    const {loaded, allQuestions} = this.props;
    const allQuestionsFlat =  allQuestions.currentQuestions.concat(allQuestions.archivedQuestions);
    const originalQuestion = _.find(withStudents(allQuestionsFlat).map(question => withIndicator(question)), question => question.id.toString() === this.props.questionId);
    return (
      <div>
        {!loaded &&
          <QuestionPage
            allQuestions={allQuestions}
            loaded={false}
            onEditQuestion={this.onEditQuestion}
            onDeleteQuestion={this.onDeleteQuestion}
            />
        }
        {loaded &&
          <QuestionPage 
            originalQuestion={originalQuestion}
            allQuestions={allQuestions}
            loaded={true}
            onEditQuestion={this.onEditQuestion}
            onDeleteQuestion={this.onDeleteQuestion}
            />
        }
      </div>
    );
  }
});