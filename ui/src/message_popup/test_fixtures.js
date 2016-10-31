/* @flow weak */
import _ from 'lodash';
import {allQuestions} from './questions.js';
import {allArchivedQuestions} from './author/archived_questions.js';
import {withStudents} from './transformations.jsx';


/*
These are fixtures for JavaScript tests
*/
export const testQuestion = _.first(withStudents(allQuestions));
export const testQuestions = {
  currentQuestions: withStudents(allQuestions),
  archivedQuestions: withStudents(allArchivedQuestions)
};
export const practiceScaffolding = {
  helpType: 'feedback',
  shouldShowSummary: true
};
export const solutionScaffolding = {
  helpType: 'solution',
  shouldShowSummary: false
};
