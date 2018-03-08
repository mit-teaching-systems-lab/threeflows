/* @flow weak */
import React from 'react';
import hash from '../../helpers/hash.js';
import * as CommonBeliefsSurvey from '../surveys/common_beliefs_survey.js';

// Adapted from Okonofua 2016, Experiment #1

// For adapting text
type NameWithPronounsT = {
  name:string,
  he:string,
  him:string,
  his:string
}
type TextQuestionT = {
  type:string,
  text:string,
  choices: [string]
};
type ReactQuestionT = {
  type:string,
  el:any,
  choices: [string]
};
export type QuestionT = ReactQuestionT | TextQuestionT;



function capitalize(pronoun:string) {
  return pronoun.slice(0, 1).toUpperCase() + pronoun.slice(1);
}

function slidesForStudent(nameWithPronouns:NameWithPronounsT) {
  var slides:[QuestionT] = [];
  const {name, he, him, his} = nameWithPronouns;
  const choices = [
    'Assign detention',
    'Threaten to punish student',
    'Involve an administrator',
    'Rearrange classroom to accommodate student',
    `Talk with ${name} about ${his} behavior`,
    'Say nothing',
    'Other'
  ];


  // Context
  slides.push({ type: 'Overview', el:
    <div>
      <div>1. Review context</div>
      <div>Imagine yourself as the teacher in the particular school and classroom.  You won't know all the answers, and will have to improvise and adapt to make the best of the situation.</div>
      <br />
      <div>2. Anticipate</div>
      <div>You shouldn't have an in-depth understanding, but do your best to anticipate what might happen.</div>
      <br />
      <div>3. Try it!</div>
      <div>When you're ready, you'll go through a set of short scenarios that simulate interactions in the class.</div>
      <br />
      <div>4. Reflect</div>
      <div>Finally, you'll reflect on your experience.</div>
      <br />
      <div>5. Discussion</div>
      <div>When you're done, head back to the classroom to rejoin the group.  If you're online, chime in at <a target="_blank" href="https://twitter.com/search?q=%23https://twitter.com/search?q=%23TeacherPracticeSpaces">#TeacherPracticeSpaces</a>.</div>
    </div>
  });

  slides.push({type: 'Context', text:
`The classroom layout has students at individual desks that they can move around easily to form pairs or groups.  Each student has a laptop with internet connectivity.

Classroom materials like paper, pens, etc. are readily available.

There's a projector that can show any computer screen on the front wall of the classroom.  The teacher's desk is in the back corner of the room.
`});

  slides.push({type: 'Context', el: 
    <div>
      <div>During class, students are working individually in pairs on this problem, from <a href="https://www.illustrativemathematics.org/content-standards/7/RP/A/tasks/82">Illustrative Mathematics:</a></div>
      <br />
      <div>Angel and Jayden were at track practice. The track is 25 kilometers around.</div>
      <ul>
        <li>Angel ran 1 lap in 2 minutes.</li>
        <li>Jayden ran 3 laps in 5 minutes.</li>
      </ul>
      <div>Who is running faster?  Explain your reasoning.</div>
    </div>
  });

// from http://www.pbis.org/Common/Cms/files/pbisresources/PBIS%20Disproportionality%20Policy%20Guidebook%202016-7-24.pdf
  slides.push({type: 'Context', text:
`Here is the school's discipline policy:

Our district believes in the use of graduated discipline to ensure severe punishments, such as exclusion from the learning environment, are reserved for credible threats to the safety of others. The goal of all discipline responses is to ensure students understand the school’s behavior expectations, repair the harm caused by their choice of behavior, and identify how to prevent the problem in the future. When repeated or serious behavior incidents occur, each school’s multidisciplinary team will conduct a functional behavior assessment for students to identify needs for academic and behavior support.
`});

  // Anticipate
  slides.push({ type: 'Anticipate', text:
  `Before you begin, we have three questions about what you anticipate.
  `});

  slides.push({ type: 'Anticipate', text:
  `What are some approaches to discipline and classroom management in a middle school math classroom?
  `, open: true});

  slides.push({ type: 'Anticipate', text:
  `How do these approaches help teachers maintain control over a class?
  `, open: true});

  slides.push({ type: 'Anticipate', text:
  `What might be challenging for a student about these approaches?
  `, open: true});


  // Try it!
  slides.push({ type: 'Try it!', text:
`When you're ready, you'll go through a set of scenes.

In the simulation, you'll be witnessing moments with a student during the class.

Improvise how you would act as a teacher in those moments.  Click and speak aloud the words you'd say to that student, or say nothing and continue on.


Ready to start?
`});

  slides.push({
    type: 'Try it!',
    choices,
    text: `${name} is consistently disrupting the class environment by strolling around the classroom at random intervals, getting tissues from the tissue box multiple times during a 50-minute class, throwing items away constantly; in general, ${name} circulates around the room and up and down the rows to see what other students are doing, the students have eyes on ${him}, and he disrupts the flow of the lecture or activity the class was participating in.`
  });

  slides.push({
    type: 'Try it!',
    choices,
    text: `${name} is sleeping in class. You tell ${him} to pick ${his} head up and get to work. ${capitalize(he)} only picks ${his} head up. ${capitalize(he)} chooses to rest it on ${his} hand and continue to sleep. So you ask ${him} one more time, and again, ${name} refuses to do work. You ask ${him} to leave class and go to the office to tell them that ${he} won’t do his work and chose to sleep instead. ${capitalize(he)} refuses to do this as well.`
  });

  slides.push({
    type: 'Try it!',
    choices,
    text: `${name} is sitting in the back of the classroom. ${capitalize(he)} is not paying attention to the lessons that you are teaching in class. Instead, ${name} is talking to other students. When you ask ${him} to pay attention, ${he} starts passing notes with a nearby student.`
  });


// Reflect
  slides.push({ type: 'Reflect', text:
`That's the end of the simulation.  Thanks!

Let's shift to reflecting on the lesson.
`});

  slides.push({ type: 'Reflect', text:
`Before heading back to the group, we have three questions about what you experienced in this simulation.

After that, we'll ask you to fill out a survey.

Also, for now please hold questions or feedback about this activity itself.
`});

  slides.push({ type: 'Reflect', text:
`During the simulation, how did you think about your role as a teacher?
`, open: true});

  slides.push({ type: 'Reflect', text:
`Would you would consider ${name} a troublemaker?
`, likert: true});

  slides.push({ type: 'Reflect', text:
`Did you notice anything about the student's race, ethnicity, gender or class?
`, open: true});

  slides.push({ type: 'Reflect', text:
`Thanks!

Please help answer a few survey questions as well.
`});

  slides = slides.concat(CommonBeliefsSurvey.questions.map((question) => {
    return {
      type: 'Survey',
      text: question,
      likert: true
    };
  }));

  slides.push({ type: 'Reflect', el:
  <div>
    <div>Finally, pick one moment to talk about during the group discussion.</div>
    <br />
    <div>In the group, you'll be asked to describe what you noticed, any assumptions you made, and how that shaped your interactions with the student.</div>
    <br />
    <div>Feel free to take a minute or two to think about that, and then head on back!  If you're working online you can connect with other folks at <a target="_blank" href="https://twitter.com/search?q=%23https://twitter.com/search?q=%23TeacherPracticeSpaces">#TeacherPracticeSpaces</a>.</div>
  </div>
  });

  return slides;
}



// Names from Bertrand and Mullainathan (2003)
// http://www.nber.org/papers/w9873
const cohorts:[NameWithPronounsT] = [
  { gender: 'male', name: 'Jamal', he: 'he', his: 'his', him: 'him' },
  { gender: 'male', name: 'Greg', he: 'he', his: 'his', him: 'him' },
  { gender: 'female', name: 'Emily', he: 'she', his: 'her', him: 'her' },
  { gender: 'female', name: 'Lakisha', he: 'she', his: 'her', him: 'her' }
];

// Choose a cohort
// map out the 
export const ExperimentOneScenarios = {
  cohortKey(email) {
    return hash(email) % cohorts.length;
  },

  questionsFor(cohortKey) {
    const nameWithPronouns = cohorts[cohortKey];
    return slidesForStudent(nameWithPronouns);
  },

  renderIntro() {
    return (
      <div>
        <p>Welcome!</p>
        <p>Imagine you're a middle school math teacher in an urban public school.  You will go through some scenarios in the classroom, and won't know much else about these students.</p>
        <p>Provide an audio response of how you would respond in that moment, if at all.  Then choose the best description of how you interacted with the student.  Please respond like you would in a real conversation.</p>
      </div>
    );
  }
};
