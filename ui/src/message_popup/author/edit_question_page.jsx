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
      loaded: false,
      allDatabaseQuestions: {
        currentQuestions: allQuestions,
        archivedQuestions: allArchivedQuestions
      }
    });
  },

  componentDidMount(){
    Api.questionsQuery().end(this.onQuestionsReceived);
  },

  onQuestionsReceived(err, response){
    const questions = JSON.parse(response.text).questions;
    if(questions !== undefined){
      this.setState({loaded: true, allDatabaseQuestions: questions});
      return;
    }
    this.setState({loaded: true});
  },

  render(){
    const {loaded, allDatabaseQuestions} = this.state;
    const allQuestionsFlat =  this.state.allDatabaseQuestions.currentQuestions.concat(this.state.allDatabaseQuestions.archivedQuestions);
    const originalQuestion = _.find(withStudents(allQuestionsFlat).map(question => withIndicator(question)), question => question.id.toString() === this.props.questionId);
    return (
      <div>
        {!loaded &&
          <QuestionPage
            allQuestions={allDatabaseQuestions}
            loaded={false}
            />
        }
        {loaded &&
          <QuestionPage 
            originalQuestion={originalQuestion}
            allQuestions={allDatabaseQuestions}
            loaded={true}
            />
        }
      </div>
    );
  }
});