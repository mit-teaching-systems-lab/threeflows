/* @flow weak */

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


function slidesFor(cohortKey, bucketId) {
  const slides:[QuestionT] = [];

  if (bucketId === 201) {
    slides.push({ type: 'Hello!', text: 'Does this work?' });
    slides.push({ type: 'Hello!', text: 'Jose is watching YouTube.', applesSceneNumber: 1 });
    slides.push({ type: 'Hello!', text: 'Samir puts his head down.', applesSceneNumber: 2 });
  } else {
    slides.push({ type: 'Hello!', text: 'These scenarios are...' });
    slides.push({ type: 'Hello!', text: 'Jose is watching YouTube.', applesSceneNumber: 1 });
    slides.push({ type: 'Hello!', text: 'Samir puts his head down.', applesSceneNumber: 2 });
  }

  return slides;
}


export default {
  BUCKETS,
  questionsFor(cohortKey, bucketId) {
    return slidesFor(cohortKey, bucketId);
  }
};