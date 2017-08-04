/* @flow weak */
import _ from 'lodash';


// This file defines the content for the HMTCA scenarios.
// Note: This only supports text scenes right now.
export type QuestionT = {
  type:string, // Used as a label
  text:string, // Plain question text
  applesSceneNumber?:number, // Ask for text response and log it specially
};


// Different categories for classroom management
const BUCKETS = [
  { id: 201, text: 'Students refusing to work' },
  { id: 202, text: 'Disrespect towards teachers' },
  { id: 203, text: 'Disrespect towards females' },
  { id: 204, text: 'Combination of the above' }
];

const TEAM_CODES = _.sortBy([
  'mango',
  'lemon',
  'papaya',
  'apple',
  'guava',
  'banana',
  'nectarine',
  'peach',
  'blueberry',
  'strawberry',
  'grape',
  'pineapple',
  'pear',
  'cherry',
  'watermelon',
  'kiwi',
  'coconut',
  'blackberry'
]);


function slidesFor(cohortKey, bucketId) {
  const slides:[QuestionT] = [];

  if (bucketId === 201) {
    slides.push({ text: 'Does this work?' });
    slides.push({ text: 'Jose is watching YouTube.', applesSceneNumber: 1 });
    slides.push({ text: 'Samir puts his head down.', applesSceneNumber: 2 });
  } else {
    slides.push({ text: 'These scenarios are...' });
    slides.push({ text: 'Jose is watching YouTube.', applesSceneNumber: 1 });
    slides.push({ text: 'Samir puts his head down.', applesSceneNumber: 2 });
  }

  return slides;
}


export default {
  BUCKETS,
  TEAM_CODES,
  questionsFor(cohortKey, bucketId) {
    return slidesFor(cohortKey, bucketId);
  }
};