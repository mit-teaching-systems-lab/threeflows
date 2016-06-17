// @flow
import React from 'react';
import * as PropTypes from '../prop_types.js';
import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';

/*
Shows a card for a student from the virtual school.
*/
export default React.createClass({
  displayName: 'HintCard',

  getInitialState: function(){
    return ({
      hidden: true,
      exampleIndex: 0,
      nonExampleIndex: 0,
    });
  },
  
  propTypes: {
    examples: React.PropTypes.array.isRequired,
    nonExamples: React.PropTypes.array.isRequired
  },
  
  onNextExample(){
    var length = this.props.examples.length;
    var next = this.state.exampleIndex + 1;
    if(next >= length){
      next = 0;
    }
    this.setState({exampleIndex: next});
  },
  
  onNextNonExample(){
    var length = this.props.nonExamples.length;
    var next = this.state.nonExampleIndex + 1;
    if(next >= length){
      next = 0;
    }
    this.setState({nonExampleIndex: next});
  },
  
  onHintsToggled(){
    this.setState({ hidden: !this.state.hidden });
  },

  render() {
    const {examples, nonExamples} = this.props;
    const {hidden, exampleIndex, nonExampleIndex} = this.state;
    return (
      <div>
        {hidden &&
          (<div>
            <div style={styles.buttonRow}>
              <RaisedButton
                onTouchTap={this.onHintsToggled}
                style={styles.button}
                secondary={true}
                label="Show Examples" />
              <div style={styles.prompt}>Need a hint?</div>
            </div>
          </div>)
        }
        {!hidden &&
          (<div>
            <div style={styles.examplesBox}>
              <div style={styles.exampleSection}>
                <div style={styles.exampleTitle}>Good Example</div>
                <div style={styles.exampleText}>
                  {examples[exampleIndex]}
                </div>
                <RaisedButton
                  onTouchTap={this.onNextExample}
                  style={styles.button}
                  label="Next example" />
              </div>
              <div style={styles.exampleSection}>
                <div style={styles.exampleTitle}>Bad Example</div>
                <div style={styles.exampleText}>
                  {nonExamples[nonExampleIndex]}
                </div>
                <RaisedButton
                  onTouchTap={this.onNextNonExample}
                  style={styles.button}
                  label="Next example" />
              </div>
            </div>
            
            <div style={styles.buttonRow}>
              <RaisedButton
                onTouchTap={this.onHintsToggled}
                style={styles.button}
                secondary={true}
                label="Hide Examples" />
            </div>
          </div>)
        }
      </div>
    );
  }
});


const styles = {
  exampleSection: {
    display: 'block',
    marginRight: 10
  },
  buttonRow: {
    margin: 10,
  },
  prompt: {
    fontSize: 16,
    fontWeight: 'bold',
    display: 'inline-block',
  },
  button: {
    display: 'inline-block',
    float: 'right'
    
  },
  examplesBox: {
    display: 'inline-block'
  },
  exampleTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 6,
    marginBottom: 2,
    display: 'block',
    clear: 'right'
  },
  exampleText: {
    display: 'block',
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    fontSize: 14
  }
};