/* @flow weak */
import React from 'react';
import uuid from 'uuid';

import * as Api from '../../helpers/api.js';
import hash from '../../helpers/hash.js';
import LinearSession from '../linear_session/linear_session.jsx';
import SessionFrame from '../linear_session/session_frame.jsx';
import IntroWithEmail from '../linear_session/intro_with_email.jsx';

import MixedQuestion from '../renderers/mixed_question.jsx';
import ChoiceForBehaviorResponse from '../renderers/choice_for_behavior_response.jsx';
import CsFairScoreResponse from '../renderers/cs_fair_score_response.jsx';
import CsFairSummary from './cs_fair_summary.jsx';
import MinimalOpenResponse from '../renderers/minimal_open_response.jsx';
import MinimalTextResponse from '../renderers/minimal_text_response.jsx';
import type {QuestionT} from './cs_fair_scenario.jsx';
import {CsFairScenario} from './cs_fair_scenario.jsx';
import CsFairProject from '../renderers/cs_fair_project.jsx';



/*
This scenario is aimed at detecting bias through scoring and feedback on a simplified version of the Explore PT on the CSP AP exam.
The supporting instructional design also aims to surface potential bias to learners directly.

For grading there are a few concerns about assessing bias in scoring a performance task like this.

First, there is limited information about students so it's a situation where statistical discrimination would make the most sense.
This means that it's easy for learners to claim that their bias actually makes sense in an objective sense, and that similar bias 
wouldn't occur in a real classroom.

Second, the experience nudges learners towards a solution of anonymizing student responses and using fixed scoring criteria
(eg., Malouff 2008).  For an AP exam, this would be by done with example projects, commentaries and stricter criteria.  In a classroom
environment where this is a strong relational component, the context is different than a high-stakes AP exam.

Third, this doesn't help surface that encoding values in a fixed scoring criteria can also be a mechanism for narrowing assessment in
a way that perpetuates existing ethnicy, racial, gender or cultural advantages.  In other words, if the field is dominated by folks
from one cultural traditional, those values are most likely to be encoded in assessments and grading criteria.

Fourth, this doesn't nudge towards strategies of disrupting prior knowledge or of only including content in the course that is
explicitly taught.  That's for other scenarios to explore.
*/
export default React.createClass({
  displayName: 'CsFairExperiencePage',

  propTypes: {
    query: React.PropTypes.shape({
      p: React.PropTypes.string
    }).isRequired
  },

  contextTypes: {
    auth: React.PropTypes.object.isRequired
  },

  // Cohort comes from URL
  getInitialState() {
    const contextEmail = this.context.auth.userProfile.email;
    const email = contextEmail === "unknown@mit.edu" ? '' : contextEmail;
    const cohortKey = CsFairScenario.cohortKey(email);

    return {
      email,
      cohortKey,
      questions: null,
      sessionId: uuid.v4()
    };
  },

  // Making questions from the cohort
  onStart(email) {
    const {cohortKey} = this.state;
    const startQuestionIndex = this.props.query.p || 0; // for testing or demoing
    const questions = CsFairScenario.questionsFor(cohortKey).slice(startQuestionIndex);
    const questionsHash = hash(JSON.stringify(questions));
    this.setState({
      email,
      questions,
      questionsHash
    });
  },

  onResetSession() {
    this.setState(this.getInitialState());
  },

  onLogMessage(type, response) {
    const {email, cohortKey, sessionId, questionsHash} = this.state;
    
    Api.logEvidence(type, {
      ...response,
      sessionId,
      email,
      cohortKey,
      questionsHash,
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
        {CsFairScenario.renderIntroEl()}
      </IntroWithEmail>
    );
  },

  renderQuestionEl(question:QuestionT, onLog, onResponseSubmitted) {
    return (
      <div key={JSON.stringify(question)}>
        <MixedQuestion question={question} />
        {this.renderInteractionEl(question, onLog, onResponseSubmitted)}
      </div>
    );
  },

  renderInteractionEl(question:QuestionT, onLog, onResponseSubmitted) {
    const key = JSON.stringify(question);

    // Show student project
    if (question.project) {
      return (
        <div key={key}>
          <CsFairProject project={question.project} />
          <ChoiceForBehaviorResponse
            choices={['OK']}
            onLogMessage={onLog}
            onResponseSubmitted={onResponseSubmitted} />
        </div>
      );       
    }

    // Score a student's project
    if (question.scores && question.studentName && question.projectLabel) {
      return <CsFairScoreResponse
        key={key}
        scores={question.scores}
        studentName={question.studentName}
        projectLabel={question.projectLabel}
        onLogMessage={onLog}
        onResponseSubmitted={onResponseSubmitted}
      />;
    }

    // Reflection question
    if (question.writtenReflection && question.text) {
      return <MinimalTextResponse
        key={key}
        forceResponse={true}
        responsePrompt="Your thoughts:"
        recordText="Submit"
        onLogMessage={onLog}
        onResponseSubmitted={(response) => {
          const questionText = question.text || ''; // flow bug
          return onResponseSubmitted({
            ...response,
            questionText,
            isTextResponse: true
          });
        }}
      />;
    }

    // Audio question
    if (question.ask) {
      return <MinimalOpenResponse
        key={key}
        forceResponse={question.force || false}
        responsePrompt=""
        recordText="Click then speak"
        ignoreText="Move on"
        onLogMessage={onLog}
        onResponseSubmitted={onResponseSubmitted}
      />;
    }

    // Move along
    return <ChoiceForBehaviorResponse
      key={key}
      choices={['OK']}
      onLogMessage={onLog}
      onResponseSubmitted={onResponseSubmitted}
    />;
  },

  renderSummaryEl(questions:[QuestionT], responses) {
    return <CsFairSummary responses={responses} />;
  }
});