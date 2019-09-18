/* @flow weak */
import hash from '../../helpers/hash.js';

export type QuestionT = {
  id:number,
  youTubeId:string,
  start: number,
  end: number,
  type:string, // A string that gets displayed as the page heading
  stage:string // one of 'info', 'prereflect', 'scenario', 'postreflect'
};

export type ResponseT = {
  choice:string,
  question:QuestionT,
  downloadUrl:string
};


// Make questions and choices.
export const Roster2VScenarios = {
  choices() {
    return [];
  },

  getSlides() {
    const slides:[QuestionT] = [];

    //Context

    slides.push({type: 'Context', stage: 'info', text: 
      `Mr. Holl decides to schedule a meeting with you and Ms. Nelson separately to check-in on changes made to the original proposal (recall: you were originally meant to teach 2 CS courses but funding constraints resulted in only ONE CS course being offered).

On the day of the meeting, you gather up the class rosters and head to Mr. Holl’s office to talk with him.`
    });


    slides.push({type: 'Context', stage: 'info', text: 
      `At the end of the conversation, you’ll be asked a few reflection questions so that you can process what happened during the simulation.

Ready? Let’s go!`
    });

    slides.push({type: 'Scenario', stage: 'scenario', youTubeId: 'pTnWxrWTJPk'});

    slides.push({type: 'Scenario', stage: 'scenario', youTubeId: '3-AaJ81EStI'});

    slides.push({type: 'Scenario', stage: 'scenario', youTubeId: 'yIjd_AT_SOo'});

    slides.push({type: 'Scenario', stage: 'scenario', youTubeId: 'o-gzhM5oKFc'});

    slides.push({type: 'Scenario', stage: 'scenario', youTubeId: 'SgTHBgabGXg'});

    slides.push({type: 'Scenario', stage: 'scenario', youTubeId: 'F3Run-wM9U8'});



    slides.push({type: 'Reflect', stage: 'postreflect', text: 
      `Now we’re going to reflect a bit on your conversation with Mr. Holl. 

Type your answers into the speaker notes section below.`
    });

    slides.push({type: 'Reflect', stage: 'postreflect', text: 
      `Reflecting back on your conversation with Mr. Holl, what are your initial thoughts and feelings? Did you feel like your conversation was productive? Why or why not?`
    });

    slides.push({type: 'Reflect', stage: 'postreflect', text: 
      `What did you take away about school scheduling decisions from your conversation with Mr. Holl? What student factors should come into consideration when creating a school scheduling system?`
    });

    slides.push({type: 'Reflect', stage: 'postreflect', text: 
      `Recall, Mr. Holl's responses in the conversation were:
- There’s no time to make big changes/big changes are hard
- You can get a teaching assistant for the bigger class
- Students self-elected to sign up for CS
- Having a subset of kids in CS is better than having no CS class

Did any of Mr. Holl's suggestions or reasons stand out to you? Why?
`
    });

    return slides;

  },

  // Return questions.
  questions() {
    const allQuestions = this.getSlides().map((slide, index) => {
      const question:QuestionT = {
        id: slide.text ? hash(slide.text) : hash(slide.youTubeId),
        youTubeId: slide.youTubeId,
        text: slide.text,
        start: slide.start,
        end: slide.end,
        type: slide.type,
        stage: slide.stage
      };
      return question;
    }, this);

    return allQuestions;
  }
};
