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
  slides.push({ type: 'Context', text:`You are a curriculum coordinator at Explorers Charter School. 
Explorers elementary is located in an urban area. It serves approximately 500 students in grades K-5.  
You support teachers in grades 3-5. 
There are typically 25 students in each class.
Teachers teach all content areas
Students have specials that include art, music
Physical Education, Cooking, Character Education, and Computers. 
Your school demographics include: 94 % African American, 5.5% Latinx and 0.5% Multi-Racial.
79.39% of students are considered low-SES
The school has a mission for preparing students for the 21st century. 
There is 1 laptop in class, 1 computer lab in the school, a library media center and a laptop cart that teachers can check out.
`});
  slides.push({ type: 'Context', text:`At the beginning of the school year, during a grade-level PLC meeting, the curriculum director Ms. Karen tells the group that the state has now adopted computer science standards for grades K-12. As a result, all teachers have to identify ways in which CS/CT should be integrated with content. It can not just be offered during specials. 

The teachers are starting to protest. They are not happy that yet another policy mandate is now on their plates given everything they have to cover during the year. They are also saying that they have no background or training in CS, they are not good with technology, and this should not be their job. 
`});

  // Anticipate
  slides.push({ type: 'Anticipate', text:`What are your thoughts about this conversation? 

What are some best case and worst case scenario for the teachers?

What if anything surprised you about teachers’ perceptions of CS?


What should Ms. Karen prepare before her next meeting with the teachers? 
`, force: true, writeNoPrompt: true});

  // Enact
  slides.push({ type: 'Enact', text:`Ms. Karen: As you know, the state recently adopted new computer science standards for grades K-12. This means that we are now responsible for incorporating those standards in our curriculum. 

Ms. Brenda: Well, i’m really tired of new mandates coming our way without our input and without any training. It’s like when our school adopted smartboards. One day i walked in my room and found a smartboard. I didn’t know what to do with it. Now they are saying we have to teach cs.

How might you respond to Ms. Brenda.
`, force: true, writeNoPrompt: true});
  slides.push({ type: 'Enact', text:`Ms. Brenda: In addition, we really have no room in our curriculum. Where exactly are we going to find the time to do these things. Our curriculum is already very packed.

How might you respond to Ms. Brenda?
`, force: true, writeNoPrompt: true});
  slides.push({ type: 'Enact', text:`Ms. Kelly: i agree with Brenda. Also, I have no clue about CS. I’ve never taken a CS class and I’m not good with technology. 

Ms. Molly: Me neither. Back when I went to college, tech classes were not offered. 

Ms. Brown: I’ve never taken a tech class either, let alone computer science. Isn’t computer science all about programming? I have no time to learn programming, that’s really hard, and it’s not my job.

How might you respond to teachers’ conversation?
`, force: true, writeNoPrompt: true});
  slides.push({ type: 'Enact', text:`Ms. Kelly: Yes, who is going to help us? Are there resources for us? Is there a curriculum?
 
Ms. Brenda: This is really outrageous that they would put this on us. 
`, force: true, writeNoPrompt: true});
  slides.push({ type: 'Enact', text:`Mr. Thomas: And how about the students? As you know, our students are struggling with basic skills. Many don’t have any computers at home. This is going be difficult for them. We need to be working with them in reading and math, not this CS stuff. How are we going to teach them the technology and the content. Why can’t they just do in their computer class. Isn’t that why they go there? 

How might you respond to to Mr. Thomas?
`, force: true, writeNoPrompt: true});
  slides.push({ type: 'Enact', text:`Ms. Karen: First off let me say that I appreciate you feeling comfortable to voice your concerns. While we have a packed curriculum, remember that CS is not meant to be another area we have to address. It’s meant to be incorporated into our curriculum. It’s aiming at helping students represent content through CS. How about next week we go over the CS standards and identify one or two standards we initially want to focus on? Ms. Karen hands out the CS standards.`, force: true, writeNoPrompt: true});
  slides.push({ type: 'Enact', text:`Next week the group meets again. 

Ms. Karen: Has everyone had a chance to review the CS standards? Just a reminder standards fit into the following categories: computing systems, Internet & Network, Data & Analysis, Algorithms & Programming, Impacts of Computing. 

Teachers nod.

Ms. Karen: what were your thoughts. Are there particular standards that stand out to you?

Ms. Brenda. Well, i was surprised to see that CS is not just programming. There are standards about data and the impacts of computing on society, which our students will find very interesting. 
`, force: true, writeNoPrompt: true});
  slides.push({ type: 'Enact', text:`Ms. Molly: Yes, for example, i never thought that data was part of CS. We do a lot of work with data in both science and math. I guess i never put the two together. 

Mr. Thomas: Yes, and the standard on cybersecurity is really cool on helping our students being safe online. It fits nicely with the work we do helping them use digital resources in social studies.

Ms. Karen: I’m excited about the connections you have already identified. I look forward to seeing you next week.

What do you suggest Ms. Karen prepares for the next meeting?
`, force: true, writeNoPrompt: true});

  // Reflect
 
  slides.push({ type: 'Reflect', text:`What types of support, resources or professional development do you think the teachers will need to integrate CS in their curriculum? 

What did you struggle with in this scenario?

What resources will you need to respond to teachers’ concerns?

What types of supports do students will need? 

Do you think it should be the classroom teachers’ responsibility to integrate CS in their teaching? 

Teachers discuss the use of data. Can you come up with one example that illustrates the integration of data and CS?
`, force: true, writeNoPrompt: true});


  return slides;
}


export default {
  questionsFor(cohortKey) {
    return slidesFor(cohortKey);
  }
};