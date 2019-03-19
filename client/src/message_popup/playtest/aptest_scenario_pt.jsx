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




  // Context
  slides.push({ type: 'Context', id: 'context_1', text:
`Robin is a 10th grader who was placed in your CSP AP course. All 10th grade students must sign up for this course at your school, but students do not necessarily have to take the exam.

This is the first time that Robin has been in an AP course before. Historically, she has earned mostly B’s and C’s in her courses with the occasional A. 

So far, Robin seems to really enjoy your class, likes you as a teacher, and is doing well with the material. Robin is a little goofy in class sometimes but overall she does solid work. `
  });

  slides.push({ type: 'Context', id: 'context_2', text:
`Since the beginning of the year, you’ve talked with your classes about the AP exam.

However, anytime you mention the AP test, you notice that Robin looks uncomfortable, and you can hear her mentioning “Sheldon” to her friends during group work . You think Robin is referring to the stereotypically nerdy character Sheldon from the sitcom called The Big Bang Theory but are not sure.

You’ve been meaning to talk to Robin about her comments but haven’t found the time to do so yet.`
  });

  slides.push({ type: 'Context', id: 'context_3', text:
`Today in class, you remind students that it’s getting around the time to start signing up for the CSP AP Exam. During the announcement, Robin looks incredibly uncomfortable.

During group work, you hear Robin say to her friend “I’m not doing any of that Sheldon stuff.”

You make a point to discreetly pull Robin aside after class to talk to her about the AP exam.`
  });



  // Anticipate
  slides.push({ type: 'Anticipate', id: 'anticipate_1', text:
  `Before you begin interacting with Robin, we have three questions to help you anticipate how your conversation with Robin will proceed.`
  });

  slides.push({ type: 'Anticipate', id: 'anticipate_2', text:
`What are some reasons that you think Robin might be talking about “Sheldon”?`, force: true, open: true});

  slides.push({ type: 'Anticipate', id: 'anticipate_3', text:
`What do you hope to accomplish in your conversation with Robin? 

You might want to write this goal down somewhere as you will be asked to reflect on this goal after your conversation with Robin.`, force: true, open: true});

  slides.push({ type: 'Anticipate', id: 'anticipate_4', text:
`What do you think will actually happen in your conversation with Robin?`, force: true, open: true});



  // Try it!

  slides.push({ type: 'Try it!', id: 'try_1', text:
`And that’s the end of the simulation! Let’s now shift to reflecting on your conversation with Robin. 

Think back to the beginning of the simulation where you anticipated what might happen and stated what your goals were.`});

  slides.push({ type: 'Try it!', id: 'try_2', text:
`When you're ready, you'll go through a set of scenes that simulate the conversation between you and Robin. Prompts are pre-determined, and the point of the simulation is to practice responding to student comments about the AP exam.

Improvise how you would act as a teacher, even if you don't have all the right answers or know the perfect thing to say.

Click and speak aloud the words you'd say to the student.
    
Ready to start?`});

  slides.push({ type: 'Try it!',  id: 'try_3', text:
`Robin: “You wanted to talk to me?”`, force: true, open: true});


  slides.push({ type: 'Try it!',   id: 'try_4', text:
`Robin: “Well, you know, I just… Uggghhhh…”

Robin let’s out a loud groan. She looks very stressed.
`, open: true, force: true});

  slides.push({ type: 'Try it!',id: 'try_5', text:
`Robin: “I gotta let you know that I am NOT doing that great, not at all. Everything has got me feeling so stressed out.”`, open: true, force: true});

  slides.push({ type: 'Try it!', id: 'try_6', text:
`Robin: “It’s just, there are too many things going on with school and outside school.

And, it’s just, I get so annoyed when you start talking about that AP test stuff. Nobody wants to take that test, and nobody has got time for that test, so why do you talk about it so much?”`, open: true, force: true});

  slides.push({ type: 'Try it!', id: 'try_7', text:
`Robin: “Well, I know I’m definitely not gonna take it. Even if I wanted to, that test costs 100 bucks.

And the nerve of it! I have to pay 100 dollars to take a test? Whose idea was that?”`, open: true, force: true});

  slides.push({ type: 'Try it!', id: 'try_8', text:
`Robin: “Okay, fine, sure. Someone else can pay the money part of the test or whatever.

BUT even if that’s true, I still have to sit for a couple of hours and take. a. test. for what? I’m in 10th grade. College is two years away. I can do all that college stuff later when it actually matters. What’s the point of taking the exam now?”`, open: true, force: true});

  slides.push({ type: 'Try it!', id: 'try_9', text:
`Robin: “Hmmm… What if I told you that my mom doesn’t even want me to go to college? She told me that college costs too much money and that it’s just not ‘something our family does’. 

I just gotta graduate and then I’m done with school. So if I’m not planning on going to college, what’s the point?”`, open: true, force: true});

  slides.push({ type: 'Try it!', id: 'try_10', text:
`Robin: “Alright, I’ll be honest with you. You know why I always talk about ‘Sheldon’ when you talk about AP tests? It’s because only nerds take this stuff seriously, and to be a nerd in this school is a death sentence (socially, of course).

I like this whole computer stuff that you’ve been teaching us, but I’m not willing to go full Sheldon for it.”`, open: true, force: true});

  slides.push({ type: 'Try it!', id: 'try_11', text:
`Robin: “Yeah, yeah, I mean, I hear you, but AP just isn’t a thing that’s made for me. When I think “AP kid” I picture someone who studies all the time, has no friends, and is no fun.

And, tch, you should know that that’s not me. Can you imagine? Me? Studying all the time and being all serious?”`, open: true, force: true});

  slides.push({ type: 'Try it!',  id: 'try_12', text:
`Robin: “So you want me to break the mold or something? I don’t know… that’s a lot of work. I’m not even sure I like computer science that much. What I really want to do is be a musician.

No disrespect: what we do in class is fun and all, but that’s just because it’s your class. I don’t think computer science will be interesting after this year.”`, open: true, force: true});

  slides.push({ type: 'Try it!', id: 'try_13', text:
`Robin: “I don’t get it. Why do you want me to take the AP test so badly? How does me taking it impact you?”`, open: true, force: true});

  slides.push({ type: 'Try it!', id: 'try_14', text:
`Robin: “Hmm...I have to go now before I’m late for my next class, but it was nice talking to you. 

Bye!”`, open: true, force: true});

  // Reflect
  slides.push({ type: 'Reflect', id: 'reflect_1', text:
`And that’s the end of the simulation! Let’s now shift to reflecting on your conversation with Robin. 

Think back to the beginning of the simulation where you anticipated what might happen and stated what your goals were.`});

  slides.push({ type: 'Reflect', id: 'reflect_2', text:
`Think back to your original goals going into the conversation. How much progress do you feel you made towards your goal? Explain. `, open: true, force: true});

  slides.push({ type: 'Reflect', id: 'reflect_3',  text:
`What would be your next step(s) in achieving your goal? Explain.`, open: true, force: true});

  slides.push({ type: 'Reflect',  id: 'reflect_4',text:
`Would you do anything differently if a similar situation arose with another student? Explain.`, open: true, force: true});


  
  return slides;
}


export default {
  questionsFor(cohortKey) {
    return slidesFor(cohortKey);
  }
};