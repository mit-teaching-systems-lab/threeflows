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
  slides.push({ type: 'Context', id: 'context_1', text:`Ms. Riley is a 5th grade teacher and she is teaching her students how to use Scratch. She plans to use Scratch throughout the year to support students’ understanding of computer science concepts while also doing ELA activities (character development, story arc, etc.)

Ms. Riley has 22 students in her class. Ms. Riley is a White teacher, and her students are also primarily White. There are three students of color in the class, two Latinas and one Black male. One of the Latinas, Ivelisse, lives with her grandparents who adopted her, after her parents were unable to care for her due to addiction issues. 

The grandparents attend the parent-teacher conference at the beginning of the year, and they let Ms. Riley know Ivelisse has been adopted and that she has trouble sleeping. They have also told her that a therapist Ivelisse is seeing has told them that Ivelisse is suffering from PTSD.

`});
  slides.push({ type: 'Context', id: 'context_2', text:`Ivelisse’s class work is average and she is always on time and in class. She is generally pleasant whenever she speaks with Ms. Riley, but she is usually very quiet. Also, Ivelisse sometimes seems very disengaged from what is going on in the classroom. But, she has shown a lot of interest in Scratch.

Today Ms. Riley is introducing loops to students in the class. She begins her demonstration at the front of the class and she notices that Ivelisse has put her head down on her desk and closed her eyes, as if she is going to sleep.

Ms. Riley clicks on the control link in Scratch to bring up the control blocks. She asks the students to think about what each of the blocks do and then asks for some ideas from the students. Different students raise their hands, Ms. Riley calls on a student, Raymond, seated next to Ivelisse. 

Raymond guesses that a repeat block will make something happen over and over. Though Raymond is sitting right next to Ivelisse, she does not raise her head.
`});

  // Anticipate
  slides.push({ type: 'Anticipate', id: 'anticipate_1', text:`What matters most in the classroom, content learning? Or a child’s emotional well-being?

What should the teacher do to help students engage and participate in class activities when outside emotional issues (such as trauma) distract the student?

What sorts of classroom learning activities might work best for students suffering trauma?

What are some best case and worst case scenarios for the student regarding learning in this class?

What would success look like for this student?
`, force: true, open: true});

  // Enact
  slides.push({ type: 'Enact', id: 'enact_1', text:`You are going to play the role of Ms. Riley in this scenario, read the dialogue below and answer the following question. 

Ms. Riley nudges Ivelisse on the shoulder as she asks for another show of hands. Ivelisse raises her head.

Ms. Riley: Ivelisse, what do you think the wait for block will do?

Ivelisse: Hmmm?

Ms. Riley: Ivelisse, the wait for block on the screen, what will it do?

Ivelisse: Ms. can I go to the bathroom? I have to use the bathroom.

Ms. Riley: Yes, but can you take a guess about the block, first? What will it do?

Ivelisse: I don’t know, Ms.

What should you do in this situation? Is there another way to have handled this situation? If so, what would that be?
`, force: true, open: true});
  slides.push({ type: 'Enact', id: 'enact_2', text:`Ivelisse leaves the room, goes to the bathroom and then returns to class. Once she is back in class, she puts her head back down on the table. 

Ms. Riley: Ivelisse, sit up, please.

Ivelisse: I’m tired, Ms.

Ms. Riley: I know, Ivelisse, but you need to pay attention in class. Please sit up.

What else could you say to Ivelisse in this situation? What else could you do?
`, force: true, open: true});
  slides.push({ type: 'Enact', id: 'enact_3', text:`Ms. Riley: Okay, everyone get your computers, we will now make a program that uses the blocks.

Ivelisse: Ms. can I go to the bathroom?

Ms. Riley: Ivelisse, you just got back from the bathroom, please get your computer.

Ivelisse: But, Ms. I really have to go.

Ms. Riley: Ivelisse you just went. You need to pay attention and do your work.

Ivelisse retrieves her computer, goes to her desk and begins to cry quietly.

What should you do in this situation?
`, force: true, open: true});

  // Reflect
 
  slides.push({ type: 'Reflect', id: 'reflect_1', text:`How/should teachers respond to the deep needs of particular students?

What role should the teacher play when a child with trauma disengages from class?

What sort of supports would the teacher need to work well with this student?

Is there a pedagogical strategy that would support the student’s engagement in the activity?
`, force: true, open: true});


  return slides;
}


export default {
  questionsFor(cohortKey) {
    return slidesFor(cohortKey);
  }
};