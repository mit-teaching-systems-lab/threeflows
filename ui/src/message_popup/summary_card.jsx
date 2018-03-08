/* @flow */
import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';


export default React.createClass({
  displayName: 'SummaryCard',
  
  propTypes: {
    onDone: React.PropTypes.func.isRequired,
    question: React.PropTypes.object.isRequired,
    responseText: React.PropTypes.string.isRequired,
    elapsedSeconds: React.PropTypes.number.isRequired,
    buttonLabel: React.PropTypes.string.isRequired
  },
  
  render(){
    return(
      <div>
        <div style={styles.title}>Summary:</div>
        <Divider />
        <div style={styles.summary}>
          {this.renderQuestion()}
          <div style={styles.responseTitle}>Your Response:</div>
          <div style={styles.responseText}>"{this.props.responseText}"</div>
          <div style={styles.responseTime}>Time to respond: {this.props.elapsedSeconds} {this.props.elapsedSeconds === 1 ? "second" : "seconds"}</div>
        </div>
        <Divider />
        <div style={styles.buttonRow}>
          <RaisedButton
            onTouchTap={this.props.onDone}
            style={styles.button}
            secondary={true}
            label={this.props.buttonLabel}/>
        </div>
      </div>
    );
  },

  renderQuestion() {
    const {question} = this.props;
    if (!question.text) return null;
    return (
      <div>
        <div style={styles.questionTitle}>Question:</div>
        <div style={styles.questionText}>{this.props.question.text}</div>
        <Divider />
      </div>
    );
  }
});

const styles = {
  title: {
    whiteSpace: 'pre-wrap',
    padding: 20
  },
  summary: {
    padding: 20
  },
  questionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    paddingBottom: 10
  },
  questionText: {
    paddingLeft: 10,
    fontSize: 14,
    paddingBottom: 10
  },
  responseTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    paddingTop: 10,
    paddingBottom: 10
  },
  responseText: {
    paddingLeft: 10,
    fontSize: 14
  },
  responseTime: {
    paddingTop: 5,
    paddingLeft: 10,
    fontSize: 14
  },
  buttonRow: {
    padding: 20
  },
  button: {
    display: 'inline-block',
  }
};