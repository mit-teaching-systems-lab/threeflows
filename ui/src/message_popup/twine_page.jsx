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

import {TwisonT, TwinePassageT, TwineLinkT} from './twison_types.js';
import ResponsiveFrame from './responsive_frame.jsx';
import * as Api from '../helpers/api.js';
import NavigationAppBar from '../components/navigation_app_bar.jsx';
import Feedback from './feedback.jsx';


type StateT = {
  email:string,
  twineSession:?TwineSessionT
};
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
/*
For public demos.
*/
export default React.createClass({
  displayName: 'DemoPage',

  contextTypes: {
    auth: React.PropTypes.object.isRequired
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
    const twison:TwisonT = {"passages":[{"text":"It's 9th grade geometry.  This is the end part of a lesson on chords, secants, and solving algebraic expressions to solve geometry problems.\n\nStudents are working on goformative.com, working through three or four problems to practice the kinds of problems you just demonstrated on the board.\n\n[[Do nothing->nothing]]\n[[Check in on Alicia->Alicia]]\n[[Check in on Samantha->Samantha]]\n[[Check in on Ken->Ken]]\n[[Check in on Ryan->Ryan]]","links":[{"name":"Do nothing","link":"nothing","pid":"2"},{"name":"Check in on Alicia","link":"Alicia","pid":"3"},{"name":"Check in on Samantha","link":"Samantha","pid":"8"},{"name":"Check in on Ken","link":"Ken","pid":"4"},{"name":"Check in on Ryan","link":"Ryan","pid":"5"}],"name":"Geometry with chords","pid":"1","position":{"x":"512","y":"300"}},{"text":"Really?  You should be helping students.\n\n[[Try again->Geometry with chords]]","links":[{"name":"Try again","link":"Geometry with chords","pid":"1"}],"name":"nothing","pid":"2","position":{"x":"290","y":"475"}},{"text":"Alicia is looking through her notebook.\n\n[[\"What are you looking for?\"]]\n[[\"How's it going?\"]]","links":[{"name":"\"What are you looking for?\"","link":"\"What are you looking for?\"","pid":"6"},{"name":"\"How's it going?\"","link":"\"How's it going?\"","pid":"7"}],"name":"Alicia","pid":"3","position":{"x":"697","y":"482"}},{"text":"Double-click this passage to edit it.","name":"Ken","pid":"4","position":{"x":"875","y":"308"}},{"text":"Double-click this passage to edit it.","name":"Ryan","pid":"5","position":{"x":"962","y":"450"}},{"text":"Double-click this passage to edit it.","name":"\"What are you looking for?\"","pid":"6","position":{"x":"639","y":"644"}},{"text":"Double-click this passage to edit it.","name":"\"How's it going?\"","pid":"7","position":{"x":"789","y":"644"}},{"text":"\"This problem looks wrong,\" she says.\n\n[[\"What's the problem?\"]]\n[[\"What do you mean?\"]]\n[[\"That sounds unlikely.\"]]","links":[{"name":"\"What's the problem?\"","link":"\"What's the problem?\"","pid":"9"},{"name":"\"What do you mean?\"","link":"\"What do you mean?\"","pid":"10"},{"name":"\"That sounds unlikely.\"","link":"\"That sounds unlikely.\"","pid":"11"}],"name":"Samantha","pid":"8","position":{"x":"432","y":"509"}},{"text":"Double-click this passage to edit it.","name":"\"What's the problem?\"","pid":"9","position":{"x":"309","y":"686"}},{"text":"Double-click this passage to edit it.","name":"\"What do you mean?\"","pid":"10","position":{"x":"434","y":"720"}},{"text":"Double-click this passage to edit it.","name":"\"That sounds unlikely.\"","pid":"11","position":{"x":"569","y":"769"}}],"name":"Alicia in Geometry","startnode":"1","creator":"Twine","creator-version":"2.0.11","ifid":"1CB6AE37-3E47-447E-8BB0-AE4FD79D2D9A"};
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
    if (twineSession.isFinished) return <Feedback />;

    // choice
    return this.renderChoice(twineSession);
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
  
  renderChoice(twineSession) {
    const {twison, pid} = twineSession;
    const passage = _.find(twison.passages, { pid });

    // Remove choices from text.  They're saved inline like [[text->tag]]
    // and also as data in `links`, so we'll just use `links`.
    const plainText = passage.text.replace(/\[\[[^\]]*\]\]/g, '');

    return (
      <div className="choice" style={styles.container}>        
        <VelocityTransitionGroup enter={{animation: "slideDown"}} leave={{animation: "slideUp"}} runOnMount={true}>
          <div key={pid} style={styles.passageText}>{plainText}</div>
          {_.isUndefined(passage.links)
            ? <div onTouchTap={this.resetExperience} style={styles.twineChoice}>Done</div>
            : <div style={{paddingTop: 10}}>
              {passage.links.map((link) => {
                return (
                  <div
                    key={link.pid}
                    style={styles.twineChoice}
                    onTouchTap={this.onChoice.bind(this, passage, link)}>
                    {link.name}
                  </div>
                );
              })}
            </div>
          }
        </VelocityTransitionGroup>
      </div>
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
  },
  passageText: {
    padding: 10,
    lineHeight: 1.2
  },
  twineChoice: {
    paddingLeft: 20,
    paddingTop: 5,
    cursor: 'pointer',
    color: 'blue'
  }
};