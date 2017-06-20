/* @flow weak */
import React from 'react';

/*
This file defines the content for the counseling scenario around talking to Jayden.
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
    <div>1. Review context</div>
    <div>Imagine yourself in the particular school and classroom.  You won't know all the answers, and will have to improvise and adapt to make the best of the situation.</div>
    <br />
    <div>2. Anticipate</div>
    <div>Before starting the simulation, answer a few questions about what might happen.  You shouldn't have an in-depth understanding, but do your best to anticipate what might happen.</div>
    <br />
    <div>3. Try it!</div>
    <div>When you're ready, you'll go through a set of short scenes that simulate interactions between you and a student.</div>
    <br />
    <div>4. Reflect</div>
    <div>Finally, you'll reflect on your experience.</div>
    <br />
    <div>5. Discussion</div>
    <div>When you're all done here, head back to the classroom to rejoin the group.  If you're online, connect with others at <a target="_blank" href="https://twitter.com/search?q=%23https://twitter.com/search?q=%23TeacherPracticeSpaces">#TeacherPracticeSpaces</a>.</div>
  </div>
  });


// Context
  slides.push({ type: 'Context', text:
`In this scenario, you are teaching AP Computer Science Principles to a class of mostly 11th and 12th graders.
`});

  slides.push({ type: 'Context', text:
`You’re currently at the end of the first month of the year.

You’ve noticed one of your students, Jayden, is not participating in class discussion as much as did at the beginning of the semester and has taken on passive roles during in-class activities.
`});

  slides.push({ type: 'Context', text:
`In response to Jayden's recent behavior and academic performance, you've decided to engage Jayden in a one-on-one discussion outside of class to learn more about what's going on.
`});


// Anticipate
  slides.push({ type: 'Anticipate', text:
`Before you begin, we have three questions about what you anticipate.
`});

  slides.push({ type: 'Anticipate', text:
`What are your initial thoughts about what may be going on with Jayden? What’s informing these thoughts?
`, force: true, open: true});

  slides.push({ type: 'Anticipate', text:
`What are your goals for your one-on-one with Jayden?
`, force: true, open: true});

  slides.push({ type: 'Anticipate', text:
`What do you anticipate will actually happen during the one-on-one?
`, force: true, open: true});


// Try it!
  slides.push({ type: 'Try it!', text:
`When you're ready, you'll go through a set of scenes that simulate the conversation between you and Jayden.

Improvise how you would act as a teacher, even if you don't have all the right answers or know the perfect thing to say.

Click and speak aloud the words you'd say to the student.


Ready to start?
`});

  slides.push({ type: 'Try it!', text:
`Jayden: Why are we meeting? Am I in trouble?"
`, open: true, force: true});

  slides.push({ type: 'Try it!', text:
`Jayden: "I only took this class because nothing else worked in my schedule, which is why I didn’t switch into another class at the beginning of the semester."
`, open: true, force: true});

  slides.push({ type: 'Try it!', text:
`Jayden: "I want to go to college and be a Music Studies major. I don’t see how that’s related to computer science."
`, open: true, force: true});

  slides.push({ type: 'Try it!', text:
`Jayden: "I really want to be a singer. What does computer science have to do with singing?"
`, open: true, force: true});

  slides.push({ type: 'Try it!', text:
`Jayden: "I don’t really see people like me working with computers anyways."
`, open: true, force: true});



// Reflect
  slides.push({ type: 'Reflect', text:
`That's the end of the simulation.  Thanks!

Before heading back to the group, let's shift to reflecting on what happened.
`});

  slides.push({ type: 'Reflect', text:
`What are your initial thoughts and feelings about your one-on-one with Jayden?
`, force: true, open: true});

  slides.push({ type: 'Reflect', text:
`How effective do you think you were in responding to Jayden's statements?
`, force: true, open: true});

  slides.push({ type: 'Reflect', text:
`How would you support Jayden following this conversation?
`, force: true, open: true});

  slides.push({ type: 'Reflect', text:
`Would you do anything differently if a similar situation arose with another student?  Please elaborate.
`, force: true, open: true});

  slides.push({ type: 'Reflect', el:
    <div>
      <div>Finally, pick one moment to talk about during the group discussion.</div>
      <br />
      <div>Feel free to take a minute or two to think about that, and then head on back!  If you're working online you can connect with other folks at <a target="_blank" href="https://twitter.com/search?q=%23https://twitter.com/search?q=%23TeacherPracticeSpaces">#TeacherPracticeSpaces</a>.</div>
    </div>
  });

  return slides;
}


export default {
  questionsFor(cohortKey) {
    return slidesFor(cohortKey);
  }
};