import React from "react";
import Toggle from 'material-ui/Toggle';
import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import TextChangeEvent from '../types/dom_types.js';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import Slider from 'material-ui/Slider';
import _ from 'lodash';

import {learningObjectives} from '../data/learning_objectives.js';
import {allQuestions} from './questions.js';
import {allStudents} from '../data/virtual_school.js';

const ALL_COMPETENCY_GROUPS = 'ALL_COMPETENCY_GROUPS';

export default React.createClass({
  displayName: "ScaffoldingCard",
  
  propTypes: {
    scaffolding: React.PropTypes.shape({
      helpType: React.PropTypes.string.isRequired,
      shouldShowStudentCard: React.PropTypes.bool.isRequired,
      shouldShowSummary: React.PropTypes.bool.isRequired
    }).isRequired,
    email: React.PropTypes.string.isRequired,
    itemsToShow: React.PropTypes.object.isRequired,
    saveScaffoldingAndSession: React.PropTypes.func.isRequired
  },
  
  getInitialState(){
    const isSolutionMode = _.has(this.props.itemsToShow, 'solution');
    return ({
      email: this.props.email,
      questions: allQuestions,
      sessionLength: 10,
      helpType: this.props.scaffolding.helpType,
      shouldShowStudentCard: this.props.scaffolding.shouldShowStudentCard,
      shouldShowSummary: this.props.scaffolding.shouldShowSummary,
      competencyGroupValue: ALL_COMPETENCY_GROUPS,
      isSolutionMode
    });
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

  onSave(){
    const scaffolding = {
      helpType: this.state.helpType,
      shouldShowStudentCard: this.state.shouldShowStudentCard,
      shouldShowSummary: this.state.shouldShowSummary
    };
    const gameSession = {
      email: this.state.email,
      sessionLength: this.state.sessionLength,
      questions: this.getQuestions(this.state.competencyGroupValue)
    };
    this.props.saveScaffoldingAndSession(scaffolding, gameSession);
  },
  
  onCompetencyGroupChanged(event, competencyGroupValue){
    const questions = this.getQuestions(competencyGroupValue);
    const newLength = questions.length;
    var sessionLength = this.state.sessionLength;
    if(sessionLength > newLength){
      sessionLength = newLength;
    }
    this.setState({questions, sessionLength, competencyGroupValue});
  },
  
  onSliderChange(event, value){
    this.setState({ sessionLength: value });
  },
  
  onStudentCardsToggled(){
    this.setState({ shouldShowStudentCard: !this.state.shouldShowStudentCard });
  },
  
  onSummaryToggled(){ 
    this.setState({ shouldShowSummary: !this.state.shouldShowSummary });
  },
  
  onHelpToggled(event, value){
    if (typeof value === 'boolean'){
      this.setState({ helpType: this.state.helpType === 'feedback' ? 'none' : 'feedback'});
    }else{
      this.setState({ helpType: value});
    }
  },

  onTextChanged({target:{value}}:TextChangeEvent) {
    this.setState({email: value});
  },
  
  render(){
    const {itemsToShow} = this.props;
    const {competencyGroupValue, sessionLength, questions, shouldShowStudentCard, shouldShowSummary, helpType} = this.state;

    const competencyGroups = _.uniq(_.map(allQuestions, 'learningObjectiveId')).map((id) => {
      return _.find(learningObjectives, {id}).competencyGroup;
    });
    
    const showLearningObjectives = true;
    const showSlider = true;
    const showStudentCardsToggle = _.has(itemsToShow, 'all') || _.has(itemsToShow, 'cards') || _.has(itemsToShow, 'basic');
    const showSummaryToggle = _.has(itemsToShow, 'all') || _.has(itemsToShow, 'summary');
    const showHelpToggle = _.has(itemsToShow, 'all') || _.has(itemsToShow, 'feedback') || _.has(itemsToShow, 'basic');
    const showOriginalHelp = _.has(itemsToShow, 'all') || _.has(itemsToShow, 'originalHelp');
    
    return (
      <div style={styles.container}>
        {showLearningObjectives &&
          <div>
            <div style={styles.optionTitle}>Learning objectives to practice</div>
            <RadioButtonGroup
              name="competencyGroupValue"
              valueSelected={competencyGroupValue}
              onChange={this.onCompetencyGroupChanged}
              style={_.merge({padding:20},styles.option)} >
              <RadioButton 
                value={ALL_COMPETENCY_GROUPS}
                label="All" />
              {competencyGroups.map((competencyGroup) => {
                return <RadioButton
                         key={competencyGroup}
                         value={competencyGroup}
                         label={competencyGroup} />;
              })}
            </RadioButtonGroup>
          </div>
        }
        
        <Divider />
        
        {showSlider &&
          <div>
            <div style={styles.optionTitle}>Session Length: {sessionLength} {sessionLength===1 ? "question" : "questions"}</div>
            <Slider key={competencyGroupValue} value={sessionLength} min={1} max={questions.length} step={1} onChange={this.onSliderChange}/>
          </div>
        }
        
        <Divider />
        
        {(showStudentCardsToggle || showHelpToggle || showSummaryToggle || showOriginalHelp) &&
          <div>
            <div style={styles.optionTitle}>Scaffolding</div>
            <div style={_.merge({ padding: 20 }, styles.option)}>
              {showStudentCardsToggle &&
              <Toggle
              label="With student cards"
              labelPosition="right"
              toggled={shouldShowStudentCard}
              onToggle={this.onStudentCardsToggled} />
              }
              {showSummaryToggle &&
              <Toggle
              label="Show summary after each question"
              labelPosition="right"
              toggled={shouldShowSummary}
              onToggle={this.onSummaryToggled}/>
              }
              {showHelpToggle &&
              <Toggle
              label="With feedback and revision"
              labelPosition="right"
              toggled={helpType==='feedback'}
              onToggle={this.onHelpToggled} />
              }
              {(showStudentCardsToggle || showSummaryToggle || showHelpToggle) && showOriginalHelp &&
              <div style={{margin: 10}}><Divider /></div>
              }
              {showOriginalHelp &&
              <RadioButtonGroup name="helpOptions" valueSelected={helpType} onChange={this.onHelpToggled}>
                <RadioButton value="feedback" label="With feedback and revision"/>
                <RadioButton value="hints" label="With hints available"/>
                <RadioButton value="none" label="With no help available"/>
              </RadioButtonGroup>
              }
            </div>
          </div>
        }
        <Divider />

        <TextField
          style={{width: '100%'}}
          underlineShow={false}
          floatingLabelText="What's your email address?"
          value={this.state.email}
          onChange={this.onTextChanged}
          multiLine={true}
          rows={2}/>
        <div style={{display: 'flex', flexDirection: 'row', alignItems: 'flex-end'}}>
          <RaisedButton
            disabled={this.state.email === ''}
            onTouchTap={this.onSave}
            style={styles.button}
            secondary={true}
            label="Start" />
        </div>  
      </div>
    );
  }
});

const styles = {
  container: {
    padding: 20,
    paddingTop: 0,
  },
  option: {
    fontSize: 16,
  },
  optionTitle: {
    padding: 10,
    fontSize: 16,
    paddingTop: 20,
    paddingBottom: 0
  },
  button: {
    marginTop: 20
  }
};