/* @flow weak */
import PropTypes from 'prop-types';

import React from 'react';
import uuid from 'uuid';
import _ from 'lodash';

import TextField from 'material-ui/TextField';
import * as Api from '../../helpers/api.js';
import hash from '../../helpers/hash.js';
import LinearSession from '../linear_session/linear_session.jsx';
import SessionFrame from '../linear_session/session_frame.jsx';
import VelocityTransitionGroup from "velocity-react/velocity-transition-group";
import 'velocity-animate/velocity.ui';
import RaisedButton from 'material-ui/RaisedButton';

import QuestionInterpreter from '../renderers/question_interpreter.jsx';
import type {QuestionT} from '../playtest/pairs_scenario.jsx';
import {toSlides, CSSPaperPrototypes, SeedPaperPrototypes} from './paper_prototype_scenarios.jsx';
import GroupReview from '../review/group_review.jsx';


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


// For showing minimal paper prototypes.
// This was adapted from HMTCAExperiencePage
export default class extends React.Component {
  props: {
    prototypeKey: string,
    query: {
      cohort?: string,
      p?: string,
      workshop?: string,
    },
  };

  static displayName = 'PaperPrototypePage';

  static propTypes = {
    prototypeKey: PropTypes.string.isRequired,
    query: PropTypes.shape({
      cohort: PropTypes.string,
      p: PropTypes.string,
      workshop: PropTypes.string
    }).isRequired
  };

  // User types cohort for team
  state = {
    cohortKey: '',
    identifier: 'PAPER_PROTOTYPE_IDENTIFIER:' + uuid.v4(),
    workshop: 'PAPER_PROTOTYPE_PAGE' + (this.props.query.workshop || 'defaultWorkshop'),
    questions: null,
    sessionId: uuid.v4(),
    currentPart: Parts.PRACTICE
  };

  // This is the key for a "game session we want to later review."
  // It's built from (cohort, workshop), so that each cohort of those has its own
  // scene number space (the number is used for ordering and is user-facing).
  //
  // This means that if the same team code plays again later, the number of
  // responses will keep growing over time (as opposed to "start a new game").
  //
  // Different workshop sessions on different days can use URLs to different workshop
  // values for isolation.
  applesKey = () => {
    const {prototypeKey} = this.props;
    const {cohortKey, workshop} = this.state;
    return [prototypeKey, cohortKey, workshop].join(':');
  };

  firstSlide = () => {
    return { el: 
      <div>
      <div><b>PART 1: Practice Individually</b></div>
      <br />
      <div>In Part 1, you’ll read through 4 separate classroom management scenes and type how you’d respond to each scene.</div>
      <br />
      <div>For each scene, simulate how you’d respond to the student(s) in the moment and type your response in the textbox located below the scene. </div>
      <br />
      <div>Once you’re finished with your responses, You'll review how people have responded and discuss.  Clicking on “Ok” will take you to your first scene. Ready?</div>
      </div>
    };
  };

  // Making questions from the cohort
  doStart = () => {
    const {prototypeKey} = this.props;
    const prototype = _.find([].concat(CSSPaperPrototypes).concat(SeedPaperPrototypes), { key: prototypeKey });
    const allQuestions = toSlides(prototype);

    const startQuestionIndex = this.props.query.p || 0; // for testing or demoing
    const questions = allQuestions.slice(startQuestionIndex);
    const questionsHash = hash(JSON.stringify(questions));
    this.setState({
      questions,
      questionsHash
    });
  };

  onCohortKeyChanged = (e) => {
    this.setState({cohortKey: e.target.value});
  };

  onIdentifierChanged = (e) => {
    this.setState({ identifier: e.target.value });
  };

  onNoGroupCode = (e) => {
    e.preventDefault();
    const cohortKey = 'DEMO_COHORT';
    this.setState({cohortKey});
    this.doStart();
  };

  onStart = (e) => {
    e.preventDefault();
    this.doStart();
  };

  onShowGroupInstructions = () => {
    this.setState({ currentPart: Parts.GROUP_INSTRUCTIONS });
  };

  onStartGroupReview = () => {
    this.setState({ currentPart: Parts.GROUP_REVIEW });
  };

  onGroupReviewDone = () => {
    this.setState({ currentPart: Parts.FINAL_INSTRUCTIONS });
  };

  onLogMessage = (type, response) => {
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
  };

  render() {
    return (
      <SessionFrame>
        {this.renderContent()}
      </SessionFrame>
    );
  }

  renderContent = () => {
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
  };

  renderIntro = () => {
    return (
      <VelocityTransitionGroup enter={{animation: "callout.pulse", duration: 500}} leave={{animation: "slideUp"}} runOnMount={true}>
        <form onSubmit={this.onStart}>
          <div style={styles.instructions}>
            <p>Welcome!  This is an online practice space adapted from a paper prototype.</p>
          </div>
          <div style={{marginLeft: 30}}><img src="https://s3-us-west-2.amazonaws.com/tsl-public/threeflows/paper-prototypes-crumpled.png" width={202} height={140} /></div>
          <div style={styles.instructions}>
            <p>In this practice space, you'll have to improvise to make the best of the situation. It might not exactly match your grade level and subject.</p>
          </div>
          <div style={styles.instructions}>
            <p>Try it in partners or try it individually and discuss afterward.</p>
          </div>
          <div style={{...styles.instructions, marginTop: 40}}>
            <div>What is your group code?</div>
            <TextField
              name="cohortKey"
              style={{width: '100%', marginBottom: 20}}
              underlineShow={true}
              hintText="example: edu5252"
              value={this.state.cohortKey}
              onChange={this.onCohortKeyChanged}
              rows={1} />
          </div>
          <div style={{...styles.instructions, marginBottom: 40}}>
            <RaisedButton
              onTouchTap={this.onStart}
              type="submit"
              disabled={this.state.cohortKey === ''}
              style={styles.button}
              secondary={true}
              label="Start" />
            <RaisedButton
              onTouchTap={this.onNoGroupCode}
              type="submit"
              style={styles.button}
              label="I don't have a group code" />
          </div>
        </form>
      </VelocityTransitionGroup>
    );
  };

  renderQuestionEl = (question:QuestionT, onLog, onResponseSubmitted) => {
    const forceText = true; // because of the text reviews after
    return (
      <div>
        <QuestionInterpreter
          question={question}
          onLog={onLog}
          forceText={forceText}
          onResponseSubmitted={onResponseSubmitted} />
      </div>
    );
  };

  renderPauseEl = (questions:[QuestionT], responses:[ResponseT]) => {
    return (
      <div style={{margin: 20}}>
        <div style={{paddingBottom: 20}}>That's the end of Part 1.  Click to proceeed.</div>
        <RaisedButton
          label="Start Part #2"
          secondary={true}
          onTouchTap={this.onShowGroupInstructions} />
      </div>
    );
  };

  renderGroupInstructions = () => {
    return (
      <div style={{margin: 20}}>
        <div>
          <div><b>PART 2: Review, discuss, and capture</b></div>
          <br />
          <div>For Part 2, go through each scene as a group.  For each scene, review the responses and discuss them as a group.</div>
          <br />
          <i style={{margin: 10, display: 'block'}}>What does equity look like in a K12 classroom for students?  How can we see the whole student in these situations?</i>
          <br />
          <div>Ready to start?</div>
          <br />
        </div>
        <div>
          <RaisedButton
            label="ok!"
            onTouchTap={this.onStartGroupReview} />
        </div>
      </div>
    );
  };

  renderGroupReview = () => {
    return <GroupReview
      prompt="Scroll through and discuss."
      applesKey={this.applesKey()}
      onDone={this.onGroupReviewDone} />;
  };

  renderFinalInstructions = () => {
    return (
      <div style={styles.instructions}>
        <p><b>PART 3: Discuss assumptions</b></p>
        <br />
        <div>Part 3 is a group discussion, you won't work on your computers.</div>
        <br />
        <i style={{margin: 10, display: 'block'}}>What assumptions might we make about students based on their gender, race or ethnicity and how might these influence how we interpret and respond to situations?</i>
        <br />
        <div>If you have time, capture the main points of your discussion on the poster board, to share it out with the whole group after.</div>
        <br />
        <div>If you're online, connect with others at <a target="_blank" href="https://twitter.com/search?q=%23TeacherPracticeSpaces">#TeacherPracticeSpaces</a>.</div>
      </div>
    );
  };
}

const styles = {
  instructions: {
    fontSize: 18,
    padding: 0,
    margin:0,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 0
  },
  button: {
    marginTop: 20
  }
};