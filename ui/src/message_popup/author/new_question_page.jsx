/* eslint no-console: "off" */
import React from 'react';
import _ from 'lodash';

import QuestionPage from './question_page.jsx';
import * as Api from '../../helpers/api.js';

export default React.createClass({
  displayName: 'NewQuestionPage',

  propTypes: {
    loaded: React.PropTypes.bool,
    allQuestions: React.PropTypes.object,
  },

  getDefaultProps(){
    return({
      loaded: false,
      allQuestions: {
        currentQuestions: [],
        archivedQuestions: []
      }
    });
  },

  getInitialState(){
    return ({
      loaded:  this.props.loaded,
      allQuestions: this.props.allQuestions
    });
  },

  componentDidMount(){
    this.queryDatabase();
  },

  queryDatabase(){
    Api.questionsQuery().end(this.onQuestionsReceived);
  },


  getNewID(){
    const {allQuestions} = this.state;
    const allQuestionsFlat = allQuestions.currentQuestions.concat(allQuestions.archivedQuestions);
    const mostRecentQuestion = _.maxBy(allQuestionsFlat, question => question.id);
    const largestID = mostRecentQuestion !== undefined ? mostRecentQuestion.id : 0;
    return largestID + 1;
  },

  onQuestionsReceived(err, response){
    if(err){
      this.setState({loaded: true});
      return;
    }
    const allQuestions = JSON.parse(response.text).questions;
    this.setState({ loaded: true, allQuestions });
  },

  onCreateQuestion(newQuestion){
    const {currentQuestions, archivedQuestions} = this.state.allQuestions;
    const question = {id: this.getNewID(), ...newQuestion};
    const newCurrentQuestions = currentQuestions.concat(question);
    console.log('Creating new question...');
    console.log(question);
    Api.saveQuestions({currentQuestions: newCurrentQuestions, archivedQuestions});
  },

  render(){
    const {loaded} = this.state;
    return (
      <div>
        <QuestionPage
          loaded={loaded}
          onCreateQuestion={this.onCreateQuestion}
          />
      </div>
    );
  }
});