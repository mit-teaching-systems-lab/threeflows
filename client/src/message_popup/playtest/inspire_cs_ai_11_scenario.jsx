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
  slides.push({ type: 'Context', text:`13 students
4 traditional community college students finishing their AA in CS
3 HS students. Currently taking courses at HS and Community College to speed up their AA degree
1 person who has been working in industry for 23 years, is a returning student who is back in the classroom to finish an AA in CS in order to be in compliance for his job
1 graduate student, she has a B.S. in Biology, needs to take this course as a pre-requisite for the MS in Computational Science
1 returning mother, who has been sponsored to continue study. She is a part-time student who works two-part time jobs.
3 transfer students who took other classes at the 4-year institution, but taking the courses at community college because flexibility on their schedules. 
`});
  slides.push({ type: 'Context', text:`Student profile: Maria - Returning mother, she currently works two part time jobs. She is currently in a workforce solutions opportunity. First family generation attending to college. Mother of two kids
`});
  slides.push({ type: 'Context', text:`Student profile: Carolo - A MS student who has a background in biology as a major and is returning to community college to take course in computer science as a pre-requisite. 

She is also a first family generation attending to college
`});
  slides.push({ type: 'Context', text:`Student profile: William - Experienced programmer for the military. He works in a consultant company that hired him when he retired from military. 

He needs at least an Associates in Science in Computer Science to keep his job right now at the company.
`});

  // Anticipate
  slides.push({ type: 'Anticipate', text:`Maria feels more stressed because he has a challenging partner. She works with William and Carol and learn recursion together. What would success for the student look like here?
Enhancement of communication and people skills`, force: true, writeNoPrompt: true});
  slides.push({ type: 'Anticipate', text:`William refuses to work in team because he still believe that he won’t learn from this class. He will show some “tricks” he learned from his experience.
What might success look like for william?`, force: true, writeNoPrompt: true});
  slides.push({ type: 'Anticipate', text:`Carol sympathies with Maria and wants to help. She identifies perspectives on bioinformatics . What do you think a teacher's role is in helping students to be successful in school?
Instructor understands and shares student’s contexts 
`, force: true, writeNoPrompt: true});

  // Enact
  slides.push({ type: 'Enact', text:`[in development]`, force: true, writeNoPrompt: true});
  // Reflect 
  slides.push({ type: 'Reflect', text:`[in development]`, force: true, writeNoPrompt: true});


  return slides;
}


export default {
  questionsFor(cohortKey) {
    return slidesFor(cohortKey);
  }
};