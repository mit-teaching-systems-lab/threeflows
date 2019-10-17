/* @flow weak */
import React from 'react';

type TextQuestionT = {
  type:string, // Used as a label
  text:string,
  ask:?bool, // Ask for open-ended user response?
  force:?bool // Force the user to respond?
};
type ReactQuestionT = {
  type:string, // Used as a label
  el:any, // React node
  ask:?bool, // Ask for open-ended user response?
  force:?bool // Force the user to respond?
};
export type QuestionT = TextQuestionT | ReactQuestionT;

var slides:[QuestionT] = [];


// Consent
slides.push({ type: 'Consent', text:
`Optionally, we'd like to use your responses here for a  research study at MIT.  We would like to compare the responses across participants.

Your responses would be included in the research, along with data from your response to a survey.  All data you enter is stored securely and protected on a secure server on Google Drive, Amazon Web Services or Heroku.  You may print a copy of this form for your records. 

You can continue playing the game either way.  Participation in the research study is voluntary.

More details:
You have been asked to participate in a research study conducted by the staff and researchers at the Teaching System Laboratory (TSL) at the Massachusetts Institute of Technology. 

Purpose of study:
The purpose of this study is to investigate how emotional expression in responses to teacher momments relates to expression that indicate confusion or struggle to better understand the interplay between emotion and cognition during learning.  All participants will be over 18.

Study results:
The results of this study will be used for ongoing research conducted by TSL in preparing and supporting effective, well-prepared teachers. Results of the study will be shared through conference papers, journal articles, websites, online blogs, tweets, and other materials. All information will be reported anonymously. 

Data collection:
Data collection will include online log file data including responses participants submit within learning experiences.  These may include things like: written or typed responses, clicks or taps within the learning experience, or audio or video recordings participants create.  Beyond sharing and social elements directly within the learning experience, the data will be used only for analysis or to share with other participants as they choose.  Data will be stored securely in Google Drive, Amazon Web Services and Heroku. 

Participant information:
Participating in this study is voluntary. 
You will not be compensated for participating in the study.
Your email and any other personally identifiable information will be confidential.
Your anonymized responses may be shared with other players as part of the game. 

Study timeframe:
This project will be completed by March 1, 2020.  After that date, participant data will be deleted. 

Informed Consent: 
I understand the procedures described above. My questions have been answered to my satisfaction, and I agree to participate in this study.

Contact information:
Please contact Dr. Justin Reich (jreich@mit.edu) or Garron Hillaire, (garron@mit.edu) with any questions or concerns. If you feel you have been treated unfairly, or you have questions regarding your rights as a research subject, you may contact the Chairman of the Committee on the Use of Humans as Experimental Subjects, M.I.T., Room E25-143b, 77 Massachusetts Ave, Cambridge, MA 02139, phone 1-617-253-6787.
`, force: true, choices: ['No Thanks', 'I Consent']});


slides.push({ type: 'Overview', el:
<div>
  <div>1. Review context</div>
  <div>Imagine yourself working as a teacher in the particular school and classroom.  You won't know all the answers, and will have to improvise and adapt to make the best of the situation.</div>
  <br />
  <div>2. Anticipate</div>
  <div>Skim any background on the student, lesson or scenario.  You shouldn't have an in-depth understanding of everything, but do your best to anticipate what might happen.</div>
  <br />
  <div>3. Try it!</div>
  <div>When you're ready, you'll go through a set of short scenes that simulate interactions between you and a student or students in the class.</div>
  <br />
  <div>4. Reflect</div>
  <div>Finally, you'll reflect on your experience.</div>
  <br />
  <div>5. Discussion</div>
  <div>When you're all done here, head back to the classroom to rejoin the group.  If you're online, connect with others at <a target="_blank" rel="noopener noreferrer" href="https://twitter.com/search?q=%23TeacherPracticeSpaces">#TeacherPracticeSpaces</a>.</div>
</div>
});


// Context
slides.push({ type: 'Context', id: 'context_1', text:
`You're the teacher of a 10th-grade honors physics class at Stratford High School.

Stratford is a high school in Nashville, TN with with a student population that is 70% Black.
`});

slides.push({ type: 'Context', id: 'context_2', text:
`One student in your class is Darius Miller, a fifteen-year-old, Black, male student.  He is creative, hardworking, and very social, but he is often talking when he is not supposed to be in class.

Darius is not the only student who talks when he is not supposed to, but it seems like you hear his voice more often and louder than anyone else.
`});

slides.push({ type: 'Context', id: 'context_3', text:
`In class today, Darius walked out of class after you teacher called him out for talking when he was not supposed to be.  Darius had always been previously receptive to your efforts to mitigate his talking in class, so you've asked him to come by and talk after school.
`});


// Anticipate
slides.push({ type: 'Anticipate', id: 'anticipate_1', text:
`Before you begin, we have three questions about what you anticipate.
`});

slides.push({ type: 'Anticipate', id: 'anticipate_2', text:
`After skimming the scenario, what do you anticipate might happen?
`, ask: true, force: true});

slides.push({ type: 'Anticipate', id: 'anticipate_3', text:
`What's are some best case and worst case scenarios for the student?
`, ask: true, force: true});

slides.push({ type: 'Anticipate', id: 'anticipate_4', text:
`What would success for the student look like here?
`, ask: true, force: true});



// Try it!
slides.push({ type: 'Try it!', id: 'enact_1', text:
`When you're ready, you'll go through a set of scenarios that simulate the conversation between you and Darius.

Improvise how you would act as a teacher in those moments.  Click and speak aloud the words you'd say to Darius, or say nothing.

Ready to start?
`});


slides.push({ type: 'Try it!', id: 'enact_2', ask: true, text:
`Darius walks in and sits down.

Darius: So, what do you want to talk about?
`});

slides.push({ type: 'Try it!', id: 'enact_3', ask: true, text:
`Darius: I know I’m talking sometimes when I’m not supposed to be, but so are other kids and you don’t call them out like you do me.
`});

slides.push({ type: 'Try it!',id: 'enact_4', ask: true, text:
`Darius: I just felt like there were other students also talking.  Why you always gotta call out the Black kid?
`});

slides.push({ type: 'Try it!', id: 'enact_5', ask: true, text:
`Darius: For me, the situation was that... say there was five people talking in class and I was one of them and the rest were White people or something else. I mean, the odds of that is just kind of like, Oh, Darius is being singled out.
`});

slides.push({ type: 'Try it!', id: 'enact_6', ask: true, text:
`Darius: It feels like this happens in other classes too, and now I'm just the Black kid who's always complaining.
`});

slides.push({ type: 'Try it!', id: 'enact_7', ask: true, text:
`Darius: Like one day in the lunchroom I was signed out with another Black student for being loud in a group of rowdy football players.

Another time this week I we were talking about Michael Brown and Ferguson in class and the teacher asked me for the token Black opinion.
`});

slides.push({ type: 'Try it!', id: 'enact_8', ask: true, text:
`Darius: I don't really get what happened, and am not sure what I could have done differently other than just sitting there.
`});

slides.push({ type: 'Try it!', id: 'enact_9', ask: true, text:
`Darius: Alright, thanks.  I have to head home.
`});




// Reflect
slides.push({ type: 'Reflect', id: 'reflect_1', text:
`That's the end of the simulation.  Thanks!

Let's shift to reflecting on the lesson.
`});

slides.push({ type: 'Reflect', id: 'reflect_2', text:
`Before heading back to the group, we have three questions about what you experienced in this simulation.

After that, you'll have a minute to think about the first group discussion question before heading back.

Also, for now please hold questions or feedback about this activity itself.  We'll ask for that at the end.
`});

slides.push({ type: 'Reflect', id: 'reflect_3', text:
`During the simulation, how did you think about your role as a teacher?
`, ask: true, force: true});

slides.push({ type: 'Reflect', id: 'reflect_4', text:
`How did Darius experience the situation?
`, ask: true, force: true});

slides.push({ type: 'Reflect', id: 'reflect_5', text:
`Did you notice any social dynamics related to race, ethnicity, gender or class?
`, ask: true, force: true});

slides.push({ type: 'Reflect', id: 'reflect_6', el:
<div>
  <div>Finally, pick one moment to talk about during the group discussion.</div>
  <br />
  <div>In the group, you'll be asked to describe what you noticed, any assumptions you made, and how that shaped your interactions with the student.</div>
  <br />
  <div>Feel free to take a minute or two to think about that, and then head on back!  If you're working online you can connect with other folks at <a target="_blank" rel="noopener noreferrer" href="https://twitter.com/search?q=%23TeacherPracticeSpaces">#TeacherPracticeSpaces</a>.</div>
</div>
});



export const DariusSlides = {
  questions() {
    return slides;
  }
};
