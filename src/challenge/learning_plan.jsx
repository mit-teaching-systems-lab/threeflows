import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import {
  Step,
  Stepper,
  StepLabel,
  StepContent,
} from 'material-ui/Stepper';



/*
Walks through the process of making a learning plan.
Has a fixed size.
*/
export default React.createClass({
  displayName: 'LearningPlan',

  getInitialState: function() {
    return {
      stepIndex: 0
    };
  },

  onNextClicked: function() {
    this.setState({ stepIndex: this.state.stepIndex + 1 });
  },
  onPreviousClicked: function() {
    this.setState({ stepIndex: this.state.stepIndex - 1 });
  },

  render() {
    const stepIndex = this.state.stepIndex;
    return (
      <div style={{width: 380, height: 450}}>
        <Stepper activeStep={stepIndex} orientation="vertical">
          <Step>
            <StepLabel>Understand the challenge</StepLabel>
            <StepContent>
              <p>First, review the challenge scenario and the challenge solution.</p>
              {this.renderStepActions(0)}
            </StepContent>
          </Step>
          <Step>
            <StepLabel>Review the learning objectives</StepLabel>
            <StepContent>
              <p>Reflect on what prior knowledge you might have.</p>
              {this.renderStepActions(1)}
            </StepContent>
          </Step>
          <Step>
            <StepLabel>Make your plan</StepLabel>
            <StepContent>
              <p>Write up a few paragraphs about how you'll tackle this challenge.</p>
              {this.renderStepActions(2)}
            </StepContent>
          </Step>
          <Step>
            <StepLabel>Get feedback</StepLabel>
            <StepContent>
              <p>Check in with your coach to get feedback on your plan.</p>
              {this.renderStepActions(3)}
            </StepContent>
          </Step>
        </Stepper>
      </div>
    );
  },

  renderStepActions(step) {
    const {stepIndex} = this.state;
    const lastStepIndex = 3;

    return (
      <div style={{margin: '12px 0'}}>
        <RaisedButton
          label={stepIndex === lastStepIndex ? 'Finish' : 'Next'}
          primary={true}
          onTouchTap={this.onNextClicked}
          style={{marginRight: 12}}
        />
        {step > 0 && (
          <FlatButton
            label="Back"
            disabled={stepIndex === 0}
            onTouchTap={this.onPreviousClicked}
          />
        )}
      </div>
    );
  }
});