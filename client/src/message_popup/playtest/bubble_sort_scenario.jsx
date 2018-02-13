/* @flow weak */
import React from 'react';

/*
This file defines the content for the scenario around bubble sort.
*/

export type QuestionT = {
  type:string, // Used as a label
  text:string,
  open:?bool, // Ask for open-ended user response
  choices:?bool // Forced-choice response
};

function choicesFor(cohortKey) {
  return [
    'Encourage the behavior',
    'Ignore the behavior',
    'Make a facial expression or gesture',
    'Make a joke about it',
    'Stop teaching and wait',
    'Redirect student to their task',
    'Remind student of the class rules',
    'Ask the student to meet after class',
    'Send the student to the principal',
    'Call an administrator to the class'
  ];
}

function slidesFor(cohortKey) {
  const slides:[QuestionT] = [];
  const choices = choicesFor(cohortKey);

  slides.push({ type: 'Overview', el:
  <div>
    <div>1. Review context</div>
    <div>Imagine yourself in the particular school and classroom.  You won't know all the answers, and will have to improvise and adapt to make the best of the situation.</div>
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
    <div>When you're all done here, head back to the classroom to rejoin the group.  If you're online, connect with others at <a target="_blank" rel="noopener noreferrer" href="https://twitter.com/search?q=%23https://twitter.com/search?q=%23TeacherPracticeSpaces">#TeacherPracticeSpaces</a>.</div>
  </div>
  });


  // Context
  slides.push({ type: 'Context', text:
`You're teaching a high school course on Computer Science Principles.  It focuses on topics like:

- The Internet
- Digital Information
- Algorithms and Programming
- Big data and privacy
- Building apps

You're working on algorithms with students right now.
`});

  slides.push({ type: 'Context', text:
`In the lesson today, students are learning about sorting algorithms.

First, you'll start by giving a description of a sorting algorithm to the whole class and show it on the board.

Then, students break up into groups and act out that sorting algorithm physically.

Next, they come back as a whole class and discuss the efficiency of the algorithm.

Finally, they'll write a paragraph describing how the algorithm works.
`});

  slides.push({ type: 'Context', text:
`The first sorting algorithm you'll show them is bubble sort.

As background, bubble sort is an algorithm for sorting items in a list. It's simple to understand and easy to learn and program, but isn't the most efficient or best known solution for sorting. It isn't ever used by programmers with more expert knowledge.

It's okay if you don't remember this exactly.
`});

  slides.push({ type: 'Context', text:
`Your class has 26 students.

Darryl is one of the students in your class. He comes to the class everyday, but is at the risk of failing.
`});

  slides.push({ type: 'Context', text:
`Here is the school's classroom management and discipline policy:

"Our district believes in the use of graduated discipline to ensure severe punishments, such as exclusion from the learning environment, are reserved for credible threats to the safety of others. The goal of all discipline responses is to ensure students understand the school's behavior expectations, repair the harm caused by their choice of behavior, and identify how to prevent the problem in the future. When repeated or serious behavior incidents occur, each school's multidisciplinary team will conduct a functional behavior assessment for students to identify needs for academic and behavior support."
`});


  // Anticipate
  slides.push({ type: 'Anticipate', text:
`Before you begin, we have three questions about what you anticipate.
`});

  slides.push({ type: 'Anticipate', text:
`After skimming the lesson plan, what do you anticipate might happen during this class?
`, force: true, open: true});

  slides.push({ type: 'Anticipate', text:
`What would success for students look like during this period?
`, force: true, open: true});


  // Try it!
  slides.push({ type: 'Try it!', text:
`When you're ready, you'll go through a set of scenes.

We'll fast forward to where you're about to describe bubble sort at the board.

Improvise how you would act as a teacher, even if you don't have all the right answers or know the perfect thing to say.

Click and speak aloud the words you'd say to students, or say nothing and continue circulating.


Ready to start?
`});

  slides.push({ type: 'Try it!', text:
`Darryl makes bubble popping sounds while you are writing on the board.  The class begins to laugh.
`, open: true});

  slides.push({ type: 'Try it!', text:
`Which best describes your response?
`, choices});

  slides.push({ type: 'Try it!', text:
`What's a common teacher response to this situation that would be a bad choice?
`, open: true, force: true});

  slides.push({ type: 'Try it!', text:
`As you are explaining, Darryl shouts from his seat.

Darryl: "Bubble sort is a terrible algorithm, no one ever uses it!"
`, open: true});

  slides.push({ type: 'Try it!', text:
`Which best describes your response?
`, choices});

  slides.push({ type: 'Try it!', text:
`What's a common teacher response to this situation that would be a bad choice?
`, open: true, force: true});

  slides.push({ type: 'Try it!', text:
`Darryl walks up to another student's seat and starts talking about a videogame.

Darryl: "Did you checkout the new version of Overwatch? We should play it at my place after school."  
`, open: true});

  slides.push({ type: 'Try it!', text:
`Which best describes your response?
`, choices});

  slides.push({ type: 'Try it!', text:
`What's a common teacher response to this situation that would be a bad choice?
`, open: true, force: true});


  // Reflect
  slides.push({ type: 'Reflect', text:
`That's the end of the simulation.  Thanks!

Let's shift to reflecting on the lesson.
`});

  slides.push({ type: 'Reflect', text:
`Before heading back to the group, we have two questions about what you experienced in this simulation.

Also, for now please hold questions or feedback about this activity itself.  We'll ask for that at the end.
`});

  slides.push({ type: 'Reflect', text:
`During the simulation, how did you think about your role as a teacher?
`, force: true, open: true});

  slides.push({ type: 'Reflect', text:
`How well did the scenario line up with your actual experience?
`, force: true, open: true});

  slides.push({ type: 'Reflect', el:
    <div>
      <div>Finally, pick one moment to talk about during the group discussion.</div>
      <br />
      <div>Feel free to take a minute or two to think about that, and then head on back!  If you're working online you can connect with other folks at <a target="_blank" rel="noopener noreferrer" href="https://twitter.com/search?q=%23https://twitter.com/search?q=%23TeacherPracticeSpaces">#TeacherPracticeSpaces</a>.</div>
    </div>
  });

  return slides;
}


export const BubbleSortScenario = {
  questionsFor(cohortKey) {
    return slidesFor(cohortKey);
  }
};