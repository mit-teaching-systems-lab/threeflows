/* @flow weak */
import hash from '../../helpers/hash.js';


export type QuestionT = {
  id:number,
  youTubeId:string,
  start: number,
  end: number
};


// Make questions and choices.
export const TurnerScenarios = {
  choices() {
    return [];
  },

  data() {
    // Read scenario
    return [
      {
        youTubeId: '8iP4KahH5e8',
        start: 0,
        end: 7
      },
      {
        youTubeId: 'cmpc5rISgbA',
        start: 7,
        end: 21
      },
      {
        youTubeId: '8iP4KahH5e8',
        start: 21,
        end: 48
      },
      {
        youTubeId: 'cmpc5rISgbA',
        start: 49,
        end: 63
      },
      {
        youTubeId: '8iP4KahH5e8',
        start: 63,
        end: 68
      },
      {
        youTubeId: 'cmpc5rISgbA',
        start: 69,
        end: 83
      }
    ];
  },

  // Return questions.
  questions() {
    const allQuestions = this.data().map((obj, index) => {
      const question:QuestionT = {
        id: hash(obj.youTubeId),
        youTubeId: obj.youTubeId,
        start: obj.start,
        end: obj.end
      };
      return question;
    }, this);

    return allQuestions;
  }
};
