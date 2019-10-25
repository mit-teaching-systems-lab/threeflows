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
  slides.push({ type: 'Context', text:`In a project-based learning unit, four 10th grade students are assigned to work together in a group. While the students aren’t all in the same social circle, they get along in class. The project involves using a design thinking process to create an app with App Inventor  that solves a community problem. The groups will then present their apps to community members. 

Each student in the group takes a role as the “project manager” of a different component. However, all group members are expected to contribute to each part of the project. 

Student A (Hakeem) loves to code and practices at home. He has made several apps at home on his own using Swift. Student B (Keisha) is a straight A  student who tends to take notes because she is proud of her handwriting. She tends to let other people do the coding during projects. Student C (Jeremy) is a solid B student with a learning disability. He is interested in coding, but slow to read and type. Student D (Julio) is on the Autism spectrum. He loves CS and coding, but rarely talks to the other students.  
`});
  slides.push({ type: 'Context', text:`The group worked well together during the community interviews and brainstorming portions of the project. Now it’s time for them to code a prototype app. 

You notice that Hakeem is doing all the coding. Keisha is writing up the documentation. Jeremy is creating original art for the presentation slides. Julio is spending most of his time playing with a pen cap or staring into space.  
`});
  slides.push({ type: 'Context', text:`You have a double period on Tuesday that you use as a studio time for students to collaborate on their projects. During the studio time, you confer with groups. `});

  // Anticipate
  slides.push({ type: 'Anticipate', text:`What do you think the teacher’s role is in regulating group dynamics? How much scaffolding do you think a teacher should provide for collaboration? `, force: true, writeNoPrompt: true});
  slides.push({ type: 'Anticipate', text:`What do you think that each student in this group is able to contribute to this project? `, force: true, writeNoPrompt: true});
  slides.push({ type: 'Anticipate', text:`What would be the best case scenario for these four students? `, force: true, writeNoPrompt: true});

  // Enact
  slides.push({ type: 'Enact', text:`You pull up a chair at this groups table to begin their conference.  

How do you start the conference? 
`, force: true, writeNoPrompt: true});
  slides.push({ type: 'Enact', text:`Keisha: “I like to do the writing on my own.”

Jeremy: “Yeah, besides, she has the best handwriting in our group.” 
`, force: true, writeNoPrompt: true});
  slides.push({ type: 'Enact', text:`Keisha: “And Hakeem is best at coding. We won’t have time to get it all done if he doesn’t do it. Besides, it’s too hard to share accounts so that more than one person can code.”

Hakeem: “I don’t mind!”
`, force: true, writeNoPrompt: true});
  slides.push({ type: 'Enact', text:`Jeremy: “I’m in charge of the presentation. Look at this!” 

Jeremy has completed most of one original drawing that he plans to put on the title slide. 
`, force: true, writeNoPrompt: true});
  slides.push({ type: 'Enact', text:`Later Hakeem asks to talk to you after class. “I’ve been working really hard to include Julio. I asked him if he wanted to code part of the app and Keisha asked him to help with the documentation. He says he wants to help, but then he doesn’t really do anything. Can you move him to a different group?”`, force: true, writeNoPrompt: true});
  slides.push({ type: 'Enact', text:`During lunch Julio comes to your classroom. “Can I make my own app? I really want to make an app about identifying different types of spiders. I think that would be really cool. And I’m not really sure what my group is doing.” `, force: true, writeNoPrompt: true});
  slides.push({ type: 'Enact', text:`The following Tuesday, you notice that Keisha is pair programming with Hakeem. You see that Jeremy and Julio are creating the slides and they are about half way done. 

You walk over to their table to check in. 
`, force: true, writeNoPrompt: true});
  slides.push({ type: 'Enact', text:`Keisha: “I’m so nervous. I really need an A. Am I getting an A on this project so far?”

Jeremy: “Yeah, my mom is going to be really mad if I get another D. How am I doing so far?”
`, force: true, writeNoPrompt: true});

  // Reflect
 
  slides.push({ type: 'Reflect', text:`Do you think that being in a group with students with disabilities had a  beneficial, detrimental, or neutral impact on the other two students? `, force: true, writeNoPrompt: true});
  slides.push({ type: 'Reflect', text:`Should Jeremy and/or Julio have modified responsibilities or be graded differently than the other two students? 


[Add a debrief page with video and infographic  about UDL, learning disabilities, autism, etc]
`, force: true, writeNoPrompt: true});
  slides.push({ type: 'Reflect', text:`Brainstorm: What scaffolds could have been provided to the group as a whole to avoid the disproportionate division of work and to help them communicate with their team members.`, force: true, writeNoPrompt: true});
  slides.push({ type: 'Reflect', text:`Did you speak differently (vocabulary, tone, content) with different students in the group? How so? How does this reflect any assumptions that you might have made about each student? `, force: true, writeNoPrompt: true});


  return slides;
}


export default {
  questionsFor(cohortKey) {
    return slidesFor(cohortKey);
  }
};