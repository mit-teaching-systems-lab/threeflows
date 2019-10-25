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
  slides.push({ type: 'Context', text:`You have taught at a rural school for four years.  Your students are 70% white, 20% black, and 10% Hispanic with many of the Hispanic population as English Language learners.  20% of your students have IEPs for Autism or ADHD.  Your school has a performance improvement plan, and you’ve seen adequate progress in your time in the classroom.  You feel supported by administration, but the low SES in your community and lack of resources are often a challenge. Your students have access to a classroom set of chromebooks when you request them.

You’ve been mandated by the new Computer Science standards to “Build a chatbot that interacts naturally with humans and offers logical responses in conversation.” You have been provided with curriculum and a teaching guide, but have not taught CS concepts in your classroom before, and teaching technology was not covered in your preservice training.`});
  slides.push({ type: 'Context', text:`You are now introducing the lesson to students, connecting a literature study of a novel to a computer program that allows the user to chat with one of the characters.  Students make a computer program that should respond as the character of the novel would react, as if the user of the program were chatting directly with the fictional character.

Your curriculum requires you to use the website Cognimates.me, which is Scratch with additional AI features (text to speech, speech to text, language translation, and visual recognition). 

You have introduced the lesson and students have chosen their characters.  They are working independently with a laptop per child, but you have clustered students with the same characters near each other within the room so they can highlight pertinent quotes from the text and brainstorm other phrases that their character might say.
`});
  slides.push({ type: 'Context', text:`A group of three students have chosen the same character.  Those students are as follows:

Selena - Latina female who is in the afterschool computer club, English language learner who has access to a Spanish translation of her text

Jack - white son of the Mayor, loves computers and gaming, ADHD diagnosis

Megan - white female, youngest of four children, struggling reader with no computer at home

They are all generally friendly to each other; Jack and Megan enjoy sports, Megan and Selena are neighbors, Jack and Selena do computer club together.
`});

  // Anticipate
  slides.push({ type: 'Anticipate', text:`Before you begin, imagine yourself as a guide and not an expert in this space.  You do not need to know all of the technical answers.  What tools can you use so that students can find their own answers and support one another?`, force: true, writeNoPrompt: true});
  slides.push({ type: 'Anticipate', text:`How would you support the cognitive growth mindset needed so students can iteratively design, use decomposition to break down the problem, and debug when issues arise?
`, force: true, writeNoPrompt: true});
  slides.push({ type: 'Anticipate', text:`What would a successful outcome for this lesson look like to you?`, force: true, writeNoPrompt: true});

  // Enact
  slides.push({ type: 'Enact', text:`Students are ready to code their chatbot and have been instructed to sign into their computers.  You visit this student group.

Selena: “Can I code using translation so it talks in English but I type in Spanish?”

Jack, jumping in: “Yeah, Selena and I have done a lot of Scratch in ComputerClub.  Can I make mine respond to talking out loud instead of writing everything?”

Megan sits silently.  She has some notes but her computer is not yet open.

Respond to the students in this group.
`, force: true, writeNoPrompt: true});
  slides.push({ type: 'Enact', text:`The student group has worked for five minutes, and you visit again.  

Selena “When my translator goes from Spanish to English, the words are not the same as in the books.”

Jack: “And I’m having problems with the computer code that makes it listen to my voice before it responds.”

Megan’s laptop is open and she’s on the correct website, but she doesn’t have any code.

Respond to each student so they can move forward with the assignment.
`, force: true, writeNoPrompt: true});
  slides.push({ type: 'Enact', text:`You are with another group and notice Megan laughing with Jack while Selena shouts at them to be quiet.  You come check on the group.

Selena: “My program stopped working and they are being so loud! I can’t figure it out!”  

Jack: “Sorry Selena.  But check out my game!  Megan thinks it’s fun!”

Indeed, Megan is playing with Jack’s chatbot, which works at a basic level but he has removed the technically sophisticated portions and it does not fully reflect the character.

Respond to each student.
`, force: true, writeNoPrompt: true});
  slides.push({ type: 'Enact', text:`Selena: “Can I use the forums on my Scratch account instead of Cognimates so I can chat with friends to fix my coding problem?”

Jack is not working on his program.  He is intently reading the Wonder book.

Megan: “Jack helped me with this text but how do I get the mouth to move when it talks?”

Respond to each student so that they can move forward.
`, force: true, writeNoPrompt: true});

  // Reflect
 
  slides.push({ type: 'Reflect', text:`Which student scenarios were the most difficult to navigate?

What additional supports do you need to feel confident as a “guide on the side” in your classroom?

What would you need to better prepare yourself technically for integrating computer science in your classroom?
`, force: true, writeNoPrompt: true});


  return slides;
}


export default {
  questionsFor(cohortKey) {
    return slidesFor(cohortKey);
  }
};