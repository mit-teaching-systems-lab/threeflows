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
  slides.push({ type: 'Context', text:`This is a centralized high schools that is getting middle school students from three very different performing schools. Middle school A is in an affluent area, Middle School B is from the railtrack  working parents neighborhood and Middle School C is a middle class area.

Having been here for a year now you have noticed that students from middle school B and C do not perform as well at the beginning of programming in highschool  and you have decided that the best way to revisit the introduction concepts is to use block programming for all students to visually see how everything connects and use a familiar teaching programming tool.
`});
  slides.push({ type: 'Context', text:`Students from middle school A who had very good grasp of programming seems very frustrated that in high school they are using block programming and many of them are requesting to be withdrawn from CSI because they see this as beneath them programming in blocks in high schools.

 Parents are calling the school and demanding that their students not be given substandard curriculum for high school. 

How do you address the angry parents knowing  very well that your aim is to distract preparatory privilege of those students from middle school A that is considered the upper class high school and students are known to openly challenge teachers curriculum.
`});

  // Anticipate
  slides.push({ type: 'Anticipate', text:`How do you think that the parent will respond?

Do you foreshadow the parent  refusing to understand or accept your explanation of why you have chosen to used block programming for the first six week of the school?
`, force: true, writeNoPrompt: true});
  slides.push({ type: 'Anticipate', text:`1. How would you demonstrate to the parent that student are successful and challenged learning using this method of introduction to high school programming course?

2. From your perspective how will you demonstrate to the parents the success of  the students to ensure that the parent is able does not leave the conference frustrated but other has bought into your way of introducing high school programming
`, force: true, writeNoPrompt: true});
  slides.push({ type: 'Anticipate', text:``, force: true, writeNoPrompt: true});

  // Enact
  slides.push({ type: 'Enact', text:`1. How to you assure your student from middle school A that they are learning new advance concepts even though they are using block programming.
2. How do you check to make sure that the student from middle school B and C are not been negatively affected by the negativity that has been introduced in the classroom about block programming.
3. What do you do when you find out that students are passing around petitions to have this class changed that teachers should not teach high school using programming using block language. 
`, force: true, writeNoPrompt: true});
  slides.push({ type: 'Enact', text:`1. Parents walks in an says I am a programmer and I don’t understand what you think you are teaching our students.  My students is looking top to go to top universities. Teaching them this shallow blocking curriculum will not help.  You need to change this and start challenging my student otherwise we will have you fired.

2. Ms. Parent I want you to know that the curriculum were doing is not at all shallowing.  I am making sure that student have a proper grasp of programming techniques as well as group working  concepts because this course involves many group projects. 
`, force: true, writeNoPrompt: true});
  slides.push({ type: 'Enact', text:`How do you demonstrate to the parent that the student are learning new material and it is high standard though the media is one that they have already used in middle school`, force: true, writeNoPrompt: true});
  slides.push({ type: 'Enact', text:`Do You bring out the students assignments and demonstrate to parent that you are meeting the standards of a 9th grade computer science students as mandated by the district or state`, force: true, writeNoPrompt: true});
  slides.push({ type: 'Enact', text:`Why are you going to bring out the standards and the students work.  How will you address the parents to make sure that they understand where you're coming from without letting them know that you are meeting equity for all student in your classroom by using a medium that all the students are very familiar with`, force: true, writeNoPrompt: true});

  // Reflect
 
  slides.push({ type: 'Reflect', text:`1. How do you think you should communicate the needs and requirements of computer science one to both parents and teachers.

2. Should you have a norms of the classroom at the beginning of the school year and explain to students the true aspects of learning programming and why the medium is not the important part of the class but the material that is covered. 
`, force: true, writeNoPrompt: true});
  slides.push({ type: 'Reflect', text:`Do you think it would be a good idea to have the parents during the open house understand importance of having an introduction computer science class that is accessible to all students and letting them know it meets all the standards. `, force: true, writeNoPrompt: true});
  slides.push({ type: 'Reflect', text:`How would you react if your principals calls you to the office to talk about the calls they are receiving from parents and students?  `, force: true, writeNoPrompt: true});


  return slides;
}


export default {
  questionsFor(cohortKey) {
    return slidesFor(cohortKey);
  }
};