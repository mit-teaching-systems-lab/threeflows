import React from 'react';

import QuestionPage from './question_page.jsx';
import {allArchivedQuestions} from './archived_questions.js';
import {allQuestions} from '../questions.js';
import * as Api from '../../helpers/api.js';


export default React.createClass({
  displayName: 'NewQuestionPage',

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
    return (
      <div>
        <QuestionPage
          allQuestions={allDatabaseQuestions}
          loaded={loaded}
          />
      </div>
    );
  }
});