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

  // Consent
  slides.push({ type: 'Consent', id: 'consent_1', text:
`Optionally, we'd like to use your responses here for a  research study at MIT.  We would like to compare the responses across participants.

Your responses would be included in the research, along with data from your response to a survey.  All data you enter is stored securely and protected on a secure server on Google Drive, Amazon Web Services or Heroku.  You may print a copy of this form for your records. 

You can continue playing the game either way.  Participation in the research study is voluntary.

More details:
You have been asked to participate in a research study conducted by the staff and researchers at the Teaching System Laboratory (TSL) at the Massachusetts Institute of Technology. 

Purpose of study:
The purpose of this study is to investigate how emotional expression in responses to teacher momments relates to expression. For example, we will explore expressions that indicate confusion or struggle to better understand the interplay between emotion and cognition during learning.  All participants will be over 18.

Study results:
The results of this study will be used for ongoing research conducted by TSL in preparing and supporting effective, well-prepared teachers. Results of the study will be shared through conference papers, journal articles, websites, online blogs, tweets, and other materials. All information will be reported anonymously. 

Data collection:
Data collection will include online log file data including responses participants submit within learning experiences in the form of audio and test responses.  These may include things like: written or typed responses, clicks or taps within the learning experience, or audio or video recordings participants create.  Beyond sharing and social elements directly within the learning experience, the data will be used only for analysis or to share with other participants as they choose.  Data will be stored securely in Google Drive, Amazon Web Services and Heroku. 

Participant information:
Participating in this study is voluntary. 
You will not be compensated for participating in the study.
Your email and any other personally identifiable information will be confidential.
Your anonymized responses may be shared with other players as part of the game. 

Study timeframe:
This project will be completed by December 31st, 2023.  After that date, participant data will be deleted. 

Informed Consent: 
I understand the procedures described above. My questions have been answered to my satisfaction, and I agree to participate in this study.

Contact information:
Please contact Dr. Justin Reich (jreich@mit.edu) or Garron Hillaire, (garron@mit.edu) with any questions or concerns. If you feel you have been treated unfairly, or you have questions regarding your rights as a research subject, you may contact the Chairman of the Committee on the Use of Humans as Experimental Subjects, M.I.T., Room E25-143b, 77 Massachusetts Ave, Cambridge, MA 02139, phone 1-617-253-6787.
`, force: true, choices: ['No Thanks', 'I Consent']});

  slides.push({ type: 'Overview', id: 'overview_1', el:
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
  slides.push({ type: 'Context', id: 'context_1', text:`In a project-based learning unit, four 10th grade students are assigned to work together in a group. While the students aren’t all in the same social circle, they get along in class. The project involves using a design thinking process to create an app with App Inventor  that solves a community problem. The groups will then present their apps to community members. 

Each student in the group takes a role as the “project manager” of a different component. However, all group members are expected to work on all parts of the project. Each student in the group is graded individually. The grade takes into account the project as a whole, as well as individual student contributions to the team. 
`});

  slides.push({ type: 'Context', id: 'context_2', text:`Hakeem loves to code and practices at home. He has made several apps at home on his own using Swift. Imani is a straight A  student who tends to take notes because she is proud of her handwriting. She tends to let other people do the coding during projects. Jeremy is a solid B student with a learning disability. He is interested in coding, but slow to read and type. Julio is on the Autism spectrum. He loves CS and coding, but rarely talks to the other students.  
`});

  slides.push({ type: 'Context', id: 'context_3', text:`The group worked well together during the community interviews and brainstorming portions of the project. Now it’s time for them to code a prototype app. 

You notice that Hakeem is doing all the coding. Imani is writing up the documentation. Jeremy is creating original art for the presentation slides. Julio is spending most of his time playing with a pen cap or looking out the window.  
`});
  slides.push({ type: 'Context', id: 'context_4', text:`You have a double period on Tuesday that you use as a studio time for students to collaborate on their projects. During the studio time, you confer with groups. `});

  // Anticipate
  slides.push({ type: 'Anticipate', id: 'anticipate_1', text:`What do you think the teacher’s role is in regulating group dynamics? How much scaffolding do you think a teacher should provide for collaboration? `, force: true, open: true});
  slides.push({ type: 'Anticipate', id: 'anticipate_2', text:`What do you think that each student in this group is able to contribute to this project? `, force: true, open: true});
  slides.push({ type: 'Anticipate', id: 'anticipate_3', text:`What would be the best case scenario for these four students? `, force: true, open: true});

  // Enact
  slides.push({ type: 'Enact', id: 'enact_1', text:`You pull up a chair at this groups table to begin their conference.  

How do you start the conference? 
`, force: true, open: true});
  // Please add selection buttons "Continue Listening" or "Intervene" and allow them to type a response. 
  slides.push({ type: 'Enact', id: 'enact_2', text:`After the initial check-in, the conversation turns to the student's roles and contributions to the project. Imani: “I like to do the writing on my own.”

Jeremy: “Yeah, besides, she has the best handwriting in our group.” 

 
Continue listening (Type listening and explain why you want to continue listening)

Intervene (Type your response)
`, force: true, open: true});
  // Please add selection buttons "Continue Listening" or "Intervene" and allow them to type a response. 
  slides.push({ type: 'Enact', id: 'enact_3', text:`Imani: “And Hakeem is best at coding. We won’t have time to get it all done if he doesn’t do it. Besides, it’s too hard to share accounts so that more than one person can code.”

Hakeem: “I don’t mind!”

Continue listening (Type listening and explain why you want to continue listneing)

Intervene (Type your response)
`, force: true, open: true});
  // Please add selection buttons "Move on to Another Group" or "Intervene" and allow them to type a response.  
  slides.push({ type: 'Enact', id: 'enact_4', text:`Jeremy: “I’m in charge of the presentation. Look at this!” 

Jeremy has completed most of one original drawing that he plans to put on the title slide. 


Move on to another group (Type move on and explain why you want to move to another group.)

Intervene (Type your response)
`, force: true, open: true});
  slides.push({ type: 'Enact', id: 'enact_5', text:`Later Hakeem asks to talk to you after class. “I’ve been working really hard to include Julio. I asked him if he wanted to code part of the app and Imani asked him to help with the documentation. He says he wants to help, but then he doesn’t really do anything. Can you move him to a different group?”

How do you respond to Hakeem?
`, force: true, open: true});
  slides.push({ type: 'Enact', id: 'enact_6', text:`During lunch Julio comes to your classroom. “Can I make my own app? I really want to make an app about identifying different types of spiders. I think that would be really cool. And I’m not really sure what my group is doing.” 

How do you respond to Julio? 
`, force: true, open: true});
  slides.push({ type: 'Enact', id: 'enact_7', text:`The following Tuesday, you notice that Imani is pair programming with Hakeem. You see that Jeremy and Julio are creating the slides and they are about half way done. 

You walk over to their table to check in. What do you say?
`, force: true, open: true});
  slides.push({ type: 'Enact', id: 'enact_8', text:`After the group check-in the students bring up their grades. 

    Imani: “I’m so nervous. I really need an A. Am I getting an A on this project so far?”

Jeremy: “Yeah, my mom is going to be really mad if I get another D. How am I doing so far?”

How do you respond?
`, force: true, open: true});

  // Reflect
 
  slides.push({ type: 'Reflect', id: 'reflect_1', text:`Do you think that being in a group with students with disabilities had a  beneficial, detrimental, or neutral impact on the other two students? `, force: true, open: true});
  slides.push({ type: 'Reflect', id: 'reflect_2', text:`What do you think the experience of each student in the group was? Were there dynamics related to gender, race, or ability?`, force: true, open: true});
  slides.push({ type: 'Reflect', id: 'reflect_3', text:`Should Jeremy and/or Julio have modified responsibilities or be graded differently than the other two students? 


`, force: true, open: true});
  slides.push({ type: 'Reflect', id: 'reflect_4', text:`Brainstorm: What scaffolds could have been provided to the group as a whole to avoid the disproportionate division of work and to help them communicate with their team members.`, force: true, open: true});
  slides.push({ type: 'Reflect', id: 'reflect_5', text:`Did you speak differently (vocabulary, tone, content) with different students in the group? How so? How does this reflect any assumptions that you might have made about each student? `, force: true, open: true});


  return slides;
}


export default {
  questionsFor(cohortKey) {
    return slidesFor(cohortKey);
  }
};