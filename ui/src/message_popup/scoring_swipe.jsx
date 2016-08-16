/* @flow weak */
import React from 'react';
import VelocityTransitionGroup from "velocity-react/velocity-transition-group";
import 'velocity-animate/velocity.ui';
import SwipeableViews from 'react-swipeable-views';

import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import DoneIcon from 'material-ui/svg-icons/action/done';
import BackIcon from 'material-ui/svg-icons/navigation/arrow-back';
import FeedbackIcon from 'material-ui/svg-icons/action/feedback';
import {Card, CardText} from 'material-ui/Card';
import LinearProgress from 'material-ui/LinearProgress';
import IconButton from 'material-ui/IconButton';

import ScoringQuestionContext from './scoring_question_context.jsx';
import MessageResponseCard from './message_response_card.jsx';
import * as EvaluationConstants from '../helpers/evaluation_constants';
const {DEMONSTRATED_COMPETENCY, NOT_YET_COMPETENCY} = EvaluationConstants;

const SWIPE_LEFT_INDEX = 0;
const NO_SWIPE_INDEX = 1;
const SWIPE_RIGHT_INDEX = 2;


/*
UI for scoring Message PopUp responses by swiping a la Inbox
*/
export default React.createClass({
  displayName: 'ScoringSwipe',

  propTypes: {
    question: React.PropTypes.object.isRequired,
    indicator: React.PropTypes.object.isRequired,
    logs: React.PropTypes.array.isRequired,
    onEvaluation: React.PropTypes.func.isRequired,
    onCancel: React.PropTypes.func.isRequired,
    limitIncrement: React.PropTypes.number
  },

  contextTypes: {
    auth: React.PropTypes.object.isRequired
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
    const {question, indicator} = this.props;
    const {email} = this.context.auth.userProfile;

    this.props.onEvaluation({
      scoreValue,
      logId,
      scoreComment,
      indicator,
      question,
      email,
      scorerEmail: email
    });
  },

  onSwiped(log, index) {
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

  onAllDoneClicked() {
    this.props.onCancel();
  },

  render() {
    const {logs} = this.props;
    const truncatedLogs = logs.slice(0, this.state.limit);

    return (
      <div>
        <AppBar
          title="Teacher Moments Scorer"
          iconElementLeft={
            <IconButton onClick={() => this.props.onCancel()}>
            <BackIcon />
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
    const {question, indicator} = this.props;
    return (
      <div>
        <ScoringQuestionContext
          question={question}
          indicator={indicator}
        />
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
                onTouchTap={this.onAllDoneClicked}
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
    return <MessageResponseCard log={log} extendStyle={styles.itemHeight} />;
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
  itemHeight: {
    minHeight: 150
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
    backgroundColor: EvaluationConstants.Colors[DEMONSTRATED_COMPETENCY],
    justifyContent: 'flex-end',
  },
  notYetSwipe: {
    backgroundColor: EvaluationConstants.Colors[NOT_YET_COMPETENCY],
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
  }
};