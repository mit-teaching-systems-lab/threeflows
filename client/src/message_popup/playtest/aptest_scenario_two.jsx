/* @flow weak */


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

  slides.push({ type: 'Consent', text:
`Optionally, we'd like to use your responses here for a joint research study between MIT and code.org.  We would like to compare the responses across participants.

Your responses would be included in the research, along with data from your code.org profile.  All data you enter is stored securely and protected on a secure server on Google Drive, Amazon Web Services or Heroku.  You may print a copy of this form for your records. 

You can continue playing the game either way.  Participation in the research study is voluntary.

More details:
You have been asked to participate in a research study conducted by the staff and researchers at the Teaching System Laboratory (TSL) at the Massachusetts Institute of Technology and code.org. 

Purpose of study:
The purpose of this study is to investigate how computer science teachers respond within learning experiences aimed at building skills in empathy, positioning students competently, and connecting student strengths and interests.  In particular, we aim to investigate teachers' responses within a simulated counseling scenario related to the AP CS Principles Exam. This will be conducted as a session within code.org workshops. Each workshop is run by a facilitator and contains roughly 10-20 teachers as participants.  The session will be blended, with some elements done synchronously and some done before or after the session asynchronously.  All participants will be over 18.

Study results:
The results of this study will be used for ongoing research conducted by TSL and code.org in preparing and supporting effective, well-prepared computer science teachers. Results of the study will be shared through conference papers, journal articles, websites, online blogs, tweets, and other materials. All information will be reported anonymously. 

Data collection:
Data collection will include online log file data including responses participants submit within learning experiences.  These may include things like: written or typed responses, clicks or taps within the learning experience, or audio or video recordings participants create.  Beyond sharing and social elements directly within the learning experience, the data will be used only for analysis or to share with other participants as they choose.  Data will be stored securely in Google Drive, Amazon Web Services and Heroku. 

Participant information:
Participating in this study is voluntary. 
You will not be compensated for participating in the study.
Your email and any other personally identifiable information will be confidential.
Your anonymized responses may be shared with other players as part of the game. 

Study timeframe:
This project will be completed by September 1, 2020.  After that date, participant data will be deleted. 

Informed Consent: 
I understand the procedures described above. My questions have been answered to my satisfaction, and I agree to participate in this study.

Contact information:
Please contact Dr. Justin Reich (jreich@mit.edu) or Dr. Joshua Littenberg-Tobias, (jltobias@mit.edu) with any questions or concerns. If you feel you have been treated unfairly, or you have questions regarding your rights as a research subject, you may contact the Chairman of the Committee on the Use of Humans as Experimental Subjects, M.I.T., Room E25-143b, 77 Massachusetts Ave, Cambridge, MA 02139, phone 1-617-253-6787.
`, force: true, choices: ['No Thanks', 'I Consent']});




  // Context
  slides.push({ type: 'Context', id: 'context_1', text:
`Today, you will be talking with a student named Emma.

In the conversation, your goal is to counsel Emma around taking the CSP AP exam. This conversation was designed utilizing interviews with CS teachers and their experiences talking with students about the AP exam.`
  });

  slides.push({ type: 'Context', id: 'context_2', text:
`Emma is a 10th grader who was placed in your CSP AP course. All 10th grade students must sign up for this course at your school, but students do not necessarily have to take the exam.

This is the first time that Emma has been in an AP course before. Historically, she has earned mostly B’s in her courses with a smattering of A’s.

Emma is a little shy in your class and doesn’t like to share during whole group discussions. She does high quality work on your assignments and pays attention to small details.`
  });

  slides.push({ type: 'Context', id: 'context_3', text:
`Since the beginning of the year, you’ve talked with your classes about the AP exam and highly encouraged students to sign up.

To support students in signing up for the AP exam, you’ve set some class time aside to create the Digital Portfolio. Students are told that creating their account will be added as a completion grade.

During this portion of class, Emma sinks into the corner and avoids you like the plague. `
  });


  slides.push({ type: 'Context', id: 'context_4', text:
`When you try to glance at Emma’s screen to see how much progress she has made, you notice that the screen is black (indicating that the computer went into sleep mode due to inactivity).

You keep meaning to check in with Emma during class but end up spending the majority of your time helping other students with technical issues and questions about what certain things mean.

You decide to pull Emma aside after class to talk to her.`
  });





  // Anticipate
  slides.push({ type: 'Anticipate', id: 'anticipate_1', text:
  `Before you begin interacting with Emma, we have three questions to help you anticipate how your conversation with Emma will proceed. `
  });

  slides.push({ type: 'Anticipate', id: 'anticipate_2', text:
`What are some reasons that you think Emma avoided you during class?`, force: true, open: true});

  slides.push({ type: 'Anticipate', id: 'anticipate_3', text:
`What do you hope to accomplish in your conversation with Emma? 

You might want to write this goal down somewhere as you will be asked to reflect on this goal after your conversation with Emma.`, force: true, open: true});

  slides.push({ type: 'Anticipate', id: 'anticipate_4', text:
`What do you think will actually happen in your conversation with Emma?`, force: true, open: true});



  // Try it!

  slides.push({ type: 'Try it!', id: 'try_1', text:
`When you're ready, you'll go through a set of scenes that simulate the conversation between you and Emma. Prompts are pre-determined, and the point of the simulation is to practice responding to student comments about the AP exam.

Click and speak aloud the words you'd say to the student.`});

  slides.push({ type: 'Try it!', id: 'try_2', text:
`The first slide of this simulation will setup the conversation between you and Emma. After this first slide, improvise how you would act as a teacher, even if you don't have all the right answers or know the perfect thing to say.

Ready? Set? Go!
`});

  slides.push({ type: 'Try it!', id: 'try_3', text:
`Emma: “Yes? Hello? Can I go to my next class, please?”

You: “Well, I actually wanted to talk to you about class today…”

Emma: “Oh, ummmm… I’m really sorry I didn’t do the assignment for class today. I was distracted by...stuff.” 

You: “What were you distracted by? What’s going on?”`});


  slides.push({ type: 'Try it!',  id: 'try_4', text:
`Emma: “Uhhhmmmm… I just… I don’t want to sign up for the AP exam. I don’t want to take it.”`, force: true, open: true});


  slides.push({ type: 'Try it!',   id: 'try_5', text:
`Emma: “I don’t think I’ll do well on the exam. I’m not dumb, but I’m not super smart either… Well, not at school stuff at least…”`, open: true, force: true});

  slides.push({ type: 'Try it!',id: 'try_6', text:
`Emma looks around to check if anyone is nearby.

Emma: “Well, the truth of it is… a lot of teachers think I’m a ‘good’ student because I’m quiet in class and get my work done. But no one has really asked me what I want to do or ideas I have for myself after high school.”`, open: true, force: true});

  slides.push({ type: 'Try it!', id: 'try_7', text:
`Emma: “I’ve really given it a lot of thought, and I want to be an artist when I graduate. I really love sketching and would rather be doing that all day versus school. 

No offense, but taking the CSP AP exam won’t help me reach my goal.”`, open: true, force: true});

  slides.push({ type: 'Try it!', id: 'try_8', text:
`Emma just shakes her head.

Emma: “I just… The whole idea of college and more school kind of freaks me out. My mom didn’t go to college. My brother didn’t either. And they’re both okay, so why should I worry about it?”`, open: true, force: true});

  slides.push({ type: 'Try it!', id: 'try_9', text:
`Emma: “I don’t know… It seems like a lot of work for something that I’m not super interested in and that I would probably fail. You do know that the AP test is hard, right? That’s why AP kids are always studying.

Marvin told me about someone they knew who studied for a whole week for an AP exam, and they still failed it. That’s gonna be me.”`, open: true, force: true});

  slides.push({ type: 'Try it!', id: 'try_10', text:
`Emma: “I’m not sure how to respond to that right now… I need to get going to my next class before I’m too late.

See you in class tomorrow!”`, open: true, force: true});

  // Reflect
  slides.push({ type: 'Reflect', id: 'reflect_1', text:
`And that’s the end of the simulation! Let’s now shift to reflecting on your conversation with Emma. 

Think back to the beginning of the simulation where you anticipated what might happen and stated what your goals were.`});

  slides.push({ type: 'Reflect', id: 'reflect_2', text:
`Think back to your original goals going into the conversation. How much progress do you feel you made towards your goal? Explain.`, open: true, force: true});

  slides.push({ type: 'Reflect', text:
`What would be your next step(s) in achieving your goal? Explain. `, open: true, force: true});

  slides.push({ type: 'Reflect',  id: 'reflect_3',text:
`Would you do anything differently if a similar situation arose with another student? Explain.`, open: true, force: true});
 
  return slides;
}


export default {
  questionsFor(cohortKey) {
    return slidesFor(cohortKey);
  }
};