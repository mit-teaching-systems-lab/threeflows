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
  slides.push({ type: 'Context', text:`Imagine you’re teaching a CS course for the first time. 

Your 1 hour class begins at 9am, and you have 20 students on your roster.
`});
  slides.push({ type: 'Context', text:`After a month of teaching, you notice attendance begins to drop.

During the second month of teaching, the curriculum calls for a 3-week group project. 

[How are the students grouped?]

Your class now has less than 50% of students showing up by 9:20a each day.

During office hours, students begin to complain about classmates who come in consistently late and therefore are unable to contribute to the project.
`});

  // Anticipate
  slides.push({ type: 'Anticipate', text:`There are three similar projects ahead in the curriculum. What are some best case and worst case scenarios for group work for the rest of the course?`, force: true, writeNoPrompt: true});
  slides.push({ type: 'Anticipate', text:`How can you plan for better group engagement in the future?`, force: true, writeNoPrompt: true});

  // Enact
  slides.push({ type: 'Enact', text:`During class, students begin to complain about classmates who come in consistently late or not at all and therefore are unable to contribute to the project.

How would you respond?

1. Send an email to the entire class
2. Place calls home 
3. Check in with students individually
4. [Readjust the groups or the project]
`, force: true, writeNoPrompt: true});
  slides.push({ type: 'Enact', text:`One week into the project, attendance continues to be poor. 

One student comes to office hours to ask for help.

Alex (student): “Everyday someone is missing, and I’m not sure what to do.”

How would you respond?`, force: true, writeNoPrompt: true});
  slides.push({ type: 'Enact', text:`Alex (student): “Can I just complete the project on my own?”

How would you respond?
`, force: true, writeNoPrompt: true});
  slides.push({ type: 'Enact', text:`Towards the middle of the project, one student who has multiple unexcused absences stops by to talk to you.

Morgan: I really like this class, but I’m really lost. I’m not sure how to catch up.

How would you respond?
`, force: true, writeNoPrompt: true});
  slides.push({ type: 'Enact', text:`Another student who has multiple unexcused absences comes to office hours.

Blake: I completed everything I needed to do, but the group keeps saying I didn’t.

How would you respond?
`, force: true, writeNoPrompt: true});
  slides.push({ type: 'Enact', text:`The project is due in three days and only two-thirds of the class seems to be ready to complete the project.

How would you respond?
`, force: true, writeNoPrompt: true});
  slides.push({ type: 'Enact', text:`At the end of the three weeks, all the projects are submitted. The average score is 60%.

How would you respond?
`, force: true, writeNoPrompt: true});

  // Reflect
 
  slides.push({ type: 'Reflect', text:`What assumptions did you make about each student presented in the scenario?
`, force: true, writeNoPrompt: true});
  slides.push({ type: 'Reflect', text:`During the simulation, how did you think about your role as a project facilitator?`, force: true, writeNoPrompt: true});


  return slides;
}


export default {
  questionsFor(cohortKey) {
    return slidesFor(cohortKey);
  }
};