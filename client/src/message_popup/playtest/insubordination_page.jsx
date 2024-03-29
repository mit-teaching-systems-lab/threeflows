/* @flow weak */
import PropTypes from 'prop-types';

import React from 'react';
import uuid from 'uuid';

import Divider from 'material-ui/Divider';

import * as Api from '../../helpers/api.js';
import LinearSession from '../linear_session/linear_session.jsx';
import SessionFrame from '../linear_session/session_frame.jsx';
import IntroWithEmail from '../linear_session/intro_with_email.jsx';
import QuestionInterpreter from '../renderers/question_interpreter.jsx';
import RecordThenClassifyQuestion from '../linear_session/record_then_classify_question.jsx';
import {InsubordinationScenarios} from './insubordination_scenarios.js';
import type {QuestionT} from './insubordination_scenarios.js';



type ResponseT = {
  choice:string,
  question:QuestionT
};



// The top-level page, manages logistics around email, cohorts and questions,
// and the display of instructions, questions, and summary.
export default class extends React.Component {
  state: *;
  static displayName = 'InsubordinationPage';

  static contextTypes = {
    auth: PropTypes.object.isRequired
  };

  constructor(props, context) {
    super(props, context);
    const contextEmail = context.auth.userProfile.email;
    const email = contextEmail === "unknown@mit.edu" ? '' : contextEmail;
    const cohortKey = InsubordinationScenarios.cohortKey(email);

    this.state = {
      email,
      cohortKey,
      questions: null,
      sessionId: uuid.v4()
    };
  }

  // Making the cohort and questions is the key bit here.
  onStart = (email) => {
    const cohortKey = InsubordinationScenarios.cohortKey(email);
    const questions = InsubordinationScenarios.questionsFor(cohortKey);
    this.setState({
      email,
      questions,
      cohortKey
    });
  };

  onLogMessage = (type, response:ResponseT) => {
    const {email, cohortKey, sessionId} = this.state;
    Api.logEvidence(type, {
      ...response,
      sessionId,
      email,
      cohortKey,
      name: email,
      clientTimestampMs: new Date().getTime(),
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
      summaryEl={this.renderSummaryEl}
      onLogMessage={this.onLogMessage}
    />;
  };

  renderIntro = () => {
    return (
      <IntroWithEmail defaultEmail={this.state.email} onDone={this.onStart}>
        <div>
          <p>Welcome!</p>
          <p>Imagine you're a middle school math teacher in an urban public school.</p>
          <p>You will go through a set of scenarios that simulate a conversation between you and a student.</p>
          <p>Provide an audio response to each prompt. Please respond like you would in a real conversation.</p>
        </div>
      </IntroWithEmail>
    );
  };

  // Only ask for audio on questions with choices, otherwise let them continue
  renderQuestionEl = (question:QuestionT, onLog, onResponseSubmitted) => {
    if (question.choices.length === 0) {
      return <QuestionInterpreter
        key={question.id}
        question={question}
        onLog={onLog}
        onResponseSubmitted={onResponseSubmitted}
      />;
    } else {
      return <RecordThenClassifyQuestion
        key={question.id}
        question={question}
        choices={question.choices}
        onLogMessage={onLog}
        onResponseSubmitted={onResponseSubmitted}
      />;
    }
  };

  renderSummaryEl = (questions:[QuestionT], responses:[ResponseT]) => {
    return (
      <div style={{padding: 20}}>
        <div style={{paddingBottom: 20, fontWeight: 'bold'}}>Thanks!  Here are your responses:</div>
        {responses.map((response, i) =>
          <div key={i} style={{paddingTop: 10}}>
            <div>{questions[i].text}</div>
            <div>&gt; {response.choice}</div>
            <Divider style={{marginTop: 15}} />
          </div>
        )}
      </div>
    );
  };
}