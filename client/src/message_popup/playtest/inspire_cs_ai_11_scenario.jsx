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
  slides.push({ type: 'Context', id: 'context_1', text:`A total of 13 students studying computer science fundamentals in CS at a Community College, where:
- Four traditional community college students are finishing their AA in CS
- Three HS students. Currently taking courses at HS and Community College to accelerate their AA degree
- One person who has been working in industry for 23 years, is a returning student who is back in the classroom to finish an AA in CS in order to be in compliance for his job
- One graduate student, who has a B.S. in Biology from Mexico, and needs to take CS courses as prerequisite for the graduate courses
- One returning mother, who has been sponsored to continue study. She is a part-time student who works two-part time jobs.
- Three transfer students who took other classes at the 4-year institution, but taking the courses at community college because flexibility on their schedules. 
`});
  slides.push({ type: 'Context', id: 'context_2', text:`After teaching the chapter on recursion, you ask your students to team up in teams of two. Since the class is 13, no even teams will be made, and you found three students that are not paired: William, Maria, and Carol

You found uncomfortability in the process of pairing up students.
  
Since William, the experienced programmer, feels uncomfortable working with other students;
Maria, who is a returning student and has no experience programming, but in addition, is struggling with the course due to her part time job and taking care of her children after school; and 
Carol that is her first year in the US and is becoming familiar with the culture and educational system of this country.
`});

  // Anticipate

  slides.push({ type: 'Anticipate', id: 'anticipate_1', text:`What challenges do you anticipate might occur when students get into groups?`, force: true, open: true});


  // Enact
  slides.push({ type: 'Enact', id: 'enact_1', text:`You: William and Maria, can you please pair up and work as a team to solve problems 1 and 2 from the hands-on activity? 

William: Professor, I would like to work by myself in this assignment. I don't need help to solve the problems, I can finish them by myself.

[what would you do?]
[Let him work by himself and have Maria to work with Carol work together |
Insist that you want them to work together |
Ask William to elaborate about the reasons why he would like to work by himself]
`, force: true, open: true});
  slides.push({ type: 'Enact', id: 'enact_2', text:`You: I understand that you want to work by yourself, I encourage you to share your knowledge and your experience with other classmates like Maria! 

William: [he shows annoyed because of this team work activities you are attempting to do], and he sights looking at you expressing that this is a "waste of his time".

Maria: Starts opening programming tool in her computer instead of pairing up with William 

[what action would you perform?]
Let William to work by himself and let Maria work with Carol | Provide context so William can change his mind and team up with Maria | Make a team of three | Let them discuss and check other students in the classroom]`, force: true, open: true});
  slides.push({ type: 'Enact', id: 'enact_3', text:`You: You know what, why don't we ask Carol to join to your team and work the three of you together. 

William, did you know that Carol is currently working on her graduate studies in computing, her research has big impact in similar area that your company is currently working on. 

Maria: That is fine professor, do not worry, I can try to work the problems by myself. 

[What action would you perform?]
[Let Maria work by herself  and William and Carol together | Split work between Carol and Maria and William | Let them discuss and check other students in the classroom]
`, force: true, open: true});
  slides.push({ type: 'Enact', id: 'enact_4', text:`You: I really would like that everybody share their understanding on this. So please be patient.

Carol: I can help Maria if is possible. I am little confused on recursion also, Maria can you help me out on? 

[What action would you perform?]
[Let Maria and Carol work together | 
Keep insisting that William and Maria should work together | Let them discuss and check other students in the classroom]
`, force: true, open: true});
  slides.push({ type: 'Enact', id: 'enact_5', text:`William: That is fine professor, I can work with my partners. But there is only two problems, and I know how to do both of them.

[How would you delegate the assignation of the problems under this situation?]
[ Work all together in one computer |
All of you solve the same problem separately and the compare | Maria and Carol work in problem 1 and William on 2, then discuss together ]
`, force: true, open: true});
  slides.push({ type: 'Enact', id: 'enact_6', text:`You: There are some ways to make this work together, why don't you do number 2, and have Maria and Carol work on Number 1? -- you walk across the room to check other students work, while you are walking away you listen to Carol and Maria working together and William work on his own. 

Carol: (speaks in Spanish to Maria) Let us work on problem 1, let us do this using a loop first to demonstrate how it works, then we can translate them into recursion.

[What action would you perform?]
[Let them work in their work |
Specify to only speak English and not Spanish |
Translate what they say to William]
`, force: true, open: true});
  slides.push({ type: 'Enact', id: 'enact_7', text:`William: [observes the work that currently Maria and Carol are doing, i.e., loop-based methods instead of the recursive-based ones] You are doing the incorrect process, you need to do recursive methods not iterative.

Carol: Oh! We know, we are doing something first.

[What action would you perform?]
[Have Maria and Carol to explain their work |
Intervene and stop the work they are doing and keep them back to assignment]`, force: true, open: true});
  // Reflect 

  slides.push({ type: 'Reflect', id: 'reflect_1', text:`Maria feels comfortable working with Carol, after been working on the iterative-based problem together. Once they solve the iterative-based solution, it was easy the translation to recursive-based as Carol suggested. The fact that Carol spoke in Spanish to Maria, felt comfortable and created a safe environment to work. Once they solved the problem #1, they were able to provide solution to William, who solved the problem in different fashion. They can discuss now their solutions each other. 
    How might this outcome inform your future teaching practice? `, force: true, open: true});
  slides.push({ type: 'Reflect', id: 'reflect_2', text:`Despite the efforts of having a team of three, the problems are not easy to solve, due to the fact that recursion is challenging. Working in teams with a hostile environment does not help. Maria feels out of scope, since Carol is a successful student and William already knows this material.
    How might this outcome inform your future teaching practice? `, force: true, open: true});
  slides.push({ type: 'Reflect', id: 'reflect_3', text:`William learned a different way to solve recursion, by learning how to decompose a problem into iterative-based form and then translate it into recursion. Despite the fact that he doesn’t understand Spanish, he was able to recognize the work done by Maria and Carol, and now he can share his work with them after discussing their solutions.
    How might this outcome inform your future teaching practice? `, force: true, open: true});
  slides.push({ type: 'Reflect', id: 'reflect_4', text:`After working in the activity, William feels excluded from Maria and Carol, since now Maria and Carol communicate in Spanish and work on the activity doing through different approach.
    How might this outcome inform your future teaching practice? `, force: true, open: true});

  slides.push({ type: 'Reflect', id: 'reflect_5', text:`Maria found a partner that shares similar needs and context, specially the speaking language.

How might this outcome inform your future teaching practice? 
`, force: true, open: true});
  slides.push({ type: 'Reflect', id: 'reflect_6', text:`Solving the problem in Spanish, permitted Maria to understand the context on what the problem is. Although the course is in English, understand the concepts may be meaningful in Spanish.

How might this outcome inform your future teaching practice?
`, force: true, open: true});
  slides.push({ type: 'Reflect', id: 'reflect_7', text:`Although William yield to work in teams after insisting, he was able to learn different strategies from his partners.

How might this outcome inform your future teaching practice?
`, force: true, open: true});


  return slides;
}


export default {
  questionsFor(cohortKey) {
    return slidesFor(cohortKey);
  }
};