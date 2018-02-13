import _ from 'lodash';

/* @flow weak */
import PropTypes from 'prop-types';

import React from 'react';

import Toggle from 'material-ui/Toggle';
import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import Slider from 'material-ui/Slider';

import {indicators} from '../data/indicators.js';
import {allQuestions} from './questions.js';
import {withStudents, questionsForIndicator} from './transformations.jsx';
import AudioCapture from '../components/audio_capture.jsx';
const ALL_INDICATORS = -1;

/*
Shows the user configuration options for a session and passes
the chosen configuration back to `onSessionConfigured`.

Callers can control which options are available
by querystring options in `query`.
*/
export default class extends React.Component {
  static displayName = 'ScaffoldingCard';

  static propTypes = {
    scaffolding: PropTypes.shape({
      helpType: PropTypes.string.isRequired,
      shouldShowSummary: PropTypes.bool.isRequired
    }).isRequired,
    initialEmail: PropTypes.string.isRequired,
    query: PropTypes.object.isRequired,
    onSessionConfigured: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    const isSolutionMode = _.has(props.query, 'solution');
    const isAudioSupported = AudioCapture.isAudioSupported();

    this.state = {
      email: props.initialEmail,
      sessionLength: 10,
      scaffolding: {
        helpType: props.scaffolding.helpType,
        shouldShowSummary: props.scaffolding.shouldShowSummary,
      },
      selectedIndicatorId: ALL_INDICATORS,
      isSolutionMode,
      responseModeKey: (isAudioSupported ? 'mixed' : 'text')
    };
  }

  getQuestions = (selectedIndicatorId) => {
    var {isSolutionMode} = this.state;
    const questions = (isSolutionMode || selectedIndicatorId === ALL_INDICATORS)
      ? withStudents(allQuestions)
      : questionsForIndicator(selectedIndicatorId);
    return questions;
  };

  // This is not a pure function, it's not idempotent and can include
  // randomness.  It shouldn't be called within render methods.
  drawResponseMode = (question, scaffolding) => {
    const {responseModeKey} = this.state;
    const isAudioSupported = AudioCapture.isAudioSupported();
    
    if (isAudioSupported && responseModeKey === 'mixed') return Math.random() > 0.5 ? 'audio' : 'text';
    if (isAudioSupported && responseModeKey === 'audio') return 'audio';
    if (responseModeKey === 'text') return 'text';

    return 'text';
  };

  drawResponsePrompt = (question, scaffolding) => {
    return 'Speak directly to the student';
  };

  // This implementation is static
  drawStudentCard = (question, scaffolding) => {
    return true;
  };

  onResponseModeChanged = (event, responseModeKey) => {
    this.setState({ responseModeKey });
  };

  onSave = () => {
    const {scaffolding, email, selectedIndicatorId} = this.state;
    const questions = this.getQuestions(selectedIndicatorId);
    const questionsForSession = _.shuffle(questions.slice(0, this.state.sessionLength));
    this.props.onSessionConfigured({
      scaffolding,
      email,
      questionsForSession,
      drawResponseMode: this.drawResponseMode,
      drawResponsePrompt: this.drawResponsePrompt,
      drawStudentCard: this.drawStudentCard
    });
  };

  onIndicatorChanged = (event, selectedIndicatorIdText) => {
    const selectedIndicatorId = _.toInteger(selectedIndicatorIdText);
    const newLength = this.getQuestions(selectedIndicatorId).length;
    var sessionLength = this.state.sessionLength;
    if(sessionLength > newLength){
      sessionLength = newLength;
    }
    this.setState({sessionLength, selectedIndicatorId});
  };

  onSliderChange = (event, value) => {
    this.setState({ sessionLength: value });
  };

  onSummaryToggled = () => { 
    var scaffolding = {...this.state.scaffolding};
    scaffolding.shouldShowSummary = !scaffolding.shouldShowSummary;
    this.setState({ scaffolding });
  };

  onHelpToggled = (event, value) => {
    var scaffolding = {...this.state.scaffolding};
    if (typeof value === 'boolean'){
      scaffolding.helpType = scaffolding.helpType === 'feedback' ? 'none' : 'feedback';
    }else{
      scaffolding.helpType = value;
    }
    this.setState({scaffolding});
  };

  onTextChanged = (e) => {
    const email = e.target.value;
    this.setState({email});
  };

  render() {
    const {query} = this.props;
    const {selectedIndicatorId, sessionLength, scaffolding} = this.state;
    const {shouldShowSummary, helpType} = scaffolding;
    const questionsLength = this.getQuestions(selectedIndicatorId).length;

    const showSlider = true;
    const showAll = _.has(query, 'all');
    const showSummaryToggle = showAll || _.has(query, 'summary');
    const showHelpToggle = showAll || _.has(query, 'feedback') || _.has(query, 'basic');
    const showOriginalHelp = showAll || _.has(query, 'originalHelp');
    const showChooseResponseMode = showAll || _.has(query, 'modes');

    // This is a workaround for a bug in Slider while we wait for https://github.com/callemall/material-ui/pull/4895 to land
    const sliderKey = [questionsLength, selectedIndicatorId].join('-');
    return (
      <div style={styles.container}>
        {this.renderIndicators()}
        
        <Divider />
      
        {showSlider &&
          <div>
            <div style={styles.optionTitle}>Session length: {sessionLength} {sessionLength===1 ? "scenario" : "scenarios"}</div>
            <Slider key={sliderKey} value={sessionLength} min={0} max={questionsLength} step={1} onChange={this.onSliderChange}/>
          </div>
        }

        {showChooseResponseMode && this.renderResponseModeChoice()}
        
        <Divider />
        
        {(showHelpToggle || showSummaryToggle || showOriginalHelp) &&
          <div>
            <div style={styles.optionTitle}>Scaffolding:</div>
            <div style={_.merge({ padding: 20 }, styles.option)}>
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
              {(showSummaryToggle || showHelpToggle) && showOriginalHelp &&
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
          name="email"
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

  renderIndicators = () => {
    const {selectedIndicatorId} = this.state;
    const possibleIndicators = _.uniq(_.map(allQuestions, 'indicatorId')).map((id) => {
      return _.find(indicators, {id});
    });

    return (
      <div>
        <div style={styles.optionTitle}>Practice scenarios:</div>
        <RadioButtonGroup
          name="indicatorId"
          valueSelected={selectedIndicatorId.toString()}
          onChange={this.onIndicatorChanged}
          style={{...styles.option, padding: 20 }}>
          <RadioButton 
            value={ALL_INDICATORS.toString()}
            label="All" />
          {possibleIndicators.map((indicator) => {
            return <RadioButton
              key={indicator.id}
              value={indicator.id.toString()}
              label={indicator.text} />;
          })}
        </RadioButtonGroup>
      </div>
    );
  };

  renderResponseModeChoice = () => {
    const {responseModeKey} = this.state;
    return (
      <div>
        <div >Respond by:</div>
        <RadioButtonGroup
          name="responseMode"
          valueSelected={responseModeKey}
          style={{...styles.option, padding: 20 }}
          onChange={this.onResponseModeChanged}
        >
          <RadioButton value="text" label="Writing" />
          <RadioButton value="audio" label="Speaking" />
          <RadioButton value="mixed" label="Random" />
        </RadioButtonGroup>
      </div>
    );
  };
}

const styles = {
  container: {
    padding: 20,
    paddingTop: 0,
  },
  option: {
    fontSize: 14
  },
  optionTitle: {
    paddingTop: 20,
    fontSize: 16,
    paddingBottom: 0
  },
  button: {
    marginTop: 20
  }
};