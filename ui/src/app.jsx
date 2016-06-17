import React from 'react';
import _ from 'lodash';
import {RouterMixin} from 'react-mini-router';
import {rules} from './routes';
import ChallengePage from './challenge/challenge_page.jsx';
import HomePage from './home/home_page.jsx';
import MessagePopupPage from './message_popup/message_popup_page.jsx'

// material-ui
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

const challenges = [{
  id: 102,
  name: 'Photosynthesis',
  scenario: `At the end of school yesterday, you sent an email to your department head, Margaret, who also teaches 7th grade science, to ask if she has a introductory lesson for photosynthesis that you can use later in the week. She quickly replied and provided you a lesson plan on the topic that she is excited about.  After reviewing Margaret's lesson, however, you decide there are better ways to make this material more engaging for your students.

How might you revise the lesson? That is one of your goals for this Challenge.

You need to also keep in mind that Margaret, who is both a colleague and your department head, is likely to ask you how the lesson she sent you went, and may even stop by your class to see you teach it. How should you explain to your department head that you don't want to use her lesson and want instead to create your own?`,
  learningObjectives: [
    { id: 'PP1-3B', competencyGroup: 'Purposeful Planning', text: 'Review learning outcomes based on information regarding each student (such as interests and strengths, input from previous teachers, assessment scores, reading ability, English language proficiency, and special needs) and, if necessary, modify or individualize outcomes to more appropriately meet the needs of all students.' },
    { id: 'PP2-1C', competencyGroup: 'Using Assessment to Advance Learning and Inform Teaching', text: 'Plan, create, integrate, and balance a wide variety of formative assessments (including technology-enabled assessments) that align with learning and goals, fit into unit and course design, and take into account the needs (including special needs) of individual students.' },
    { id: 'IN1-1B', competencyGroup: 'Designing Engaging Learning Experiences', text: 'Create learning experiences or modify existing learning experiences to make them relevant and meaningful to all students.' },
    { id: 'PP4-2B', competencyGroup: 'Knowing Your Students', text: 'Use data about students, families/guardians, and communities to design and implement engaging, relevant and meaningful learning experiences for students that integrate a variety of perspectives.' },
    { id: 'IN1-1C', competencyGroup: 'Designing Engaging Learning Experiences', text: `Facilitate student-centric learning, and provide students ample opportunity for "hands-on" (doing something) and "minds-on" (thinking about what they're doing) learning.` },
    { id: 'PP3-2C', competencyGroup: 'Understanding Adolescent and Cognitive Development to Improve Learning', text: 'Demonstrate understanding of the role cognitive science in motivating students to learn.' },
    { id: 'PR3-2E', competencyGroup: 'Demonstrating Professional Ethics and Responsibility', text: 'Work through difficult situations (such as conflict between colleagues, or within a department or school) in productive ways.' },
    { id: 'BIO-P-2B', competencyGroup: 'Biology Pedagogical Knowledge', text: 'Use the most effective instructional strategies including representations, analogies, examples, demonstrations, models, and simulations of biology concepts in lessons to support student learning.' },
    { id: 'BIO-C-2', competencyGroup: 'Biology Content Knowledge', text: 'Demonstrate knowledge of required biology standards in the following core ideas: From Molecules to Organisms: Structures and Processes, Ecosystems: Interactions, Energy, and Dynamics, Heredity: Inheritance and Variation of Traits, Biological Evolution: Unity and Diversity' },
    { id: 'BIO-P-2E', competencyGroup: 'Biology Pedagogical Knowledge', text: 'Use a variety of instructional approaches/methods (e.g. inquiry, project-based learning) in lessons to engage students in asking and answering questions about biology.' }
  ],
  learningExperiences: [{
      img: 'http://www.ballermindframe.com/pop-culture-spin/wp-content/uploads/sites/7/2015/04/sharktank.jpg',
      href: 'https://rnplay.org/apps/KJBRnQ',
      title: 'Cognitive Science Shark Tank',
    },
    {
      img: 'http://i-cdn.phonearena.com/images/article/41632-image/Google-Babel-references-appear-in-strings-of-code-pop-up-message.jpg',
      href: '/message_popup?cards&hints',
      title: 'Message PopUp',
    },
    {
      img: 'http://cdn.rainbowresource.netdna-cdn.com/products/046383.jpg',
      title: 'Inquiry Kit',
    },
    {
      img: 'http://ecx.images-amazon.com/images/I/41vC9AUIoSL._AC_UL320_SR256,320_.jpg',
      title: 'Slate',
    },
    {
      img: 'https://www.mursion.com/wp-content/uploads/2015/11/Teacher-Preparation-And-Professional-Development.png',
      href: 'https://www.mursion.com/',
      title: 'Mursion',
    },
  ]
}];



export default React.createClass({
  displayName: 'App',

  mixins: [RouterMixin],
  routes: {
    '/': 'home',
    '/challenge/:id': 'challenge',
    '/message_popup': 'messagePopup'
  },

  getInitialState: function() {
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
    return <HomePage challenges={challenges} />;
  },

  challenge(id, query = {}) {
    const challenge = _.find(challenges, (challenge) => challenge.id === _.toInteger(id));
    return <ChallengePage challenge={challenge} user={this.state.user} />;
  },

  messagePopup(query = {}) {
    return <MessagePopupPage query={query} />;
  }
});
