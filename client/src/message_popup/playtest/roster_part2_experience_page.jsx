/* @flow weak */
import PropTypes from 'prop-types';

import React from 'react';
import uuid from 'uuid';
import _ from 'lodash';

import * as Api from '../../helpers/api.js';
import hash from '../../helpers/hash.js';
import LinearSession from '../linear_session/linear_session.jsx';
import SessionFrame from '../linear_session/session_frame.jsx';
import IntroWithEmail from '../linear_session/intro_with_email.jsx';
import QuestionInterpreter from '../renderers/question_interpreter.jsx';
import type {QuestionT} from './roster_part2_scenario.jsx';
import rosterPart2 from './roster_part2_scenario.jsx';


type ResponseT = {
  choice:string,
  question:QuestionT
};



// This is a scenario around bubble sort and classroom management.
export default class extends React.Component {
  props: {query: {
    cohort?: string,
    p?: string,
    text?: string,
  }};

  static displayName = 'RosterPart2ExperiencePage';

  static propTypes = {
    query: PropTypes.shape({
      cohort: PropTypes.string,
      p: PropTypes.string,
      text: PropTypes.string
    }).isRequired
  };

  static contextTypes = {
    auth: PropTypes.object.isRequired
  };

  constructor(props, context) {
    super(props, context);
    const contextEmail = context.auth.userProfile.email;
    const email = contextEmail === "unknown@mit.edu" ? '' : contextEmail;
    const cohortKey = props.query.cohort || 'default';

    this.state = {
      email,
      cohortKey,
      questions: null,
      labels: null,
      confusion: null,
      sessionId: uuid.v4()
    };
  }

  // Making questions from the cohort
  onStart = (email) => {
    const {cohortKey} = this.state;
    const allQuestions = rosterPart2.questionsFor(cohortKey);

    const startQuestionIndex = this.props.query.p || 0; // for testing or demoing
    const questions = allQuestions.slice(startQuestionIndex);
    const questionsHash = hash(JSON.stringify(questions));
    this.setState({
      email,
      questions,
      questionsHash,
    });
  };

  onLogMessage = (type, response:ResponseT) => {
    const {email, cohortKey, sessionId, questionsHash} = this.state;
    
    Api.logEvidence(type, {
      ...response,
      sessionId,
      email,
      cohortKey,
      questionsHash,
      name: email
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
    const {questions} = this.state;
    if (!questions) return this.renderIntro();

    return <LinearSession
      questions={questions}
      questionEl={this.renderQuestionEl}
      summaryEl={this.renderClosingEl}
      onLogMessage={this.onLogMessage}
    />;
  };

  renderIntro() {
    return (
      <IntroWithEmail defaultEmail={this.state.email} onDone={this.onStart}>
        <div>
          <p>Roster Justice -- Part 2</p>
          <p>Welcome!</p>
          <p>This is part 2 of an interactive case study simulating an interaction between you as teacher and your principal, Mr. Holl.</p>
          <p>If you have NOT completed part 1 yet, do NOT continue. You must finish part 1 before starting part 2. </p>
          <p>Write your responses in the textboxes shown. </p>
        </div>
      </IntroWithEmail>
    );
  };

  renderQuestionEl = (question:QuestionT, onLog, onResponseSubmitted) => {
    const forceText = _.has(this.props.query, 'text');
    return <QuestionInterpreter
      question={question}
      onLog={onLog}
      forceText={forceText}
      onResponseSubmitted={onResponseSubmitted} />;
  };

  renderClosingEl = (questions:[QuestionT], responses:[ResponseT]) => {
    return (
      <div>
        <b style={styles.doneTitle}>Done</b>
        <div style={styles.doneText}>
          <p style={styles.paragraph}>Thank you for participating in our playtest!</p>
          <p style={styles.paragraph}>This practice space is being made in collaboration with a Teacher Preparation program as part of the pre-service teacher’s curriculum on diversity, equity, and inclusion.</p>
          <p style={styles.paragraph}>Your participation will help improve this practice space for future use. Thanks!</p>
        </div>
      </div>
    );      
  };
}

const styles = {
  doneTitle: {
    display: 'block',
    padding: '15px 20px 15px',
    background: '#09407d',
    color: 'white'
  },
  doneText: {
    padding: 20,
    paddingBottom: 0,
    margin:0,
  },
  paragraph: {
    marginTop: 20,
    marginBottom: 20
  }
};
