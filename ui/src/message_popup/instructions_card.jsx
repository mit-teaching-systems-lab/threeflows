/* @flow weak */
import React from "react";
import _ from "lodash";
import VelocityTransitionGroup from "velocity-react/velocity-transition-group";
import "velocity-animate/velocity.ui";
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
    email: React.PropTypes.string
  },
  
  getInitialState(){
    return ({
      isSolutionMode: _.has(this.props.itemsToShow, "solution"),
      competencyGroupValue: ALL_COMPETENCY_GROUPS,
      scaffolding: { email: this.props.email,
        sessionLength: this.props.sessionLength,
        questions: allQuestions,
        shouldShowStudentCard: true,
        shouldShowSummary: true,
        helpType: this.props.helpType}
    });
  },
  
  onTextChanged({target:{value}}:TextChangeEvent) {
    this.setState({ scaffolding: _.set(_.clone(this.state.scaffolding), 'email', value) });
  },
  
  onSaveScaffold(scaffoldSettings, nonScaffoldSettings={}){
    var scaffolding = _.clone(this.state.scaffolding);
    for(var key in scaffoldSettings){
      _.set(scaffolding, key, scaffoldSettings[key]);
    }
    var objectToSave = {scaffolding}
    for(var key in nonScaffoldSettings){
      _.set(objectToSave, key, nonScaffoldSettings[key]);
    }
    this.setState(objectToSave);
  },
  
  onConfigurationSet(){
    const {scaffolding} = this.state;
    const questions = this.getQuestions(this.state.competencyGroupValue);
    this.props.onStartPressed(scaffolding);
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
    const{isSolutionMode, competencyGroupValue, scaffolding} = this.state;
    return (
      <div>        
        <VelocityTransitionGroup enter={{animation: "callout.pulse", duration: 500}} leave={{animation: "slideUp"}} runOnMount={true}>
          <div style ={_.merge(_.clone(styles.container), styles.instructions)}>
            {isSolutionMode &&
              <p style={styles.paragraph}>Clear 15 minutes.  Your work is timed, so being able to focus is important.</p>
            }
            {!isSolutionMode && 
              <p style={styles.paragraph}>This will feel uncomfortable at first, but better to get comfortable here than with real students.</p>
            }
            <p style={styles.paragraph}>You may be asked to write, sketch or say your responses aloud.</p>
            <p style={styles.paragraph}>Each question is timed to simulate responding in the moment in the classroom.  Aim to respond to each scenario in about 90 seconds.</p>
            <Divider />
            {!isSolutionMode &&
              <ScaffoldingCard 
                competencyGroupValue={competencyGroupValue}
                scaffolding={scaffolding}
                getQuestions={this.getQuestions}
                isSolutionMode={isSolutionMode}
                itemsToShow={this.props.itemsToShow}
                onSaveScaffold={this.onSaveScaffold}
                />}
            <TextField
              style={{width: '100%'}}
              underlineShow={false}
              floatingLabelText="What's your email address?"
              value={scaffolding.email}
              onChange={this.onTextChanged}
              multiLine={true}
              rows={2}/>
            <div style={{display: 'flex', flexDirection: 'row', alignItems: 'flex-end'}}>
              <RaisedButton
                disabled={scaffolding.email === ''}
                onTouchTap={this.onConfigurationSet}
                style={styles.button}
                secondary={true}
                label="Start" />
            </div>
          </div>
        </VelocityTransitionGroup>
      </div>
    );
  }
});

const styles = {
  instructions: {
    padding: 20
  },
  container: {
    margin: 0,
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