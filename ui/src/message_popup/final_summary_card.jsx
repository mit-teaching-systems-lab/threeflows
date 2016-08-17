/* @flow weak */
import _ from 'lodash';
import React from "react";

export default React.createClass({
  displayName: "FinalSummaryCard",
  
  propTypes: {
    msResponseTimes: React.PropTypes.array.isRequired,
    limitMs: React.PropTypes.number.isRequired
  },

  render(){
    const mean = Math.round(_.mean(this.props.msResponseTimes)/10)/100;
    const numUnderTime = this.props.msResponseTimes.filter(time => time <= this.props.limitMs).length;
    const numAboveTime = this.props.msResponseTimes.filter(time => time > this.props.limitMs).length;
    const slowestResponse = Math.round(_.max(this.props.msResponseTimes)/1000);
    const fastestResponse = Math.round(_.min(this.props.msResponseTimes)/1000);
    return (
      <div style={styles.summary}>
        <div style={styles.summaryTitle}>Response Time Summary</div>
        <div style={styles.summaryText}>
          <div>Average response time: {mean}s</div>
          <div>Number of responses under 90s: {numUnderTime}</div>
          <div>Number of responses over 90s: {numAboveTime}</div>
          <div>Fastest response: {fastestResponse} {fastestResponse===1 ? "second" : "seconds"}</div>
          <div>Slowest response: {slowestResponse} {slowestResponse===1 ? "second" : "seconds"}</div>
        </div>
      </div>
    );
  }
});

const styles = {
  summary: {
    marginTop: 10
  },
  summaryTitle:{
    fontSize: 16,
    fontWeight: 'bold',
    paddingBottom: 10
  },
  summaryText:{
    fontSize: 14,
    paddingLeft: 10
  }
};