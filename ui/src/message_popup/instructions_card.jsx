import React from "react";
import VelocityTransitionGroup from "velocity-react/velocity-transition-group";
import "velocity-animate/velocity.ui";
import ScaffoldingCard from "./scaffolding_card.jsx";
import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField';

export default React.createClass({
  displayName: "InstructionsCard",
  
  propTypes: {
    isSolutionMode: React.PropTypes.bool.isRequired,
    onTextChanged: React.PropTypes.func.isRequired,
    onStartPressed: React.PropTypes.func.isRequired,
    name: React.PropTypes.string.isRequired,
    competencyGroupValue: React.PropTypes.string.isRequired,
    competencyGroups: React.PropTypes.array.isRequired,
    onCompetencyGroupChanged: React.PropTypes.func.isRequired,
    sessionLength: React.PropTypes.number.isRequired,
    questions: React.PropTypes.array.isRequired,
    onSliderChange: React.PropTypes.func.isRequired,
    shouldShowStudentCards: React.PropTypes.bool.isRequired,
    onStudentCardsToggled: React.PropTypes.func.isRequired,
    shouldShowSummary: React.PropTypes.bool.isRequired,
    onSummaryToggled: React.PropTypes.func.isRequired,
    helpType: React.PropTypes.string.isRequired,
    onHelpToggled: React.PropTypes.func.isRequired,
    itemsToShow: React.PropTypes.object.isRequired
  },
  
  render(){
    return (
      <VelocityTransitionGroup enter={{animation: "callout.pulse", duration: 500}} leave={{animation: "slideUp"}} runOnMount={true}>
        <div style ={_.merge(_.clone(styles.container), styles.instructions)}>
          <div style={styles.title}>Message Popup</div>
          {this.props.isSolutionMode &&
            <p style={styles.paragraph}>Clear 15 minutes.  Your work is timed, so being able to focus is important.</p>
          }
          {!this.props.isSolutionMode && 
            <p style={styles.paragraph}>This will feel uncomfortable at first, but better to get comfortable here than with real students.</p>
          }
          <p style={styles.paragraph}>You may be asked to write, sketch or say your responses aloud.</p>
          <p style={styles.paragraph}>Each question is timed to simulate responding in the moment in the classroom.  You'll have 90 seconds to respond to each question.</p>
          <Divider />
          {!this.props.isSolutionMode && 
            <ScaffoldingCard
              competencyGroupValue={this.props.competencyGroupValue}
              competencyGroups={this.props.competencyGroups}
              onCompetencyGroupChanged={this.props.onCompetencyGroupChanged}
              sessionLength={this.props.sessionLength}
              questions={this.props.questions}
              onSliderChange={this.props.onSliderChange}
              shouldShowStudentCards={this.props.shouldShowStudentCards}
              onStudentCardsToggled={this.props.onStudentCardsToggled}
              shouldShowSummary={this.props.shouldShowSummary}
              onSummaryToggled={this.props.onSummaryToggled}
              helpType={this.props.helpType}
              onHelpToggled={this.props.onHelpToggled}
              itemsToShow={this.props.itemsToShow}
              />}
          <TextField
            underlineShow={false}
            floatingLabelText="What's your name?"
            onChange={this.props.onTextChanged}
            multiLine={true}
            rows={2}/>
          <div style={{display: 'flex', flexDirection: 'row', alignItems: 'flex-end'}}>
            <RaisedButton
              disabled={this.props.name === ''}
              onTouchTap={this.props.onStartPressed}
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