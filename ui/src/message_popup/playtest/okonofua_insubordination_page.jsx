/* @flow weak */
import _ from 'lodash';
import React from 'react';
import VelocityTransitionGroup from "velocity-react/velocity-transition-group";
import 'velocity-animate/velocity.ui';
import uuid from 'uuid';

import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';
import LinearProgress from 'material-ui/LinearProgress';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';

import hash from '../../helpers/hash.js';
import PopupQuestion from '../popup_question.jsx';
import type {ResponseT} from '../popup_question.jsx';

import RefreshIcon from 'material-ui/svg-icons/navigation/refresh';
import ResponsiveFrame from '../../components/responsive_frame.jsx';

import {withStudents} from '../transformations.jsx';

import * as Api from '../../helpers/api.js';
import NavigationAppBar from '../../components/navigation_app_bar.jsx';

import MobileInterface from '../mobile_prototype/mobile_interface.jsx';
import AudioResponseSummary from '../renderers/audio_response_summary.jsx';


/*
Shows the MessagePopup game
*/
export default React.createClass({
  displayName: 'MessagePopupExperiencePage',

  propTypes: {
    query: React.PropTypes.object.isRequired,
  },

  contextTypes: {
    auth: React.PropTypes.object.isRequired
  },

  getInitialState() {
    return {
      scaffolding: {
        helpType: 'none',
        shouldShowSummary: false,
        hideTimer: true,
      },
      gameSession: null,
      limitMs: 90000,
      email: this.context.auth.userProfile.email === "unknown@mit.edu" ? '' : this.context.auth.userProfile.email
    };
  },
  
  addResponseTime(elapsedMs){
    var gameSession = {...this.state.gameSession};
    gameSession.msResponseTimes.push(elapsedMs);
    this.setState({ gameSession });
  },

  resetExperience(){
    this.setState(this.getInitialState());
  },

  drawResponseMode(question, scaffolding) {
    return 'audio';
  },

  drawResponsePrompt(question, scaffolding) {
    return 'Respond.';
  },

  drawStudentCard(question, scaffolding) {
    return false;
  },
  
  onLog(type, response:ResponseT) {
    if (type === 'message_popup_audio_on_done_capture') {
      var {gameSession} = this.state;
      this.setState({
        gameSession: {
          ...gameSession,
          audioResponses: gameSession.audioResponses.concat(response)
        }
      });
    }

    Api.logEvidence(type, {
      ...response,
      name: this.state.gameSession.email,
      email: this.state.gameSession.email,
      sessionId: this.state.gameSession.sessionId,
      clientTimestampMs: new Date().getTime(),
    });
  },

  onEmailTextChanged(e) {
    const email = e.target.value;
    this.setState({email});
  },
  
  onQuestionDone(elapsedMs) {
    this.addResponseTime(elapsedMs);
    var gameSession = {...this.state.gameSession};
    gameSession.questionsAnswered += 1;
    this.setState({ gameSession });
  },

  onStart(){
    const {email} = this.state;

    // Read scenario
    const conditions = [{child: 'Jake' }, {child: 'Greg'}, {child: 'Darnell'}, {child: 'DeShawn'}];
    const questionTemplates = [
      '${child} is sleeping in class.',
      'He only picks his head up. He chooses to rest it on his hand and continue to sleep.',
      '${child} refuses to do work.',
      'He refuses to do this as well.'
    ];

    // Assign cohort based on email
    const cohortKey = hash(this.state.email) % conditions.length;

    // Concretize
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
    
    
    this.setState({
      gameSession: {
        email,
        drawResponseMode: () => 'choice-for-behavior',
        drawStudentCard: () => false,
        drawResponsePrompt: () => 'Respond.',
        sessionId: uuid.v4(),
        questions: questions,
        questionsAnswered: 0,
        msResponseTimes: [],
        audioResponses: []
      },
    });
  },

  render() {
    return (
      <ResponsiveFrame>
        <div>
          <NavigationAppBar
            title="Teacher Moments"
            prependMenuItems={
              <MenuItem
                onTouchTap={this.resetExperience}
                leftIcon={<RefreshIcon />}
                primaryText="Restart game" />
            }
          />
          {this.renderMainScreen()}
        </div>
      </ResponsiveFrame>
    );
  },

  renderMainScreen() {
    // configure the game
    const {gameSession} = this.state;
    const hasStarted = gameSession !== null;
    if (!hasStarted) return this.renderInstructions();

    // all done!
    const questionsAnswered = hasStarted ? gameSession.questionsAnswered : 0;
    const questions = hasStarted ? gameSession.questions : [];
    const sessionLength = hasStarted ? questions.length : 0;
    if (questionsAnswered >= sessionLength) return this.renderDone();

    // text-messaging prototype
    if (_.has(this.props.query, 'mobilePrototype')) return this.renderMobilePrototype();

    // question screen
    return this.renderPopupQuestion();
  },

  renderDone() {
    return (
      <AudioResponseSummary audioResponses={this.state.gameSession.audioResponses} />
    );
  },

  renderInstructions() {
    return (
      <VelocityTransitionGroup enter={{animation: "callout.pulse", duration: 500}} leave={{animation: "slideUp"}} runOnMount={true}>
        <div className="instructions">
          <div style ={_.merge(_.clone(styles.container), styles.instructions)}>
            <p style={styles.paragraph}>Welcome!</p>
            <p style={styles.paragraph}>Imagine you're a middle school math teacher in an urban public school.  Students are working independently on a proportions problem set.</p>
            <p style={styles.paragraph}>You will go through a set of scenarios that simulate a conversation between you and a student.</p>
            <p style={styles.paragraph}>Provide an audio response to each prompt. Please respond like you would in a real conversation.</p>
            <Divider />
          </div>
        </div>
        <div style={{padding: 20}}>
          <TextField
          name="email"
          style={{width: '100%'}}
          underlineShow={false}
          floatingLabelText="What's your email address?"
          value={this.state.email}
          onChange={this.onEmailTextChanged}
          multiLine={true}
          rows={2}/>
          <div style={{display: 'flex', flexDirection: 'row', alignItems: 'flex-end'}}>
            <RaisedButton
              disabled={this.state.email === ''}
              onTouchTap={this.onStart}
              style={styles.button}
              secondary={true}
              label="Start" />
          </div>    
        </div>
        
      </VelocityTransitionGroup>

      );
  },
  
  renderPopupQuestion() {
    const {scaffolding, gameSession, limitMs} = this.state;
    const {questions, questionsAnswered, drawResponseMode, drawStudentCard, drawResponsePrompt} = gameSession;
    const sessionLength = questions.length;
    const question = questions[questionsAnswered];

    return (
      <div className="question" style={styles.container}>        
        <LinearProgress color="#EC407A" mode="determinate" value={questionsAnswered} max={sessionLength} />
        <VelocityTransitionGroup enter={{animation: "slideDown"}} leave={{animation: "slideUp"}} runOnMount={true}>
          <PopupQuestion
            key={JSON.stringify(question)}
            question={question}
            scaffolding={scaffolding}
            limitMs={limitMs}
            onLog={this.onLog}
            onDone={this.onQuestionDone}
            drawResponseMode={drawResponseMode}
            drawStudentCard={drawStudentCard}
            drawResponsePrompt={drawResponsePrompt}
            isLastQuestion={(questionsAnswered + 1 === sessionLength)}/>
        </VelocityTransitionGroup>
      </div>
    );
  },
  
  renderMobilePrototype() {
    const {scaffolding, gameSession, limitMs} = this.state;
    const {questions, questionsAnswered} = gameSession;
    const sessionLength = questions.length;
    const question = withStudents(questions)[questionsAnswered];
    return ( 
      <div className="prototype">
        <LinearProgress color="#EC407A" mode="determinate" value={questionsAnswered} max={sessionLength} />
        <MobileInterface
          key={JSON.stringify(question)}
          scaffolding={scaffolding}
          question={question}
          onQuestionDone={this.onQuestionDone}
          limitMs={limitMs}
          onLog={this.onLog}
          isLastQuestion={questionsAnswered+1===sessionLength ? true : false}
          />
      </div>
    );
  }
});

const styles = {
  done: {
    padding: 20,
  },
  container: {
    fontSize: 20,
    padding: 0,
    margin:0,
    paddingBottom: 45
  },
  button: {
    marginTop: 20
  },
  doneTitle: {
    padding: 20,
    paddingBottom: 0,
    margin:0,
  },
  instructions: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  paragraph: {
    marginTop: 20,
    marginBottom: 20
  },
  summaryTitle: {
    fontSize: 20,
    padding: 20,
    paddingBottom: 5,
    margin: 0,
    fontWeight: 'bold'
  }

};