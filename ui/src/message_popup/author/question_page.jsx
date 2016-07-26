/* @flow weak */
/* eslint no-console: "off" */
import React from 'react';
import _ from 'lodash';

import * as EditingComponents from './question_editing_components/editing_component.jsx';

import {allQuestions} from '../questions.js';
import {allStudents} from '../../data/virtual_school.js';
import {learningObjectives} from '../../data/learning_objectives.js';
import {indicators} from '../../data/indicators.js';
import * as Routes from '../../routes.js';

import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import RaisedButton from 'material-ui/RaisedButton';

import ArrowBackIcon from 'material-ui/svg-icons/navigation/arrow-back';

export default React.createClass({
  displayName: 'QuestionPage',

  propTypes: {
    originalQuestion: React.PropTypes.object,
    questionText: React.PropTypes.string,
    students: React.PropTypes.array,
    learningObjective: React.PropTypes.object,
    indicator: React.PropTypes.object,
    goodExamplesText: React.PropTypes.string,
    badExamplesText: React.PropTypes.string
  },

  getDefaultProps(){
    return ({
      questionText: '',
      students: [],
      learningObjective: learningObjectives[0],
      indicator: indicators[0],
      goodExamplesText: "",
      badExamplesText: ""
    });
  },

  getInitialState() {
    return ({
      questionText: this.props.questionText,
      students: this.props.students,
      learningObjective: this.props.learningObjective,
      indicator: this.props.indicator,
      goodExamplesText: this.props.goodExamplesText,
      badExamplesText: this.props.badExamplesText
    });
  },

  returnToQuestions(){
    Routes.navigate(Routes.messagePopupAuthorQuestionsPath());
  },

  onQuestionTextChange(event, value){
    this.setState({questionText: value});
  },

  addStudent(studentName){
    const student = _.find(allStudents, student => student.name.toLowerCase() === studentName.toLowerCase());
    const alreadyAdded =  student !== undefined && _.find(this.state.students, newStudent => newStudent.id === student.id) !== undefined;
    if(student !== undefined && !alreadyAdded){
      this.setState({students: this.state.students.concat(student)});
    }
  },

  removeStudent(studentId){
    return function(){
      this.setState({students: _.remove(_.clone(this.state.students), student => student.id !== studentId)});
    }.bind(this);
  },

  onGoodExamplesChange(event, text){
    this.setState({goodExamplesText: text});
    this.getExamples();
  },

  onBadExamplesChange(event, text){
    this.setState({badExamplesText: text});
    this.getExamples();
  },

  getExamples(){
    const {goodExamplesText, badExamplesText} = this.state;
    var goodExamples = goodExamplesText.split('\n\n');
    var badExamples = badExamplesText.split('\n\n');
    goodExamples = goodExamples.map(example => example.trim());
    badExamples = badExamples.map(example => example.trim());
    _.remove(goodExamples, example => example == '');
    _.remove(badExamples, example => example == '');
    return {goodExamples, badExamples};
  },

  onChangeLearningObjective(event, index, value){
    this.setState({learningObjective: _.find(learningObjectives, learningObjective => learningObjective.id === value)});
  },

  onChangeIndicator(event, value){
    this.setState({indicator: _.find(indicators, indicator => indicator.id.toString() === value)});
  },

  saveCheckPassed(){
    if(this.state.questionText !== '') return true;
    return false;
  },

  onSaveEdit(){
    console.log("");
    console.log("Saving the following new question:");
    const studentIds = this.state.students.map(student => student.id);
    const text = this.state.questionText;
    const {goodExamples, badExamples} = this.getExamples();
    const id = _.maxBy(allQuestions, question => question.id).id + 1;
    const question = {
      studentIds,
      id,
      text,
      examples: goodExamples,
      nonExamples: badExamples,
      indicatorId: this.state.indicator.id,
      indicator: this.state.indicator,
      learningObjectiveId: this.state.learningObjective.id,
      learningObjective: this.state.learningObjective
    };
    console.log(question);
    console.log("Also deleting and archiving the following question:");
    console.log(this.props.originalQuestion);
    console.log("");
    this.returnToQuestions();
  },

  onCreate(){
    console.log("");
    console.log("Creating the following new question:");
    const studentIds = this.state.students.map(student => student.id);
    const text = this.state.questionText;
    const {goodExamples, badExamples} = this.getExamples();
    const id = _.maxBy(allQuestions, question => question.id).id + 1;
    const question = {
      studentIds,
      id,
      text,
      examples: goodExamples,
      nonExamples: badExamples,
      indicatorId: this.state.indicator.id,
      indicator: this.state.indicator,
      learningObjectiveId: this.state.learningObjective.id,
      learningObjective: this.state.learningObjective
    };
    console.log(question);
    this.returnToQuestions();
  },

  onDeleteQuestion(){
    console.log("");
    console.log("Deleting and archiving the following question:");
    console.log(this.props.originalQuestion);
    console.log("");
    this.returnToQuestions();
  },

  render(){
    return (
      <div>
        <AppBar 
          title={this.props.originalQuestion !== undefined ? `Editing Question #${this.props.originalQuestion.id}` : 'New Question'}
          iconElementLeft={<IconButton onTouchTap={this.returnToQuestions}><ArrowBackIcon /></IconButton>}
          />
        <div style={styles.container}>
          <EditingComponents.QuestionText 
            originalText={this.props.originalQuestion !== undefined ? this.props.originalQuestion.text : undefined}
            questionText={this.state.questionText}
            onQuestionTextChange={this.onQuestionTextChange}
            />
          <EditingComponents.Students 
            students={this.state.students}
            addStudent={this.addStudent}
            removeStudent={this.removeStudent}
            />
          <EditingComponents.Examples 
            type="Good"
            examplesText={this.state.goodExamplesText}
            onExamplesChange={this.onGoodExamplesChange}
            />
          <EditingComponents.Examples 
            type="Bad"
            examplesText={this.state.badExamplesText}
            onExamplesChange={this.onBadExamplesChange}
            />
          <EditingComponents.LearningObjectives 
            learningObjective={this.state.learningObjective}
            onChangeLearningObjective={this.onChangeLearningObjective}
            />
          <EditingComponents.Indicators 
            indicator={this.state.indicator}
            onChangeIndicator={this.onChangeIndicator}
            />

          <div style={styles.finalButtonRow}>
            {this.props.originalQuestion !== undefined &&
              <div>
                <RaisedButton 
                  style={styles.finalButton}
                  label="Save"
                  primary={true}
                  disabled={!this.saveCheckPassed()}
                  onTouchTap={this.onSaveEdit}
                  />
                <RaisedButton
                  style={styles.finalButton}
                  backgroundColor="#CA2300"
                  labelStyle={{color: 'white'}}
                  label="Delete"
                  onTouchTap={this.onDeleteQuestion}
                  />
              </div>
            }
            {this.props.originalQuestion === undefined &&
              <div>
                <RaisedButton
                  style={styles.finalButton}
                  label="Create"
                  primary={true}
                  disabled={!this.saveCheckPassed()}
                  onTouchTap={this.onCreate}
                  />
              </div>
            }
          </div>
        </div>
      </div>
      );
  }
});

const styles = {
  container: {
    margin: 10,
  },
  finalButtonRow: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  finalButton: {
    margin: 10,
    marginRight : 5
  }
};