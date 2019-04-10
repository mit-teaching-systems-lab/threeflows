/* @flow weak */

/*
This file defines the content for the counseling scenario around talking to Rosa
*/
export type QuestionT = {
  type:string, // Used as a label
  text:string,
  open:?bool, // Ask for open-ended user response
  choices:?bool // Forced-choice response
};


function slidesFor(cohortKey) {
  const slides:[QuestionT] = [];


  // Context

  slides.push({ type: 'Context', id: 'context_1', text:
`Mr. Holl decides to schedule a meeting with you and Ms. Nelson separately to check-in on changes made to the original proposal (recall: you were originally meant to teach 2 CS courses but funding constraints resulted in only ONE CS course being offered).

On the day of the meeting, you gather up the class rosters and head to Mr. Holl’s office to talk with him.`
  });

  slides.push({ type: 'Overview', id: 'overview_1', text:
`At the end of the conversation, you’ll be asked a few reflection questions so that you can process what happened during the simulation.

Ready? Let’s go! 
`
  });

  slides.push({type: 'Try It', id: 'try_1', text: 
  `Mr. Holl: “Hello, hello. Come on in. Sit down.

I wanted to meet with you to check in on the changes to the scheduling, but I also heard that you wanted to talk to me. We don’t have a lot of time for our meeting, so let’s cut straight to the chase: Lay it all out for me.”`, force: true, writeNoPrompt: true
  });

  slides.push({type: 'Try It', id: 'try_2', text: 
  `  Mr. Holl: “Well, first I’d like to say thank you for bringing the issue to my attention, and I get your concern -- really, I do. But we don’t have the capacity to dig into this now since, as you know, school is starting in three weeks. 

What are some quick fixes for this year that you or I or someone else with some time could do?”`, force: true, writeNoPrompt: true
  });

  slides.push({type: 'Try It', id: 'try_3', text: 
  `Mr. Holl shakes his head.

Mr. Holl: “I want to be clear: we absolutely cannot change anything about the schedules. Sometimes imbalances will happen when you only offer a course during a certain time -- It’s super complicated. 

Intro CS is only offered during period 5 and Algebra is offered periods 5 and 1, so anyone who has Intro CS for period 5 has to be in the 1st period Algebra class.

What if I got you a teaching assistant for the bigger class?”
`, force: true, writeNoPrompt: true
  });

  slides.push({type: 'Try It', id: 'try_4', text: 
  `Mr. Holl: “Listen, I know that the classes are slightly imbalanced. However, students made the choice whether or not to sign up for the CS course. I’m not going to force students into an elective class that they have no interest in because then I would have a bunch of kids in my office everyday either for behavior issues or because they want to get out of the class. So how does it make sense to force kids into CS who have no interest in CS?” `, force: true, writeNoPrompt: true
  });

  slides.push({type: 'Try It', id: 'try_5', text: 
  `Mr. Holl: “To me it sounds like you’re saying ‘Mr. Holl, either everyone gets CS or no one gets CS.’ How is that fair to the students who signed up for the course? What would you suggest that I do?”`, force: true, writeNoPrompt: true
  });

  slides.push({type: 'Try It', id: 'try_6', text: 
  `Mr. Holl: “It sounds like we’re not going to reach a compromise on this issue, and I have another meeting I need to go to now. If you can present me with some actual, viable solutions, then we can talk about next steps. 

Have a good rest of the day.”`, force: true, writeNoPrompt: true
  });

  slides.push({type: 'Reflect', id: 'reflect_1', text: 
  `Now we’re going to reflect a bit on your conversation with Mr. Holl. 

Type your answers into the speaker notes section below.
`  });

  slides.push({type: 'Reflect', id: 'reflect_2', text: 
  `Reflecting back on your conversation with Mr. Holl, what are your initial thoughts and feelings? Did you feel like your conversation was productive? Why or why not?`, force: true, writeNoPrompt: true
  });

  slides.push({type: 'Reflect', id: 'reflect_3', text: 
  `What did you take away about school scheduling decisions from your conversation with Mr. Holl? What student factors should come into consideration when creating a school scheduling system?`, force: true, writeNoPrompt: true
  });

  slides.push({type: 'Reflect', id: 'reflect_4', text: 
  `Recall, Mr. Holl's responses in the conversation were:
There’s no time to make big changes/big changes are hard
You can get a teaching assistant for the bigger class
Students self-elected to sign up for CS
Having a subset of kids in CS is better than having no CS class
Did any of Mr. Holl's suggestions or reasons stand out to you? Why?
`, force: true, writeNoPrompt: true
  });

  return slides;
}


export default {
  questionsFor(cohortKey) {
    return slidesFor(cohortKey);
  }
};