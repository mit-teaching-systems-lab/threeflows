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
  slides.push({ type: 'Context', id: 'context_1', text:`You are a 4th grade teacher at an elementary school in urban school that serves diverse populations of students. You have three science class period per week. You and your students have worked on a 8-week robotics unit, and students started to work on their final project.

For the final project, students are tasked to design and create a robotic toy that they can present to their kindergarten buddies.
`});
  slides.push({ type: 'Context', id: 'context_2', text:`Before forming groups, students came up with their ideas and presented each one’s idea to the whole class. Students picked the idea that they liked and formed a group to work on the project idea of their pick.

Daniel, Shawn, Emmanuel, and Lianne decided to work on their toy fire engine project. They are all excited to be part of the group and loved the idea of creating a robotic fire engine. 
`});

  // Anticipate
  slides.push({ type: 'Anticipate', id: 'anticipate_1', text:`What do you think the great group work looks like?`, force: true, open: true});
  slides.push({ type: 'Anticipate', id: 'anticipate_2', text:`What are the factors help you determine if a group worked well together?`, force: true, open: true});
  slides.push({ type: 'Anticipate', id: 'anticipate_3', text:`From your perspective, what is the best way to help group dynamics?`, force: true, open: true});

  // Enact
  slides.push({ type: 'Enact', id: 'enact_1', text:`Daniel, Shawn, Emmanuel, and Lianne were brainstorming ideas on how to build a robotic fire engine. After the discussion, Lianne started to draw her design of the fire engine, while Daniel jumped in to build a model by himself without discussing the details with the group. Daniel instructs Shawn and Emmanuel to gather the LEGO pieces he needs. While Shawn and Emmanuel continue to get LEGO pieces, Lianne keeps working on her drawing. 


Observing the group, what will you do?

Talk to the group
Talk to Daniel
Talk to Lianne
Keep observing

Select one and explain why
`, force: true, open: true});
  slides.push({ type: 'Enact', id: 'enact_2', text:`Lianne finished her drawing and looks at the fire engine that the other three are building. The structure does not seem sturdy and symmetrically. In addition, the wheels are used in the way that makes it difficult for the fire engine to turn.

Lianne continues to observe what other three are doing without saying anything to them.


You noticed that the group is not inclusively working together. What will you do?

Talk to the group
Talk to Daniel
Talk to Lianne
Keep observing

Select one and explain why
`, force: true, open: true});
  slides.push({ type: 'Enact', id: 'enact_3', text:`Emmanuel notices the drawing that Lianne made and says to the group, “Look, she has a nice design! Maybe we should build it!” Shawn looks at it and says “Oh nice!”

Daniel looks at it and been annoyed by Emmanual’s comment. He dismisses it and continue building. 


You noticed that Daniel does not seem to collaborate with the group.  What will you do?

Talk to the group
Talk to Daniel
Keep observing

Select one and explain why
`, force: true, open: true});
  slides.push({ type: 'Enact', id: 'enact_4', text:`Since Daniel continues building his fire engine, Emmanuel and Shawn go back to help him build.

Lianne looks at Daniel’s design, and quietly open a laptop and start programming for his robot.


You noticed that Lianne did not speak up about her design and move on to programming while the others continue building.  What will you do?

Talk to the group
Talk to Daniel
Talk to Lianne
Keep observing

Select one and explain why
`, force: true, open: true});
  slides.push({ type: 'Enact', id: 'enact_5', text:`When Daniel finished building his fire engine, he looks at Lianne and says “I can program. I am a master programmer. Boys are better than girls.” Lianne quietly turns the laptop to Daniel.


Daniel is not working collaboratively with the group.  What will you do?

Talk to the group
Talk to Daniel
Talk to Lianne
Keep observing

Select one and explain why
`, force: true, open: true});

  // Reflect
 
  slides.push({ type: 'Reflect', id: 'reflect_1', text:`Looking back, when do you think was the right time to intervene?

What did you struggle with?

How would you do grouping differently?
`, force: true, open: true});


  return slides;
}


export default {
  questionsFor(cohortKey) {
    return slidesFor(cohortKey);
  }
};