/* @flow weak */
import React from 'react';

/*
This file defines the content for the scenario around substituting a CS class.
*/

type TextQuestionT = {
  type:string, // Used as a label
  text:string,
  ask:?bool, // Ask for open-ended user response?
  force:?bool // Force the user to respond?
};
type ReactQuestionT = {
  type:string, // Used as a label
  el:any, // React node
  ask:?bool, // Ask for open-ended user response?
  force:?bool // Force the user to respond?
};
export type QuestionT = TextQuestionT | ReactQuestionT;


export type SettingT = 'mixed' | 'meredith';
function slidesForSetting(setting:SettingT) {
  const slides:[QuestionT] = [];

  slides.push({ type: 'Overview', el:
  <div>
    <div>1. Review context</div>
    <div>Imagine yourself being given a subsitute assignment in a particular school and classroom.  You won't know all the answers, and will have to improvise and adapt to make the best of the situation.</div>
    <br />
    <div>2. Anticipate</div>
    <div>Skim the lesson plan and materials.  You shouldn't have an in-depth understanding, but do your best to anticipate what might happen.</div>
    <br />
    <div>3. Try it!</div>
    <div>When you're ready, you'll go through a set of short scenes that simulate interactions between you and some students in the class.</div>
    <br />
    <div>4. Reflect</div>
    <div>Finally, you'll reflect on your experience.</div>
    <br />
    <div>5. Discussion</div>
    <div>Tomorrow, you'll share your experience and discuss during the workshop.</div>
  </div>
  });


  // Context
  slides.push({ type: 'Context', text:
`For this scenario, you've been asked to substitute for Ms. Ada, who unexpectedly needed to take a personal day to attend to some family matters.

Ms. Ada works as a CS teacher in high school, and teaches several computer science courses.

You'll be substituting for one lesson, so you won't have all the answers and will have to improvise and make the best of the situation.
`});

  slides.push({ type: 'Context', text:
`Today, Ms. Ada's first lesson is part of a computer science principles course.  Here's the overall course sequence:

1. The Internet
2. Digital Information
3. > Algorithms and Programming <
4. Big data and privacy
5. Building apps

You're about to kick off the unit on Algorithms, and the first lesson is about The Need for Programming Languages.
`});

  slides.push({ type: 'Context', text:
`You don't need to memorize or remember the lesson plan exactly, but here's the general idea.

First, students work in pairs to create something small with Lego blocks.  Then they write instructions that a classmate could follow to recreate it.

Next, groups trade instructions and students see what happens when another group tries to use their instructions.

Finally, there's a wrap-up discussion to highlight the ambiguities in natural language, and how this experience connects to programming languages.
`});


  slides.push({ type: 'Context', text:
`There are eight students in this class section.  They're grouped in pairs:

- Greg and Jake
- Molly and DeShawn
- Terrell and Dustin
- Claire and Aaliyah

One challenge in being a substitute is that you'll start the lesson without knowing much about these students.
`});


  // Anticipate
  slides.push({ type: 'Anticipate', text:
`Before you begin, we have three questions about what you anticipate.
`});

  slides.push({ type: 'Anticipate', text:
`After skimming the lesson plan, what do you anticipate might happen during this class?
`, ask: true, force: true});

  slides.push({ type: 'Anticipate', text:
`What's are some best case and worst case scenarios for students during this lesson?
`, ask: true, force: true});

  slides.push({ type: 'Anticipate', text:
`How might equity issues come up in this lesson?
`, ask: true, force: true});


  // Try it!
  slides.push({ type: 'Try it!', text:
`When you're ready, you'll go through a set of scenes.

We'll fast forward to where students have already come in, you've launched the lesson successfully, and students are now working on the main activity.

In the simulation, you'll be witnessing moments of students working as you circulate around the room.

Improvise how you would act as a substitute teacher in those moments.  Click and speak aloud the words you'd say to those students, or say nothing and continue circulating.


Ready to start?
`});

  slides.push({ type: 'Try it!', text:
`Greg and Jake are at desks next to each other.

Jake: "Okay, so the first step is to stack our legos on top of each other."

Greg: "Yeah, let's write 'build a tower.'"
`, ask: true});

  slides.push({ type: 'Try it!', text:
`Molly and DeShawn are at a desk together.

DeShawn: "Here, let me see the blocks.  We can make them into a shape like a bridge."

Molly listens and watches.  DeShawn starts putting pieces together.
`, ask: true});

  slides.push({ type: 'Try it!', text:
`Terrell and Dustin are sitting next to each other.

Dustin: "So this is just like a programming language, we have to make our own language to describe how to put the legos together.  That includes how to describe the pieces and the ways we can combine them."

Dustin sees you walk by and turns to ask a question.  Dustin: "Does our language need to describe all possible ways to combine the legos?"
`, ask: true});


  slides.push({ type: 'Try it!', text:
`Claire and Aaliyah are sitting next to each other.

Claire: "What kind of shape should we make?"

Aaliyah: "I don't know."

Claire: "Maybe we could do a pattern?"

Aaliyah: "Sure."
`, ask: true});


  slides.push({ type: 'Try it!', text:
`Terrell and Dustin are sitting next to each other.

Dustin gets your attention.  Dustin: "Excuse me, but I know how to do this.  Can I just create my own language for this on my own?"
`, ask: true});


  slides.push({ type: 'Try it!', text:
`Claire and Aaliyah are sitting next to each other.

Claire: "So put the red piece on the desk first.  Then put the yellow piece on... wait, I'm not sure how to say this."

Aaliyah: "This is confusing."

Claire: "Yeah, I could show you but I'm not sure how to describe it."
`, ask: true});


  slides.push({ type: 'Try it!', text:
`Greg and Jake are at desks next to each other.

Jake: "Cool, we're finished.  Let's give our directions to someone else so they can build our tower."

Greg: "Yeah, let's find DeShawn to trade with him."

Jake: "Yeah I gotta ask him something too."
`, ask: true});

  slides.push({ type: 'Try it!', text:
`Molly and DeShawn are working together.

Molly: "I wrote out all the directions you were saying in my notebook."

DeShawn: "Cool, our bridge is all set.  We're the best team in here."
`, ask: true});

  slides.push({ type: 'Try it!', text:
`Dustin is writing on a paper.  Terrell is watching what he is writing.
`, ask: true});

  slides.push({ type: 'Try it!', text:
`Claire and Aaliyah are sitting next to each other.

Aaliyah: "So you're saying that we should do this, right?"

Aaliyah moves the blocks around, showing Claire.

Claire: "Yeah, but it seems weird to talk about it."

Aaliyah: "We could try say that you go through the colors like across a color wheel.  But that's not quite the right order."
`, ask: true});

  slides.push({ type: 'Try it!', text:
`Greg and Jake walk up to DeShawn and Molly.

Greg: "Ready to trade?  What did you make a bridge?"

DeShawn: "Yeah and Molly wrote the directions for how you can copy it."

Molly nods.
`, ask: true});



  // Reflect
  slides.push({ type: 'Reflect', text:
`That's the end of the simulation.  Thanks!

Let's shift to reflecting on the lesson.  We have three questions about what you experienced in this simulation.
`});

  slides.push({ type: 'Reflect', text:
`During the simulation, how did you think about your role as a teacher?
`, write: true});

  slides.push({ type: 'Reflect', text:
`How did different students experience the class differently?

- Greg and Jake
- Molly and DeShawn
- Terrell and Dustin
- Claire and Aaliyah
`, write: true});

  slides.push({ type: 'Reflect', text:
`Which students do you think felt like they most belonged, or least belonged in this computer science class?

- Greg and Jake
- Molly and DeShawn
- Terrell and Dustin
- Claire and Aaliyah
`, write: true});

  slides.push({ type: 'Reflect', text:
`Did you notice any social dynamics between students related to race, ethnicity, gender or class?

- Greg and Jake
- Molly and DeShawn
- Terrell and Dustin
- Claire and Aaliyah
`, write: true});

  slides.push({ type: 'Reflect', text:
`Finally, pick one student group to talk about during the group discussion tomorrow.

- Greg and Jake
- Molly and DeShawn
- Terrell and Dustin
- Claire and Aaliyah

Tomorrow, we'll discuss what we noticed, assumptions we made, and how that shaped our interactions with students.

Thanks!
`});

  return slides;
}


export const EcsScenario = {
  questionsFor(cohortKey) {
    return slidesForSetting('mixed');
  },
  meredithQuestionsFor(cohortKey) {
    return slidesForSetting('meredith');
  }
};
