/* @flow weak */
import React from 'react';
import {RouterMixin} from 'react-mini-router';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

import AuthContainer from './auth_container.jsx';
import VirtualSchoolPage from './virtual_school/virtual_school_page.jsx';
import HomePage from './home/home_page.jsx';
import DemosPage from './home/demos_page.jsx';
import ConsentPage from './home/consent_page.jsx';
import * as MessagePopup from './message_popup/index.js';


export default React.createClass({
  displayName: 'App',

  mixins: [RouterMixin],

  propTypes: {
    muiTheme: React.PropTypes.object
  },

  getDefaultProps() {
    return {
      muiTheme: getMuiTheme()
    };
  },

  componentWillMount() {
    injectTapEventPlugin(); // material-ui, see https://github.com/zilverline/react-tap-event-plugin
  },

  routes: {
    '/': 'home',
    '/demos': 'demos',
    '/consent': 'consent',

    // Included in /demos, shared externally, or used in playtests
    '/teachermoments/original': 'messagePopup',
    '/teachermoments/bias': 'biasHome',
    '/teachermoments/alpha': 'alphaPlaytest',
    '/teachermoments/discipline': 'disciplinePlaytest',
    '/teachermoments/mentoring': 'mentoringPlaytest',
    '/teachermoments/mindset': 'mindsetPlaytest',
    '/teachermoments/danson': 'dansonPlaytest',
    '/teachermoments/valpha': 'VideoAlphaPlaytest',
    '/teachermoments/twine': 'messagePopupTwine',
    '/teachermoments/demo': 'messagePopupDemo',
    '/teachermoments/sub': 'messagePopupPairs',
    '/teachermoments/darius': 'messagePopupDarius',
    '/teachermoments/chat': 'chatPrototype',
    '/teachermoments/csfair': 'messagePopupCsFair',

    // Specific cohorts
    '/teachermoments/csp': 'messagePopupCSP',
    '/teachermoments/tuesday': 'messagePopupMeredith',

    // Deprecated experiences
    '/playtest/:cohortKey': 'messagePopupPlaytest',

    // Mechanical Turk experiment
    '/teachermoments/turk-0000': 'turk0000',

    // Prototype authoring UIs
    '/teachermoments/author/questions' : 'messagePopupAuthorQuestions',
    '/teachermoments/author/questions/new' : 'messagePopupAuthorQuestionsNew',
    '/teachermoments/author/questions/:id' : 'messagePopupAuthorQuestionsEdit',

    // Reviewing endpoints
    '/teachermoments/review/:key': 'messagePopupReviewLogin',
    '/teachermoments/review_link': 'messagePopupReview',

    // Other
    '/virtual_school': 'virtualSchool'
  },

  /*eslint-disable react/sort-comp */
  render(){
    return (
      <MuiThemeProvider muiTheme={this.props.muiTheme}>
        <AuthContainer isEmailRequired={false}>
          {this.renderCurrentRoute()}
        </AuthContainer>
      </MuiThemeProvider>
    );
  },

  home(query = {}) {
    return <HomePage />;
  },

  notFound(path) {
    window.location = '/';
  },

  demos(query = {}) {
    return <DemosPage />;
  },

  consent(query = {}) {
    return <ConsentPage />;
  },

  messagePopup(query = {}) {
    // Uses a unique key per query string so that navigating between
    // rebuilds the page.
    return <MessagePopup.ExperiencePage key={JSON.stringify(query)} query={query} />;
  },

  chatPrototype(query = {}) {
    return this.messagePopup({...query, mobilePrototype: true});
  },

  messagePopupTwine(query = {}) {
    return <MessagePopup.TwinePage key={JSON.stringify(query)} />;
  },

  messagePopupDemo(query = {}) {
    return <MessagePopup.DemoPage key={JSON.stringify(query)} />;
  },

  alphaPlaytest(query = {}) {
    return <MessagePopup.InsubordinationPage query={{}}/>;
  },

  disciplinePlaytest(query = {}) {
    return <MessagePopup.DisciplinePage query={{}}/>;
  },

  turk0000(query = {}) {
    return (
      <MessagePopup.MTurkPage
        query={query}
        experimentFactory={MessagePopup.InsubordinationExperiment} />
    );
  },

  // Home page for bias project, from website, reachout, etc.
  biasHome(query = {}) {
    return this.messagePopupPairs(query);
  },

  mentoringPlaytest(query = {}) {
    return <MessagePopup.MentoringPage query={{}}/>;
  },

  mindsetPlaytest(query = {}) {
    return <MessagePopup.MindsetPage query={{}}/>;
  },

  dansonPlaytest(query = {}) {
    return <MessagePopup.DansonExperiencePage query={{}}/>;
  },

  VideoAlphaPlaytest(query = {}) {
    return <MessagePopup.VideoAlphaExperiencePage query={{}}/>;
  },

  messagePopupPairs(query = {}) {
    return <MessagePopup.PairsExperiencePage query={query} />;
  },

  messagePopupMeredith(query = {}) {
    return <MessagePopup.PairsExperiencePage query={query} isForMeredith={true} />;
  },

  messagePopupCSP(query = {}) {
    return <MessagePopup.PairsExperiencePage query={query} />;
  },

  messagePopupCsFair(query = {}) {
    return <MessagePopup.CsFairExperiencePage query={query} />;
  },

  messagePopupDarius(query = {}) {
    return <MessagePopup.DariusExperiencePage query={{}}/>;
  },

  messagePopupPlaytest(cohortKey, query = {}) {
    // Uses a unique key per query string so that navigating between
    // rebuilds the page.
    return <MessagePopup.PlaytestExperiencePage key={JSON.stringify(query)} cohortKey={cohortKey} query={{}}/>;
  },
  
  messagePopupAuthorQuestions(query = {}) {
    return <MessagePopup.QuestionsPage />;
  },

  messagePopupAuthorQuestionsNew(query = {}) {
    return <MessagePopup.NewQuestionPage />;
  },

  messagePopupAuthorQuestionsEdit(questionId, query = {}) {
    return <MessagePopup.EditQuestionPage questionId={questionId}/>;
  },

  messagePopupReviewLogin(reviewKey, query = {}) {
    return <MessagePopup.ReviewLoginPage reviewKey={reviewKey} />;
  },

  messagePopupReview(query = {}) {
    return <MessagePopup.ReviewPage token={query.token} />;
  },

  virtualSchool(query = {}) {
    return <VirtualSchoolPage query={query} />;
  }
  /*eslint-enable react/sort-comp */
});
