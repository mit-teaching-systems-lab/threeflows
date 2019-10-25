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
  slides.push({ type: 'Context', text:`You are teaching an “Introduction to Computer Science” course in your high school classroom.

You and your students have just started a new unit on variables.  On the first day you do an unplugged activity with the whole class and today, the second day of the unit, you will have student  work on a set of problems using pair programming.

To do pair programming, students are using one computer between the two of them and they switch off as “driver” and “navigator” every three minutes.  You have set a timer for 3 minutes so the class will all switch at the same time.
`});
  slides.push({ type: 'Context', text:`You have intentionally grouped students in homogenous groups - typically, students who struggle are paired together, students who appear to have some background in computer science are also paired together, and you tried to keep the genders the same between the pairs. 

You have described good driver and navigator behavior to students and ask them to start working.

You are monitoring students working together in class.
`});

  // Anticipate
  slides.push({ type: 'Anticipate', text:`What does good pair programming look like in your classroom?  What does it sound like?`, force: true, writeNoPrompt: true});
  slides.push({ type: 'Anticipate', text:`“Students should be able to pair program with any other student in the classroom” - do you agree or disagree with this statement?  Why?`, force: true, writeNoPrompt: true});
  slides.push({ type: 'Anticipate', text:`Should students always be pair programming?  When, if ever do you want them to work independently?`, force: true, writeNoPrompt: true});
  slides.push({ type: 'Anticipate', text:`Is it ever a good thing if students are frustrated or confused in class?  When is it good?  When is it bad?`, force: true, writeNoPrompt: true});

  // Enact
  slides.push({ type: 'Enact', text:`Frankie is navigator.  Darius is driver.

Frankie:  Let’s read the directions together.  (Both read the directions silently)

Frankie:  It looks like we need to increment by 2 instead of 1 to be able to display all the odd values.  We also need to initiate the value of i to 1 to start in the for loop.

Darius (driver): Ok, so what needs to be changed?

Frankie: Change that 0 to a 1.  (points at the screen, Darius makes the change and deletes a semi colon accidently)

Frankie:  But you need the semicolon.

Darius: (looking for the semi colon key)

Frankie: (reaches over and adds the semi colon in the right space)
`, force: true, writeNoPrompt: true});
  slides.push({ type: 'Enact', text:`(The timer goes off and you remind students to shift driver and navigator roles)

Frankie: Let me finish this part and then it can be your turn.

Darius waits for Frankie to finish.

Frankie:  There is one bug I want to fix first and then it is your turn.
`, force: true, writeNoPrompt: true});
  slides.push({ type: 'Enact', text:`(A while later you circle past Darius and Frankie again)

Darius  is navigator.  Frankie is driver.

Frankie (talking to the pair across the table from him): Are you on problem 4?  How did you get it to work?

A person from across the table comes around to look at the code.
`, force: true, writeNoPrompt: true});
  slides.push({ type: 'Enact', text:`Kylie is navigator.  Alexis is driver.

Alexis: Do you think we need two loops to be able to do this?

Kylie:  No, I think we can do it in one.

Alexis:  How will we get both things to change though?

Kylie: Good point… maybe we need two loops.  Or maybe we can do it with another variable.
`, force: true, writeNoPrompt: true});
  slides.push({ type: 'Enact', text:`A while later you circle past Kylie and Alexis later:  It is tough to know who is the driver or navigator.

Kylie: Let’s try a for loop between lines 4 and 6.

Alexis: (adds the loop).  Yeah, I am thinking we can call the function we wrote before inside the for loop.  (types some more and get’s an error). Huh… do you know where I went wrong?

Kylie: (takes a look) Oh!  You missed a curly bracket.  (Kylie adds the bracket and runs the code).  It looks like that fixed it.

Alexis: Yeah, it runs now, but it still isn’t doing what we want it to.  Look, that last line of output isn’t correct.  

Kylie: Hmm…

Both students lean into the computer to re-examine the code.
`, force: true, writeNoPrompt: true});
  slides.push({ type: 'Enact', text:`Peter is navigator.  Ellie is driver.

Peter is on his phone.  Ellie has the computer in front of her and is typing.

Peter sees you looking at him and says, “I know how to do this, Ellie knows how to do it too but she is driver so she is just typing it out.”
`, force: true, writeNoPrompt: true});
  slides.push({ type: 'Enact', text:`(Later in the class, you circle past Ellie and Peter)

Ellie is navigator.  Peter is driver.

Ellie: “I think we need to write a function with one parameter so we can use that in the for loop”

Peter: Yeah, I just want to try this first. (Peter types something)

Peter: Huh, that didn’t work… I wonder why, I think need to fix this part….

Ellie: If we use a function with a parameter we can use that parameter as our starting value in the loop.

Peter: Yeah, I think you can also do it… wait… let me try one more thing first...
`, force: true, writeNoPrompt: true});
  slides.push({ type: 'Enact', text:`At the end of class, Peter comes up to you after everyone else has left:  “I really work better when I can work by myself.  It is hard for me to think when my partner is talking to me.  Can I work by myself next time?”`, force: true, writeNoPrompt: true});

  // Reflect
 
  slides.push({ type: 'Reflect', text:``, force: true, writeNoPrompt: true});
  slides.push({ type: 'Reflect', text:``, force: true, writeNoPrompt: true});
  slides.push({ type: 'Reflect', text:``, force: true, writeNoPrompt: true});


  return slides;
}


export default {
  questionsFor(cohortKey) {
    return slidesFor(cohortKey);
  }
};