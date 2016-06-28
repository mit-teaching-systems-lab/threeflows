import {allStudents} from '../data/virtual_school.js';
import {learningObjectives} from '../data/learning_objectives.js';
import {allQuestions} from './questions.js';


export function withStudents(questions) {
  return questions.map((question) => {
    const student = _.find(allStudents, {id: question.studentId });
    return _.extend({student}, question);
  });
}

export function withLearningObjective(question) {
  const learningObjective = _.find(learningObjectives, { id: question.learningObjectiveId });
  return {
    ...question,
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
