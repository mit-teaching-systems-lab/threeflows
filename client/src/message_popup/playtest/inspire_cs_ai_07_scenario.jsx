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
  slides.push({ type: 'Context', id: 'context_1', text:`You teach Civics & Government to 9th grade students.  Your high school includes approximately 2000 students (about 500 in each class!).  Your school district is in a first tier suburb of a large metropolitan area in the United States.  The entire school district as well as the high school are highly diverse in terms of social class, ethnic diversity, gender identification, and religion.

Your class meets every day Monday-Friday for 50 minutes, and you teach five sections of Civics & Government each day. 

Ms. Miller welcomes the students to class. She introduces the lesson topic to the class. Good morning 9th graders!  Welcome to class.  Today, we are going to consider and discuss a critical current event in our country and world, global climate change (can fill in the blank here).

Student #1:  Oh great!  This is going to be fantastic!  I love debates!

Student #2:  Oh good grief, we are going to have to listen to student #1’s opinions all over again.  We hardly ever hear about other perspectives. 
`});
  slides.push({ type: 'Context', id: 'context_2', text:`You noticed that when you want students to investigate diverse perspectives, most students do not participate verbally, and often the same students present their ideas about the controversial topics addressed in class. 

You noticed that your students are discussing controversial issues and difficult topics in the hallways and locker bays. They are interested in what is occurring in their world. 

From what you have seen in class, Student #1 enjoys conflict and discussion of controversial issues, and often dominates the class conversation.

At the same time, you have seen the non-verbals from other students in the class - they are losing patience with Student #1’s perspectives and dominance.
`});

  // Anticipate
  slides.push({ type: 'Anticipate', id: 'anticipate_1', text:`The social studies teacher’s role in the classroom is varied:  allow for multiple students’ voices and perspectives to be heard; ensure that students base their arguments and ideas on evidence; help students find and analyze evidence (research) OR present students with resources presenting various perspectives; set norms for classroom discussion and interactions; ensure that students of various backgrounds have access to the resources; teach students how to conduct a discussion about controversial issues using a process or protocol like structured academic controversy; allow students the opportunity to practice the protocol many times throughout the term.  This is not a one and done.

The students will need valid resources, and will need to know how to utilize and analyze those sources; they will need practice discussing controversial issues in a scaffolded manner; they will need to agree to and follow the norms for discussion of controversial issues; the students will need to be able to clearly, and cogently present at least one perspective with which they do not agree.
`, force: true, open: true});
  slides.push({ type: 'Anticipate', id: 'anticipate_2', text:`Successful student participation includes research of resources, democratic, collegial conversations. 

Teachers must be prepared for discussions well before the discussions commence.

Discussions may fall into disarray and cruelty if not properly structured.
`, force: true, open: true});

  // Enact
  slides.push({ type: 'Enact', id: 'enact_1', text:`Ms. Miller introduces the controversial topic of global climate change.  MM: “9th grader’s today we are going to consider and discuss global climate change.”

Student #1:  “Oh great!  This is going to be fantastic!  I love debates!”

Student #2:  Whispers to self, “Oh good grief, we are going to have to listen to student #1’s opinions all over again.  We hardly ever hear about other perspectives.”

MM:  What problems are occurring with global climate change?

Student #1:  Shoots hand up very quickly and interjects “there is no such thing as global climate change! It is all a left wing conspiracy!”

MM: Class, what other ideas do you have about global climate change? 

Student #2: Thinks to self, I am not going to say a word!  If I say what I really think, Student #1 will say something really snotty and bossy and mean. Forget it!”
`, force: true, open: true});
  slides.push({ type: 'Enact', id: 'enact_2', text:`Student #3:  Raises hand, and is about to ask a question, but another student interjects without indicating the desire to speak to the class.

Student #4:  Student #1, you are so full of yourself!  Global warming is a real thing, and as global citizens, we must address this problem.

Student #3:  Raises hand again, and wants to ask the same question, but is again interrupted.

Student #1:  “Student #4, you are so stupid!  How could you possibly fall for the climate change hoax.  I thought you were smarter than that.”

MM: “Student #3, you had a question.”

Student #3:  What is global climate change?”`, force: true, open: true});

  // Reflect
 
  slides.push({ type: 'Reflect', id: 'reflect_1', text:`How did different students experience the conversation about the controversial issue? Some social studies teachers are afraid to engage students in controversial issues.  What might be the impact of this fear on the teacher’s pedagogy, instruction, and assessment?

What might be the impact of this fear on the students’ learning in terms of garnering resources, critically analyzing resources, verbalizing ideas about controversial topics and content, preparing students for engaged citizenship in a democracy?

What might be the impact of conducting a structured academic controversy within and outside the school?

What role does classroom community have when discussing controversial issues?
`, force: true, open: true});
  slides.push({ type: 'Reflect', id: 'reflect_2', text:`Reflecting on your role as the teacher when facilitating discussion of controversial issues:

What actions and interventions would you carry out differently the next time you conduct a controversial discussion? Why?

What actions and interventions would you carry out similarly the next time you conduct a controversial discussion? Why?

How will you know that your students successfully participated in the controversial issues discussion?  What will it look like?  Sound Like? What evidence do you need to gauge student mastery of your learning objectives?

What enabling knowledge do students need in order to participate in a controversial issues discussion?
`, force: true, open: true});


  return slides;
}


export default {
  questionsFor(cohortKey) {
    return slidesFor(cohortKey);
  }
};