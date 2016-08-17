import React from 'react';
import _ from 'lodash';

import QuestionPage from './question_page.jsx';
import * as Api from '../../helpers/api.js';


export default React.createClass({
  displayName: 'NewQuestionPage',

  propTypes: {
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

  onCreateQuestion(newQuestion){
    const {currentQuestions, archivedQuestions} = this.props.allQuestions;
    const question = {id: this.getNewID(), ...newQuestion};
    const newCurrentQuestions = currentQuestions.concat(question);
    console.log('Creating new question...');
    console.log(question);
    Api.saveQuestions({currentQuestions: newCurrentQuestions, archivedQuestions});
  },

  render(){
    const {loaded, allQuestions} = this.props;
    return (
      <div>
        <QuestionPage
          allQuestions={allQuestions}
          loaded={loaded}
          onCreateQuestion={this.onCreateQuestion}
          />
      </div>
    );
  }
});