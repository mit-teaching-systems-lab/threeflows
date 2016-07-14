import React from "react";
import Toggle from 'material-ui/Toggle';
import Divider from 'material-ui/Divider';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import Slider from 'material-ui/Slider';
import _ from 'lodash';

import {learningObjectives} from '../data/learning_objectives.js';
import {allQuestions} from './questions.js';

const ALL_COMPETENCY_GROUPS = 'ALL_COMPETENCY_GROUPS';

export default React.createClass({
  displayName: "ScaffoldingCard",
  
  propTypes: {
    competencyGroupValue: React.PropTypes.string.isRequired,
    scaffolding: React.PropTypes.object.isRequired,
    getQuestions: React.PropTypes.func.isRequired,
    isSolutionMode: React.PropTypes.bool.isRequired,
    itemsToShow: React.PropTypes.object.isRequired,
    onSaveScaffold: React.PropTypes.func.isRequired
  },
  
  
  onCompetencyGroupChanged(event, competencyGroupValue){
    const questions = this.props.getQuestions(competencyGroupValue);
    const newLength = questions.length;
    var sessionLength = this.props.scaffolding.sessionLength;
    if(sessionLength > newLength){
      sessionLength = newLength;
    }
    this.props.onSaveScaffold({questions, sessionLength}, {competencyGroupValue});
  },
  
  onSliderChange(event, value){
    this.props.onSaveScaffold({ sessionLength: value});
  },
  
  onStudentCardsToggled(){
    this.props.onSaveScaffold({ shouldShowStudentCard: !this.props.scaffolding.shouldShowStudentCard });
  },
  
  onSummaryToggled(){ 
    this.props.onSaveScaffold({ shouldShowSummary: !this.props.scaffolding.shouldShowSummary });
  },
  
  onHelpToggled(event, value){
    if (typeof value === 'boolean'){
      this.props.onSaveScaffold({ helpType: this.props.scaffolding.helpType === 'feedback' ? 'none' : 'feedback'});
    }else{
      this.props.onSaveScaffold({ helpType: value});
    }
  },
  
  render(){
    const {competencyGroupValue, scaffolding, itemsToShow} = this.props;
    const {sessionLength, questions, shouldShowStudentCard, shouldShowSummary, helpType} = scaffolding;

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
      <div>
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
      </div>
    );
  }
});

const styles = {
  option: {
    fontSize: 16,
  },
  optionTitle: {
    padding: 10,
    fontSize: 16,
    paddingTop: 20,
    paddingBottom: 0
  }
};