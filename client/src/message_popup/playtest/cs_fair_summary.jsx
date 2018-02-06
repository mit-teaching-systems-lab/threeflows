/* @flow weak */
import PropTypes from 'prop-types';

import React from 'react';
import Clipboard from 'clipboard';

import RaisedButton from 'material-ui/RaisedButton';
import {Card, CardHeader, CardText} from 'material-ui/Card';

import type {ScoreT} from './cs_fair_scenario.jsx';




function filterResponses(responses) {
  const scoreResponses = responses.filter(response => response.isCsScoreResponse && response.projectLabel !== 'demo');
  const reflectionResponses = responses.filter(response => response.isTextResponse);

  return {scoreResponses, reflectionResponses};
}

function scoreTotals(scoreResponse) {
  const total = scoreResponse.scores.reduce((total, score) => total + scoreResponse.scoreValues[score.key], 0);
  const totalMax = scoreResponse.scores.reduce((total, score) => total + score.max, 0);

  return {total, totalMax};
}

// Return a string summarizing their responses and reflections as pre-formatted text.
// This is similar to the React component, just for copying to the clipboard or emailing.
function clipboardText(scoreResponses, reflectionResponses) {
  var lines = [].concat([
    '---- Student projects ----'
  ]);
  lines = lines.concat(scoreResponses.map(projectText));
  lines = lines.concat([
    '',
    '---- Reflection questions ----',
  ]).concat(reflectionResponses.map((reflectionResponse) => {
    const {responseText, questionText} = reflectionResponse;
    return [
      questionText.trim(),
      responseText,
      ''
    ].join("\n");
  }));

  return lines.join("\n");
}

// String describing scores and feedback for a student project
function projectText(scoreResponse, i) {
  const introLines = [
    `Student: ${scoreResponse.studentName}`,
    `Project: ${scoreResponse.projectLabel}`,
    'Scores:'
  ];
  const scoreLines = scoreResponse.scores.map((score:ScoreT) => {
    return `  ${score.label}:${scoreResponse.scoreValues[score.key]}/${score.max}`;
  });
  const {total, totalMax} = scoreTotals(scoreResponse);
  const totalLine = `  Total: ${total} out of ${totalMax} points`;
  const feedbackLines = [
    'Written feedback:',
    `${scoreResponse.responseText || '(nothing)'}`,
    ''
  ];

  return []
    .concat(introLines)
    .concat(scoreLines)
    .concat(totalLine)
    .concat(feedbackLines)
    .join("\n");
}


/*
This doesn't show anything about aggregate responses or scores, and is only focused on individual
responses during this user's session.  It summarizes their feedback to student projects and their reflection questions,
and allows them to copy it all as text (eg., for a discussion forum or chat).
*/
export default class extends React.Component {
  props: {responses: Array<$FlowFixMe>};
  static displayName = 'CsFairSummary';

  static propTypes = {
    responses: PropTypes.array.isRequired
  };

  // Allow copy to the clipboard
  componentDidMount() {
    new Clipboard('.copy-to-clipboard-button > button');
  }

  render() {
    const {responses} = this.props;
    const {scoreResponses, reflectionResponses} = filterResponses(responses);
    const text = clipboardText(scoreResponses, reflectionResponses);
    const copyButtonEl = <RaisedButton
      style={{margin: 30, marginLeft: 10}}
      type="button"
      className="copy-to-clipboard-button"
      secondary={true}
      label="Copy all to clipboard"
      data-clipboard-text={text}
    />;

    return (
      <div style={{padding: 20}}>
        <div style={{paddingBottom: 20}}>Thanks!</div>
        <div>Review your scores and feedback for each project below as well as your reflections.  Share these back with your cohort in your discussion forum or chat.</div>
        {copyButtonEl}
        <h3 style={{marginTop: 20}}>Student projects:</h3>
        <div>
          {scoreResponses.map((scoreResponse, i) => {
            const {total, totalMax} = scoreTotals(scoreResponse);
            return (
              <Card key={i} style={{marginBottom: 10}}>
                <CardHeader
                  title={`Student: ${scoreResponse.studentName}`}
                  actAsExpander={false}
                  initiallyExpanded={true}
                  showExpandableButton={false}
                />
                <CardText expandable={false}>
                  <div>Project: {scoreResponse.projectLabel}</div>
                  <div style={{marginTop: 10}}>Scores:</div>
                  <div style={{fontSize: 14, marginLeft: 10}}>
                    {scoreResponse.scores.map((score:ScoreT) => {
                      return (
                        <div key={score.key}>
                          {score.label}: {scoreResponse.scoreValues[score.key]} / {score.max}
                        </div>
                      );
                    })}
                    <div>Total: {total} out of {totalMax} points</div>
                  </div>
                  <div style={{marginTop: 10}}>
                    <div>Written feedback:</div>
                    <i style={{marginLeft: 10}}>{scoreResponse.responseText || '(nothing)'}</i>
                  </div>
                </CardText>
              </Card>
            );
          })}
        </div>
        <h3 style={{marginTop: 30, marginBottom: 0}}>Reflection questions:</h3>
        <div style={{paddingTop: 20}}>
          {reflectionResponses.map((reflectionResponse) => {
            const {responseText, questionText} = reflectionResponse;
            return (
              <Card key={questionText} style={{marginBottom: 5}}>
                <CardText>
                  <div>{questionText}</div>
                  <i>{responseText}</i>
                </CardText>
              </Card>
            );
          })}
        </div>
        {copyButtonEl}
      </div>
    );
  }
}