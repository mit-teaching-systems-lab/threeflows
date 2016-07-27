import React from 'react';
import _ from 'lodash';

import * as Routes from '../../routes.js';

import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';
import IconButton from 'material-ui/IconButton';

import SearchIcon from 'material-ui/svg-icons/action/search';
import AddIcon from 'material-ui/svg-icons/content/add';

import NavigationAppBar from '../../components/navigation_app_bar.jsx';
import QuestionButton from './question_button.jsx';

import {allQuestions} from '../questions.js';
import {withStudents, withLearningObjectiveAndIndicator} from '../transformations.jsx';

export default React.createClass({
  displayName: 'AuthorQuestionsPage',

  getInitialState(){
    return ({
      questions: allQuestions
    });
  },
  
  onNewQuestion(){
    Routes.navigate(Routes.messagePopupAuthorQuestionsNewPath());
  },

  onSearchBarChange(event){
    const value = event.target.value.toLowerCase().trim();
    if(value === ''){
      this.setState({questions: allQuestions});
    }else{
      var questions = _.clone(allQuestions);
      questions = questions.filter(questionOriginal => {
        const question = withStudents([withLearningObjectiveAndIndicator(questionOriginal)])[0];
        var questionString = question.id + " " + question.text + " " + question.learningObjective.key + " " + question.learningObjective.text + " " + question.learningObjective.competencyGroup + " " + question.indicator.text;
        if(_.has(question, 'students')) _.forEach(question.students, student => questionString += " " + student.id + " " + student.name);
        _.forEach(question.examples, example => questionString += " " + example);
        _.forEach(question.nonExamples, example => questionString += " " + example);
        return questionString.toLowerCase().includes(value);
      });
      questions = questions.sort(questionOriginal => {
        const question = withStudents([withLearningObjectiveAndIndicator(questionOriginal)])[0];
        var questionString = question.id + " " + question.text + " " + question.learningObjective.key + " " + question.learningObjective.text + " " + question.learningObjective.competencyGroup + " " + question.indicator.text;
        if(_.has(question, 'students')) _.forEach(question.students, student => questionString += " " + student.id + " " + student.name);
        _.forEach(question.examples, example => questionString += " " + example);
        _.forEach(question.nonExamples, example => questionString += " " + example);
        return questionString.split(value).length
      })
      this.setState({questions});
    }
  },

  render(){
    return(
      <div>
        <NavigationAppBar
          title="MP Questions"
          iconElementRight={<IconButton onTouchTap={this.onNewQuestion}><AddIcon /></IconButton>}
          />
        <div style={styles.container}>
          <div style={styles.searchbar}>
            <SearchIcon />
            <TextField
              hintText="Search for a specific question"
              fullWidth={true}
              style={styles.searchbarText}
              underlineShow={false}
              onChange={this.onSearchBarChange}
            />
          </div>
          <Divider />
          <div style={styles.questionsContainer}>
            {this.state.questions.map(question => {
              return (
               <QuestionButton question={question} key={question.id} />
               );
            })}
          </div>
        </div>
      </div>
      );
  }
});

const styles = {
  container: {
    padding: 0
  },
  searchbar: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  searchbarText: {
    paddingLeft: 10,
    paddingRight: 5
  },
  questionsContainer: {
    position: 'absolute',
    top: 112,
    bottom: 0,
    overflowY: 'scroll'
  }
};