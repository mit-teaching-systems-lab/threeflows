/* @flow weak */
import _ from 'lodash';
import {allStudents} from '../data/virtual_school.js';
import {learningObjectives} from '../data/learning_objectives.js';
import {indicators} from '../data/indicators.js';
import {allQuestions} from './questions.js';


export function withStudents(questions) {
  return questions.map((question) => {
    const student = _.find(allStudents, {id: question.studentId });
    return _.extend({student}, question);
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

export function questionsForCompetencies(competencyGroup) {
  const withCompetencyGroups = _.compact(allQuestions.map((question) => {
    const learningObjective = _.find(learningObjectives, { id: question.learningObjectiveId });
    if (learningObjective.competencyGroup !== competencyGroup) return null;
    return {
      ...question,
      competencyGroup: learningObjective.competencyGroup
    };
  }));

  return _.shuffle(withStudents(withCompetencyGroups));
}
