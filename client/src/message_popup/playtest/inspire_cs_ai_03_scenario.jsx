/* @flow weak */
import React from 'react';

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

  slides.push({ type: 'Overview', el:
  <div>
    <div>1. Anticipate</div>
    <div>Before starting the simulation, you will answer a few questions in anticipation of what may happen.</div>
    <br />
    <div>2. Review context</div>
    <div>Imagine yourself situated in the context of the particular school, classroom, and subject.</div>
    <br />
    <div>3. Enact</div>
    <div>When you're ready you'll go through a set of scenarios that simulate interactions between you and a student in the class.</div>
    <br />
    <div>4. Reflect</div>
    <div>Finally, you'll reflect on your experience.</div>
    <br />
    <div>5. Discussion</div>
    <div>When you're all done here, head back to the classroom to rejoin the group.  If you're online, connect with others at <a target="_blank" rel="noopener noreferrer" href="https://twitter.com/search?q=%23TeacherPracticeSpaces">#TeacherPracticeSpaces</a>.</div>
  </div>
  });


  // Context
  slides.push({ type: 'Context', text:`You are a 4th grade teacher at an elementary school in urban school that serves diverse populations of students. You have three science class period per week. You and your students have worked on a 8-week robotics unit, and students started to work on their final project.

For the final project, students are tasked to design and create a robotic toy that they can present to their kindergarten buddies.
`});
  slides.push({ type: 'Context', text:`Before forming groups, students came up with their ideas and presented each one’s idea to the whole class. Students picked the idea that they liked and formed a group to work on the project idea of their pick.

Daniel, Shawn, Emmanuel, and Lianne decided to work on their toy fire engine project. They are all excited to be part of the group and loved the idea of creating a robotic fire engine. 
`});

  // Anticipate
  slides.push({ type: 'Anticipate', text:`What do you think the great group work looks like?`, force: true, writeNoPrompt: true});
  slides.push({ type: 'Anticipate', text:`What are the factors help you determine if a group worked well together?`, force: true, writeNoPrompt: true});
  slides.push({ type: 'Anticipate', text:`From your perspective, what is the best way to help group dynamics?`, force: true, writeNoPrompt: true});

  // Enact
  slides.push({ type: 'Enact', text:`Daniel, Shawn, Emmanuel, and Lianne were brainstorming ideas on how to build a robotic fire engine. After the discussion, Lianne started to draw her design of the fire engine, while Daniel jumped in to build a model by himself without discussing the details with the group. Daniel instructs Shawn and Emmanuel to gather the LEGO pieces he needs. While Shawn and Emmanuel continue to get LEGO pieces, Lianne keeps working on her drawing. 


Observing the group, what will you do?

Talk to the group
Talk to Daniel
Talk to Lianne
Keep observing

Select one and explain why
`, force: true, writeNoPrompt: true});
  slides.push({ type: 'Enact', text:`Lianne finished her drawing and looks at the fire engine that the other three are building. The structure does not seem sturdy and symmetrically. In addition, the wheels are used in the way that makes it difficult for the fire engine to turn.

Lianne continues to observe what other three are doing without saying anything to them.


You noticed that the group is not inclusively working together. What will you do?

Talk to the group
Talk to Daniel
Talk to Lianne
Keep observing

Select one and explain why
`, force: true, writeNoPrompt: true});
  slides.push({ type: 'Enact', text:`Emmanuel notices the drawing that Lianne made and says to the group, “Look, she has a nice design! Maybe we should build it!” Shawn looks at it and says “Oh nice!”

Daniel looks at it and been annoyed by Emmanual’s comment. He dismisses it and continue building. 


You noticed that Daniel does not seem to collaborate with the group.  What will you do?

Talk to the group
Talk to Daniel
Keep observing

Select one and explain why
`, force: true, writeNoPrompt: true});
  slides.push({ type: 'Enact', text:`Since Daniel continues building his fire engine, Emmanuel and Shawn go back to help him build.

Lianne looks at Daniel’s design, and quietly open a laptop and start programming for his robot.


You noticed that Lianne did not speak up about her design and move on to programming while the others continue building.  What will you do?

Talk to the group
Talk to Daniel
Talk to Lianne
Keep observing

Select one and explain why
`, force: true, writeNoPrompt: true});
  slides.push({ type: 'Enact', text:`When Daniel finished building his fire engine, he looks at Lianne and says “I can program. I am a master programmer. Boys are better than girls.” Lianne quietly turns the laptop to Daniel.


Daniel is not working collaboratively with the group.  What will you do?

Talk to the group
Talk to Daniel
Talk to Lianne
Keep observing

Select one and explain why
`, force: true, writeNoPrompt: true});

  // Reflect
 
  slides.push({ type: 'Reflect', text:`Looking back, when do you think was the right time to intervene?

What did you struggle with?

How would you do grouping differently?
`, force: true, writeNoPrompt: true});


  return slides;
}


export default {
  questionsFor(cohortKey) {
    return slidesFor(cohortKey);
  }
};