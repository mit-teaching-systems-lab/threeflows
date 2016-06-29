import React from 'react';
import _ from 'lodash';
import * as PropTypes from './prop_types.js';
import {RouterMixin} from 'react-mini-router';
import ChallengePage from './challenge/challenge_page.jsx';
import HomePage from './home/home_page.jsx';
import SlatePage from './slate/slate_page.jsx';
import CSSTankPage from './csstank/csstank_page.jsx';
import VirtualSchoolPage from './virtual_school/virtual_school_page.jsx';
import * as MessagePopup from './message_popup/index.js';
import {
  challenges,
  slates,
  withLearningObjectives
} from './data/challenges.js';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';



export default React.createClass({
  displayName: 'App',

  mixins: [RouterMixin],
  routes: {
    '/': 'home',
    '/virtual_school': 'virtualSchool',
    
    '/challenge/:id': 'challenge',
    '/message_popup': 'messagePopup',
    '/message_popup/exploration': 'messagePopupExploration',
    '/slate/:id': 'slate',
    '/csstank': 'cssTank',
  },

  propTypes: {
    challenges: React.PropTypes.arrayOf(PropTypes.Challenge)
  },

  getDefaultProps() {
    return {
      challenges: challenges.map(withLearningObjectives)
    };
  },

  getInitialState() {
    return {
      user: {
        driveFolderId: '0B1DHMN8NDLMVNnZGaVJjSjRTbDg'
      }
    };
  },

  componentWillMount(props, state) {
    // material-ui, see https://github.com/zilverline/react-tap-event-plugin
    injectTapEventPlugin();
  },

  render(){
    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        {this.renderCurrentRoute()}
      </MuiThemeProvider>
    );
  },

  notFound(path, query = {}) {
    return <div>404</div>;
  },

  home(query = {}) {
    return <HomePage challenges={this.props.challenges} />;
  },

  challenge(id, query = {}) {
    const challenge = _.find(this.props.challenges, (challenge) => challenge.id === _.toInteger(id));
    return <ChallengePage challenge={challenge} user={this.state.user} />;
  },

  messagePopup(query = {}) {
    return <MessagePopup.ExperiencePage query={query} />;
  },
  
  messagePopupExploration(query = {}) {
    return <MessagePopup.ExplorationPage query={query} />;
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
  }
});
