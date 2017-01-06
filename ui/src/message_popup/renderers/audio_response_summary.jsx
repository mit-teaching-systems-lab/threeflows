/* @flow weak */
import _ from 'lodash';
import React from 'react';
import VelocityTransitionGroup from "velocity-react/velocity-transition-group";
import Divider from 'material-ui/Divider';

import ReadMore from './read_more.jsx';

/*
Component that displays the summary of audio responses.
*/
export default React.createClass({
  displayName: 'AudioResponseSummary',

  propTypes: {
    audioResponses: React.PropTypes.array.isRequired,
  },

  render() {

    const audioResponses = [];
    var lastQuestionId = null;  // For detecting questions with more than one response
    this.props.audioResponses.map((originalAudioResponse) => {
      var audioResponse = {};
      var questionId = originalAudioResponse.question.id;
      if(questionId === lastQuestionId) {
        var lastObj = audioResponses[audioResponses.length - 1];
        lastObj.audioUrls.push(originalAudioResponse.blobUrl);
      } else {
        lastQuestionId = questionId;
        audioResponse.audioUrls = [originalAudioResponse.blobUrl];
        audioResponse.questionText = originalAudioResponse.question.text;
        audioResponses.push(audioResponse);
      }
    });

    return (
      <div className="done">
        <VelocityTransitionGroup enter={{animation: "slideDown"}} leave={{animation: "slideUp"}} runOnMount={true}>
          <div style={styles.doneTitle}>
            <p style={styles.paragraph}>You've finished the simulation.</p>
            <p style={styles.paragraph}><strong>Do not close this page</strong>. You will need it for the reflection.</p>
            <p style={styles.paragraph}>Please return to the form for the post-simulation reflection.</p>
          </div>
          <p style={styles.summaryTitle}>Summary</p>
          <Divider />
          {audioResponses.map((audioResponse) =>
            <div key={audioResponse.questionId} style ={_.merge(styles.instructions, styles.summaryQuestion)}>
              <ReadMore fulltext={audioResponse.questionText} />
              {audioResponse.audioUrls.map((audioUrl, i) => 
                <audio key={audioResponse.questionId + '-response-' + i} controls={true} src={audioUrl} />
              )}
              <Divider />
            </div>
          )}
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