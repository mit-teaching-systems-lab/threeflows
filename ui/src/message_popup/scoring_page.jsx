/* @flow weak */
import _ from 'lodash';
import React from 'react';
import VelocityTransitionGroup from "velocity-react/velocity-transition-group";
import 'velocity-animate/velocity.ui';


import Divider from 'material-ui/Divider';
import NavigationAppBar from '../components/navigation_app_bar.jsx';
import Paper from 'material-ui/Paper';
import SchoolIcon from 'material-ui/svg-icons/social/school';
import {List, ListItem} from 'material-ui/List';

import ScoringSwipe from './scoring_swipe.jsx';
import {withIndicator} from './transformations.jsx';
import {questionId} from './question.js';
import * as Api from '../helpers/api.js';


/*
UI for scoring Message PopUp responses
*/
export default React.createClass({
  displayName: 'MessagePopupScoringPage',

  propTypes: {
    query: React.PropTypes.object.isRequired,
    transitionMs: React.PropTypes.number
  },

  getDefaultProps() {
    return {
      transitionMs: 150
    };
  },

  getInitialState() {
    return {
      logs: null,
      evaluations: null,
      selectedQuestion: null
    };
  },
  
  componentWillMount() {
    Api.evidenceQuery().end(this.onLogsReceived);
    Api.evaluationsQuery().end(this.onEvaluationsReceived);
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

  onTransitionDone() {
    window.scrollTo(0, 0);
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
    const evaluation = Api.logEvaluation('message_popup_response_scored', evaluationRecord);
    const evaluations = this.state.evaluations.concat(evaluation);
    this.setState({evaluations});
  },

  render() {
    const logs = this.computeRelevantLogs();
    const {selectedQuestion} = this.state;
    const selectedLogs = (selectedQuestion) ? this.computeSelectedLogs(logs, selectedQuestion) : null;

    return (
      <div>
        {!logs && <div key="loading">Loading...</div>}
        <VelocityTransitionGroup
          leave={{animation: "transition.slideLeftOut", duration: this.props.transitionMs, complete: this.onTransitionDone}}
          enter={{animation: "transition.slideLeftIn", duration: this.props.transitionMs, complete: this.onTransitionDone}}
        >
          {logs && !selectedQuestion && this.renderQuestions(logs)}
        </VelocityTransitionGroup>
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
        <NavigationAppBar title="Teacher Moments" />
        <Paper zDepth={2} style={{padding: 20}}>There are {questionGroups.length} questions that need scoring.</Paper>
        <List>
          {questionGroups.map(({logsForQuestion, questionKey}) => {
            const question = _.first(logsForQuestion).json.question;
            const {indicator} = withIndicator(question);            
            return this.renderQuestion({
              questionKey,
              question,
              indicator,
              logsForQuestion
            });
          })}
        </List>
      </div>
    );
  },

  renderQuestion({questionKey, question, indicator, logsForQuestion}) {
    return (
      <div key={questionKey}>
        <ListItem
          style={{cursor: 'pointer', fontSize: 14}}
          onClick={this.onQuestionSelected.bind(this, question)}
          leftIcon={<SchoolIcon />}
          primaryText={`(${logsForQuestion.length}) #${questionId(question)} ${indicator.text}`}
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
    const {indicator} = withIndicator(question);

    return (
      <ScoringSwipe
        logs={logsForQuestion}
        indicator={indicator}
        question={question}
        onEvaluation={this.onEvaluation}
        onCancel={this.onQuestionSelected.bind(this, null)}
      />
    );
  }
});
