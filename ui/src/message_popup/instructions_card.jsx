/* @flow weak */
import React from 'react';
import _ from 'lodash';
import VelocityTransitionGroup from 'velocity-react/velocity-transition-group';
import 'velocity-animate/velocity.ui';
import ScaffoldingCard from "./scaffolding_card.jsx";
import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField';
import TextChangeEvent from '../types/dom_types.js';
import {allStudents} from '../data/virtual_school.js';
import {learningObjectives} from '../data/learning_objectives.js';
import {allQuestions} from './questions.js';

const ALL_COMPETENCY_GROUPS = 'ALL_COMPETENCY_GROUPS';

export default React.createClass({
  displayName: "InstructionsCard",
  
  propTypes: {
    onStartPressed: React.PropTypes.func.isRequired,
    itemsToShow: React.PropTypes.object.isRequired,
    name: React.PropTypes.string
  },
  
  getInitialState(){
    return ({
      isSolutionMode: _.has(this.props.itemsToShow, "solution"),
      name: this.props.name,
      sessionLength: 20,
      questions: allQuestions,
      competencyGroupValue: ALL_COMPETENCY_GROUPS,
      shouldShowStudentCard: true,
      shouldShowSummary: true,
      helpType: 'feedback',
    });
  },
  
  onTextChanged({target:{value}}:TextChangeEvent) {
    this.setState({ name: value });
  },
  
  onConfigurationSet(){
    const {name, sessionLength, shouldShowStudentCard, shouldShowSummary, helpType} = this.state;
    const questions = this.getQuestions(this.state.competencyGroupValue);
    this.props.onStartPressed(name, sessionLength, questions, shouldShowStudentCard ,shouldShowSummary, helpType);
  },
  
  onCompetencyGroupChanged(event, competencyGroupValue){
    const questions = this.getQuestions(competencyGroupValue);
    const newLength = questions.length;
    var sessionLength = this.state.sessionLength;
    if(sessionLength > newLength){
      sessionLength = newLength;
    }
    this.setState({questions, competencyGroupValue, sessionLength});
  },
  
  onSliderChange(event, value){
    this.setState({ sessionLength: value});
  },
  
  onStudentCardsToggled(){
    this.setState({ shouldShowStudentCard: !this.state.shouldShowStudentCard });
  },
  
  onSummaryToggled(){ 
    this.setState({ shouldShowSummary: !this.state.shouldShowSummary });
  },
  
  onHelpToggled(event, value){
    this.setState({ helpType: value});
  },
  
  getQuestions(competencyGroup=""){
    var {competencyGroupValue, isSolutionMode} = this.state;
    if(competencyGroup !== ""){
      competencyGroupValue = competencyGroup;
    }
    const questions = (isSolutionMode || competencyGroupValue === ALL_COMPETENCY_GROUPS)
      ? _.shuffle(this.withStudents(allQuestions))
      : this.questionsForCompetencies(competencyGroupValue);
    return questions;
  },
  
  withStudents(questions) {
    return questions.map((question) => {
      const student = _.find(allStudents, {id: question.studentId });
      return _.extend({student}, question);
    });
  },
  
  questionsForCompetencies(competencyGroup) {
    const withCompetencyGroups = _.compact(allQuestions.map((question) => {
      const learningObjective = _.find(learningObjectives, { id: question.learningObjectiveId });
      if (learningObjective.competencyGroup !== competencyGroup) return null;
      return {
        ...question,
        competencyGroup: learningObjective.competencyGroup
      };
    }));
    return _.shuffle(this.withStudents(withCompetencyGroups));
  },
  
  render(){
    const{isSolutionMode, sessionLength, questions, competencyGroupValue, shouldShowStudentCard, shouldShowSummary, helpType} = this.state;
    const competencyGroups = _.uniq(_.map(allQuestions, 'learningObjectiveId')).map((id) => {
      return _.find(learningObjectives, {id}).competencyGroup;
    });
    return (
      <VelocityTransitionGroup enter={{animation: "callout.pulse", duration: 500}} leave={{animation: "slideUp"}} runOnMount={true}>
        <div style ={_.merge(_.clone(styles.container), styles.instructions)}>
          <div style={styles.title}>Message Popup</div>
          {isSolutionMode &&
            <p style={styles.paragraph}>Clear 15 minutes.  Your work is timed, so being able to focus is important.</p>
          }
          {!isSolutionMode && 
            <p style={styles.paragraph}>This will feel uncomfortable at first, but better to get comfortable here than with real students.</p>
          }
          <p style={styles.paragraph}>You may be asked to write, sketch or say your responses aloud.</p>
          <p style={styles.paragraph}>Each question is timed to simulate responding in the moment in the classroom.  You'll have 90 seconds to respond to each question.</p>
          <Divider />
          {!isSolutionMode &&
            <ScaffoldingCard
              competencyGroupValue={competencyGroupValue}
              competencyGroups={competencyGroups}
              onCompetencyGroupChanged={this.onCompetencyGroupChanged}
              sessionLength={sessionLength}
              questions={questions}
              onSliderChange={this.onSliderChange}
              shouldShowStudentCard={shouldShowStudentCard}
              onStudentCardsToggled={this.onStudentCardsToggled}
              shouldShowSummary={shouldShowSummary}
              onSummaryToggled={this.onSummaryToggled}
              helpType={helpType}
              onHelpToggled={this.onHelpToggled}
              itemsToShow={this.props.itemsToShow}
              />}
          <TextField
            underlineShow={false}
            floatingLabelText="What's your name?"
            value={this.state.name}
            onChange={this.onTextChanged}
            multiLine={true}
            rows={2}/>
          <div style={{display: 'flex', flexDirection: 'row', alignItems: 'flex-end'}}>
            <RaisedButton
              disabled={this.state.name === ''}
              onTouchTap={this.onConfigurationSet}
              style={styles.button}
              secondary={true}
              label="Start" />
          </div>
        </div>
      </VelocityTransitionGroup>
    );
  }
});

const styles = {
  instructions: {
    padding: 20,
    width: 360
  },
  container: {
    border: '1px solid #ccc',
    margin: 20,
    width: 400,
    fontSize: 20,
    padding: 0
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20
  },
  paragraph: {
    marginTop: 20,
    marginBottom: 20
  },
  button: {
    marginTop: 20
  }
};