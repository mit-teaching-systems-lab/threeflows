/* @flow weak */

// This file defines the content for the HMTCA scenarios.
// Note: This only supports text scenes right now.
export type QuestionT = {
  type:string, // Used as a label
  text:string, // Plain question text
  applesSceneNumber?:number, // Ask for text response and log it specially
};


function slidesFor(cohortKey) {
  const slides:[QuestionT] = [];

  slides.push({ type: 'Hello!', text: 'Does this work?' });
  slides.push({ type: 'Hello!', text: 'Jose is watching YouTube.', applesSceneNumber: 0 });
  slides.push({ type: 'Hello!', text: 'Samir puts his head down.', applesSceneNumber: 1 });

  return slides;
}


export default {
  questionsFor(cohortKey) {
    return slidesFor(cohortKey);
  }
};