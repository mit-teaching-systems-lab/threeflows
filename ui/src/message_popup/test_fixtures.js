/* flow weak */
import _ from 'lodash';
import {allQuestions} from './questions.js';
import {withStudents} from './transformations.jsx';


/*
These are fixtures for JavaScript tests
*/
export const testQuestion = _.first(withStudents(allQuestions));
export const practiceScaffolding = {
  helpType: 'feedback',
  shouldShowStudentCard: true,
  shouldShowSummary: true
};
export const solutionScaffolding = {
  helpType: 'solution',
  shouldShowStudentCard: true,
  shouldShowSummary: false
};
