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
    <div>1. Review context</div>
    <div>Imagine yourself situated in the context of the particular school, classroom, and subject.</div>
    <br />
    <div>2. Anticipate</div>
    <div>Before starting the simulation, you will answer a few questions in anticipation of what may happen.</div>
    <br />
    <div>3. Try it!</div>
    <div>When you're ready you'll go through a set of scenarios that simulate interactions between you and a student in the class.</div>
    <br />
    <div>4. Reflect</div>
    <div>Finally, you'll reflect on your experience.</div>
    <br />
    <div>5. Discussion</div>
    <div>A facilitated discussion of this scenario will happen during ECS on Friday, July 28th.</div>
  </div>
  });


// Context
  slides.push({ type: 'Context', text:
`In this scenario, you are teaching AP Computer Science Principles in a suburban high school where the students are predominantly white.

Before the semester, initial enrollments for your class showed that more boys than girls had signed up for your class. Upon seeing this, you decided to make a concerted effort to recruit more girls for your class. 
`});

  slides.push({ type: 'Context', text:
`Your efforts succeeded in getting more girls to enroll, but you ended up having an imbalance of girls to boys in the class. Out of 15 total students in your class, 10 of them are girls. 
`});

  slides.push({ type: 'Context', text:
`The semester has started and the deadline for students to make changes to their class schedule is a couple days away. Before the start of class one day, you overhear Rosa tell one of her classmates that she wants to switch out of your class. You are disappointed to hear this because Rosa is a strong student, excels at math, and is one of only two Latinas in your class.
`});

  slides.push({ type: 'Context', text:
`At the end of class, you find Rosa before she leaves for her lunch break and ask her to stay after class to talk.
`});



// Anticipate
  slides.push({ type: 'Anticipate', text:
`Before you begin interacting with Rosa, we have three questions about what you anticipate may happen during your interaction with Rosa.
`});

  slides.push({ type: 'Anticipate', text:
`What are your thoughts about why Rosa wants to switch out of your class?
`, force: true, open: true});

  slides.push({ type: 'Anticipate', text:
`What do you hope to accomplish in your conversation with Rosa?
`, force: true, open: true});

  slides.push({ type: 'Anticipate', text:
`What do you anticipate will actually happen during the one-on-one?
`, force: true, open: true});


// Try it!
  slides.push({ type: 'Try it!', text:
`When you're ready, you'll go through a set of scenes that simulate the conversation between you and Rosa.

Improvise how you would act as a teacher, even if you don't have all the right answers or know the perfect thing to say.

Click and speak aloud the words you'd say to the student.


Ready to start?
`});

  slides.push({ type: 'Try it!', text:
`Rosa: “Why did you want me to stay after class?”
`, open: true, force: true});

  slides.push({ type: 'Try it!', text:
`Rosa: “Ok you got me - I want to switch into another class.”
`, open: true, force: true});

  slides.push({ type: 'Try it!', text:
`Rosa: “Well, the only reason I took this class is because you really sold me on it, but I really don’t see myself working in tech.”
`, open: true, force: true});

  slides.push({ type: 'Try it!', text:
`Rosa: “I mean, it’s nice that there are more girls than guys in this class, but that doesn’t change the fact that mostly nerdy white dudes and Asian dudes work in computer science.”
`, open: true, force: true});

  slides.push({ type: 'Try it!', text:
`Rosa: “Sure, there may be women in tech, but they’re still mostly white women.”
`, open: true, force: true});

  slides.push({ type: 'Try it!', text:
`Rosa: “Well… I kinda feel like people are always surprised that I’m good at coding. It’s like when Juanita and I did well on the first assignment, you made it feel like a big deal, but you didn’t really say anything to anyone else. Brown girls can code, too, you know.”
`, open: true, force: true});


// Reflect
  slides.push({ type: 'Reflect', text:
`That's the end of the simulation.  Thanks!

Let's shift to reflecting on what happened.
`});

  slides.push({ type: 'Reflect', text:
`What are your initial thoughts and feelings about your one-on-one with Rosa?
`, force: true, open: true});

  slides.push({ type: 'Reflect', text:
`How effective do you think you were in achieving your goals for your interaction with Rosa?
`, force: true, open: true});

  slides.push({ type: 'Reflect', text:
`Would you do anything differently if a similar situation arose with another student? Please elaborate.
`, force: true, open: true});

  return slides;
}


export default {
  questionsFor(cohortKey) {
    return slidesFor(cohortKey);
  }
};