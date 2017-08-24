/* @flow weak */
import _ from 'lodash';
import React from 'react';
import uuid from 'uuid';
import hash from '../../helpers/hash.js';

import Divider from 'material-ui/Divider';

import * as Api from '../../helpers/api.js';
import LinearSession from '../linear_session/linear_session.jsx';
import SessionFrame from '../linear_session/session_frame.jsx';
import IntroWithEmail from '../linear_session/intro_with_email.jsx';
import ClassifyQuestion from '../linear_session/classify_question.jsx';
import RecordThenClassifyQuestion from '../linear_session/record_then_classify_question.jsx';


type QuestionT = {
  id:number,
  condition:string,
  choices:[string],
  text:string
};
type ResponseT = {
  choice:string,
  question:QuestionT
};


// Make questions for an email, describe choices.
const Scenarios = {
  // Given an email, return a cohortKey.
  cohortKey(email) {
    const {conditions} = this.data();
    return hash(email) % conditions.length;
  },

  data() {
    const conditions = [{child: 'Jake' }, {child: 'Greg'}, {child: 'Darnell'}, {child: 'DeShawn'}];
    const choices = [
      'encourage',
      'remind',
      'set limits',
      'highlight consequences',
      'connect',
      'create joy',
      'share yourself'
    ];

    // Only show choices in response to the student
    const steps = [
      { choices: [], t: "You sit down for a five-minute mentoring check-in with ${child}." },
      { choices, t: "${child}: The thing is, I want to get all my work done today since tomorrow I'm going to a concert with my friend and I want it to be stress free." },
      { choices: [], t: "This is a chance to connect with ${child}." },
      { choices, t: "${child}: It's the Macklemore concert.  So I don't want to go thinking I could have done work but I didn't.  So I want to get it done today so I don't have stress this week and next week." },
      { choices: [], t: "Ask about how ${child} feels about the workload." },
      { choices, t: "${child}: I'm not really happy." },
      { choices: [], t: "Ask what ${child} is going to do." },
      { choices, t: "${child}: I'm going to try to finish all the projects I have so I stay ahead." },
      { choices: [], t: "Ask how ${child} feels about the stress level." },
      { choices, t: "${child}: Nothing too crazy in my personal life, but academically it's pretty stressful." }
    ];

    return {conditions, steps};
  },

  // Return questions for cohortKey.
  // This involves taking description from yaml and making it concrete.
  questionsFor(cohortKey) {
    const {conditions, steps} = this.data();
    const condition = conditions[cohortKey];
    const questions = steps.map((step, index) => {
      const text = _.template(step.t)(condition);
      const question:QuestionT = {
        id: hash(text),
        condition: condition,
        choices: step.choices,
        text: text
      };
      return question;
    }, this);

    return questions;
  }
};





// The top-level page, manages logistics around email, cohorts and questions,
// and the display of instructions, questions, and summary.
export default React.createClass({
  displayName: 'MentoringPage',

  contextTypes: {
    auth: React.PropTypes.object.isRequired
  },

  getInitialState() {
    const contextEmail = this.context.auth.userProfile.email;
    const email = contextEmail === "unknown@mit.edu" ? '' : contextEmail;
    const cohortKey = Scenarios.cohortKey(email);

    return {
      email,
      cohortKey,
      questions: null,
      sessionId: uuid.v4()
    };
  },

  // Making the cohort and questions is the key bit here.
  onStart(email) {
    const cohortKey = Scenarios.cohortKey(email);
    const questions = Scenarios.questionsFor(cohortKey);
    this.setState({
      email,
      questions,
      cohortKey
    });
  },

  onLogMessage(type, response:ResponseT) {
    const {email, cohortKey, sessionId} = this.state;
    Api.logEvidence(type, {
      ...response,
      sessionId,
      email,
      cohortKey,
      name: email,
      clientTimestampMs: new Date().getTime(),
    });
  },

  render() {
    return (
      <SessionFrame>
        {this.renderContent()}
      </SessionFrame>
    );
  },

  renderContent() {
    const {questions} = this.state;
    if (!questions) return this.renderIntro();

    return <LinearSession
      questions={questions}
      questionEl={this.renderQuestionEl}
      summaryEl={this.renderSummaryEl}
      onLogMessage={this.onLogMessage}
    />;
  },

  renderIntro() {
    return (
      <IntroWithEmail defaultEmail={this.state.email} onDone={this.onStart}>
        <div>
          <p>Welcome!</p>
          <p>Imagine you're a high school math teacher in an urban public school that emphasis personalized learning.</p>
          <p>You will go through a scenario that simulates a conversation between you and a student during a mentoring session.</p>
          <p>Provide an audio response to each prompt. Please respond like you would in a real conversation.</p>
        </div>
      </IntroWithEmail>
    );
  },

  // Only ask for audio on questions with choices, otherwise let them continue
  renderQuestionEl(question:QuestionT, onLog, onResponseSubmitted) {
    if (question.choices.length === 0) {
      return <ClassifyQuestion
        key={question.id}
        question={question}
        choices={['OK']}
        onLogMessage={onLog}
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
  },

  renderSummaryEl(questions:[QuestionT], responses:[ResponseT]) {
    const videoUrl = 'https://www.edinnovationlab.com/explore-summit/teaching-at-summit/1-1-mentoring';
    return (
      <div style={{padding: 20}}>
        <div style={{fontWeight: 'bold'}}>Thanks!</div>
        <div style={{marginTop: 20, marginBottom: 50}}>This scenario was adapted from a <a href={videoUrl}>video</a> by Summit Public Schools.  If you'd like to see this scenario with a real student, and watch another teacher model the conversation, go <a href={videoUrl}>check it out!</a>.</div>
        <div style={{fontWeight: 'bold'}}>Here are your responses:</div>
        {responses.map((response, i) =>
          <div key={i} style={{paddingTop: 10}}>
            <div>{questions[i].text}</div>
            <div>> {response.choice}</div>
            <Divider style={{marginTop: 15}} />
          </div>
        )}
      </div>
    );
  }
});