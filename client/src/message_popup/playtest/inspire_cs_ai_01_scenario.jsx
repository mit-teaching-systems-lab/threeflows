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

  slides.push({ type: 'Overview', id: 'overview_1',  el:
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
  slides.push({ type: 'Context', id: 'context_1',  text:`You are a teacher of CS for High School seniors. The school serves students from both rural and urban areas, and this is your first semester teaching the course.  The material is largely predetermined, and to stay on schedule, you need to start the course by immediately getting the students familiar with the Java programming language, and creating basic software projects. The course is structured to be four days of lecture and demonstration, followed by one day in the school computer lab.

It is the first week of class, and you begin lecture by motivating the need for programming languages and software. You spend a day demonstrating the basics of the language: syntax, variables, and running the code. Then later in the week, you plan to have students work on their own, with school computers, to write their first “hello world” program.
`});
  slides.push({ type: 'Context', id: 'context_2',  text:`The students have been attentive so far, and many seem even very excited to learn about computers, saying that they might want to study programming later in college.

However, once you start the lab activity, you notice that several students, who you know come from poorer, more rural areas, have difficulty even opening their programming editor, manipulating windows with the mouse, and typing with the keyboard.
`});

  // Anticipate
  slides.push({ type: 'Anticipate', id: 'anticipate_1',  text:`What are some possible outcomes that result from the various student social backgrounds?
`, force: true, open: true});
  slides.push({ type: 'Anticipate', id: 'anticipate_2', text:`What are the reasonable expectations for a CS teacher to have of his or her students just beginning the course? Which of these expectations might fall under the standard school curriculum? Which might you expect to be acquired outside of school?`, force: true, open: true});
  slides.push({ type: 'Anticipate', id: 'anticipate_3', text:`What perceptions of CS do you think your students might have before beginning the class? Which of those would you hope to change or reinforce?`, force: true, open: true});

  // Enact
  slides.push({ type: 'Enact', id: 'enact_1', text:`You walk over to one of the students, Madison, and seeing her hunting-and-pecking at the keyboard to try typing her first main function. She spends almost the entire time looking down at the keyboard, not realizing the numerous syntax errors that appear on the IDE.

When she thinks she’s replicated the necessary code, she clicks the “run program” button, only to be greeted with numerous error messages. She appears visibly frustrated and confused by the errors, apparently giving up for the moment.

It is nearing the end of the class period, with only a few minutes left. How might you respond to Madison in that time.
`, force: true, open: true});
  slides.push({ type: 'Enact', id: 'enact_2', text:`[Maybe provide a screenshot of badly malformed Java? Windows badly sized and positioned on the screen?]

By the time you notice Madison’s struggle, it is near the end of the period and you do not have time to address all of her programming errors. Instead, you decide to continue the lab activity next week. You ask the students to save their files in a common location so that you can look over them outside of class.

When doing this, you find some common issues with students (Madison included) having hardly even started their first program. Some have completed it perfectly and neatly, others have completed it with some slightly messy formatting or coding style.

How might you plan to address this during the next class period?
`, force: true, open: true});
  slides.push({ type: 'Enact', id: 'enact_3', text:`The next week, during the non-lab session, you give a short quiz that does not require directly writing code, but rather identifying logical steps and syntax. When grading the quizzes, almost all of the students have grasped the high-level logical concepts, but do not perform well on syntax errors and debugging.

What conclusions might you draw, comparing this week the previous weeks’ lab session? How much might you change about the lab session?
`, force: true, open: true});
  slides.push({ type: 'Enact', id: 'enact_4', text:`In the next week’s lab session, you ask the students to use some basic control-flow and logical constructs in their program. The students who were having some technical trouble improve slightly, but still need lots of extra assistance to see syntax errors, and even finding the correct way to start the IDE and executing the program, and then finding and interpreting the output. At the same time, there are other students who need help with the current material (conditionals, variable types).

The students who were struggling in the first week fall further behind, still not grasping that variables need types, or that brackets must be matched in the main Java class and function.

How might you try to balance these students’ needs?
`, force: true, open: true});

  // Reflect
 
  slides.push({ type: 'Reflect', id: 'reflect_1', text:`How did the students with little or no technological exposure experience the CS course?`, force: true, open: true});
  slides.push({ type: 'Reflect', id: 'reflect_2', text:`What could you do, a priori, to offset the difficulties that arise from the encountered struggles with technology in general, especially in a class that relies heavily on technological literacy?`, force: true, open: true});
  slides.push({ type: 'Reflect', id: 'reflect_3', text:`What was your general strategy to cope with student difficulties that arose from not having the social or economic background that would enable your expectations of the class?`, force: true, open: true});
  slides.push({ type: 'Reflect', id: 'reflect_4', text:`If you spent extra personal or class time to “catch up” the students who did not meet the technical literacy expectation of the class, how did you balance that against your obligation to properly prepare the other students for further CS studies?`, force: true, open: true});
  slides.push({ type: 'Reflect', id: 'reflect_5', text:`How to triage? Give confidence?`, force: true, open: true});


  return slides;
}


export default {
  questionsFor(cohortKey) {
    return slidesFor(cohortKey);
  }
};