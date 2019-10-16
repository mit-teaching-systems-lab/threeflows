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

  //Context Anticipate
  slides.push({ type: 'Context for Anticipate',id: 'anticipate_1', text:
`You are entering the “Anticipate” section of this practice space where you will read a series of vignettes from teachers’ classroom practice. Your job is to answer the following:


Based off the teacher’s actions, does the teacher frame the student’s actions through an asset or deficit mindset? 


Keep in mind that we are interested more in the impact of teachers’ actions, versus their perceived intent. `});


  // Anticipate
  slides.push({ type: 'Anticipate', id: 'anticipate_2', text:
`Scenario 1 (anticiapte)
It’s the first day of school.

The teacher hands out a blank card.

Teacher: “On the card, I want you to write down something that you’re really good at. This could be school related (like “math” or “writing”) or something outside school (like “dancing” or “videogames”). Each Friday, we’re going to have one person teach us something about their topic. I’ll go this Friday as an example.”

Based off the teacher’s actions, does the teacher frame the student’s actions through an asset or deficit mindset? `, force: true, open: true});

  slides.push({ type: 'Anticipate', id: 'anticipate_3',text:
`Scenario 2 (anticiapte)
The entire class is engaged in a discussion about a complex physics problem.

Teacher: “Okay, who would like to share next?”

Student: “Oh, ehm, ain’t it the second one? Cause the ball will move more quicker since it has that swoop thing? Similar to skateboarding?”

Teacher: “Could we have someone translate what she said into English?”

Based off the teacher’s actions, does the teacher frame the student’s actions through an asset or deficit mindset?`, force: true, open: true});

  slides.push({ type: 'Anticipate', id: 'anticipate_4', text:
`Scenario 3 (anticiapte)
It’s the first day of school.

A Latino student walks into a class where every student is Chinese.

Teacher: “Let me see your program, just to make sure you’re in this class.”

Student: “Yeah, I got this class.”

Teacher: “You know, this is a difficult class -- are you sure you can handle it? We do a lot of homework.”

Based off the teacher’s actions, does the teacher frame the student’s actions through an asset or deficit mindset? 
`, force: true, open: true});

  slides.push({ type: 'Anticipate', id: 'anticipate_5', text:
`Scenario 4 (anticiapte)
It’s the beginning of the school day in a 2nd grade classroom.

Students start off the day by first singing a song together. After the song, the teacher and students sit in a circle.

Teacher: “What are we going to be our best at today?”

Student 1: “I’m gonna be good at my math.”

Teacher: “I just know you can do that.”

Student 2: “I’m gonna be good at lining up for recess.” 

Teacher: “Yes you are!”

Student 3: “I’m gonna be good at doin’ my own work and minding my own business.”

Teacher: “Oh, you are? Well, that’s very good!”

The students continue, one-by-one, stating their goal. At the end of the day, the teacher and students reflect on their successes and ways they could have been even better at some things.

Based off the teacher’s actions, does the teacher frame the student’s actions through an asset or deficit mindset? `, force: true, open: true});

  // Context for Enact
  slides.push({ type: 'Context for Enact', id: 'anticipate_6', text:
`This completes the Anticipate phase of the practice space.

Now we will move into the Enact phase of the practice space. During the Enact phase, you will be shown a series of scenarios that are incomplete.

 It is your job to respond as the teacher in each scenario as best as you can. 

When you are ready, click “OK” to start.`});




  // Enact
  slides.push({ type: 'Enact', id: 'enact_1', text:
`Scenario 1 (enact)
It’s near the beginning of the school year.

You and the class are engaged in a whole class discussion.

A student, Liam, has been answering frequently to the questions you’ve asked the class, but he doesn’t raise his hand.

Teacher: “Okay, how does Jessica’s comment relate to the theme of courage?”

Liam: [without raising his hand] “I think it’s because she said even though she was scared, she still pushed herself to sing in front of people -- that’s courage.”

Teacher: 
`, force: true, open: true});

  slides.push({ type: 'Enact', id: 'enact_2', text:
`Scenario 2 (enact)
You are about to tutor a group of young people assigned to work with you for remedial help in math. It’s your first day on the job. 

Students come in and sit down in their seats. There are about 10 students, 7 of which are male. Six students are Black, 3 Hispanic, and 1 White. 

What is your opening statement for students in the class?

Teacher:
`, force: true, open: true});

  slides.push({ type: 'Try it!', id: 'enact_3', text:
`Scenario 3 (enact)
Today in English class students are working in groups of two on a project.

You walk by a table where two students, Aaliyah and Kimberly, are working together.

Kimberly: “Why don’t you do the drawing parts since you like art? I’ve got a good grade in this class, so I should do all the writing.”

Teacher: 
`, force: true, open: true});

  // Reflect

  slides.push({ type: 'Context for Reflect', id: 'enact_4', text:
`This concludes the Enact phase of the practice space.

Now we will enter the Reflect phase of the practice space. 

In this phase, you will read over your responses from the Enact phase and reflect on whether or not your actions convey an asset or deficit mindset. Keep in mind that asset-framing includes (but is not limited to) appreciative inquiry. 

Similar to the Anticipate phase, keep in mind we are focusing on the student impact of your actions, rather than your intentions. 

Click “OK” when you are ready to start.
`});

  return slides;
}


export default {
  questionsFor(cohortKey) {
    return slidesFor(cohortKey);
  }
};