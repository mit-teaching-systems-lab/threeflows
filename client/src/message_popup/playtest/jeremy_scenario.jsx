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
    <div>3. Try it!</div>
    <div>When you're ready you'll go through a set of scenarios that simulate interactions between you and a student in the class.</div>
    <br />
    <div>4. Reflect</div>
    <div>Finally, you'll reflect on your experience.</div>
    <br />
    <div>5. Discussion</div>
    <div>When you're all done here, head back to the classroom to rejoin the group.  If you're online, connect with others at <a target="_blank" rel="noopener noreferrer" href="https://twitter.com/search?q=%23TeacherPracticeSpaces">#TeacherPracticeSpaces</a>.</div>
  </div>
  });

  // Anticipate
  slides.push({ type: 'Anticipate', text:
`What do you think are some factors that determine and influence whether or not a student is successful in school?`, force: true, writeNoPrompt: true});

  slides.push({ type: 'Anticipate', text:
`From your perspective, what does it mean for a student to be successful in school?`, force: true, writeNoPrompt: true});

  slides.push({ type: 'Anticipate', text:
`What do you think a teacher's role is in helping students to be successful in school?`, force: true, writeNoPrompt: true});

  // Context
  slides.push({ type: 'Context', text:
`In this practice space, you will play the role of a 7th grade English and Language Arts (ELA) teacher.

You teach multiple sections of ELA, but we will only focus on one student from your Period 4 class in this practice space.`});

  slides.push({ type: 'Context', text:
`Your schedule looks like the following:

  Period 1    ELA
  Period 2    ELA
  Period 3    Conference
  LUNCH TIME
  Period 4    ELA
  Period 5    Conference
  Period 6    ELA

Your period 4 class has 24 students and occurs right after lunch.
`});

  slides.push({ type: 'Context', text:
`The student you will focus on in this practice space is Jeremiah Green (but he usually goes by Jeremy).

From what you’ve seen in class so far, Jeremy is a very cheerful student who is well-liked by his peers. He is often checking in on his classmates with “How’s your day goin’?” and can connect with anyone in the room.
`});

  slides.push({ type: 'Context', text:
`It’s about a month into the school year, and your class has started reading Freak the Mighty by Rodman Philbrik. As a result, it’s time to start teaching grammar skills through the use of mentor sentences.

In short, mentor sentences are sentences which have interesting grammatical features that you want students to learn. Throughout the week, students analyze various aspects of the mentor sentence for about 15 minutes and then are quizzed at the end of the week about what they learned.
`});

  slides.push({ type: 'Context', text:
`To teach using mentor sentences, you follow this outline: (from The Hungry Teacher)

Monday Musings: Students write down what they notice about the mentor sentence.

Teacher Tuesday: The teacher explicitly teaches the grammar focus, and students and teachers label the entire sentence.

Work It Wednesday: Students do some practice work with the grammar skill. Students try to make the sentence better by changing something. 

Thinking Thursday: Students think of their own sentence that uses the grammar skills.

Final Friday: Students are assessed on components of the mentor sentence.`});

  slides.push({ type: 'Context', text:
`In this practice space, you will be looking at Jeremy’s work after each class day and then deciding how and if to change your instruction for the next class day. You will also be given a short description of what Jeremy does during each class day.

When you are ready to begin, click “OK” to start.
`});




  // Enact
  slides.push({ type: 'Enact', text:
`Monday Musings.
At the beginning of class, you explain to students the idea of ‘mentor sentences’ and explain the general idea for each day of the week.

The first mentor sentence is written up on the board as well as a list of features students can notice (ex: parts of speech, punctuation, capitalization, etc.)`});

  slides.push({ type: 'Enact', text:
`Monday Musings.
Teacher: “Okay, let’s dive in! Our first mentor sentence is from Freak the Mighty. It says ‘I never had a brain until Freak came along and let me borrow his for a while, and that's the truth, the whole truth.’

So, in your journal I want you to answer our first question of the week: What do you notice about this week's mentor sentence? Push yourself to write at least three observations, and remember: we have our list of “things to notice” up on the board for you to use. Now, go ahead and silently write in your journal for 4 minutes.”`});

  slides.push({ type: 'Enact', text:
`Monday Musings.
The majority of students are silently writing in their journal.

Jeremy writes for a few seconds, places his pencil down, and looks around the room.

After a few moments, Jeremy scribbles something else into his journal.

Jeremy then turns to his shoulder partner and whispers something. The student giggles quietly and keeps writing. Jeremy scribbles something else on his paper until the end of the four minutes.

You have several students share what they wrote, and then move on to the next part of your lesson.
`});

  slides.push({ type: 'Enact', text:
`Monday Musings.
At the end of the school day, you check the students’ journals. 21 students wrote at least 3 items. 

The most popular observations were:
Complex sentence
Repetition
Could be a run-on sentence
Hyperbole

The remaining 3 students (including Jeremy) wrote either 1 or 2 items. 
`});

  slides.push({ type: 'Enact', el:
    <div>
      <div>Monday Musings. </div>
      <div>
        <div>A snapshot of Jeremy’s journal is shown below:</div>
        <div><a href="https://s3-us-west-2.amazonaws.com/tsl-public/threeflows/jeremy-scenario/PS1-Draft.png" target="_blank" rel="noopener noreferrer">Open in a new window</a></div>
      </div>
      <div>
        <img src="https://s3-us-west-2.amazonaws.com/tsl-public/threeflows/jeremy-scenario/PS1-Draft.png" alt="student workd" style={{display: 'block', width: '90%', margin: 20}} /> 
      </div> 
      <div>How do you want to respond to student work?</div>
      <div> </div>      
      <div> - Review the lesson in a small group</div>
      <div> - Review the lesson with the whole class </div>
      <div> - Continue with original lesson plan (don’t respond) </div>
      <div> - Check in with Jeremy privately </div>
      <div> </div>
      <div>Please type your choice below and explain.</div>
    </div>, force: true, writeNoPrompt: true});

  slides.push({ type: 'Enact', text:
`Teacher Tuesday.
Today you will teach students explicitly about (1) using commas for phrases and (2) hyperboles.

Teacher: “Okay, so today we’re going to learn about how to use commas for phrases and what a hyperbole is. Before we do that, though, we’re first going to label all parts of our mentor sentence.”`});

  slides.push({ type: 'Enact', el:
    <div>
      <div>Teacher Tuesday.</div>
      <div>You ask students to help you figure out what each part of the sentence is. After about 5 minutes, you and the class have come up with the following:</div>
      <div>
        <a href="https://s3-us-west-2.amazonaws.com/tsl-public/threeflows/jeremy-scenario/PS1-Draft-2.png" target="_blank" rel="noopener noreferrer">Open in a new window</a>
        <img src="https://s3-us-west-2.amazonaws.com/tsl-public/threeflows/jeremy-scenario/PS1-Draft-2.png" alt="student workd" style={{display: 'block', width: '90%', margin: 20}} /> 
      </div> 
      <div>During the activity, Jeremy is writing in his journal. Jeremy does not raise his hand or talk during this time. </div>
    </div> });

  slides.push({ type: 'Enact', text:
`Teacher Tuesday.
You then explain to students what clauses and hyperboles are and ask students to write the following in their notebook:

Commas: Can use these to separate clauses (like a brief pause)
Hyperbole: Exaggeration that can’t possibly be true

Jeremy writes for a few moments, and then whispers something to his shoulder partner. His shoulder partner whispers something back. Jeremy smiles and starts writing in his journal again.

`});

  slides.push({ type: 'Enact', text:
`Teacher Tuesday.
It’s the end of the school day, and you sit down to review student journals.

15 students have written down exactly what you had on the board with maybe one or two small errors.

9 students (including Jeremy) have a few omissions or incorrect work.
`});

  slides.push({ type: 'Enact', el:
    <div>
      <div>Teacher Tuesday.</div>
      <div></div>
      <div>A snapshot of Jeremy’s journal is shown below:</div>
      <div></div>
      <div>
        <a href="https://s3-us-west-2.amazonaws.com/tsl-public/threeflows/jeremy-scenario/PS1-Draft-3.png" target="_blank" rel="noopener noreferrer">Open in a new window</a>
        <img src="https://s3-us-west-2.amazonaws.com/tsl-public/threeflows/jeremy-scenario/PS1-Draft-3.png" alt="student workd" style={{display: 'block', width: '90%', margin: 20}} /> 
      </div> 
      <div>How do you want to respond to student work?</div>
      <div> </div>      
      <div> - Review the lesson in a small group</div>
      <div> - Review the lesson with the whole class </div>
      <div> - Continue with original lesson plan (don’t respond) </div>
      <div> - Check in with Jeremy privately </div>
      <div> </div>
      <div>Please type your choice below and explain.</div>
    </div>
    , force: true, writeNoPrompt: true});

  slides.push({ type: 'Enact', text:
`Work It Wednesday.
Today you will instruct students to make a slight improvement to the mentor sentence.

Teacher: “Today is Work It Wednesday! We’re going to look at our mentor sentence and try to improve it in some way, be it by changing the parts of speech, punctuation, figurative language, the hyperbole, or something else. You’re job is to make our mentor sentence better, either by a little bit or something more dramatic. At the end of our Work It Wednesday, we’ll have a few classmates share what they came up with.”

`});

  slides.push({ type: 'Enact', text:
`Work It Wednesday.
Students are talking in pairs about what to change for the mentor sentence. As students have their “lightbulb moment”, they turn to their journals to write.

Jeremy turns to his partner and asks “How’s your day goin’?” Jeremy and his partner talk about their day for a few minutes. 
`});

  slides.push({ type: 'Enact', text:
`Work It Wednesday.
When students have 2 minutes left, you give them a time warning.

Jeremy and his shoulder partner start writing during the 2 minute mark. 

At the end of the time, you have 5 students share out their improvements. While one student was sharing, Jeremy was writing in his journal. Otherwise, Jeremy was looking at the speaker for each share out. 
`});

  slides.push({ type: 'Enact', text:
`Work It Wednesday.
It’s the end of the school day, and you are reviewing student journals. 

All students changed the mentor sentence in some way. 15 students (including Jeremy) have written down one of the 5 sentences shared during class. The rest of the students have unique sentences.
`});

  slides.push({ type: 'Enact', el:
    <div>
      <div>Work It Wednesday.</div>
      <div></div>
      <div>A snapshot of Jeremy’s journal is shown below:</div>
      <div></div>
      <div>
        <a href="https://s3-us-west-2.amazonaws.com/tsl-public/threeflows/jeremy-scenario/PS1-Draft-4.png" target="_blank" rel="noopener noreferrer">Open in a new window</a>
        <img src="https://s3-us-west-2.amazonaws.com/tsl-public/threeflows/jeremy-scenario/PS1-Draft-4.png" alt="student workd" style={{display: 'block', width: '90%', margin: 20}} /> 
      </div> 
      <div>How do you want to respond to student work?</div>
      <div> </div>      
      <div> - Review the lesson in a small group</div>
      <div> - Review the lesson with the whole class </div>
      <div> - Continue with original lesson plan (don’t respond) </div>
      <div> - Check in with Jeremy privately </div>
      <div> </div>
      <div>Please type your choice below and explain.</div>
    </div>
    , force: true, writeNoPrompt: true});



  slides.push({ type: 'Enact', text: `Thinking Thursday.
Today you will instruct students to create a brand new sentence that mimics the structure of the mentor sentence (complete with use of clauses and hyperboles).

Teacher: “Alrighty, the story so far: we read a mentor sentence, wrote what we noticed about it, labelled each word in the sentence, learned about using commas for clauses and hyperboles, and then made improvements to the mentor sentence.

Now that we’ve had all this practice with our mentor sentence, today we will write our own, unique sentence using what we learned.”

You then instruct students to write their own, unique sentence that uses:
(1) Commas to separate clauses
(2) Hyperbole`});

        


  slides.push({ type: 'Enact', text: 
    `Thinking Thursday.
The majority of students alternate between writing in their journal and sharing with their shoulder partner.

Jeremy starts this time by turning to his shoulder partner and asking “How’s your day goin’?” They chat for a few moments before Jeremy turns to his other shoulder partner and asks the same question. They also chat for a few moments.

Jeremy then writes a few words, erases something from his paper, and then writes a little more. Jeremy then turns to the person behind him and asks “How’s your day going?” They chat for about 2 minutes. Jeremy looks at his journal and writes something else down.
`});

  slides.push({ type: 'Enact', text: 
    `Thinking Thursday.
Teacher: “That’s time! Please put your journal away. As a reminder, we’re going to have our quiz tomorrow morning to see what you know about clauses and hyperbole. For now, we’re going to move on to the next part of our lesson.”

Jeremy quickly finishes writing something in his journal. He then puts the journal away and starts to wiggle in his seat. 

That day during class, Jeremy asks to go to the bathroom. He uses 15 minutes to go the bathroom and return to class.`});

  slides.push({ type: 'Enact', text: 
    `Thinking Thursday.
It’s now the end of the school day, and you are reviewing student journals.

15 students correctly used both clauses and hyperboles in their “new” mentor sentences.

7 students used only one of the skills correctly.

1 student used neither of the skills correctly.

1 student (Jeremy) did not complete a mentor sentence.`});

  slides.push({ type: 'Enact', el:
    <div>
      <div>Thinking Thursday.</div>
      <div></div>
      <div>A snapshot of Jeremy’s journal is shown below:</div>
      <div></div>
      <div>
        <a href="https://s3-us-west-2.amazonaws.com/tsl-public/threeflows/jeremy-scenario/PS1-Draft-5.png" target="_blank" rel="noopener noreferrer">Open in a new window</a>
        <img src="https://s3-us-west-2.amazonaws.com/tsl-public/threeflows/jeremy-scenario/PS1-Draft-5.png" alt="student workd" style={{display: 'block', width: '90%', margin: 20}} /> 
      </div> 
      <div>How do you want to respond to student work?</div>
      <div> </div>      
      <div> - Review the lesson in a small group</div>
      <div> - Review the lesson with the whole class </div>
      <div> - Continue with original lesson plan (don’t respond) </div>
      <div> - Check in with Jeremy privately </div>
      <div> </div>
      <div>Please type your choice below and explain.</div>
    </div>
    , force: true, writeNoPrompt: true});


  slides.push({ type: 'Enact', el:
    <div>
      <div>Final Friday.</div>
      <div>Today students are starting off the class day with a quiz on using clauses and hyperbole. </div>
      <div>The quiz can be seen below:</div>
      <div>
        <a href="https://s3-us-west-2.amazonaws.com/tsl-public/threeflows/jeremy-scenario/PS1-Draft-6.png" target="_blank" rel="noopener noreferrer">Open in a new window</a>
        <img src="https://s3-us-west-2.amazonaws.com/tsl-public/threeflows/jeremy-scenario/PS1-Draft-6.png" alt="student workd" style={{display: 'block', width: '90%', margin: 20}} /> 
      </div>
      <div>Do you think Jeremy is ready to take the quiz? Why or why not?</div>
    </div>
    , force: true, writeNoPrompt: true});


  slides.push({ type: 'Enact', text:
`Final Friday.
Students come in and take their seats. Jeremy hasn’t arrived to class yet.

Teacher: “You guys have done great work all week long! Today we are going to take a short quiz to check your understanding of our mentor sentence. 

Please put all materials away except for a pencil. We will begin shortly.”
`, force: true, writeNoPrompt: true});

  slides.push({ type: 'Enact', text:
`Final Friday.
Students are still taking their quiz when Jeremy walks into class 5 minutes late with no tardy note in hand.

You walk over to Jeremy to talk to him. 

Jeremy: “I’m really, really sorry for being late. I’m kinda freaking out about this quiz today, so I took a little longer in the bathroom than I thought I would. You know… digestion issues.”

Respond to Jeremy:
`, force: true, writeNoPrompt: true});

  slides.push({ type: 'Enact', text:
`Final Friday.
Jeremy starts talking quickly, seemingly ignoring everything you just said.

Jeremy: “Can I please not take the quiz today? I don’t get what we’re learning right now, and I am for sure definitely going to fail if I take the quiz today. My mom is literally going to kill me! KILL me. Like, actual DEATH.”

Respond to Jeremy:
`, force: true, writeNoPrompt: true});


  slides.push({ type: 'Enact', el:
    <div>
      <div>Final Friday.</div>
      <div>You decide that Jeremy will… (choose one)</div>
      <div> </div>      
      <div> - ...take the quiz today</div>
      <div> - ...NOT take the quiz today </div>
      <div> </div>
      <div>Please type your choice below and explain.</div>
    </div>
    , force: true, writeNoPrompt: true});


  // Reflect
  slides.push({ type: 'Reflect', text:
`This concludes the Enact phase of the practice space. Now we will enter the Reflect phase of the practice space. 

In this phase, you will reflect on your actions during the Enact phase through the guidance of reflection questions. 

Click “OK” when you are ready.
`});

  slides.push({ type: 'Reflect', text:
`What role do you see yourself playing in Jeremy's academic achievement and success?`, force: true, writeNoPrompt: true});

  slides.push({ type: 'Reflect', text:
`Brainstorm: What factors do you you consider might play into Jeremy's academic performance and achievement?`, force: true, writeNoPrompt: true});

  slides.push({ type: 'Reflect', text:
`Brainstorm: What factors do you you consider might play into Jeremy's academic performance and achievement?`, force: true, writeNoPrompt: true});
 
  slides.push({ type: 'Reflect', text:
`It's common opinion that "effort and sacrifice guarantees students will have opportunities to succeed. " What is your opinion on this statement?`, force: true, writeNoPrompt: true});


  slides.push({ type: 'Reflect', text:
`How might your opinion of the prior statement  transfer to your instructional practice, (with a student such as Jeremy, for example?)

Prior statement:
“Effort and sacrifice guarantees students will have opportunities to succeed. " 
`, force: true, writeNoPrompt: true});


  return slides;
}


export default {
  questionsFor(cohortKey) {
    return slidesFor(cohortKey);
  }
};