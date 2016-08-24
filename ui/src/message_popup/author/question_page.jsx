/* @flow weak */
import React from 'react';
import _ from 'lodash';
import VelocityTransitionGroup from 'velocity-react/velocity-transition-group';
import 'velocity-animate/velocity.ui';

import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import ArrowBackIcon from 'material-ui/svg-icons/navigation/arrow-back';

import {activeStudents} from '../../data/virtual_school.js';
import {indicators} from '../../data/indicators.js';
import * as Routes from '../../routes.js';
import QuestionText from './question_editing_components/question_text.jsx';
import Students from './question_editing_components/students.jsx';
import Examples from './question_editing_components/examples.jsx';
import Indicators from './question_editing_components/indicators.jsx';


export default React.createClass({
  displayName: 'QuestionPage',

  propTypes: {
    originalQuestion: React.PropTypes.object,
    loaded: React.PropTypes.bool.isRequired,
    onEditQuestion: React.PropTypes.func,
    onDeleteQuestion: React.PropTypes.func,
    onCreateQuestion: React.PropTypes.func
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
      availableStudentList: question !== undefined ? activeStudents.filter(student => !question.studentIds.includes(student.id)) : activeStudents,
    });
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

  onAddStudent(studentName){
    var availableStudentList = _.clone(this.state.availableStudentList);
    const student = _.remove(availableStudentList, student => student.name.toLowerCase() === studentName.toLowerCase())[0];
    if(student !== undefined){
      this.setState({students: this.state.students.concat(student), availableStudentList});
    }
  },

  onRemoveStudent(studentId){
    this.setState({
      students: this.state.students.filter(student => student.id !== studentId), 
      availableStudentList: this.state.availableStudentList.concat(_.find(activeStudents, student => student.id === studentId))
    });
  },

  onReturnToQuestions(){
    Routes.navigate(Routes.messagePopupAuthorQuestionsPath());
  },

  onQuestionTextChange(questionText){
    this.setState({questionText});
  },

  onGoodExamplesChange(goodExamplesText){
    this.setState({goodExamplesText});
  },

  onBadExamplesChange(badExamplesText){
    this.setState({badExamplesText});
  },

  onIndicatorChange(indicatorId){
    const indicator = _.find(indicators, indicator => indicator.id.toString() === indicatorId);
    this.setState({indicator});
  },

  onEditQuestion(){
    const {goodExamples, badExamples} = this.getExamples();
    const {originalQuestion} = this.props;
    const newQuestion = {
      studentIds: this.state.students.map(student => student.id),
      text: this.state.questionText,
      examples: goodExamples,
      nonExamples: badExamples,
      indicatorId: this.state.indicator.id,
      indicator: this.state.indicator
    };
    if(this.props.onEditQuestion === undefined) return;
    this.props.onEditQuestion(newQuestion, originalQuestion);
    this.onReturnToQuestions();
  },

  onCreateQuestion(){
    const {goodExamples, badExamples} = this.getExamples();
    const newQuestion = {
      studentIds: this.state.students.map(student => student.id),
      text: this.state.questionText,
      examples: goodExamples,
      nonExamples: badExamples,
      indicatorId: this.state.indicator.id,
      indicator: this.state.indicator
    };
    if(this.props.onCreateQuestion === undefined) return;
    this.props.onCreateQuestion(newQuestion);
    this.onReturnToQuestions();
  },

  onDeleteButtonClicked(){
    this.closeDeleteConfirmation();
    this.onDeleteQuestion();
  },

  onDeleteQuestion(){
    if(this.props.onDeleteQuestion === undefined) return;
    const {originalQuestion} = this.props;
    this.props.onDeleteQuestion(originalQuestion);
    this.onReturnToQuestions();
  },

  render(){
    const {loaded, originalQuestion} = this.props;
    const {questionText, students, goodExamplesText, badExamplesText, indicator, deleteConfirmationOpen} = this.state;
    const title = originalQuestion !== undefined ? `Editing Question #${originalQuestion.id}` : loaded ? 'New Question' : '';
    return (
      <div>
        <AppBar 
          title={title}
          iconElementLeft={<IconButton onTouchTap={this.onReturnToQuestions}><ArrowBackIcon /></IconButton>}
          />
        {loaded &&
          <div style={styles.container}>
            <VelocityTransitionGroup enter={{animation: 'transition.fadeIn'}} runOnMount={true}>
              <QuestionText 
                originalText={originalQuestion !== undefined ? originalQuestion.text : undefined}
                questionText={questionText}
                onQuestionTextChange={this.onQuestionTextChange}
                />
              <Students 
                students={students}
                onAddStudent={this.onAddStudent}
                onRemoveStudent={this.onRemoveStudent}
                availableStudentList={this.state.availableStudentList}
                />
              <Examples 
                type="Good"
                examplesText={goodExamplesText}
                onExamplesChange={this.onGoodExamplesChange}
                />
              <Examples 
                type="Bad"
                examplesText={badExamplesText}
                onExamplesChange={this.onBadExamplesChange}
                />
              <Indicators 
                indicator={indicator}
                onIndicatorChange={this.onIndicatorChange}
                />
              {this.renderButtons()}
            </VelocityTransitionGroup>
            <Dialog 
              open={deleteConfirmationOpen}
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
        }
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
              onTouchTap={this.onEditQuestion}
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
              onTouchTap={this.onCreateQuestion}
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