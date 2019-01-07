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
import type {QuestionT} from './pairs_scenario.jsx';
import apTestScenario from './aptest_scenario.jsx';
import ResponseSummary from '../renderers/response_summary.jsx';


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

  state: *;
  static displayName = 'apTestExperiencePage';

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
      sessionId: uuid.v4()
    };
  }

  // Making questions from the cohort
  onStart = (email) => {
    const {cohortKey} = this.state;
    const allQuestions = apTestScenario.questionsFor(cohortKey);

    const startQuestionIndex = this.props.query.p || 0; // for testing or demoing
    const questions = allQuestions.slice(startQuestionIndex);
    const questionsHash = hash(JSON.stringify(questions));
    this.setState({
      email,
      questions,
      questionsHash
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

  renderIntro = () => {
    return (
      <IntroWithEmail defaultEmail={this.state.email} onDone={this.onStart}>
 
      </IntroWithEmail>);
  
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
      <ResponseSummary responses={responses}>
        <div>
          <p>Optionally, we'd like to use your responses here for a joint research study between MIT and code.org.  We would like to compare the responses across participants.</p>
          <p>Your responses would be included in the research, along with data from your code.org profile.  All data you enter is stored securely and protected on a secure server on Google Drive, Amazon Web Services or Heroku.  You may print a copy of this form for your records.</p>
          <p>You can continue playing the game either way.  Participation in the research study in voluntary.
More details: 
  You have been asked to participate in a research study conducted by the staff and researchers at the Teaching System Laboratory (TSL) at the Massachusetts Institute of Technology and code.org.</p>
          <p>You have been asked to participate in a research study conducted by the staff and researchers at the Teaching System Laboratory (TSL) at the Massachusetts Institute of Technology and code.org.
Purpose of study:
The purpose of this study is to investigate how computer science teachers respond within learning experiences aimed at building skills in empathy, positioning students competently, and connecting student strengths and interests.  In particular, we aim to investigate teachers' responses within a simulated counseling scenario related to the AP CS Principles Exam. This will be conducted as a session within code.org workshops. Each workshop is run by a facilitator and contains roughly 10-20 teachers as participants.  The session will be blended, with some elements done synchronously and some done before or after the session asynchronously.  All participants will be over 18.</p>
          <p>Study results:
The results of this study will be used for ongoing research conducted by TSL and code.org in preparing and supporting effective, well-prepared computer science teachers. Results of the study will be shared through conference papers, journal articles, websites, online blogs, tweets, and other materials. All information will be reported anonymously.</p>
          <p>Data collection:
Data collection will include online log file data including responses participants submit within learning experiences.  These may include things like: written or typed responses, clicks or taps within the learning experience, or audio or video recordings participants create.  Beyond sharing and social elements directly within the learning experience, the data will be used only for analysis or to share with other participants as they choose.  Data will be stored securely in Google Drive, Amazon Web Services and Heroku.</p>
          <p>Participant information:
Participating in this study is voluntary. 
You will not be compensated for participating in the study.
Your email and any other personally identifiable information will be confidential.
Your anonymized responses may be shared with other players as part of the game.</p>
          <p>Study timeframe:
This project will be completed by September 1, 2020.  After that date, participant data will be deleted.</p>
          <p>Informed Consent: 
I understand the procedures described above. My questions have been answered to my satisfaction, and I agree to participate in this study.</p>
          <p>Contact information:
Please contact Dr. Justin Reich (jreich@mit.edu) or Dr. Joshua Littenberg-Tobias, (jltobias@mit.edu) with any questions or concerns. If you feel you have been treated unfairly, or you have questions regarding your rights as a research subject, you may contact the Chairman of the Committee on the Use of Humans as Experimental Subjects, M.I.T., Room E25-143b, 77 Massachusetts Ave, Cambridge, MA 02139, phone 1-617-253-6787.</p>
        </div>
      </ResponseSummary>
      
    );
  };

}