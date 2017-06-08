/* @flow weak */
import hash from '../../helpers/hash.js';


export type QuestionT = {
  id:number,
  youTubeId:string,
  start: number,
  end: number
};


// Make questions and choices.
export const VideoAlphaScenarios = {
  choices() {
    return [];
  },

  data() {
    // Read scenario
    return [
      {
        youTubeId: 'EvQ1S6-ImRk',
        start: 0,
        end: 5
      },
      {
        youTubeId: 'hAwnBNsgDvg',
        start: 0,
        end: 5
      },
      {
        youTubeId: 'Whxl2tzzt_0',
        start: 0,
        end: 5
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