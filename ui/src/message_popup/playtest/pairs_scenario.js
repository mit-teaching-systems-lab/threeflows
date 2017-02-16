/* @flow weak */

/*
This file defines the content for the scenario around substituting a CS class.
*/

export type QuestionT = {
  type:string, // Used as a label
  el:string, // Contents of slide
  ask:?bool, // Ask for open-ended user response?
  force:?bool // Force the user to respond?
};

const slides:[QuestionT] = [];

slides.push({ type: 'Overview', el:
`1. Review context
Imagine yourself being given a subsitute assignment in a particular school and classroom.  You won't know all the answers, and will have to improvise and adapt to make the best of the situation.

2. Anticipate
Skim the lesson plan and materials.  You shouldn't have an in-depth understanding of the lesson, but do your best to anticipate what might happen, before trying it out and adapting to what happens.

3. Try it!
When you're ready, you'll go through a set of short scenes that simulate interactions between you and some students in the class.

4. Reflect
Finally, you'll reflect on your experience.

5. Discussion
When you're all done here, head back to the classroom to rejoin the group.
`});


// Context
slides.push({ type: 'Context', el:
`For this assignment, you've been asked to substitute for Ms. Ada, who unexpectedly needed to take a personal day to attend to some family matters.

Ms. Ada works in an urban public high school, and teaches several computer science courses.

You'll be substituting for one lesson, so you won't have all the answers and will have to improvise and make the best of the situation.
`});

slides.push({ type: 'Context', el:
`Today, Ms. Ada's first lesson is a computer science principles course based on the code.org curriculum.  Here's the overall course sequence:

1. The Internet
2. Digital Information
3. > Algorithms and Programming <
4. Big data and privacy
5. Building apps

You're about to kick off Unit 3, which is about Algorithms and Programming.
`});

slides.push({ type: 'Context', el:
`The classroom layout has students at individual desks that they can move around easily to form pairs or groups.  Each student has a laptop with internet connectivity.

Classroom materials like paper, pens, etc. are readily available.

There's a projector that can show any computer screen on the front wall of the classroom.  The teacher's desk is in the back corner of the room.
`});


slides.push({ type: 'Context', el:
`There are eight students in this class section:

- Aaliyah
- Claire
- DeShawn
- Dustin
- Greg
- Jake
- Molly
- Terrell

One challenge in being a substitute is that you'll start the lesson without knowing much about these students.
`});


// Anticipate
slides.push({ type: 'Anticipate', el:
`Before you being, we have three questions about what you anticipate.
`});

slides.push({ type: 'Anticipate', el:
`After skimming the lesson plan, what do you anticipate might happen during this class?
`, ask: true, force: true});

slides.push({ type: 'Anticipate', el:
`What's are some best case and worst case scenarios for students during this lesson?
`, ask: true, force: true});

slides.push({ type: 'Anticipate', el:
`What would success for students look like during this period?
`, ask: true, force: true});


// Try it!
slides.push({ type: 'Try it!', el:
`When you're ready, you'll go through a set of scenes.

We'll fast forward to where students have already come in, you've launched the lesson successfully, and students are now working on the main activity.

In the simulation, you'll be witnessing moments of students working as you circulate around the room.

Improvise how you would act as a substitute teacher in those moments.  Click and speak aloud the words you'd say to those students, or say nothing and continue circulating.


Ready to start?
`});

slides.push({ type: 'Try it!', el:
`Greg and Jake are at desks next to each other.

Jake: "Okay, so the first step is to stack our legos on top of each other."

Greg: "Yeah, let's write 'build a tower.'"
`, ask: true});

slides.push({ type: 'Try it!', el:
`Molly and DeShawn are at a desk together.

DeShawn: "Here, let me see the blocks.  We can make them into a shape like a bridge."

Molly listens and watches.  DeShawn starts putting pieces together.
`, ask: true});

slides.push({ type: 'Try it!', el:
`Terrell and Dustin are sitting next to each other.

Terrell: "So this is just like a programming language, we have to make our own language to describe how to put the legos together.  That includes how to describe the pieces and the ways we can combine them."

Terrell sees you walk by and turns to ask a question.  Terrell: "Does our language need to describe all possible ways to combine the legos?"
`, ask: true});


slides.push({ type: 'Try it!', el:
`Claire and Aaliyah are sitting next to each other.

Claire: "What kind of shape should we make?"

Aaliyah: "I don't know."

Claire: "Maybe we could do a pattern?"

Aaliyah: "Sure."
`, ask: true});


slides.push({ type: 'Try it!', el:
`Terrell and Dustin are sitting next to each other.

Terrell gets your attention.  Terrell: "Excuse me, but I know how to do this.  Can I just create my own language for this on my own?"
`, ask: true});


slides.push({ type: 'Try it!', el:
`Claire and Aaliyah are sitting next to each other.

Claire: "So put the red piece on the desk first.  Then put the yellow piece on... wait, I'm not sure how to say this."

Aaliyah: "This is confusing."

Claire: "Yeah, I could show you but I'm not sure how to describe it."
`, ask: true});


slides.push({ type: 'Try it!', el:
`Greg and Jake are at desks next to each other.

Jake: "Cool, we're finished.  Let's give our directions to someone else so they can build our tower."

Greg: "Yeah, let's find DeShawn to trade with him."

Jake: "Yeah I gotta ask him something too."
`, ask: true});

slides.push({ type: 'Try it!', el:
`Molly and DeShawn are working together.

Molly: "I wrote out all the directions you were saying."

DeShawn: "Cool, our bridge is all set.  We're the best team in here."
`, ask: true});

slides.push({ type: 'Try it!', el:
`Terrell is writing on a paper.  Dustin is watching what he is writing.
`, ask: true});

slides.push({ type: 'Try it!', el:
`Claire and Aaliyah are sitting next to each other.

Aaliyah: "So you're saying that we should do this, right?"

Aaliyah moves the blocks around, showing Claire.

Claire: "Yeah, but it seems weird to talk about it."

Aaliyah: "We could try say that you go through the colors like across a color wheel.  But that's not quite the right order."
`, ask: true});

slides.push({ type: 'Try it!', el:
`Greg and Jake walk up to DeShawn and Molly.

Greg: "Ready to trade?  What did you make a bridge?"

DeShawn: "Yeah and Molly wrote the directions for how you can copy it."

Molly nods.
`, ask: true});


slides.push({ type: 'Try it!', el:
`Terrell and Dustin are together.

Terrell: "Okay, we're finished.  Let's trade with Molly and DeShawn."

Dustin and Terrell walk up to Molly and DeShawn.  They notice Greg and Jake there as well.

Dustin: "Are you guys ready to trade?"
`, ask: true});



// Reflect
slides.push({ type: 'Reflect', el:
`That's the end of the simulation.  Thanks!

Let's shift to reflecting on the lesson.
`});

slides.push({ type: 'Reflect', el:
`Before heading back to the group, we have three questions about what you experienced in this simulation.

After that, you'll have a minute to think about the first group discussion question before heading back.

Also, for now please hold questions or feedback about this activity itself.  We'll ask for that at the end.
`});

slides.push({ type: 'Reflect', el:
`During the simulation, how did you think about your role as a teacher?
`, ask: true, force: true});

slides.push({ type: 'Reflect', el:
`How did different students experience the class differently?
`, ask: true, force: true});

slides.push({ type: 'Reflect', el:
`Did you notice any social dynamics between students related to race, ethnicity, gender or class?
`, ask: true, force: true});

slides.push({ type: 'Reflect', el:
`Finally, pick one student group to talk about during the group discussion.

In the group, you'll be asked to describe what you noticed, any assumptions you made, and how that shaped your interactions with students.

Feel free to take a minute or two to think about that, and then head on back!
`});



export const PairsScenario = {
  questionsFor(cohortKey) {
    return slides;
  }
};
