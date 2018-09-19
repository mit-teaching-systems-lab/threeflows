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

  slides.push({ type: 'Overview', el:
  <div>
    <div>1. Review context</div>
    <div>Imagine yourself situated in the context of the particular school, classroom, and subject.</div>
    <br />
    <div>2. Anticipate</div>
    <div>Before starting the simulation, you will answer a few questions in anticipation of what may happen.</div>
    <br />
    <div>3. Try it!</div>
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
  slides.push({ type: 'Context', text:
`Imagine you’re a second year teacher, teaching a CS course at the high school level. In one of your classes is a student named Greyson who has a significant communication disability. 

Greyon’s disability impacts his expressive language understanding but he does just fine with receptive language (i.e. he struggles to express his own thoughts but understands what is said to him just fine). 

As a result, Greyson has a paraprofessional who follows him around school and provides  one-on-one support. `});

  slides.push({ type: 'Context', text:
`You’ve noticed that whenever you ask Greyson a question, his paraprofessional Ms. Bobson will answer the question for Greyson without giving him the opportunity to try answering himself first.

You’ve also noticed that when Greyson is meant to work in a group with other students, Ms. Bobson will mediate every single interaction that Greyson could potentially have. She will then turn to Greyson and explain to him what students have said and walk him through the lesson. 
`});

  slides.push({ type: 'Context', text:
`You’ve decided to talk with Ms. Bobson about how she supports Greyson, so you ask her to meet with you during one of your planning periods.

Your job will be to respond to Ms. Bobson in whatever way you feel is appropriate.

Okay? Ready? Start!`});


  // Anticipate
  slides.push({ type: 'Anticipate', text:
`Before you begin, what are your thoughts on Ms. Bobson’s interactions with Greyson? What do you hope to get out of the conversation?`, force: true, open: true});

  slides.push({ type: 'Anticipate', text:
`What would you like to prepare before going into your meeting with Ms. Bobson? What artifacts would you like to bring or look at?`, force: true, open: true});

  // Try it!
  slides.push({ type: 'Try it!', text:
`Ms. Bobson: “Hello. You wanted to talk about Greyson with me? I can’t stay very long -- Greyson is doing solo reading right now, and I gotta be back before he’s done. Here’s my report: I really think that Greyson is just doing fantastic in all of his classes. He’s really receptive to feedback and getting support. I’m actually not sure why you want to meet…? ”`, force: true, open: true});

  slides.push({ type: 'Try it!', text:
`Ms. Bobson: “I just want you know that I have a lot of experience as a paraprofessional. I’ve worked with many kids who are like Greyson, and when I haven’t given them the type of support that I’m currently giving, they tend to just barely pass or fail the course entirely. Do you want Greyson to fail?”`, force: true, open: true});

  slides.push({ type: 'Try it!', text:
`Ms. Bobson: “You don’t get it -- Greyson has a communication disability. He isn’t able to communicate with his peers the way that other kids do. He needs me to help him with interactions so that he can communicate his thinking and his needs to other students. What would you propose that I do instead?””
`, open: true, force: true});

  slides.push({ type: 'Try it!', text:
`Ms. Bobson: “Hmmm… I don’t think that’s going to work. Besides, the other more veteran teachers seem okay with my approach. Why should I change what I’m doing if more experienced teachers support what I’m doing?”`, open: true, force: true});

  slides.push({ type: 'Try it!', text:
`Ms. Bobson: “You know what. Fine, we’ll try your way for a week and then come back to debrief. I’m not giving you more than a week though because Greyson deserves to have access to the content just like every other kid. 

I’ve got to run now. Greyson is probably done reading by now.”`, open: true, force: true});

  // Reflect
  slides.push({ type: 'Reflect', text:
`Reflecting back on your conversation with Ms. Bobson, what are your initial thoughts and feelings?`});

  slides.push({ type: 'Reflect', text:
`Did the conference with Ms. Bobson go as you expected it would? Why or why not?`, force: true, open: true});

  slides.push({ type: 'Reflect', text:
`What professional strengths or weaknesses arose for you during this interaction with Ms. Bobson?`, force: true, open: true});

  slides.push({ type: 'Reflect', text:
`Is there anything in this conference that you would like to take back with you to share with the big group?`, force: true, open: true});

  return slides;
}


export default {
  questionsFor(cohortKey) {
    return slidesFor(cohortKey);
  }
};