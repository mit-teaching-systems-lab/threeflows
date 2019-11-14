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
  slides.push({ type: 'Context', id: 'context_1', text:`Your state just implemented new K-8 CS standards and your district has made the decision to use Scratch lessons to meet these standards. 

Although you remember being briefly introduced to it during a one-hour professional development, you are nervous about meeting all these new standards. 

One of these standards is for grades 3-5: “Create programs that include sequences, events, loops, and conditionals.” 
`});
  slides.push({ type: 'Context', id: 'context_2', text:`You know that you have several students who have had experience with Scratch and some that participate in your afterschool robotics club. 

However, many of your students have no experience with computer science. 
`});

  // Anticipate
  slides.push({ type: 'Anticipate', id: 'anticipate_1', text:`Before you try this lesson, how does this situation make you feel?`, force: true, open: true});
  slides.push({ type: 'Anticipate', id: 'anticipate_2', text:`Knowing that your district has provided you with a lesson plan and slides that meet this standard, how might you prepare yourself to teach this lesson?`, force: true, open: true});
  slides.push({ type: 'Anticipate', id: 'anticipate_3', text:`Before you begin your lesson, what issues do you think could come up? How do you think the lesson will go?`, force: true, open: true});

  // Enact
  slides.push({ type: 'Enact', id: 'enact_1', text:`You walk through the activity using the given lesson plan and specific slides that were provided to you by the district. 

However, as you walk around the classroom, you notice that several of your students are off task, using blocks that you didn’t cover. What do you do next?
`, force: true, open: true});
  slides.push({ type: 'Enact', id: 'enact_2', text:`One of your students call you over. “I can’t figure out why this block isn’t working - it’s not doing what it’s supposed to do.” You have no initial idea why the block isn’t working. What do you do next?`, force: true, open: true});
  slides.push({ type: 'Enact', id: 'enact_3', text:`As you walk through the classroom, a student loudly pronounces, “I don’t understand why we are even doing this. I’m never going to be a coder.” What do you do next?`, force: true, open: true});
  slides.push({ type: 'Enact', id: 'enact_4', text:`You have several students tjat have finished the product and are really excited and motivated to continue. “That was really cool! What if I wanted to make it more interactive? How can I important pictures of myself into here? Can we work on this together?” What would you do next?`, force: true, open: true});
  slides.push({ type: 'Enact', id: 'enact_5', text:`A student puts their head in their hands in frustration. When you approach her, she tells you “I just can’t do this! I’ve never been good with technology and it never works the way I want it to.” What would you do next?`, force: true, open: true});
  slides.push({ type: 'Enact', id: 'enact_6', text:`As you are leading the lesson, one of the blocks you’ve put in there isn’t working. You can’t figure it out and one student begins loudly voicing what you did wrong. They go so far as to come up to the teacher computer and take over your keyboard and mouse. What do you do next?`, force: true, open: true});

  // Reflect
 
  slides.push({ type: 'Reflect', id: 'reflect_1', text:`During the simulation, were there any situations that were more challenging for you to deal with? Why do you think that situation was more challenging?`, force: true, open: true});
  slides.push({ type: 'Reflect', id: 'reflect_2', text:`Thinking back on these example situations, is there anything you could have done to better prepare yourself before beginning the lesson?`, force: true, open: true});
  slides.push({ type: 'Reflect', id: 'reflect_3', text:`What professional strengths and weaknesses did you recognize based on this simulation? In other words, what areas would you want to work on as a teacher to be better prepared?`, force: true, open: true});


  return slides;
}


export default {
  questionsFor(cohortKey) {
    return slidesFor(cohortKey);
  }
};