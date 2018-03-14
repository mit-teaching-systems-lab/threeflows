/* @flow weak */
import _ from 'lodash';
import hash from '../../helpers/hash.js';


export type QuestionT = {
  id:number,
  condition:string,
  choices:[string],
  text:string
};


// Make questions for an email, describe choices.
export const InsubordinationScenarios = {
  choices() {
    return [
      'ignore the behavior',
      'make eye contact',
      'make a facial expression or gesture',
      'make a joke',
      'encourage the student',
      'redirect the student to the task',
      'remind the student of class rules',
      'ask the student to stay after class',
      'send the student to the principal',
      'call an administrator to class'
    ];
  },

  // Given an email, return a cohortKey.
  cohortKey(email) {
    const {conditions} = this.data();
    return hash(email) % conditions.length;
  },

  data() {
    // Read scenario
    const conditions = [{child: 'Jake' }, {child: 'Greg'}, {child: 'Darnell'}, {child: 'DeShawn'}];
    /* eslint-disable no-template-curly-in-string */
    const questionTemplates = [
      'Students are working independently on a proportions problem set.  You circulate around the room.',
      '${child} is sleeping in class.',
      'He picks his head up. He chooses to rest it on his hand and continue to sleep.',
      '${child} refuses to do work.',
      'He refuses.'
    ];
    /* eslint-enable no-template-curly-in-string */

    return {conditions, questionTemplates};
  },

  // Return questions for cohortKey.
  // This involves taking description from yaml and making it concrete.
  questionsFor(cohortKey) {
    const {conditions, questionTemplates} = this.data();
    const condition = conditions[cohortKey];
    const questions = questionTemplates.map((template, index) => {
      const text = _.template(template)(condition);
      const question:QuestionT = {
        id: hash(text),
        condition: condition,
        choices: (index === 0) ? [] : this.choices(),
        text: text
      };
      return question;
    }, this);

    return questions;
  }
};
