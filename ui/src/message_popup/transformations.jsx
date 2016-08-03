/* @flow weak */
import _ from 'lodash';
import {allStudents} from '../data/virtual_school.js';
import {indicators} from '../data/indicators.js';
import {allQuestions} from './questions.js';


export function withStudents(questions) {
  return questions.map((question) => {
    const students = question.studentIds.map(studentId => _.find(allStudents, {id: studentId}));
    return _.extend({students}, question);
  });
}

export function withIndicator(question) {
  const indicator = _.find(indicators, { id: question.indicatorId });
  return {
    ...question,
    indicator
  };
}

export function questionsForIndicator(indicatorId) {
  const withIndicators = _.compact(allQuestions.map((question) => {
    if (question.indicatorId !== indicatorId) return null;    
    return withIndicator(question);
  }));

  return withStudents(withIndicators);
}