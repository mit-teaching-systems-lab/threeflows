/* @flow */
/* Functions for working with questions */
export type QuestionT = {
  id: number,
  studentIds: [number],
  examples: [string],
  nonExamples: [string],
  text?: string,
  youTubeId?: string
};

function hashCode(s){
  return s.split("").reduce(function(a,b){a=((a<<5)-a)+b.charCodeAt(0);return a&a;},0);              
}

function prefixOfHashCode(string):string {
  return Math.abs(hashCode(string)).toString().slice(0, 4);
}

// Workaround for scoring older questions in the database that don't have id fields.
export function questionId(question:QuestionT):string {
  if (question.id) return question.id.toString();
  if (question.text) return prefixOfHashCode(question.text);
  return prefixOfHashCode(JSON.stringify(question));
}