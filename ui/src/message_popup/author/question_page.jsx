/* @flow weak */
/* eslint no-console: "off" */
import React from 'react';
import _ from 'lodash';
import VelocityTransitionGroup from 'velocity-react/velocity-transition-group';
import 'velocity-animate/velocity.ui';

import * as EditingComponents from './question_editing_components/editing_component.jsx';

import {allQuestions} from '../questions.js';
import {allStudents} from '../../data/virtual_school.js';
import {indicators} from '../../data/indicators.js';
import * as Routes from '../../routes.js';

import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

import ArrowBackIcon from 'material-ui/svg-icons/navigation/arrow-back';

export default React.createClass({
  displayName: 'QuestionPage',

  propTypes: {
    originalQuestion: React.PropTypes.object,
  },

  getInitialState() {
    const question = this.props.originalQuestion;
    return ({
      questionText: question !== undefined ? question.text : '',
      students: question !== undefined ? question.students : [],
      indicator: question !== undefined ? question.indicator : indicators[0],
      goodExamplesText: question !== undefined ? question.examples.join('\n\n') : "",
      badExamplesText: question !== undefined ? question.nonExamples.join('\n\n') : "",
      deleteConfirmationOpen: false,
      availableStudentList: question !== undefined ? allStudents.filter(student => !question.studentIds.includes(student.id)) : allStudents
    });
  },

  addStudent(studentName){
    var availableStudentList = _.clone(this.state.availableStudentList);
    const student = _.remove(availableStudentList, student => student.name.toLowerCase() === studentName.toLowerCase())[0];
    if(student !== undefined){
      this.setState({students: this.state.students.concat(student), availableStudentList});
    }
  },

  removeStudent(studentId){
    return function(){
      this.setState({
        students: this.state.students.filter(student => student.id !== studentId), 
        availableStudentList: this.state.availableStudentList.concat(_.find(allStudents, student => student.id === studentId))
      });
    }.bind(this);
  },

  parseExamples(examplesText){
    return examplesText.split('\n\n').map(exampleText => exampleText.trim()).filter(example => example !== '');
  },

  getExamples(){
    const {goodExamplesText, badExamplesText} = this.state;
    return {goodExamples: this.parseExamples(goodExamplesText), badExamples: this.parseExamples(badExamplesText)};
  },

  saveCheckPassed(){
    if(this.state.questionText !== '') return true;
    return false;
  },

  openDeleteConfirmation(){
    this.setState({deleteConfirmationOpen: true});
  },

  closeDeleteConfirmation(){
    this.setState({deleteConfirmationOpen: false});
  },

  onReturnToQuestions(){
    Routes.navigate(Routes.messagePopupAuthorQuestionsPath());
  },

  onQuestionTextChange(event, value){
    this.setState({questionText: value});
  },

  onGoodExamplesChange(event, text){
    this.setState({goodExamplesText: text});
  },

  onBadExamplesChange(event, text){
    this.setState({badExamplesText: text});
  },

  onIndicatorChange(event, value){
    this.setState({indicator: _.find(indicators, indicator => indicator.id.toString() === value)});
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
    };
    console.log(question);
    console.log("Also deleting and archiving the following question:");
    console.log(this.props.originalQuestion);
    console.log("");
    this.onReturnToQuestions();
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
    };
    console.log(question);
    this.onReturnToQuestions();
  },

  onDeleteButtonClicked(){
    this.closeDeleteConfirmation();
    this.onDeleteQuestion();
  },

  onDeleteQuestion(){
    console.log("");
    console.log("Deleting and archiving the following question:");
    console.log(this.props.originalQuestion);
    console.log("");
    this.onReturnToQuestions();
  },

  render(){
    return (
      <div>
        <AppBar 
          title={this.props.originalQuestion !== undefined ? `Editing Question #${this.props.originalQuestion.id}` : 'New Question'}
          iconElementLeft={<IconButton onTouchTap={this.onReturnToQuestions}><ArrowBackIcon /></IconButton>}
          />
        <div style={styles.container}>
          <VelocityTransitionGroup enter={{animation: 'transition.fadeIn'}} runOnMount={true}>
            <EditingComponents.QuestionText 
              originalText={this.props.originalQuestion !== undefined ? this.props.originalQuestion.text : undefined}
              questionText={this.state.questionText}
              onQuestionTextChange={this.onQuestionTextChange}
              />
            <EditingComponents.Students 
              students={this.state.students}
              addStudent={this.addStudent}
              removeStudent={this.removeStudent}
              availableStudentList={this.state.availableStudentList}
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
            <EditingComponents.Indicators 
              indicator={this.state.indicator}
              onIndicatorChange={this.onIndicatorChange}
              />
            {this.renderButtons()}
          </VelocityTransitionGroup>
          <Dialog 
            open={this.state.deleteConfirmationOpen}
            actions={[
              <FlatButton
                label="Cancel"
                onTouchTap={this.closeDeleteConfirmation}/>,
              <FlatButton
                label="Delete"
                style={{color: "#CA2300"}}
                onTouchTap={this.onDeleteButtonClicked}/>
            ]}
            onRequestClose={this.closeDeleteConfirmation}>
            Deleting this will archive the deleted question. Are you sure you wish to continue?
          </Dialog>
        </div>
      </div>
    );
  },

  renderButtons(){
    return (
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
              onTouchTap={this.openDeleteConfirmation}
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