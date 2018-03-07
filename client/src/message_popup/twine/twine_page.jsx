/* @flow weak */
import _ from 'lodash';
import PropTypes from 'prop-types';

import React from 'react';
import createReactClass from 'create-react-class';
import VelocityTransitionGroup from "velocity-react/velocity-transition-group";
import 'velocity-animate/velocity.ui';
import uuid from 'uuid';

import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';
import IconButton from 'material-ui/IconButton';
import RefreshIcon from 'material-ui/svg-icons/navigation/refresh';

import ResponsiveFrame from '../../components/responsive_frame.jsx';
import * as Api from '../../helpers/api.js';
import NavigationAppBar from '../../components/navigation_app_bar.jsx';
import FeedbackForm from '../feedback_form.jsx';
import {TwisonT, TwinePassageT, TwineLinkT} from './twison_types.js';
import TwineViewer from './twine_viewer.jsx';
import exampleTwison from './example_twison.js';


type TwineSessionT = {
  email:string,
  twison:TwisonT,
  drawResponseMode:(question:any, scaffolding:any) => string,
  drawStudentCard:(question:any, scaffolding:any) => string,
  sessionId:string,
  pid:string,
  choicesMade:number,
  isFinished:bool
};
type TwineChoiceT = {
  prevTwineSession:TwineSessionT,
  choice:TwineLinkT,
  passage:TwinePassageT
};
type StateT = {
  email:string,
  twineSession:?TwineSessionT
};
/*
For public demos.
*/
export default createReactClass({
  displayName: 'DemoPage',

  contextTypes: {
    auth: PropTypes.object.isRequired
  },

  getInitialState():StateT {
    return {
      twineSession: null,
      email: this.context.auth.userProfile.email
    };
  },

  resetExperience(){
    this.setState(this.getInitialState());
  },

  onStartSession(){
    // A particular demo question
    const twison:TwisonT = exampleTwison;
    const {email} = this.state;
    const twineSession:TwineSessionT = {
      email,
      twison,
      drawResponseMode: () => 'twine',
      drawStudentCard: () => false,
      sessionId: uuid.v4(),
      pid: twison.startnode,
      choicesMade: 0,
      isFinished: false
    };
    this.setState({twineSession});
  },

  onChoice(passage, link) {
    const prevTwineSession = this.state.twineSession;
    if (prevTwineSession == null) return;

    // log
    this.onLog('twine_choice', {
      prevTwineSession,
      passage,
      choice: link
    });

    // transition
    var nextTwineSession = {
      ...prevTwineSession,
      pid: link.pid,
      choicesMade: prevTwineSession.choicesMade + 1
    };
    this.setState({ twineSession: nextTwineSession });
  },

  onLog(type, twineChoice:TwineChoiceT) {
    const twineSession = this.state.twineSession;
    if (twineSession == null) return;
    
    Api.logEvidence(type, {
      ...twineChoice,
      name: twineSession.email,
      email: twineSession.email,
      sessionId: twineSession.sessionId,
      clientTimestampMs: new Date().getTime()
    });
  },

  onDone() {
    const prevTwineSession = this.state.twineSession;
    if (prevTwineSession == null) return;
    this.setState({
      twineSession: {
        ...prevTwineSession,
        isFinished: true
      }
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
    if (twineSession == null) return this.renderInstructions();

    // all done
    if (twineSession.isFinished) return <FeedbackForm />;

    // choice
    return this.renderChoice(twineSession);
  },

  renderInstructions() {
    return (
      <VelocityTransitionGroup enter={{animation: "callout.pulse", duration: 500}} leave={{animation: "slideUp"}} runOnMount={true}>
        <div className="instructions">
          <div style ={_.merge(_.clone(styles.container), styles.instructions)}>
            <p style={styles.paragraph}>Welcome!</p>
            <p style={styles.paragraph}>This station is about responding to students in the moment. It is set in the context of a 9th grade geometry class.</p>
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
  
  renderChoice(twineSession) {
    const {twison, pid} = twineSession;
    return (
      <TwineViewer
        twison={twison}
        pid={pid}
        onChoice={this.onChoice}
        onDone={this.onDone}
        allowUnsafeHtml={true}
      />
    );
  }
});

const styles = {
  container: {
    fontSize: 20,
    padding: 0,
    margin:0,
    paddingBottom: 0
  },
  button: {
    marginTop: 20
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