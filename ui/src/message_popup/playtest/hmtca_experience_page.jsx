/* @flow weak */
import React from 'react';
import uuid from 'uuid';
import _ from 'lodash';

import * as Api from '../../helpers/api.js';
import hash from '../../helpers/hash.js';
import LinearSession from '../linear_session/linear_session.jsx';
import SessionFrame from '../linear_session/session_frame.jsx';
import VelocityTransitionGroup from "velocity-react/velocity-transition-group";
import 'velocity-animate/velocity.ui';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField';

import QuestionInterpreter from '../renderers/question_interpreter.jsx';
import type {QuestionT} from './pairs_scenario.jsx';
import HMTCAScenarios from './hmtca_scenario.jsx';
import HMTCAGroupReview from './hmtca_group_review.jsx';

type ResponseT = {
  choice:string,
  question:QuestionT,
  sceneNumber?:number,
  anonymizedText?:string
};


// These parts are the different phases of the online experience.
const Parts = {
  PRACTICE: 'PRACTICE',
  GROUP_INSTRUCTIONS: 'GROUP_INSTRUCTIONS',
  GROUP_REVIEW: 'GROUP_REVIEW',
  FINAL_INSTRUCTIONS: 'FINAL_INSTRUCTIONS'
};


// This is the flow for the HMTCA breakout session
export default React.createClass({
  displayName: 'HMTCAExperiencePage',

  propTypes: {
    query: React.PropTypes.shape({
      cohort: React.PropTypes.string,
      p: React.PropTypes.string
    }).isRequired
  },

  // User types cohort for team
  getInitialState() {
    return {
      cohortKey: this.props.query.cohort || '',
      identifier: '',
      bucketId: HMTCAScenarios.BUCKETS[0].id.toString(),
      questions: null,
      sessionId: uuid.v4(),
      currentPart: Parts.PRACTICE
    };
  },

  // This is the key for a "game session we want to later review."
  // It's built from (cohort, bucket), so that each of those has its own
  // scene number space (the number is used for ordering and is user-facing).
  //
  // This means that if the same team code plays again later, the number of
  // responses will keep growing over time (as opposed to "start a new game").
  applesKey() {
    const {cohortKey, bucketId} = this.state;
    return [cohortKey, bucketId].join(':');
  },

  // Could make this smarter and have it coordinate across different users to
  // allow them all to advance n minutes after the first session started.
  shouldAllowJumpAhead() {
    return true;
  },

  onCohortKeyChanged(e, menuItemKey, cohortKey) {
    this.setState({cohortKey});
  },

  onIdentifierChanged(e) {
    this.setState({ identifier: e.target.value });
  },

  onBucketChanged(e) {
    this.setState({ bucketId: e.target.value });
  },

  // Making questions from the cohort
  onStart(e) {
    e.preventDefault();
    const {cohortKey, bucketId} = this.state;
    const allQuestions = HMTCAScenarios.questionsFor(cohortKey, parseInt(bucketId, 10));

    const startQuestionIndex = this.props.query.p || 0; // for testing or demoing
    const questions = allQuestions.slice(startQuestionIndex);
    const questionsHash = hash(JSON.stringify(questions));
    this.setState({
      questions,
      questionsHash
    });
  },

  onResetSession() {
    this.setState(this.getInitialState());
  },

  onShowGroupInstructions() {
    this.setState({ currentPart: Parts.GROUP_INSTRUCTIONS });
  },

  onStartGroupReview() {
    this.setState({ currentPart: Parts.GROUP_REVIEW });
  },

  onGroupReviewDone() {
    this.setState({ currentPart: Parts.FINAL_INSTRUCTIONS });
  },

  onLogMessage(type, response) {
    const {
      identifier,
      cohortKey,
      sessionId,
      questionsHash
    } = this.state;
    
    // Watch for a particular message, then add in the applesKey and double-log
    // it, stripping out all the identifiers from the log message so we can read it
    // back later safely anonymized.
    if (type === 'anonymized_apples_to_apples_partial') {
      Api.logApplesText({
        applesKey: this.applesKey(),
        sceneNumber: response.sceneNumber,
        sceneText: response.question.text,
        anonymizedText: response.anonymizedText
      });
    }

    Api.logEvidence(type, {
      ...response,
      sessionId,
      cohortKey,
      questionsHash,
      identifier
    });
  },

  render() {
    return (
      <SessionFrame onResetSession={this.onResetSession}>
        {this.renderContent()}
      </SessionFrame>
    );
  },

  renderContent() {
    const {questions, currentPart} = this.state;
    if (currentPart === Parts.PRACTICE) {
      if (!questions) return this.renderIntro();
      return <LinearSession
        questions={questions}
        questionEl={this.renderQuestionEl}
        summaryEl={this.renderPauseEl}
        onLogMessage={this.onLogMessage}
      />;
    }

    if (currentPart === Parts.GROUP_INSTRUCTIONS) return this.renderGroupInstructions();
    if (currentPart === Parts.GROUP_REVIEW) return this.renderGroupReview();
    if (currentPart === Parts.FINAL_INSTRUCTIONS) return this.renderFinalInstructions();
  },

  renderIntro() {
    return (
      <VelocityTransitionGroup enter={{animation: "callout.pulse", duration: 500}} leave={{animation: "slideUp"}} runOnMount={true}>
        <form onSubmit={this.onStart}>
          <div style={{...styles.instructions, marginBottom: 15}}>
            <p>Welcome!  This is an online practice space made just for HMTCA.</p>
          </div>
          <div style={styles.instructions}>
            <div>What's your anonymous identifier?</div>
            <TextField
              name="identifier"
              style={{width: '100%', marginBottom: 20}}
              underlineShow={true}
              hintText="orange-surprised-dolphin-73"
              value={this.state.identifier}
              onChange={this.onIdentifierChanged}
              rows={1} />
          </div>
          <div style={styles.instructions}>
            <div>What is your team code?</div>
            <SelectField
              maxHeight={250}
              style={{width: '100%'}}
              floatingLabelText="Select your team code"
              value={this.state.cohortKey}
              onChange={this.onCohortKeyChanged}
            >
              <MenuItem key={''} value={''} primaryText={''} />
              {HMTCAScenarios.TEAM_CODES.map(code => <MenuItem key={code} value={code} primaryText={code} />)}
            </SelectField>
          </div>
          <div style={styles.instructions}>
            <p>In this practice space, you'll have to improvise and adapt to make the best of the situation. Some scenarios might not exactly match your grade level and subject.</p>
            <RaisedButton
              disabled={this.state.cohortKey === '' || this.state.identifier === ''}
              onTouchTap={this.onStart}
              type="submit"
              style={styles.button}
              secondary={true}
              label="Start" />
          </div>
        </form>
      </VelocityTransitionGroup>
    );
  },

  renderQuestionEl(question:QuestionT, onLog, onResponseSubmitted) {
    const forceText = _.has(this.props.query, 'text');
    return (
      <div>
        <QuestionInterpreter
          question={question}
          onLog={onLog}
          forceText={forceText}
          onResponseSubmitted={onResponseSubmitted} />
        {this.shouldAllowJumpAhead() && this.renderJumpAhead()}
      </div>
    );
  },

  renderJumpAhead() {
    return (
      <div style={{marginTop: 200}}>
        <Divider />
        <div style={{margin: 35}}>
          <div style={{paddingBottom: 20}}>If the rest of your group has already finished, jump to the discussion round.</div>
          <RaisedButton
            label="Start phase #2"
            onTouchTap={this.onShowGroupInstructions} />
        </div>
      </div>
    );
  },

  renderPauseEl(questions:[QuestionT], responses:[ResponseT]) {
    return (
      <div style={{margin: 20}}>
        <div style={{paddingBottom: 20}}>If you’ve made it to this screen, you’ve finished responding to all the scenes. If you’ve finished early, wait for your whole group to finish before proceeding to Part 2. Once your whole group has finished, click on “Start Part 2.”</div>
        <RaisedButton
          label="Start Part #2"
          onTouchTap={this.onShowGroupInstructions} />
      </div>
    );
  },

  renderGroupInstructions() {
    return (
      <div style={{margin: 20}}>
        <div>
          <div><b>PART 2: Round-robin discussion</b> (20 minutes)</div>
          <br />
          <div>For Part 2, you will initially be taken to a screen where you can see the anonymized responses of everyone in your team to all 4 scenes. Once you’re on this screen, your team will choose one person to facilitate discussion around the responses to the first scene. The facilitator’s role is to summarize briefly the similarities/differences in how people responded. They will then lead the team in deciding which response or combination of responses would best de-escalate the situation as described in the scene. A great question to start discussion is: <i>Which responses would help de-escalate this situation?</i></div>
          <br />
          <div>Once you’ve finished discussing the first scene, select a new facilitator to lead the discussion for the second scene. Repeat this process until you’ve finished discussing all 4 scenes or 20 minutes have elapsed (whichever comes first). At this point, move on to Part 3.</div>
          <br />
          <div>Ready to start?</div>
        </div>
        <div>
          <RaisedButton
            label="ok!"
            onTouchTap={this.onStartGroupReview} />
        </div>
      </div>
    );
  },

  renderGroupReview() {
    return <HMTCAGroupReview
      applesKey={this.applesKey()}
      onDone={this.onGroupReviewDone} />;
  },

  renderFinalInstructions() {
    return (
      <div style={styles.instructions}>
        <p><b>PART 3: Group discussion on bias</b> (15 minutes)</p>
        <br />
        <div>Part 3 is a team discussion, so close your computers. As a team, discuss your responses to the following question: <i>What classroom management situations would be most impacted by a teacher's assumptions about race, ethnicity, or gender?</i></div>
        <br />
        <div>Once you’ve discussed for 15 minutes, you will return to full group discussion. Each team will be asked to share what they discussed during Parts 2 and 3 with the large group.</div>
      </div>
    );
  }
});

const styles = {
  instructions: {
    fontSize: 18,
    padding: 0,
    margin:0,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 10
  },
  button: {
    marginTop: 20
  }
};