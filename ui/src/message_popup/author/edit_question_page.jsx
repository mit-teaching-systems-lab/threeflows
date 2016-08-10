/* @flow weak */
import React from 'react';
import _ from 'lodash';

import * as Api from '../../helpers/api.js';
import {allQuestions} from '../questions.js';
import {allArchivedQuestions} from './archived_questions.js';
import {withStudents, withIndicator} from '../transformations.jsx';

import QuestionPage from './question_page.jsx';

export default React.createClass({
  displayName: 'EditQuestionPage',

  propTypes: {
    questionId: React.PropTypes.string.isRequired
  },

  getInitialState(){
    return ({
      allDatabaseQuestions: {
        currentQuestions: [],
        archivedQuestions: []
      }
    });
  },

  componentDidMount(){
    Api.questionsQuery().end(this.onQuestionsReceived);
  },

  onQuestionsReceived(err, response){
    const allDatabaseQuestions = JSON.parse(response.text).row;
    if(allDatabaseQuestions === undefined) {
      this.setState({
        allDatabaseQuestions: {
          currentQuestions: allQuestions, 
          archivedQuestions: allArchivedQuestions
        }
      });
      return;
    }
    this.setState({ allDatabaseQuestions: allDatabaseQuestions });
  },

  render(){
    const allQuestionsFlat =  this.state.allDatabaseQuestions.currentQuestions.concat(this.state.allDatabaseQuestions.archivedQuestions);
    const originalQuestion = _.find(withStudents(allQuestionsFlat).map(question => withIndicator(question)), question => question.id.toString() === this.props.questionId);
    return (
      <QuestionPage 
        originalQuestion={originalQuestion}
        allQuestions={this.state.allDatabaseQuestions}
        />
      );
  }
});