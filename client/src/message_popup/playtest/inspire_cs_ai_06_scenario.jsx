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
  slides.push({ type: 'Context', text:`Your state just implemented new K-8 CS standards and your district has made the decision to use Scratch lessons to meet these standards. 

Although you remember being briefly introduced to it during a one-hour professional development, you are nervous about meeting all these new standards. 

One of these standards is for grades 3-5: “Create programs that include sequences, events, loops, and conditionals.” 
`});
  slides.push({ type: 'Context', text:`You know that you have several students who have had experience with Scratch and some that participate in your afterschool robotics club. 

However, many of your students have no experience with computer science. 
`});

  // Anticipate
  slides.push({ type: 'Anticipate', text:`Before you try this lesson, how does this situation make you feel?`, force: true, writeNoPrompt: true});
  slides.push({ type: 'Anticipate', text:`Knowing that your district has provided you with a lesson plan and slides that meet this standard, how might you prepare yourself to teach this lesson?`, force: true, writeNoPrompt: true});
  slides.push({ type: 'Anticipate', text:`Before you begin your lesson, what issues do you think could come up? How do you think the lesson will go?`, force: true, writeNoPrompt: true});

  // Enact
  slides.push({ type: 'Enact', text:`You walk through the activity using the given lesson plan and specific slides that were provided to you by the district. 

However, as you walk around the classroom, you notice that several of your students are off task, using blocks that you didn’t cover. What do you do next?
`, force: true, writeNoPrompt: true});
  slides.push({ type: 'Enact', text:`One of your students call you over. “I can’t figure out why this block isn’t working - it’s not doing what it’s supposed to do.” You have no initial idea why the block isn’t working. What do you do next?`, force: true, writeNoPrompt: true});
  slides.push({ type: 'Enact', text:`As you walk through the classroom, a student loudly pronounces, “I don’t understand why we are even doing this. I’m never going to be a coder.” What do you do next?`, force: true, writeNoPrompt: true});
  slides.push({ type: 'Enact', text:`You have several students tjat have finished the product and are really excited and motivated to continue. “That was really cool! What if I wanted to make it more interactive? How can I important pictures of myself into here? Can we work on this together?” What would you do next?`, force: true, writeNoPrompt: true});
  slides.push({ type: 'Enact', text:`A student puts their head in their hands in frustration. When you approach her, she tells you “I just can’t do this! I’ve never been good with technology and it never works the way I want it to.” What would you do next?`, force: true, writeNoPrompt: true});
  slides.push({ type: 'Enact', text:`As you are leading the lesson, one of the blocks you’ve put in there isn’t working. You can’t figure it out and one student begins loudly voicing what you did wrong. They go so far as to come up to the teacher computer and take over your keyboard and mouse. What do you do next?`, force: true, writeNoPrompt: true});

  // Reflect
 
  slides.push({ type: 'Reflect', text:`During the simulation, were there any situations that were more challenging for you to deal with? Why do you think that situation was more challenging?`, force: true, writeNoPrompt: true});
  slides.push({ type: 'Reflect', text:`Thinking back on these example situations, is there anything you could have done to better prepare yourself before beginning the lesson?`, force: true, writeNoPrompt: true});
  slides.push({ type: 'Reflect', text:`What professional strengths and weaknesses did you recognize based on this simulation? In other words, what areas would you want to work on as a teacher to be better prepared?`, force: true, writeNoPrompt: true});


  return slides;
}


export default {
  questionsFor(cohortKey) {
    return slidesFor(cohortKey);
  }
};