/* @flow weak */
import PropTypes from 'prop-types';

import React from 'react';
import createReactClass from 'create-react-class';
import {RouterMixin} from 'react-mini-router';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

import AuthContainer from './auth_container.jsx';
import HomePage from './home/home_page.jsx';
import DemosPage from './home/demos_page.jsx';
import CsBiasPage from './home/cs_bias_page.jsx';
import ConsentPage from './home/consent_page.jsx';
import * as MessagePopup from './message_popup/index.js';

// equity
import EquityFairPage from './message_popup/equity/equity_fair_page.jsx';
import ClimatePage from './message_popup/equity/climate_page.jsx';
import PaperPrototypePage from './message_popup/equity/paper_prototype_page.jsx';

//authentication
import LoginPage from './research/LoginPage.js';
import EmailLinkLoginPage from './research/EmailLinkLoginPage.js';


export default createReactClass({
  displayName: 'App',

  mixins: [RouterMixin],

  propTypes: {
    muiTheme: PropTypes.object
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
    // ------ STABLE AND PUBLICLY SHARED ----- //
    // Landing pages
    '/': 'home',
    '/demos': 'demos',
    '/consent': 'consent',
    '/bias': 'biasHome',
    '/equity': 'equityFairPage',
    '/login': 'loginPage',
    '/login_from_email': 'emailLinkLoginPage',


    // Stable, field tested, publicly shared practice spaces
    '/teachermoments/danson': 'dansonPlaytest',
    '/teachermoments/turner': 'TurnerPlaytest',
    '/teachermoments/sub': 'messagePopupPairs',
    '/teachermoments/jayden': 'jaydenScenario',
    '/teachermoments/rosa': 'rosaScenario',
    '/teachermoments/dysfunc': 'dysfuncScenario',
    '/teachermoments/aptest': 'apTestScenario',
    '/teachermoments/smith': 'smithScenario',
    '/teachermoments/smithFacilitated': 'smithFacilitatedScenario',
    '/teachermoments/smithB': 'smithScenarioB',
    '/equity/climate': 'climatePage',
    '/equity/paper/:key': 'paperPrototypePage',

    // Practice spaces that are viewable from a
    // link (eg /demos), have been shared externally, or have been
    // used in playtests.
    '/teachermoments/csfair': 'messagePopupCsFair',
    '/teachermoments/original': 'messagePopup',
    '/teachermoments/alpha': 'alphaPlaytest',
    '/teachermoments/discipline': 'disciplinePlaytest',
    '/teachermoments/mentoring': 'mentoringPlaytest',
    '/teachermoments/mindset': 'mindsetPlaytest',
    '/teachermoments/demo': 'messagePopupDemo',
    '/teachermoments/darius': 'messagePopupDarius',
    

    // ------ EXPERIMENTS AND PROTOTYPES ----- //
    // Mechanical Turk experiment
    '/teachermoments/turk-0000': 'turk0000',

    // Prototype authoring UIs
    '/teachermoments/author/questions' : 'messagePopupAuthorQuestions',
    '/teachermoments/author/questions/new' : 'messagePopupAuthorQuestionsNew',
    '/teachermoments/author/questions/:id' : 'messagePopupAuthorQuestionsEdit',

    // Chat-based experience
    '/teachermoments/chat': 'chatPrototype',

    // Twine-based authoring
    '/teachermoments/twine': 'messagePopupTwine',

    // Other prototype scenarios
    '/teachermoments/bubblesort': 'messagePopupBubbleSort',



    // ------ FROZEN ----- //
    // These are for particular workshops and are not
    // in active development or use.  We should build on top of them,
    // convert them to public demos, or remove them.

    // For HMTCA, with practice space and reviewing UI
    // Frozen (use ClimatePage for demos)
    '/teachermoments/hmtca': 'hmtcaScenario',

    // Reviewing endpoints for listening to your own responses
    // via email authentication.  Originally used in a field test for 11.125
    // but a mostly generic capability for audio responses.
    '/teachermoments/review/:key': 'messagePopupReviewLogin',
    '/teachermoments/review_link': 'messagePopupReview',

    // From an ECS workshop, modified from the Pairs scenario
    '/teachermoments/ecs': 'ecsScenario',

    // For 11.125 field test, modified from the Pairs scenario
    '/teachermoments/tuesday': 'messagePopupMeredith',

    // For a field test with Mobile CSP
    '/teachermoments/csp': 'messagePopupCSP',
    
    // ------ DEPRECATED ----- //
    // Deprecated experiences
    '/playtest/:cohortKey': 'messagePopupPlaytest',
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
    return <MessagePopup.InsubordinationPage query={query}/>;
  },

  disciplinePlaytest(query = {}) {
    return <MessagePopup.DisciplinePage query={query} />;
  },

  jaydenScenario(query = {}) {
    return <MessagePopup.JaydenExperiencePage query={query} />;
  },

  rosaScenario(query = {}) {
    return <MessagePopup.RosaExperiencePage query={query} />;
  },

  dysfuncScenario(query = {}) {
    return <MessagePopup.DysfuncExperiencePage query={query} />;
  },

  apTestScenario(query = {}) {
    return <MessagePopup.apTestExperiencePage query={query} />;
  },

  smithScenarioB(query = {}) {
    return <MessagePopup.SmithExperiencePageB query={{}}/>;
  },

  smithScenario(query = {}) {
    return <MessagePopup.SmithExperiencePage query={query} facilitated={false} />;
  },

  smithFacilitatedScenario(query = {}) {
    return <MessagePopup.SmithExperiencePage query={query} facilitated={true} />;
  },

  messagePopupBubbleSort(query = {}) {
    return <MessagePopup.BubbleSortExperiencePage query={query} />;
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
    return <CsBiasPage />;
  },

  mentoringPlaytest(query = {}) {
    return <MessagePopup.MentoringPage query={{}}/>;
  },

  mindsetPlaytest(query = {}) {
    return <MessagePopup.MindsetPage query={{}}/>;
  },

  dansonPlaytest(query = {}) {
    return <MessagePopup.DansonExperiencePage query={query} />;
  },

  TurnerPlaytest(query = {}) {
    return <MessagePopup.TurnerExperiencePage query={query} />;
  },

  messagePopupPairs(query = {}) {
    return <MessagePopup.PairsExperiencePage query={query} />;
  },

  ecsScenario(query = {}) {
    return <MessagePopup.EcsExperiencePage query={query} />;
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

  hmtcaScenario(query = {}) {
    return <MessagePopup.HMTCAExperiencePage query={query} />;
  },

  equityFairPage(query = {}) {
    return <EquityFairPage query={query} />;
  },

  climatePage(query = {}) {
    return <ClimatePage query={query} />;
  },

  paperPrototypePage(prototypeKey, query = {}) {
    return <PaperPrototypePage prototypeKey={prototypeKey} query={query} />;
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

  loginPage(query = {}) {
    return <LoginPage query={query} />;
  },

  emailLinkLoginPage(query = {}) {
    return <EmailLinkLoginPage query={query} />;
  }
  /*eslint-enable react/sort-comp */
});
