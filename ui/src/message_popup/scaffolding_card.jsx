import React from "react";
import Toggle from 'material-ui/Toggle';
import Divider from 'material-ui/Divider';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import Slider from 'material-ui/Slider';
import _ from 'lodash';


const ALL_COMPETENCY_GROUPS = 'ALL_COMPETENCY_GROUPS';

export default React.createClass({
  displayName: "ScaffoldingCard",
  
  propTypes: {
    competencyGroupValue: React.PropTypes.string.isRequired,
    competencyGroups: React.PropTypes.array.isRequired,
    onCompetencyGroupChanged: React.PropTypes.func.isRequired,
    sessionLength: React.PropTypes.number.isRequired,
    questions: React.PropTypes.array.isRequired,
    onSliderChange: React.PropTypes.func.isRequired,
    shouldShowStudentCard: React.PropTypes.bool.isRequired,
    onStudentCardsToggled: React.PropTypes.func.isRequired,
    shouldShowSummary: React.PropTypes.bool.isRequired,
    onSummaryToggled: React.PropTypes.func.isRequired,
    helpType: React.PropTypes.string.isRequired,
    onHelpToggled: React.PropTypes.func.isRequired,
    itemsToShow: React.PropTypes.object.isRequired
  },
  
  
  
  onHelpToggled(){
    if(this.props.helpType === 'feedback'){
      this.props.onHelpToggled(null, 'none');
    }else{
      this.props.onHelpToggled(null, 'feedback');
    }
  },
  
  render(){
    const {competencyGroupValue, competencyGroups, onCompetencyGroupChanged, sessionLength, questions, onSliderChange, shouldShowStudentCard, onStudentCardsToggled, shouldShowSummary, onSummaryToggled, helpType, onHelpToggled, itemsToShow} = this.props;
    
    var showLearningObjectives = true;
    var showSlider = true;
    var showStudentCardsToggle = _.has(itemsToShow, 'all') || _.has(itemsToShow, 'cards') || _.has(itemsToShow, 'basic');
    var showSummaryToggle = _.has(itemsToShow, 'all') || _.has(itemsToShow, 'summary');
    var showHelpToggle = _.has(itemsToShow, 'all') || _.has(itemsToShow, 'feedback') || _.has(itemsToShow, 'basic');
    var showOriginalHelp = _.has(itemsToShow, 'all') || _.has(itemsToShow, 'originalHelp');
    
    return (
      <div>
        {showLearningObjectives &&
          <div>
            <div style={styles.optionTitle}>Learning objectives to practice</div>
            <RadioButtonGroup
              name="competencyGroupValue"
              valueSelected={competencyGroupValue}
              onChange={onCompetencyGroupChanged}
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
            <Slider key={competencyGroupValue} value={sessionLength} min={1} max={questions.length} step={1} onChange={onSliderChange}/>
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
              onToggle={onStudentCardsToggled} />
              }
              {showSummaryToggle &&
              <Toggle
              label="Show summary after each question"
              labelPosition="right"
              toggled={shouldShowSummary}
              onToggle={onSummaryToggled}/>
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
              <RadioButtonGroup name="helpOptions" valueSelected={helpType} onChange={onHelpToggled}>
                <RadioButton
                  value="feedback"
                  label="With feedback and revision"
                  />
                <RadioButton
                  value="hints"
                  label="With hints available"
                  />
                <RadioButton
                  value="none"
                  label="With no help available"
                  />
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
  },
  objective: {
    fontSize: 16,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  objectiveSlider: {
    width: 80
  },
  objectiveText: {
    width: 240,
    padding: 'auto'
  }
};