/* @flow weak */
import _ from 'lodash';
import React from 'react';

import * as Api from '../../helpers/api.js';
import hash from '../../helpers/hash.js';
import Session from '../essence/intro_with_email.jsx';
import SessionFrame from '../essence/session_frame.jsx';
import IntroWithEmail from '../essence/intro_with_email.jsx';
import PlainTextQuestion from '../renderers/plain_text_question.jsx';
import ChoiceForBehaviorResponse from '../renderers/choice_for_behavior_response.jsx';


// Make questions for an email
const QuestionMaker = {
  // Given an email, return a cohortKey.
  cohortKey(email) {
    const {conditions} = this.data();
    return hash(email) % conditions.length;
  },

  data() {
    // Read scenario
    const conditions = [{child: 'Jake' }, {child: 'Greg'}, {child: 'Darnell'}, {child: 'DeShawn'}];
    const questionTemplates = [
      '${child} is sleeping in class.',
      'He only picks his head up. He chooses to rest it on his hand and continue to sleep.',
      '${child} refuses to do work.',
      'He refuses to do this as well.'
    ];

    return {conditions, questionTemplates};
  },

  // Return questions for cohortKey.
  // This involves taking description from yaml and making it concrete.
  questions(cohortKey) {
    const {conditions, questionTemplates} = this.data();
    const condition = conditions[cohortKey];
    const questions = questionTemplates.map((template) => {
      const text = _.template(template)(condition);
      return {
        id: hash(text),
        condition: condition,
        students: [],
        text: text,
        examples: [],
        nonExamples: []
      };
    });

    return questions;
  }
};



// The top-level page, manages logistics around email, cohorts and questions,
// and the display of instructions, questions, and summary.
//
// higher-level?
//   cohortKey
//   questionsForCohort
//   introEl
//   questionEl={this.questionEl}
//   responseEl={this.responseEl}
//   summaryEl={this.summaryEl}
// TODO(kr) factor out email - that's awkward
export default React.createClass({
  displayName: 'EssencePage',

  contextTypes: {
    auth: React.PropTypes.object.isRequired
  },

  getInitialState() {
    const contextEmail = this.context.auth.userProfile.email;
    const email = contextEmail === "unknown@mit.edu" ? '' : contextEmail;
    const cohortKey = QuestionMaker.cohortKey(email);

    return {
      email,
      cohortKey,
      questions: null
    };
  },

  // Making the cohort and questions is the key bit here.
  onStart(email) {
    const cohortKey = QuestionMaker.cohortKey(email);
    const questions = QuestionMaker.questions(cohortKey);
    this.setState({
      email,
      questions,
      cohortKey
    });
  },

  onResetSession() {
    this.setState({ questions: null });
  },

  onLogMessage(type, response) {
    const {email, cohortKey} = this.state;
    Api.logEvidence(type, {
      ...response,
      cohortKey,
      email,
      name: email
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
    const {questions} = this.state;
    if (!questions) return this.renderIntro();

    return <Session
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
          <p>Imagine you're a middle school math teacher in an urban public school.  Students are working independently on a proportions problem set.</p>
          <p>You will go through a set of scenarios that simulate a conversation between you and a student.</p>
          <p>Provide an audio response to each prompt. Please respond like you would in a real conversation.</p>
        </div>
      </IntroWithEmail>
    );
  },

  renderQuestionEl(question, onLog, onResponseSubmitted) {
    return (
      <div>
        <PlainTextQuestion question={question} />
        <ChoiceForBehaviorResponse
          onLogMessage={onLog}
          onResponseSubmitted={onResponseSubmitted}
        />
      </div>
    );
  },

  renderSummaryEl(questions, responses) {
    return (
      <div>
        <div>Thanks!</div>
        {responses.map((response, i) =>
          <div>
            <div>Question: {questions[i]}</div>
            <div>Response: {response}</div>
          </div>
        )}
      </div>
    );
  }
});








// const styles = {
//   done: {
//     padding: 20,
//   },
//   container: {
//     fontSize: 20,
//     padding: 0,
//     margin:0,
//     paddingBottom: 45
//   },
//   button: {
//     marginTop: 20
//   },
//   doneTitle: {
//     padding: 20,
//     paddingBottom: 0,
//     margin:0,
//   },
//   instructions: {
//     paddingLeft: 20,
//     paddingRight: 20,
//   },
//   paragraph: {
//     marginTop: 20,
//     marginBottom: 20
//   },
//   summaryTitle: {
//     fontSize: 20,
//     padding: 20,
//     paddingBottom: 5,
//     margin: 0,
//     fontWeight: 'bold'
//   }

// };

// Want a new scenario?
//   define the questions
//   add interactions for showing questions and responding
//   add any cohorting to creating questions

