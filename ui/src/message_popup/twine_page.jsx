/* @flow weak */
import _ from 'lodash';
import React from 'react';
import VelocityTransitionGroup from "velocity-react/velocity-transition-group";
import 'velocity-animate/velocity.ui';
import uuid from 'node-uuid';

import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';
import IconButton from 'material-ui/IconButton';
import RefreshIcon from 'material-ui/svg-icons/navigation/refresh';

import ResponsiveFrame from './responsive_frame.jsx';
import type {ResponseT} from './popup_question.jsx';
import * as Api from '../helpers/api.js';
import NavigationAppBar from '../components/navigation_app_bar.jsx';
import {allQuestions} from './questions.js';
import Feedback from './feedback.jsx';

/*
For public demos.
*/
export default React.createClass({
  displayName: 'DemoPage',

  contextTypes: {
    auth: React.PropTypes.object.isRequired
  },

  getInitialState() {
    return {
      twineSession: null,
      email: this.context.auth.userProfile.email
    };
  },

  resetExperience(){
    this.setState(this.getInitialState());
  },

  onStartSession(){
    const {email} = this.state;  
    const twison = _.find(allQuestions, { id: 4001 });
    this.setState({
      twineSession: {
        email,
        twison,
        drawResponseMode: () => 'twine',
        drawStudentCard: () => false,
        sessionId: uuid.v4(),
        pid: twison.startnode,
        choicesMade: 0,
        msResponseTimes: [],
        isFinished: false
      },
    });
  },

  onChoice(elapsedMs) {
    const prevTwineSession = this.state.twineSession;
    var twineSession = {
      ...prevTwineSession,
      msResponseTimes: prevTwineSession.concat(elapsedMs),
      choicesMade: prevTwineSession + 1
    };
    this.setState({twineSession});
  },

  onLog(type, response:ResponseT) {
    Api.logEvidence(type, {
      ...response,
      name: this.state.twineSession.email,
      email: this.state.twineSession.email,
      sessionId: this.state.twineSession.sessionId,
      clientTimestampMs: new Date().getTime()
    });
  },

  render() {
    return (
      <ResponsiveFrame>
        <div>
          <NavigationAppBar
            title="Teacher Moments"
            iconElementLeft={
              <IconButton onTouchTap={this.resetExperience} >
                <RefreshIcon />
              </IconButton>
            }
          />
          {this.renderMainScreen()}
        </div>
      </ResponsiveFrame>
    );
  },

  renderMainScreen() {
    // configure the session
    const {twineSession} = this.state;
    const hasStarted = twineSession !== null;
    if (!hasStarted) return this.renderInstructions();

    // all done
    if (twineSession.isFinished) return <Feedback />;

    // choice
    return this.renderChoice();
  },

  renderInstructions() {
    return (
      <VelocityTransitionGroup enter={{animation: "callout.pulse", duration: 500}} leave={{animation: "slideUp"}} runOnMount={true}>
        <div className="instructions">
          <div style ={_.merge(_.clone(styles.container), styles.instructions)}>
            <p style={styles.paragraph}>Welcome!</p>
            <p style={styles.paragraph}>This station is about responding to students in the moment. It is set in the context of a 7th grade classroom.</p>
            <p style={styles.paragraph}>This may feel uncomfortable at first, but it's better to get comfortable here than with real students.</p>
            <p style={styles.paragraph}>You'll be asked to make choices as you go.  Aim to respond to each scenario quickly, as if you were in the moment.</p>
            <p style={styles.paragraph}>We'll reflect, debrief and discuss afterward to see what we can learn.</p>
            <Divider />
          </div>
        </div>
        <div style={{padding: 20}}>
          <div style={{display: 'flex', flexDirection: 'row', alignItems: 'flex-end'}}>
            <RaisedButton
              disabled={this.state.email === ''}
              onTouchTap={this.onStartSession}
              style={styles.button}
              secondary={true}
              label="Start" />
          </div>    
        </div>
      </VelocityTransitionGroup>
    );
  },
  
  renderChoice() {
    const {twison, pid} = this.state.twineSession;
    const passage = _.find(twison.passages, { pid });

    return (
      <div className="choice" style={styles.container}>        
        <VelocityTransitionGroup enter={{animation: "slideDown"}} leave={{animation: "slideUp"}} runOnMount={true}>
          <div>{passage.text}</div>
          <div>
            {passage.links.map((link) => {
              return (
                <div>
                  <a onTouchTap={this.onChoice.bind(this, link.pid)}>{link.name}</a>
                </div>
              );
            })}
          </div>
        </VelocityTransitionGroup>
      </div>
    );
  }
});

const styles = {
  desktopOuterFrame: {
    background: 'black',
    paddingTop: 20,
    height: 2000,
    display: 'flex',
    justifyContent: 'center'
  },
  desktopInnerFrame: {
    width: 375,
    height: 667,
    background: 'white',
    border: '1px solid #999'
  },
  done: {
    padding: 20,
  },
  container: {
    fontSize: 20,
    padding: 0,
    margin:0,
    paddingBottom: 0
  },
  button: {
    marginTop: 20
  },
  doneTitle: {
    marginBottom: 10
  },
  instructions: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  paragraph: {
    marginTop: 20,
    marginBottom: 20
  }

};