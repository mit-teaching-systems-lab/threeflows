/* @flow weak */
import _ from 'lodash';
import {learningObjectives} from './learning_objectives.js';

// Holds data for a particular challenge.
const rawChallenges = [{
  id: 102,
  name: 'Photosynthesis',
  learningObjectiveIds: [30, 31, 32, 33, 34, 35, 36, 37, 38, 39],
  scenario: `At the end of school yesterday, you sent an email to your colleague, Margaret, who also teaches 7th grade science, to ask if she has a introductory lesson for photosynthesis that you can use later in the week. She quickly replied and provided you a lesson plan on the topic that she is excited about.  After reviewing Margaret's lesson, however, you decide there are better ways to make this material more engaging for your students. How will you revise and facilitate the lesson? To do so, you want to learn more about using inquiry to teach scientific concepts and motivating students to learn.`,
  learningExperiences: [
    {
      img: 'https://s3.amazonaws.com/tsl-hacking/threeflows/sharktank.jpg',
      href: '/csstank',
      title: 'Cognitive Science Shark Tank',
    },
    {
      img: 'https://s3.amazonaws.com/tsl-hacking/threeflows/message-popup.jpg',
      href: '/teachermoments?basic',
      title: 'Teacher Moments practice',
    },
    {
      img: 'https://s3.amazonaws.com/tsl-hacking/threeflows/inquiry-kit.jpg',
      href: 'https://docs.google.com/document/d/1DPwL3kXN7F5TWzo5UXCRgnaG5NNAwBVFqHjZa-io9t0/edit?usp=sharing',
      title: 'Inquiry Kit',
    },
    {
      img: 'https://s3.amazonaws.com/tsl-hacking/threeflows/slate.jpg',
      title: 'Slate on Formative Assessment',
      href: '/slate/32'
    }
  ]
}];

function withLearningObjectives(challenge) {
  return {
    ...challenge,
    learningObjectives: challenge.learningObjectiveIds.map((id) => {
      return _.find(learningObjectives, {id});
    })
  };
}

export const challenges = rawChallenges.map(withLearningObjectives);
export const slates = [
  { id: 32, topic: 'Formative assessment' }
];