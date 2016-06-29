/* @flow weak */
import _ from 'lodash';
import {learningObjectives} from './learning_objectives.js';

// Holds data for a particular challenge.
export const challenges = [{
  id: 102,
  name: 'Photosynthesis',
  learningObjectiveIds: [30, 31, 32, 33, 34, 35, 36, 37, 38, 39],
  scenario: `At the end of school yesterday, you sent an email to your colleague, Margaret, who also teaches 7th grade science, to ask if she has a introductory lesson for photosynthesis that you can use later in the week. She quickly replied and provided you a lesson plan on the topic that she is excited about.  After reviewing Margaret's lesson, however, you decide there are better ways to make this material more engaging for your students. How will you revise and facilitate the lesson? To do so, you want to learn more about using inquiry to teach scientific concepts and motivating students to learn.`,
  learningExperiences: [
    {
      img: 'http://www.ballermindframe.com/pop-culture-spin/wp-content/uploads/sites/7/2015/04/sharktank.jpg',
      href: '/csstank',
      title: 'Cognitive Science Shark Tank',
    },
    {
      img: 'http://i-cdn.phonearena.com/images/article/41632-image/Google-Babel-references-appear-in-strings-of-code-pop-up-message.jpg',
      href: '/message_popup?cards',
      title: 'Message PopUp practice',
    },
    {
      img: 'http://cdn.rainbowresource.netdna-cdn.com/products/046383.jpg',
      href: 'https://docs.google.com/document/d/1DPwL3kXN7F5TWzo5UXCRgnaG5NNAwBVFqHjZa-io9t0/edit?usp=sharing',
      title: 'Inquiry Kit',
    },
    {
      img: 'http://ecx.images-amazon.com/images/I/41vC9AUIoSL._AC_UL320_SR256,320_.jpg',
      title: 'Slate on Formative Assessment',
      href: '/slate/32'
    }
  ]
}];

export function withLearningObjectives(challenge) {
  return {
    ...challenge,
    learningObjectives: challenge.learningObjectiveIds.map((id) => {
      return _.find(learningObjectives, {id});
    })
  };
}

export const slates = [
  { id: 32, topic: 'Formative assessment' }
];