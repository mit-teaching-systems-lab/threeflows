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
        youTubeId: 'DXdWPArayr8'
      },
      {
        youTubeId: 'EPeEgD3EnAY'
      },
      {
        youTubeId: 'Nk1a4MUn45I'
      },
      {
        youTubeId: 'ugUEfqG_AQc'
      },
      {
        youTubeId: 'z2P6WEojD1s'
      },
      {
        youTubeId: 'jzEOiaIlxN4'
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
