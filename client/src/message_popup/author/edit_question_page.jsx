import PropTypes from 'prop-types';
import React from 'react';
import _ from 'lodash';

import * as Api from '../../helpers/api.js';
import {withStudents, withIndicator} from '../transformations.jsx';

import QuestionPage from './question_page.jsx';

export default class extends React.Component {
  static displayName = 'EditQuestionPage';

  static propTypes = {
    questionId: PropTypes.string.isRequired,
  };

  state = {
    loaded: false,
    allQuestions: {
      currentQuestions: [],
      archivedQuestions: []
    }
  };

  componentDidMount() {
    this.queryDatabase();
  }

  queryDatabase = () => {
    Api.questionsQuery().end(this.onQuestionsReceived);
  };

  getNewID = () => {
    const {allQuestions} = this.state;
    const allQuestionsFlat = allQuestions.currentQuestions.concat(allQuestions.archivedQuestions);
    const mostRecentQuestion = _.maxBy(allQuestionsFlat, question => question.id);
    const largestID = mostRecentQuestion !== undefined ? mostRecentQuestion.id : 0;
    return largestID + 1;
  };

  onQuestionsReceived = (err, response) => {
    if(err){
      this.setState({loaded: true});
      return;
    }
    const allQuestions = JSON.parse(response.text).questions;
    this.setState({ loaded: true, allQuestions });
  };

  onEditQuestion = (newQuestion, originalQuestion) => {
    const {currentQuestions, archivedQuestions} = this.state.allQuestions;
    const question = {id: this.getNewID(), ...newQuestion};
    const newCurrentQuestions = currentQuestions.filter(question => question.id !== originalQuestion.id).concat(question);
    const newArchivedQuestions = archivedQuestions.concat(originalQuestion);
    Api.saveQuestions({currentQuestions: newCurrentQuestions, archivedQuestions: newArchivedQuestions});
  };

  onDeleteQuestion = (originalQuestion) => {
    const {currentQuestions, archivedQuestions} = this.state.allQuestions;
    const newCurrentQuestions = currentQuestions.filter(question => question.id !== originalQuestion.id);
    const newArchivedQuestions = archivedQuestions.concat(originalQuestion);
    Api.saveQuestions({currentQuestions: newCurrentQuestions, archivedQuestions: newArchivedQuestions});
  };

  render() {
    const {loaded, allQuestions} = this.state;
    const allQuestionsFlat =  allQuestions.currentQuestions.concat(allQuestions.archivedQuestions);
    const originalQuestion = _.find(withStudents(allQuestionsFlat).map(question => withIndicator(question)), question => question.id.toString() === this.props.questionId);
    return (
      <div>
        {!loaded &&
          <QuestionPage
            loaded={false}
            onEditQuestion={this.onEditQuestion}
            onDeleteQuestion={this.onDeleteQuestion}
          />
        }
        {loaded &&
          <QuestionPage 
            originalQuestion={originalQuestion}
            loaded={true}
            onEditQuestion={this.onEditQuestion}
            onDeleteQuestion={this.onDeleteQuestion}
          />
        }
      </div>
    );
  }
}