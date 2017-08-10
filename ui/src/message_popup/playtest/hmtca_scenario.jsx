/* @flow weak */
import _ from 'lodash';
import React from 'react';


// This file defines the content for the HMTCA scenarios.
// Note: This only supports text scenes right now.
export type QuestionT = {
  type:string, // Used as a label
  text:string, // Plain question text
  applesSceneNumber?:number, // Ask for text response and log it specially
};


// Different categories for classroom management
const BUCKETS = [
  { id: 201, text: 'Students refusing to work' },
  { id: 202, text: 'Disrespect towards teachers' },
  { id: 203, text: 'Disrespect towards females' },
  { id: 204, text: 'Combination of the above' }
];

const TEAM_CODES = _.sortBy([
  'mango',
  'lemon',
  'papaya',
  'apple',
  'guava',
  'banana',
  'nectarine',
  'peach',
  'blueberry',
  'strawberry',
  'grape',
  'pineapple',
  'pear',
  'cherry',
  'watermelon',
  'kiwi',
  'coconut',
  'blackberry'
]);


function addInAppleSceneNumber(slide, index) {
  return {...slide, applesSceneNumber: index + 1};
}

function slidesFor(cohortKey, bucketId) {
  var slides:[QuestionT] = [];
  slides.push({ el: 
    <div>
    <div><b>PART 1: Practice Individually</b> (20 Minutes)</div>
    <br />
    <ul>
      <li>Read through 6 separate scenes and type your response to each scene.</li>
      <li>Wait for your group to finish. Move on to Part 2 after 20 minutes.</li>
    </ul>
    </div>
  });

  slides.push({ text:`Ready to begin?

The next slide will show you the first of six scenes in the category you chose. For each scene, simulate how you’d respond to the student(s) in the moment. Type your response in the textbox located below each scene.`});


  const refusingWorkSlides = [
    { text: 'Students are using Chromebooks to work on individual projects in class. As you walk around the classroom, you notice Jose watching a music video on YouTube instead of doing work.' },
    
    { text: 'You are an ELA teacher and leading a discussion on Othello. Julia, a student that usually sits in the second or third row of desks, has chosen to sit in the back today. About 15 minutes into your discussion, you notice Julia has spent most of the class with her head down and writing feverishly on a piece of paper. As you continue the discussion, you gradually start moving toward Julia and see what looks like Algebra homework.' },

    { text: 'You have a flexible cell phone policy in your class. Rosario and Fabiola typically sit next to each other during class but they’ve decided to sit on separate sides of the classroom today. As you’re going through your lecture, you notice Rosario and Fabiola have their heads down for most of the class and it appears they’re doing something on their phones. As class continues, you notice that only one of them has their head down at a time and when one looks up, the other’s head comes down. You suspect they may be arguing over text.'},

    { text: 'Two weeks ago, you assigned a group project in class. Currently, there’s about a week left before students have to submit their assignments. After class ends this day, one of your students, Mark, comes up to you and says, “Hey my group is doing fine on the group project but I’m having to do extra work because Tyshawn doesn’t do anything and doesn’t offer to do anything. It’s super frustrating. Are you going to give us all the same grade or are you going to give Tyshawn the grade he deserves?”'},
    
    { text: `In the morning, you check your email for the first time in the day since before you went to sleep last night. You see an email from Drew and it arrived at 11:00pm last night after you had gone to bed. In the email he said he’s confused about the assignment and is stuck.

Now class has started and you’ve asked students to turn in their assignments. Drew raises his hand and in front of everybody says, “I didn’t do the assignment because you never responded to my email.”`},
    
    { text: 'You are a history teacher and you’re teaching a lesson on the Women’s Suffrage Movement. Jamika has her head down and is scrolling through her phone. A classmate sitting next to Jamika taps her on the shoulder and says, “Pay attention.” Jamika responds by saying, “I’m not paying attention to this whitewashed crap. Where are the black people?”'}];



  const teacherDisrespect = [

    { text: 'You’re teaching ELA. You’re in the middle of discussing Romeo and Juliet when Carlos interrupts you without raising his hand and says, “Why does any of this matter? How is Shakespeare going to help me get a job? Stop wasting our time!”'},
    
    { text: 'You’re walking around the classroom going desk-to-desk taking your students’ assignments. You arrive at William’s desk and he doesn’t acknowledge your presence, keeping his head down and staring at his phone. You tell William, “It’s time to hand in your paper.” William doesn’t respond. You ask William if he completed his paper, to which he mutters under his breath without looking up, “Fuck off.”'},
    
    { text: 'You’ve started class and notice that Karina hasn’t shown up yet. After 15 minutes have passed, Karina shows up. When you confront her, she says, “I told you I was going to be late today. Did you forget?” You’re confident she did not tell you because you typically take meticulous notes about when students will be late to class.'},
    
    { text: 'You’re having lunch with Janice to talk about writing a recommendation for her. You decide to ask her how she’s doing in her classes overall. She responds by saying, “I’m doing pretty well overall, but I’m doing poorly in Mr. Smith’s class because he doesn’t like girls.”'},
    
    { text: 'You have assigned a “free-write” activity to your class to brainstorm ideas for a short story. The rule is that everyone brainstorms freely for three minutes without stopping. Everyone’s pencil is moving constantly except for Jamal’s, who is staring out the window. You say, “Jamal, please start writing.” Jamal holds his pencil up, breaks it in half, and glares at you.'},
    
    { text: 'You have a “no cell phones” policy in class. One day at the start of class, Trent has his cell phone out on his desk. When you remind him about your cell phone policy, he says, “I can’t put my phone away because I’m expecting a call from your mom.”'}];


  const maleFemaleDisrespect = [

    { text: 'It’s March and students are starting to receive their college acceptance letters. You are teaching Physics and you hear Amy talk about getting accepted to MIT. Another student, Mike, responds to her by saying, “You only got accepted to MIT because you’re a girl.”'},
    
    { text: 'It’s Career Day, when students talk about the careers they are interested in and where they see themselves in 20 years. Ashley says she would like to be the head of a Fortune 500 tech company. Kevin snorts loudly. “Good luck,” he says. “You know there are like no women CEOs, right?”'},
    
    { text: `You’ve finished grading Algebra assignments. As you’re handing them back, you hear the following conversation unfold between Mike and Lisa:

Mike: “Lisa, how did you do?”

Lisa: “I got 95% on the assignment.”

Mike: “Woah. I didn’t know pretty chicks could be good at math. You sleeping with the teacher?” 

Lisa looks away, visibly angry.
      `},
    
    { text: 'An assignment is due at the beginning of class today. When Johnny hands in his assignment, he says, “I’m getting an A because you like me so much, right?” Krystal hears this and says, “Teacher doesn’t like you that much, so you must be getting an F.” Johnny replies, “Krystal - are you being bitchy because you’re on your period?” Krystal angrily responds, “Go to hell!”'},
    
    { text: 'The prototype of the bridge the students have built has sagged during testing. You ask if anyone has any ideas about how this problem could be solved. Julie raises her hand and says, "We need to provide some support for the load of the bridge, probably with tower suspension lines." Carter then adds, "I think what she means is that the bridge needs to be supported with guide wires from the towers." Julie mutters under her breath, “I just said that.”'},
    
    { text: 'You’re a Geometry teacher in the middle of a lecture about the Pythagorean theorem. Amanda raises her hand and asks, “Can you use the theorem for all triangles?” Connor turns to one of his classmates and says, “That’s a stupid question.”'}];




  if (bucketId === 201) {

    slides = slides.concat(refusingWorkSlides.map(addInAppleSceneNumber));
    
  } 


  else if (bucketId === 202) {
    
    slides = slides.concat(teacherDisrespect.map(addInAppleSceneNumber));

  }


  else if (bucketId === 203) {

    
    slides = slides.concat(maleFemaleDisrespect.map(addInAppleSceneNumber));

  }


  else {

    const scenes = []
      .concat(refusingWorkSlides.slice(0,2))
      .concat(teacherDisrespect.slice(0,2))
      .concat(maleFemaleDisrespect.slice(0,2));

    slides = slides.concat(scenes.map(addInAppleSceneNumber));
  }

  return slides;
}




export default {
  BUCKETS,
  TEAM_CODES,
  questionsFor(cohortKey, bucketId) {
    return slidesFor(cohortKey, bucketId);
  }
};