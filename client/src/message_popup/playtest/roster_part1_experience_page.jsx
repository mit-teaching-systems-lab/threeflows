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
import type {QuestionT} from './roster_part1_scenario.jsx';
import rosterPart1 from './roster_part1_scenario.jsx';


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

  static displayName = 'RosterPart1ExperiencePage';

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
    const allQuestions = rosterPart1.questionsFor(cohortKey);

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
          <p>Roster Justice -- Part 1</p>
          <p>Welcome!</p>
          <p>This is part 1 of an interactive case study.</p>
          <p>Write your responses in the textboxes shown when appropriate. Click ‘OK’ to continue.</p>
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
          <p style={styles.paragraph}>This concludes part 1 of this practice space.</p>
          <p style={styles.paragraph}>You will complete part 2 during your next class session.</p>
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
