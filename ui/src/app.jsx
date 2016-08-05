/* @flow weak */
import React from 'react';
import _ from 'lodash';
import {RouterMixin} from 'react-mini-router';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

import * as PropTypes from './prop_types.js';
import AuthContainer from './auth_container.jsx';
import ChallengePage from './challenge/challenge_page.jsx';
import HomePage from './home/home_page.jsx';
import SlatePage from './slate/slate_page.jsx';
import CSSTankPage from './csstank/csstank_page.jsx';
import VirtualSchoolPage from './virtual_school/virtual_school_page.jsx';
import RawPage from './ecd/raw_page.jsx';
import CandidatePage from './ecd/candidate_page.jsx';
import EvaluatorPage from './ecd/evaluator_page.jsx';
import * as MessagePopup from './message_popup/index.js';
import {challenges, slates} from './challenge/challenges.js';



export default React.createClass({
  displayName: 'App',

  mixins: [RouterMixin],

  propTypes: {
    challenges: React.PropTypes.arrayOf(PropTypes.Challenge),
    muiTheme: React.PropTypes.object
  },

  getDefaultProps() {
    return {
      challenges: challenges,
      muiTheme: getMuiTheme()
    };
  },

  componentWillMount() {
    injectTapEventPlugin(); // material-ui, see https://github.com/zilverline/react-tap-event-plugin
  },

  routes: {
    '/': 'home',
    '/virtual_school': 'virtualSchool',
    
    '/challenge/:id': 'challenge',
    '/message_popup': 'messagePopup',
    '/message_popup/exploration': 'messagePopupExploration',
    '/message_popup/evaluations/:id': 'messagePopupEvaluation',
    '/message_popup/scoring': 'messagePopupScoring',
    '/ecd/raw': 'ecdRaw',
    '/ecd/candidate': 'ecdCandidate',
    '/ecd/evaluator': 'ecdEvaluator',
    '/slate/:id': 'slate',
    '/csstank': 'cssTank',
  },

  /*eslint-disable react/sort-comp */
  render(){
    return (
      <MuiThemeProvider muiTheme={this.props.muiTheme}>
        <AuthContainer>
          {this.renderCurrentRoute()}
        </AuthContainer>
      </MuiThemeProvider>
    );
  },

  notFound(path) {
    return <div>Could not find {path}...</div>;
  },

  home() {
    return <HomePage challenges={this.props.challenges} />;
  },

  challenge(id) {
    const challenge = _.find(this.props.challenges, (challenge) => challenge.id === _.toInteger(id));
    return <ChallengePage challenge={challenge} user={this.state.user} />;
  },

  messagePopup(query = {}) {
    // Uses a unique key per query string so that navigating between
    // rebuilds the page.
    return <MessagePopup.ExperiencePage key={JSON.stringify(query)} query={query} />;
  },
  
  messagePopupExploration(query = {}) {
    return <MessagePopup.ExplorationPage query={query} />;
  },

  messagePopupScoring(query = {}) {
    return <MessagePopup.ScoringPage query={query} />;
  },

  messagePopupEvaluation(evaluationId) {
    return <MessagePopup.EvaluationViewerPage evaluationId={evaluationId} />;
  },
  
  cssTank(query = {}) {
    return <CSSTankPage query={query} />;
  },

  slate(id, query = {}) {
    const slate = _.find(slates, (slate) => slate.id === _.toInteger(id));
    return <SlatePage slate={slate} query={query} />;
  },

  virtualSchool(query = {}) {
    return <VirtualSchoolPage query={query} />;
  },

  ecdRaw(query = {}) {
    return <RawPage query={query} />;
  },

  ecdCandidate(query = {}) {
    return <CandidatePage candidateEmail={query.email} />;
  },

  ecdEvaluator(query = {}) {
    return <EvaluatorPage evaluatorEmail={query.email} />;
  }
  /*eslint-enable react/sort-comp */
});
