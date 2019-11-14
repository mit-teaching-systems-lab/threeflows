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
  slides.push({ type: 'Context', id: 'context_1', text:`You are a new teacher who will be teaching mathematics and computer science in a high school

The school is predominantly minority, and has been labeled for several years as “underperforming” 

You are getting settled into your classroom and are visited by 2 veteran teachers.

Veteran Teacher 1:  Why did you pick our school to teach?  We have terrible students who lack motivation and don’t like learning.

Veteran Teacher 2:  What we need are different students - good students.  If we had the right students we would not be labeled as “underperforming.”

Your Response: I came here to make a difference and hope I can help all students learn.

Veteran Teacher 1:  Good luck.  We hope you stay, but don’t blame you if you leave for a better school.
`});
  slides.push({ type: 'Context', id: 'context_1', text:`The principal in the school is committed to making a difference and providing opportunity for all students to succeed.  However, many of the teachers seem to be burned out and blame the students, families, and neighborhoods for the lack of success of the school.

Principal: “We are working on shifting the perceptions of the teachers in the school toward considering how they can enhance the learning of others and adjust to the students needs, culture, and capacity.  Now the teachers hold a deficit mindset of their students.”

Your Response: “ I am not sure what to expect, the teachers seem to blame the students and neighborhood.  I like the challenge, but I also want to develop good working relationships with my colleagues, so I do not want to tell them they are wrong.  This will be an interesting challenge…”

Principal:  “ KNow, we are pleased you are here!  Also, please let me know how I can help or need to share.”
`});

  // Anticipate
  slides.push({ type: 'Anticipate', id: 'anticipate_1', text:`What is the teacher’s role in enhancing the performance of under-performing schools?`, force: true, open: true});
  slides.push({ type: 'Anticipate', id: 'anticipate_1', text:`How do you develop relationships with colleague who hold opposing perspectives of education equity?`, force: true, open: true});
  slides.push({ type: 'Anticipate', id: 'anticipate_1', text:`How do you address issues of perceptions of students based on their culture, social economic status, or demographics?`, force: true, open: true});
  slides.push({ type: 'Anticipate', id: 'anticipate_1', text:`How do you respond to colleagues that blame students, parents, and neighborhoods for the lack of students achievement in school?,`, force: true, open: true});

  // Enact
  slides.push({ type: 'Enact', id: 'enact_1', text:`You are sitting down with the department teachers for a meeting when they start complaining about the students and how their parents don’t care about their education.

Veteran Teacher 1 turns to you and shares, “You will find out very soon the parents don’t care about their kids getting an education,.”

Veteran Teacher 2 responds, “If they were educated then they would be more inclined to see the value of education and hold their kids accountable in school.”

They turn to you and ask you what you think.

How do you respond to the teachers blaming the neighborhood and students for the school underperformance?
`, force: true, open: true});
  slides.push({ type: 'Enact', id: 'enact_2', text:`Later as you are preparing for the students to arrive for the first day of class, one of the school counselors comes to talk with you about a few of the students in your Computer Science course, that include students who are reading below grade level and struggling with basic mathematics.

Counselor, “In our school we have many students who lack basic skills expected for a high school student.  I hope you are able to engage them and get them interested in computer science.  How might you approach this situation?

How do you respond to the counselor?
`, force: true, open: true});
  slides.push({ type: 'Enact', id: 'enact_3', text:`After the first week of classes you are beginning to get to know your students and forming relationships with them.  They seem motivated to learn.

On Friday after classes you are visited by a veteran teacher who begins by complaining about her students.

Veteran Teacher: “These students are hopeless, I don’t know how you are ever going to teach them computer science, they care barely read.”

The veteran teacher is prompting you to also complain about the students.

How do you respond to the teacher.
`, force: true, open: true});
  slides.push({ type: 'Enact', id: 'enact_4', text:`In the second week of classes you are having lunch with your new colleagues.  Some of the teachers are again complaining about their students and one of the other teachers, whom has been quiet in other meetings, speaks up.

Other Teacher: “I know it is easy to blame the students, their families, and neighborhood, but we have a responsibility for educating our students - and we can make a difference in the school performance.”

The veteran teachers who were complaining about the students, shake their heads and laugh, and one of the teachers turns to you and asks, “What do you think about that?  Can we make a differences with these students, from those neighborhoods, and with those parents?”

How do you respond?
`, force: true, open: true});
  slides.push({ type: 'Enact', id: 'enact_5', text:`A month into school you are teaching your students some fundamental ideas about variables.  

Early in the lesson one of the students shares, “I have no idea about what you are talking about - this make no sense.”

THe concepts you are teaching are basic mathematical concepts that you would expect any student taking computer science to understand.

What do you do in response to the students’ lack of knowledge and underpreparedness to learn computer science?
`, force: true, open: true});
  slides.push({ type: 'Enact', id: 'enact_6', text:`After the experience with the students that revealed their under preparedness, one of the veteran teachers visits your classroom after school.

Veteran teacher, “I heard you expected the students to understand some fundamental ideas about variables.  Like we have been telling you, we have the wrong students to be successful.  Why do you even bother trying to teach them computer science?”

How do you respond to the teacher?
`, force: true, open: true});
  slides.push({ type: 'Enact', id: 'enact_7', text:`Halfway through the semester the principal visits you in your classroom.

Principal: I have hear you are developing good relationships with your students, but they are also struggling to learn concepts.  What can I do to help you and the students be successful?”


How do you respond to the principal?
`, force: true, open: true});
  slides.push({ type: 'Enact', id: 'enact_8', text:`During your first semester at a parent teacher evening event you are approached by a parent of one of your students.  The student lacks some fundamental mathematics skills, but is making progress in learning computer science.

Parent: “My child really likes your class and says they you treat him different that her other teachers.  He is talking about computer science as a career, but was told by one of his other teachers that he needs to be smarter to be successful.  Why did the teacher say that and what do you think about his ability?”

How do you respond to the parent?
`, force: true, open: true});

  // Reflect
 
  slides.push({ type: 'Reflect', id: 'reflect_1', text:`How do you maintain working relationships with colleagues that don’t accept responsibility for student learning if you think that teachers should be held accountable for student performance?`, force: true, open: true});
  slides.push({ type: 'Reflect', id: 'reflect_2', text:`What should teachers do when their students are underprepared for courses and struggle with fundamental ideas needed to learn computer science?`, force: true, open: true});
  slides.push({ type: 'Reflect', id: 'reflect_3', text:`Share a philosophy of equity with colleagues that are not inclined to consider issues of culture, demographcis and SES as being influential on learning? `, force: true, open: true});
  slides.push({ type: 'Reflect', id: 'reflect_4', text:`How would you leverage principal support to enhance student learning and engagement?`, force: true, open: true});


  return slides;
}


export default {
  questionsFor(cohortKey) {
    return slidesFor(cohortKey);
  }
};