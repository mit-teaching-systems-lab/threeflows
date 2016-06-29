import React from 'react';
import VelocityTransitionGroup from "velocity-react/velocity-transition-group";
import 'velocity-animate/velocity.ui';
import SwipeableViews from 'react-swipeable-views';

import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import DoneIcon from 'material-ui/svg-icons/action/done';
import AssignmentIcon from 'material-ui/svg-icons/action/assignment';
import FeedbackIcon from 'material-ui/svg-icons/action/feedback';
import * as Colors from 'material-ui/styles/colors';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import LinearProgress from 'material-ui/LinearProgress';
import IconButton from 'material-ui/IconButton';

import StudentCard from './student_card.jsx';
import ExamplesCard from './examples_card.jsx';


const SWIPE_LEFT_INDEX = 0;
const NO_SWIPE_INDEX = 1;
const SWIPE_RIGHT_INDEX = 2;

const DEMONSTRATED_COMPETENCY = 1;
const NOT_YET_COMPETENCY = 0;


/*
UI for scoring Message PopUp responses by swiping a la Inbox
*/
export default React.createClass({
  displayName: 'ScoringSwipe',

  propTypes: {
    question: React.PropTypes.object.isRequired,
    learningObjective: React.PropTypes.object.isRequired,
    logs: React.PropTypes.array.isRequired,
    onEvaluation: React.PropTypes.func.isRequired,
    onCancel: React.PropTypes.func.isRequired,
    limitIncrement: React.PropTypes.number
  },

  getDefaultProps() {
    return {
      limitIncrement: 20
    };
  },

  getInitialState() {
    return {
      limit: this.props.limitIncrement,
      notYetFeedbackTexts: {},
      swipeIndexes: {}
    };
  },

  resetSwipingState(logId) {
    this.setState({
      swipeIndexes: {
        ...this.state.swipeIndexes,
        [logId]: NO_SWIPE_INDEX
      }
    });
  },

  doScore(logId, scoreValue, {scoreComment} = {}) {
    const {question, learningObjective} = this.props;
    this.props.onEvaluation({
      scoreValue,
      logId,
      scoreComment,
      learningObjective,
      question
    });
  },

  onSwiped(log, index, fromIndex) {
    if (index === SWIPE_LEFT_INDEX) return this.doScore(log.id, DEMONSTRATED_COMPETENCY);
    if (index === SWIPE_RIGHT_INDEX) {
      this.setState({
        swipeIndexes: {
          ...this.state.swipeIndexes,
          [log.id]: SWIPE_RIGHT_INDEX
        }
      });
    }
  },

  onNotYetFeedbackChanged(log, e) {
    this.setState({
      notYetFeedbackTexts: {
        [log.id]: e.target.value
      }
    });
  },

  onDoneNotYetFeedback(log) {
    const scoreComment = this.state.notYetFeedbackTexts[log.id];
    this.resetSwipingState(log.id);
    return this.doScore(log.id, NOT_YET_COMPETENCY, {scoreComment});
  },

  onMoreRowsClicked() {
    this.setState({ limit: this.state.limit + this.props.limitIncrement });
  },

  render() {
    const {logs} = this.props;
    const truncatedLogs = logs.slice(0, this.state.limit);

    return (
      <div>
        <AppBar
          title="Message PopUp Scorer"
          iconElementLeft={
            <IconButton onClick={() => this.props.onCancel()}>
            <AssignmentIcon />
          </IconButton>}
        />
        {this.renderContext(logs)}
        <div style={styles.listContainer}>
          <VelocityTransitionGroup leave={{animation: "slideUp"}}>
            {truncatedLogs.map((log) => {
              return (
                <SwipeableViews
                  key={log.id}
                  onChangeIndex={this.onSwiped.bind(this, log)}
                  index={this.state.swipeIndexes[log.id] || NO_SWIPE_INDEX}
                  style={styles.itemHeight}
                  resistance={true}
                >
                  <div style={{...styles.itemHeight, ...styles.swipe, ...styles.doneSwipe}}>
                    <DoneIcon style={{fontSize: 32}} color="white" />
                  </div>
                  {this.renderItem(log)}
                  <div style={{...styles.itemHeight, ...styles.swipe, ...styles.notYetSwipe}}>
                    {this.state.swipeIndexes[log.id] === SWIPE_RIGHT_INDEX
                      ? this.renderFeedback(log)
                      : <FeedbackIcon style={{fontSize: 32}} color="white" />}
                  </div>
                </SwipeableViews>
              );
            })}
          </VelocityTransitionGroup>
          {logs.length > this.state.limit &&
            <RaisedButton
              onTouchTap={this.onMoreRowsClicked}
              style={styles.showMoreButton}
              primary={true}
              label="Show more" />}
        </div>
      </div>
    );
  },

  renderContext(logs) {
    const {learningObjective, question} = this.props;
    return (
      <div>
        <Card
          key="question"
          style={styles.contextCard}
          zDepth={2}
          initiallyExpanded={true}>
          <CardHeader
            title="Question"
            actAsExpander={true}
            showExpandableButton={true}/>
          <CardText
            expandable={true}
            style={styles.competencyText}>
              <div>
                <div style={{paddingBottom: 20}}>{question.text}</div>
                {question.student && <StudentCard useCardStyles={true} student={question.student} />}
              </div>
          </CardText>
        </Card>
        <Card key="competency" style={styles.contextCard} zDepth={2}>
          <CardHeader
            title="Learning Objective"
            actAsExpander={true}
            showExpandableButton={true} />
          <CardText
            expandable={true}
            style={styles.competencyText}>{learningObjective.text}</CardText>
        </Card>
        {question.examples.length > 0 &&
          <ExamplesCard
            key="examples"
            titleText="Examples"
            examples={question.examples} />}
        {question.nonExamples.length > 0 &&
          <ExamplesCard
            key="non-examples"
            titleText="Non-examples"
            examples={question.nonExamples} />}
        <Card key="progress" style={styles.contextCard} zDepth={2}>
          <CardText>
            {logs.length > 0 && 
              <div>
                <div style={{paddingBottom: 5, fontWeight: 'bold'}}>
                  {`${logs.length} ${logs.length === 1 ? 'response' : 'responses'} left`}
                </div>
                <LinearProgress mode="determinate" value={logs.length} max={10}/>
              </div>}
            {logs.length === 0 &&
              <RaisedButton
                onTouchTap={this.onMoreRowsClicked}
                icon={<DoneIcon />}
                labelStyle={{verticalAlign: 'middle'}}
                primary={true}
                label="All Done" />}
          </CardText>
        </Card>
      </div>
    );
  },

  renderItem(log) {
    return (
      <Card key="competency" style={{...styles.itemHeight, ...styles.itemCard}}>
        <CardText style={{fontSize: 16}}>
          <div>
            <div>{log.json.initialResponseText}</div>
            <div style={styles.responseLatency}>{`${Math.round(log.json.elapsedMs/1000)} seconds`}</div>
          </div>
        </CardText>
      </Card>
    );
  },

  renderFeedback(log) {
    return (
      <div style={styles.feedbackContainer}>
        <div style={{paddingTop: 15}}>Give specific, helpful and kind feedback.</div>
        <div>
          <div>
            <TextField
              id={log.id.toString()}
              fullWidth={true}
              inputStyle={styles.textField}
              onChange={this.onNotYetFeedbackChanged.bind(this, log)}
              value={this.state.notYetFeedbackTexts[log.id] || ''}
              underlineShow={true} />
          </div>
          <div style={{paddingBottom: 15}}>
            <RaisedButton
              onTouchTap={this.onDoneNotYetFeedback.bind(this, log)}
              primary={true}
              label="Send" />
            <RaisedButton
              onTouchTap={this.resetSwipingState.bind(this, log.id)}
              label="Cancel" />
          </div>
        </div>
      </div>
    );
  }
});

const styles = {
  listContainer: {
    paddingTop: 5
  },
  contextCard: {},
  itemHeight: {
    minHeight: 150
  },
  itemCard: {
    borderBottom: '1px solid #eee',
    margin: 0 
  },
  swipe: {
    color: 'white',
    paddingLeft: 20,
    paddingRight: 20,
    display: 'flex',
    alignItems: 'center',
    height: '100%'
  },
  doneSwipe: {
    backgroundColor: Colors.green500,
    justifyContent: 'flex-end',
  },
  notYetSwipe: {
    backgroundColor: Colors.orange500,
    justifyContent: 'flex-start'
  },
  textField: {},
  feedbackContainer: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    justifyContent: 'space-between'
  },
  showMoreButton: {
    margin: 20
  },
  responseLatency: {
    marginTop: 10,
    color: Colors.grey500
  }
};