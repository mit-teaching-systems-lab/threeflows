/* @flow weak */
import _ from 'lodash';
import React from 'react';
import VelocityTransitionGroup from "velocity-react/velocity-transition-group";
import Divider from 'material-ui/Divider';

import ReadMore from './read_more.jsx';

/*
Component that displays the summary of responses, either audio or text.
*/
export default React.createClass({
  displayName: 'ResponseSummary',

  propTypes: {
    responses: React.PropTypes.array.isRequired,
    children: React.PropTypes.node
  },

  // Supports audio and two forms of text response.
  computeSummaryItems() {
    const {responses} = this.props;

    return _.compact(responses.map((response) => {
      const questionId = response.question.id;
      const questionText = response.question.text;

      if (response.audioResponse) {
        const audioUrl = response.audioResponse.downloadUrl;
        return {questionId, questionText, audioUrl};
      }

      if (response.textResponse) {
        const {responseText} = response.textResponse;
        return {questionId, questionText, responseText};
      }

      if (response.responseText) {
        const {responseText} = response;
        return {questionId, questionText, responseText};
      }

      return null;
    }));
  },

  render() {
    const {children} = this.props;
    const audioSummaryItems = this.computeSummaryItems();

    return (
      <div className="done">
        <VelocityTransitionGroup enter={{animation: "slideDown"}} leave={{animation: "slideUp"}} runOnMount={true}>
          <div style={styles.doneTitle}>
            <p style={styles.paragraph}>{children || null}</p>
          </div>
          <p style={styles.summaryTitle}>Summary</p>
          <Divider />
          {audioSummaryItems.map((audioSummaryItem, index) => {
            const {audioUrl, responseText, questionText} = audioSummaryItem;
            return (
              <div key={index} style ={_.merge(styles.instructions, styles.summaryQuestion)}>
                <ReadMore fulltext={questionText} />
                {audioUrl && <audio controls={true} src={audioUrl} />}
                {responseText && <i style={styles.paragraph}>{responseText}</i>}
                <Divider />
              </div>
            );
          })}
          <div style={styles.container} />
        </VelocityTransitionGroup>
      </div> 
    );
  },
  
});

const styles = {
  done: {
    padding: 20,
  },
  container: {
    fontSize: 20,
    padding: 0,
    margin:0,
    paddingBottom: 45
  },
  button: {
    marginTop: 20
  },
  doneTitle: {
    padding: 20,
    paddingBottom: 0,
    margin:0,
  },
  instructions: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  paragraph: {
    display: 'block',
    marginTop: 20,
    marginBottom: 20
  },
  summaryTitle: {
    fontSize: 20,
    padding: 20,
    paddingBottom: 5,
    margin: 0,
    fontWeight: 'bold'
  },
  summaryQuestion: {
    whiteSpace: 'pre-wrap',
    fontSize: 16,
    lineHeight: 1.2,
    paddingTop: 20,
    paddingBottom: 10
  }
};