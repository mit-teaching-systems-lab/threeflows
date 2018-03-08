//@flow
import React from 'react';
import _ from 'lodash';
import RaisedButton from 'material-ui/RaisedButton';
import VelocityTransitionGroup from "velocity-react/velocity-transition-group";

/*
This shows a hint in the form of a toggleable good or bad example response
*/
export default React.createClass({
  displayName: 'HintCard',
  
  propTypes: {
    examples: React.PropTypes.array.isRequired,
    nonExamples: React.PropTypes.array.isRequired
  },

  getInitialState() {
    var goodExamples = _.map(this.props.examples, function(example){return {type: 'Good', text: example};});
    var badExamples = _.map(this.props.nonExamples, function(example){return {type: 'Bad', text: example};});
    var allExamples = _.shuffle(goodExamples.concat(badExamples));
    var originalAll = _.clone(allExamples);
    return ({
      hidden: true,
      allExamples: allExamples,
      originalAll: originalAll
    });
  },
  
  onNextExample(){
    if (this.state.allExamples.length <= 1) {
      this.setState({allExamples: _.clone(this.state.originalAll)});
    } else {
      var examples = this.state.allExamples;
      examples.splice(0, 1);
      this.setState({allExamples: examples});
    }
  },
  
  onHintsToggled(){
    this.setState({ hidden: !this.state.hidden });
  },

  render() {
    const {hidden, allExamples} = this.state;
    const areAnyExamples = allExamples.length > 0;

    return (
      <div className="HintCard">
        {hidden && (
          <div style={styles.buttonRow}>
            <div />
            <RaisedButton
              onTouchTap={this.onHintsToggled}
              primary={true}
              label="Show Example" />
          </div>
        )}
        <VelocityTransitionGroup enter={{animation: "slideDown"}} runOnMount={true}>
          {!hidden && areAnyExamples && (
            <div key={allExamples[0].text} style={styles.exampleBox}>
              <div style={styles.buttonRow}>
                <div style={styles.exampleTitle}>{allExamples[0].type} Example</div>
                <RaisedButton
                  onTouchTap={this.onNextExample}
                  secondary={true}
                  label="Show another" />
              </div>
              <div style={styles.exampleText}>
                {allExamples[0].text}
              </div>
            </div>
          )}
        </VelocityTransitionGroup>
      </div>
    );
  }
});


const styles = {
  buttonRow: {
    margin: 10,
    marginTop: 0,
    display: 'flex',
    justifyContent: 'space-between'
  },
  exampleBox: {
    display: 'flex',
    flexDirection: 'column'
  },
  exampleTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 6,
    marginBottom: 2
  },
  exampleText: {
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    fontSize: 14
  }
};