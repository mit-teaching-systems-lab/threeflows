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
  slides.push({ type: 'Context', id: 'context_1',  text:`This is a centralized high schools that is getting middle school students from three very different performing schools. Middle school A is in an affluent area, Middle School B is from the railtrack  working parents neighborhood and Middle School C is a middle class area.

Having been here for a year now you have noticed that students from middle school B and C do not perform as well at the beginning of programming in highschool  and you have decided that the best way to revisit the introduction concepts is to use block programming for all students to visually see how everything connects and use a familiar teaching programming tool.
`});
  slides.push({ type: 'Context', id: 'context_2', text:`Students from middle school A who had very good grasp of programming seems very frustrated that in high school they are using block programming and many of them are requesting to be withdrawn from CSI because they see this as beneath them programming in blocks in high schools.

 Parents are calling the school and demanding that their students not be given substandard curriculum for high school. 

How do you address the angry parents knowing  very well that your aim is to distract preparatory privilege of those students from middle school A that is considered the upper class high school and students are known to openly challenge teachers curriculum.
`});

  // Anticipate
  slides.push({ type: 'Anticipate', id: 'anticipate_1', text:`How do you think that the parent will respond?

Do you foreshadow the parent  refusing to understand or accept your explanation of why you have chosen to used block programming for the first six week of the school?
`, force: true, open: true});
  slides.push({ type: 'Anticipate', id: 'anticipate_2', text:`1. How would you demonstrate to the parent that student are successful and challenged learning using this method of introduction to high school programming course?

2. From your perspective how will you demonstrate to the parents the success of  the students to ensure that the parent is able does not leave the conference frustrated but other has bought into your way of introducing high school programming
`, force: true, open: true});
  slides.push({ type: 'Anticipate', id: 'anticipate_3', text:``, force: true, open: true});

  // Enact
  slides.push({ type: 'Enact', id: 'enact_1', text:`1. How to you assure your student from middle school A that they are learning new advance concepts even though they are using block programming.
2. How do you check to make sure that the student from middle school B and C are not been negatively affected by the negativity that has been introduced in the classroom about block programming.
3. What do you do when you find out that students are passing around petitions to have this class changed that teachers should not teach high school using programming using block language. 
`, force: true, open: true});
  slides.push({ type: 'Enact', id: 'enact_2', text:`1. Parents walks in an says I am a programmer and I don’t understand what you think you are teaching our students.  My students is looking top to go to top universities. Teaching them this shallow blocking curriculum will not help.  You need to change this and start challenging my student otherwise we will have you fired.

2. Ms. Parent I want you to know that the curriculum were doing is not at all shallowing.  I am making sure that student have a proper grasp of programming techniques as well as group working  concepts because this course involves many group projects. 
`, force: true, open: true});
  slides.push({ type: 'Enact', id: 'enact_3', text:`How do you demonstrate to the parent that the student are learning new material and it is high standard though the media is one that they have already used in middle school`, force: true, open: true});
  slides.push({ type: 'Enact', id: 'enact_4', text:`Do You bring out the students assignments and demonstrate to parent that you are meeting the standards of a 9th grade computer science students as mandated by the district or state`, force: true, open: true});
  slides.push({ type: 'Enact', id: 'enact_5', text:`Why are you going to bring out the standards and the students work.  How will you address the parents to make sure that they understand where you're coming from without letting them know that you are meeting equity for all student in your classroom by using a medium that all the students are very familiar with`, force: true, open: true});

  // Reflect
 
  slides.push({ type: 'Reflect', id: 'reflect_1', text:`1. How do you think you should communicate the needs and requirements of computer science one to both parents and teachers.

2. Should you have a norms of the classroom at the beginning of the school year and explain to students the true aspects of learning programming and why the medium is not the important part of the class but the material that is covered. 
`, force: true, open: true});
  slides.push({ type: 'Reflect', id: 'reflect_2', text:`Do you think it would be a good idea to have the parents during the open house understand importance of having an introduction computer science class that is accessible to all students and letting them know it meets all the standards. `, force: true, open: true});
  slides.push({ type: 'Reflect', id: 'reflect_3', text:`How would you react if your principals calls you to the office to talk about the calls they are receiving from parents and students?  `, force: true, open: true});


  return slides;
}


export default {
  questionsFor(cohortKey) {
    return slidesFor(cohortKey);
  }
};