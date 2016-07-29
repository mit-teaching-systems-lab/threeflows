/* @flow weak */
import React from 'react';
import _ from 'lodash';

import * as Routes from '../../routes.js';

import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';
import IconButton from 'material-ui/IconButton';
import Paper from 'material-ui/Paper';
import MenuItem from 'material-ui/MenuItem';
import {Card, CardHeader, CardText} from 'material-ui/Card';

import SearchIcon from 'material-ui/svg-icons/action/search';
import AddIcon from 'material-ui/svg-icons/content/add';
import ArchiveIcon from 'material-ui/svg-icons/content/archive';

import NavigationAppBar from '../../components/navigation_app_bar.jsx';
import QuestionButton from './question_button.jsx';

import {allQuestions} from '../questions.js';
import {withStudents, withLearningObjectiveAndIndicator} from '../transformations.jsx';

export default React.createClass({
  displayName: 'QuestionsPage',

  getInitialState(){
    return ({
      questions: allQuestions,
      showArchivedQuestions: false
    });
  },
  
  onNewQuestion(){
    Routes.navigate(Routes.messagePopupAuthorQuestionsNewPath());
  },

  onArchivedQuestions(){
    Routes.navigate(Routes.messagePopupAuthorArchivedQuestionsPath());
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
        return questionString.split(value).length;
      });
      this.setState({questions});
    }
  },

  render(){
    var archivedQuestions = [];
    archivedQuestions.push({
      studentIds: [1, 2, 3],
      id: 3000,
      text: "This is an example of a deleted card",
      examples: [],
      nonExamples: [],
      indicatorId: 501,
      learningObjectiveId: 50
    });
    return(
      <div>
        <NavigationAppBar
          title="Message PopUp Questions"
          iconElementRight={<IconButton onTouchTap={this.onNewQuestion}><AddIcon /></IconButton>}
          prependMenuItems={
            <div>
              <MenuItem
                onTouchTap={this.onNewQuestion}
                leftIcon={<AddIcon />}
                primaryText="New Question" />
              <MenuItem
                onTouchTap={this.onArchivedQuestions}
                leftIcon={<ArchiveIcon />}
                primaryText="Archived Questions" />
            </div>
          }
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
            <Paper style={styles.currentQuestionsContainer} rounded={false}>
              {this.state.questions.map(question => {
                return (
                 <QuestionButton question={question} key={question.id} />
                 );
              })}
            </Paper>
            <Card style={styles.archivedQuestionsContainer} rounded={false} expanded={this.state.showArchivedQuestions} onExpandChange={function(){this.setState({showArchivedQuestions: !this.state.showArchivedQuestions});}.bind(this)}>
              <CardHeader 
                title="Archived/Deleted Questions"
                actAsExpander={true}
                showExpandableButton={true}/>
              <CardText expandable={true}>
                <div>
                  {archivedQuestions.map(question => <QuestionButton question={question} key={question.id}/>)}
                </div>
              </CardText>
            </Card>
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
    width: '100%',
    top: 112,
    bottom: 0,
    overflowY: 'scroll'
  },
  currentQuestionsContainer: {
    marginBottom: 10
  },
  archivedQuestionsContainer: {
    marginBottom: 10,
    backgroundColor: "#F4F4F4"
  }
};