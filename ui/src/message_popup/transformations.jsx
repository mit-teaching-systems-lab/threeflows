/* @flow weak */
import _ from 'lodash';
import {allStudents} from '../data/virtual_school.js';
import {learningObjectives} from '../data/learning_objectives.js';
import {indicators} from '../data/indicators.js';
import {allQuestions} from './questions.js';


export function withStudents(questions) {
  return questions.map((question) => {
    var students = [];
    if(_.has(question, 'studentIds')){
      for (var studentIdIndex = 0; studentIdIndex < question.studentIds.length; studentIdIndex++){
        students.push(_.find((allStudents), {id: question.studentIds[studentIdIndex]}));
      }
    }
    return _.extend({students}, question);
  });
}

export function withLearningObjectiveAndIndicator(question) {
  const learningObjective = _.find(learningObjectives, { id: question.learningObjectiveId });
  const indicator = _.find(indicators, { id: question.indicatorId });
  return {
    ...question,
    indicator,
    learningObjective
  };
}

export function questionsForIndicator(indicatorId) {
  const withIndicators = _.compact(allQuestions.map((question) => {
    if (question.indicatorId !== indicatorId) return null;
    
    const indicator = _.find(indicators, { id: question.indicatorId });
    return {
      ...question,
      indicator
    };
  }));

  return _.shuffle(withStudents(withIndicators));
}