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
  slides.push({ type: 'Context', id: 'context_1', text:`Imagine you’re teaching a CS course for the first time. 

Your 1 hour class begins at 9am, and you have 20 students on your roster.
`});
  slides.push({ type: 'Context', id: 'context_2', text:`After a month of teaching, you notice attendance begins to drop.

During the second month of teaching, the curriculum calls for a 3-week group project. 

[How are the students grouped?]

Your class now has less than 50% of students showing up by 9:20a each day.

During office hours, students begin to complain about classmates who come in consistently late and therefore are unable to contribute to the project.
`});

  // Anticipate
  slides.push({ type: 'Anticipate', id: 'anticipate_1', text:`There are three similar projects ahead in the curriculum. What are some best case and worst case scenarios for group work for the rest of the course?`, force: true, open: true});
  slides.push({ type: 'Anticipate', id: 'anticipate_2', text:`How can you plan for better group engagement in the future?`, force: true, open: true});

  // Enact
  slides.push({ type: 'Enact', id: 'enact_1', text:`During class, students begin to complain about classmates who come in consistently late or not at all and therefore are unable to contribute to the project.

How would you respond?

1. Send an email to the entire class
2. Place calls home 
3. Check in with students individually
4. [Readjust the groups or the project]
`, force: true, open: true});
  slides.push({ type: 'Enact', text:`One week into the project, attendance continues to be poor. 

One student comes to office hours to ask for help.

Alex (student): “Everyday someone is missing, and I’m not sure what to do.”

How would you respond?`, force: true, open: true});
  slides.push({ type: 'Enact', id: 'enact_2', text:`Alex (student): “Can I just complete the project on my own?”

How would you respond?
`, force: true, open: true});
  slides.push({ type: 'Enact', id: 'enact_3', text:`Towards the middle of the project, one student who has multiple unexcused absences stops by to talk to you.

Morgan: I really like this class, but I’m really lost. I’m not sure how to catch up.

How would you respond?
`, force: true, open: true});
  slides.push({ type: 'Enact', id: 'enact_4', text:`Another student who has multiple unexcused absences comes to office hours.

Blake: I completed everything I needed to do, but the group keeps saying I didn’t.

How would you respond?
`, force: true, open: true});
  slides.push({ type: 'Enact', id: 'enact_5', text:`The project is due in three days and only two-thirds of the class seems to be ready to complete the project.

How would you respond?
`, force: true, open: true});
  slides.push({ type: 'Enact', id: 'enact_6', text:`At the end of the three weeks, all the projects are submitted. The average score is 60%.

How would you respond?
`, force: true, open: true});

  // Reflect
 
  slides.push({ type: 'Reflect', id: 'reflect_1', text:`What assumptions did you make about each student presented in the scenario?
`, force: true, open: true});
  slides.push({ type: 'Reflect', id: 'reflect_2', text:`During the simulation, how did you think about your role as a project facilitator?`, force: true, open: true});


  return slides;
}


export default {
  questionsFor(cohortKey) {
    return slidesFor(cohortKey);
  }
};