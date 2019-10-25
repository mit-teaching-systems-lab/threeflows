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
  slides.push({ type: 'Context', text:`Ms. Riley is a 5th grade teacher and she is teaching her students how to use Scratch. She plans to use Scratch throughout the year to support students’ understanding of computer science concepts while also doing ELA activities (character development, story arc, etc.)

Ms. Riley has 22 students in her class. Ms. Riley is a White teacher, and her students are also primarily White. There are three students of color in the class, two Latinas and one Black male. One of the Latinas, Ivelisse, lives with her grandparents who adopted her, after her parents were unable to care for her due to addiction issues. 

The grandparents attend the parent-teacher conference at the beginning of the year, and they let Ms. Riley know Ivelisse has been adopted and that she has trouble sleeping. They have also told her that a therapist Ivelisse is seeing has told them that Ivelisse is suffering from PTSD.

`});
  slides.push({ type: 'Context', text:`Ivelisse’s class work is average and she is always on time and in class. She is generally pleasant whenever she speaks with Ms. Riley, but she is usually very quiet. Also, Ivelisse sometimes seems very disengaged from what is going on in the classroom. But, she has shown a lot of interest in Scratch.

Today Ms. Riley is introducing loops to students in the class. She begins her demonstration at the front of the class and she notices that Ivelisse has put her head down on her desk and closed her eyes, as if she is going to sleep.

Ms. Riley clicks on the control link in Scratch to bring up the control blocks. She asks the students to think about what each of the blocks do and then asks for some ideas from the students. Different students raise their hands, Ms. Riley calls on a student, Raymond, seated next to Ivelisse. 

Raymond guesses that a repeat block will make something happen over and over. Though Raymond is sitting right next to Ivelisse, she does not raise her head.
`});

  // Anticipate
  slides.push({ type: 'Anticipate', text:`What matters most in the classroom, content learning? Or a child’s emotional well-being?

What should the teacher do to help students engage and participate in class activities when outside emotional issues (such as trauma) distract the student?

What sorts of classroom learning activities might work best for students suffering trauma?

What are some best case and worst case scenarios for the student regarding learning in this class?

What would success look like for this student?
`, force: true, writeNoPrompt: true});

  // Enact
  slides.push({ type: 'Enact', text:`You are going to play the role of Ms. Riley in this scenario, read the dialogue below and answer the following question. 

Ms. Riley nudges Ivelisse on the shoulder as she asks for another show of hands. Ivelisse raises her head.

Ms. Riley: Ivelisse, what do you think the wait for block will do?

Ivelisse: Hmmm?

Ms. Riley: Ivelisse, the wait for block on the screen, what will it do?

Ivelisse: Ms. can I go to the bathroom? I have to use the bathroom.

Ms. Riley: Yes, but can you take a guess about the block, first? What will it do?

Ivelisse: I don’t know, Ms.

What should you do in this situation? Is there another way to have handled this situation? If so, what would that be?
`, force: true, writeNoPrompt: true});
  slides.push({ type: 'Enact', text:`Ivelisse leaves the room, goes to the bathroom and then returns to class. Once she is back in class, she puts her head back down on the table. 

Ms. Riley: Ivelisse, sit up, please.

Ivelisse: I’m tired, Ms.

Ms. Riley: I know, Ivelisse, but you need to pay attention in class. Please sit up.

What else could you say to Ivelisse in this situation? What else could you do?
`, force: true, writeNoPrompt: true});
  slides.push({ type: 'Enact', text:`Ms. Riley: Okay, everyone get your computers, we will now make a program that uses the blocks.

Ivelisse: Ms. can I go to the bathroom?

Ms. Riley: Ivelisse, you just got back from the bathroom, please get your computer.

Ivelisse: But, Ms. I really have to go.

Ms. Riley: Ivelisse you just went. You need to pay attention and do your work.

Ivelisse retrieves her computer, goes to her desk and begins to cry quietly.

What should you do in this situation?
`, force: true, writeNoPrompt: true});

  // Reflect
 
  slides.push({ type: 'Reflect', text:`How/should teachers respond to the deep needs of particular students?

What role should the teacher play when a child with trauma disengages from class?

What sort of supports would the teacher need to work well with this student?

Is there a pedagogical strategy that would support the student’s engagement in the activity?
`, force: true, writeNoPrompt: true});


  return slides;
}


export default {
  questionsFor(cohortKey) {
    return slidesFor(cohortKey);
  }
};