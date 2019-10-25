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
  slides.push({ type: 'Context', text:`You teach middle school technology classes in a small, rural district. 

Your school recently adopted a vision for computer science affirming that all students should learn CS.

As part of implementing that vision, the school decided to add CS to the middle school tech course because all students are required to take it in 8th grade. This will help the district achieve their CSforAll vision by reaching all 8th graders.
`});
  slides.push({ type: 'Context', text:`Students in the course work on projects with a partner. You have several pairs of students that include one student with a disability.

You’ve noticed that students who have an IEP (individualized education program) are pulled out of your class more often than other classes. 

You decide to discuss the situation with the IEP Team coordinator, Ms. Donahue, to try to reduce the impact on students in the course.
`});

  // Anticipate
  slides.push({ type: 'Anticipate', text:`From your perspective, do you think it’s really important for all students to learn computer science?`, force: true, writeNoPrompt: true});
  slides.push({ type: 'Anticipate', text:`Do you believe it is the role of a teacher to advocate for students with other teachers, specialists, the administration, etc. at the school?`, force: true, writeNoPrompt: true});
  slides.push({ type: 'Anticipate', text:`What benefits are there for students to work in groups that have students with and without disabilities? [What are some of the drawbacks?]`, force: true, writeNoPrompt: true});
  slides.push({ type: 'Anticipate', text:`Before meeting with Ms. Donahue, the IEP Coordinator, what talking points would you prepare?`, force: true, writeNoPrompt: true});

  // Enact
  slides.push({ type: 'Enact', text:`Your students were working on a project yesterday with partners. 

Eddie and Mikayla are partners on the project. Eddie has a speech impediment and has speech therapy regularly. Eddie was not in class yesterday so Mikayla worked on the project alone. 

Today in class, Mikayla walked Eddie through the work she completed yesterday. You observed that Eddie was listening, asking questions, and provided some good feedback to improve the project. However, they were not able to complete the next step in the project and will need to figure out when to do that.

As Eddie left class, he told you how much he hates missing the class. “This is my favorite class! I love programming!!”
`, force: true, writeNoPrompt: true});
  slides.push({ type: 'Enact', text:`You are meeting Ms. Donahue during your planning period.

Ms. Donahue starts the conversation off as you walk into her office. “Hello, you wanted to talk about the pull-out schedule for students on IEPs? You said they were missing the tech course too often? We just don’t have a lot of flexibility with the schedule. Its very difficult to coordinate. We can’t pull students out during subjects that they are tested in and the specialists are only this school one day a week.”

How would you respond?
`, force: true, writeNoPrompt: true});
  slides.push({ type: 'Enact', text:`Ms. Donahue continues by saying “But, students on IEPs don’t need to know CS. They won’t be able to take CS courses in high school because their grades are too low. So it doesn’t matter if they learn CS in middle school.”

How would you respond?
`, force: true, writeNoPrompt: true});
  slides.push({ type: 'Enact', text:`Ms. Donahue: “I know the school has a CSforAll vision, but do you really think these students can learn computer science? They are struggling with reading and writing, let alone coding.”

How would you respond?
`, force: true, writeNoPrompt: true});
  slides.push({ type: 'Enact', text:`Ms. Donahue: “It’s actually nicer of us to pull students with disabilities out because they just get frustrated.”

How would you respond?
`, force: true, writeNoPrompt: true});
  slides.push({ type: 'Enact', text:`Ms. Donahue: “We are only pulling a few students out during each of your classes. This is only impacting a few students and not all of your students.”

How would you respond?
`, force: true, writeNoPrompt: true});
  slides.push({ type: 'Enact', text:`Ms. Donahue: “If we don’t pull them out of the tech course, when should we pull them out? They need the social time at lunch and physical activity during PE class.”

What strategies would you suggest and why?
`, force: true, writeNoPrompt: true});

  // Reflect
 
  slides.push({ type: 'Reflect', text:`During the scenario, how did you think about your role as a teacher?`, force: true, writeNoPrompt: true});
  slides.push({ type: 'Reflect', text:`Some students with learning or physical disabilities are viewed as not being able to reach the same learning goals as other students. What is your opinion on this statement?`, force: true, writeNoPrompt: true});
  slides.push({ type: 'Reflect', text:`What strategies could you use to minimize issues that result from pull-out time with specialists?`, force: true, writeNoPrompt: true});
  slides.push({ type: 'Reflect', text:`Reviewing the conversation, what would you do differently next time?`, force: true, writeNoPrompt: true});


  return slides;
}


export default {
  questionsFor(cohortKey) {
    return slidesFor(cohortKey);
  }
};