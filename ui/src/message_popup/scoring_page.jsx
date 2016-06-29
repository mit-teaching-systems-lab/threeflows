// @flow
import _ from 'lodash';
import React from 'react';
import request from 'superagent';
import SwipeableViews from 'react-swipeable-views';

import * as Colors from 'material-ui/styles/colors';
import Divider from 'material-ui/Divider';
import AppBar from 'material-ui/AppBar';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import DoneIcon from 'material-ui/svg-icons/action/done';
import SchoolIcon from 'material-ui/svg-icons/social/school';
import FeedbackIcon from 'material-ui/svg-icons/action/feedback';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import {List, ListItem, Subheader} from 'material-ui/List';
import {
  Table,
  TableHeader,
  TableHeaderColumn,
  TableBody,
  TableRow,
  TableRowColumn
} from 'material-ui/Table';

import * as Routes from '../routes.js';
import Question from './question.jsx';
import ScoringSection from './scoring_section.jsx';
import ScoringSwipe from './scoring_swipe.jsx';
import {withLearningObjective} from './transformations.jsx';

function hashCode(s){
  return s.split("").reduce(function(a,b){a=((a<<5)-a)+b.charCodeAt(0);return a&a},0);              
}

function questionId(question) {
  return Math.abs(hashCode(question.text)).toString().slice(0, 4);
}

function logEvaluation(type, record) {
  const app = 'threeflows';
  const version = 1;

  request
    .post(Routes.evaluationPath({
      app: app,
      type: type,
      version: 1
    }))
    .set('Content-Type', 'application/json')
    .send(record)
    .end();

  return {
    app,
    version,
    type,
    json: record
  };
}

/*
UI for scoring Message PopUp responses
*/
export default React.createClass({
  displayName: 'MessagePopupScoringPage',

  propTypes: {
    query: React.PropTypes.object.isRequired
  },

  getInitialState() {
    return {
      logs: null,
      evaluations: null,
      selectedQuestion: null
    };
  },

  componentWillMount() {
    request
       .get('/server/query')
       .set('Content-Type', 'application/json')
       .end(this.onLogsReceived);
    
    request
       .get('/server/evaluations')
       .set('Content-Type', 'application/json')
       .end(this.onEvaluationsReceived);
  },

  onLogsReceived(err, response) {
    const logs = JSON.parse(response.text).rows;
    this.setState({logs});
  },

  onEvaluationsReceived(err, response) {
    const evaluations = JSON.parse(response.text).rows;
    this.setState({evaluations});
  },

  onQuestionSelected(selectedQuestion) {
    this.setState({selectedQuestion});
  },

  onEvaluation(evaluationRecord) {
    const evaluation = logEvaluation('message_popup_response_scored', evaluationRecord);
    const evaluations = this.state.evaluations.concat(evaluation);
    this.setState({evaluations});
  },

  computeRelevantLogs() {
    const {logs, evaluations} = this.state;
    if (logs === null) return [];
    if (evaluations === null) return [];

    // Show only solution mode responses, and those that haven't been translated to evidence
    // or dismissed.
    const logIds = evaluations.map(evaluation => evaluation.json.logId);
    return logs.filter((log) => {
      if (log.type !== 'message_popup_response') return false;
      if (log.json.helpType === 'none') return false;
      if (logIds.indexOf(log.id) !== -1) return false;
      return true;
    });
  },

  computeSelectedLogs(logs, selectedQuestion) {
    return logs.filter(log => log.json.question.text === selectedQuestion.text);
  },

  render() {
    const logs = this.computeRelevantLogs();
    const {selectedQuestion} = this.state;
    const selectedLogs = (selectedQuestion) ? this.computeSelectedLogs(logs, selectedQuestion) : null;

    return (
      <div>
        {!logs && <div>Loading...</div>}
        {logs && !selectedQuestion && this.renderQuestions(logs)}
        {selectedQuestion && selectedLogs && this.renderSwipeableList(selectedQuestion, selectedLogs)}
      </div>
    );
  },

  renderQuestions(logs) {
    const groupedLogs = _.groupBy(logs, log => log.json.question.text);
    const questionGroups = _.toPairs(groupedLogs).map(([questionKey, logsForQuestion]) => {
      return {questionKey, logsForQuestion};
    });
    
    return (
      <div>
        <AppBar title="Message PopUp Scorer" />
        <Paper zDepth={2} style={{padding: 20}}>There are {questionGroups.length} questions that need scoring.</Paper>
        <List>
          {questionGroups.map(({logsForQuestion, questionKey}) => {
            const question = _.first(logsForQuestion).json.question;
            const {learningObjective} = withLearningObjective(question);            
            return this.renderQuestion({
              questionKey,
              question,
              learningObjective,
              logsForQuestion
            });
          })}
        </List>
      </div>
    );
  },

  renderQuestion({questionKey, question, learningObjective, logsForQuestion}) {
    return (
      <div key={questionKey}>
        <ListItem
          style={{cursor: 'pointer', fontSize: 14}}
          onClick={this.onQuestionSelected.bind(this, question)}
          leftIcon={<SchoolIcon />}
          primaryText={`#${questionId(question)} ${learningObjective.competencyGroup} (${logsForQuestion.length})`}
          secondaryText={
            <div>
              <span>{question.text}</span>
            </div>
          }
          secondaryTextLines={2}
        />
        <Divider />
      </div>
    );
  },

  renderSwipeableList(question, logsForQuestion) {
    const {learningObjective} = withLearningObjective(question);

    return (
      <ScoringSwipe
        logs={logsForQuestion}
        learningObjective={learningObjective}
        question={question}
        onEvaluation={this.onEvaluation}
        onCancel={this.onQuestionSelected.bind(this, null)}
      />
    );
  },

        /*
        <List>
          {logs.map((log) => {
            return <ListItem
              key={log.id}
              onClick={this.onLogSelected.bind(this, log)}
              primaryText={`#${log.id}   ${log.json.question.text}`}
              secondaryTextLines={2}
              secondaryText={log.json.initialResponseText} />
          })}
        </List>
        <Table style={styles.summaryTable}>
          <TableBody displayRowCheckbox={false}>
            {logs.map((log) => {
              return (
                <TableRow key={log.id} onClick={this.onLogSelected.bind(this, log)}>>
                  <TableRowColumn>{log.id}</TableRowColumn>
                  <TableRowColumn>{log.json.question.text}</TableRowColumn>
                  <TableRowColumn>{log.json.initialResponseText}</TableRowColumn>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        */

  // renderQuestion(log) {
  //   const {id, initialResponseText, elapsedMs, question} = log.json;
  //   const secondsRemaining = Math.round((elapsedMs) / 1000);
  //   return <Question
  //     key={id}
  //     question={question}
  //     shouldShowStudentCard={true}
  //     initialResponseText={initialResponseText}
  //     disabled={true}
  //     tickerText={`${secondsRemaining}s to respond`} />;
  // },

  // renderScoringSection(selectedLog) {
  //   const {question, initialResponseText, elapsedMs} = selectedLog.json;
  //   const {learningObjective} = withLearningObjective(question)

  //   return <ScoringSection
  //       logId={selectedLog.id}
  //       initialResponseText={initialResponseText}
  //       elapsedMs={elapsedMs}
  //       question={question}
  //       learningObjective={learningObjective}
  //       onDoneScoring={this.onDoneScoring} />;
  // }
});

const styles = {
  summaryTitle: {
    padding: 20
  },
  summaryTable: {
    border: '1px solid black',
    paddingBottom: 20,
    paddingTop: 20,
    overflow: 'scroll-y',
    width: 400
  }
};