import React from 'react';

export const SeedPaperPrototypes = [
  {
    key: 'group-unfair',
    context: `Two weeks ago, you assigned a collaborative group project to your chemistry class.  Currently, there's about a week left until it's due and a student Mark comes to talk to you after class.`,
    scenario: `Mark: My group is doing fine on the group project, but I'm having to do extra work because Tyshawn doesn't offer to do anything.  It's super frustrating.  Are you going to give us all the same grade or are you going to give Tyshawn what he deserves?`,
    coaching: `How did you try to model "inclusive excellence?"`
  }, {
    key: 'mixing-languages',
    context: `You're teaching ELA to 10th grade students.  Students are working in small groups to analyze the language in a scene, and are going to share out to the whole class.  Rosario's group starts off the discussion.`,
    scenario: `Rosario: So we analyzed the language in our group, and all the old archaic weird phrases.  And it's kind of cool he's mixing in references to Greek and like it's his own slang.  But how come we can't mix languages like he does in our own school work?`,
    coaching: `For students who speak several languages, how can we "see the whole student" and their strengths within the classroom?`
  }, {
    key: 'cell-posters',
    context: `It's a middle school life science class.  Students are working in small groups to make posters showing the roles of different parts of the cell.`,
    scenario: `Angel: Alright, I've done enough here, I outlined the mitochondria and Golgi apparatus.\nLexi: What about the rest?\nAngel: I don't know, you should take it from here, you'll make it look way neater and pretty.`,
    coaching: `What assumptions did you make about what was happening?`
  }, {
    key: 'coordinates-privilege',
    context: `It's a 10th grade math class.  Students are working in pairs on converting polar coordinates to x/y coordinates.`,
    scenario: `Huey: Do you remember what we do here?\nNoah: Yeah, we use the sine and cosine.  This is basic trigonometry, I did something like this at videogame coding camp this summer, even the middle school kids did it.`,
    coaching: `Huey and Noah have different levels of "preparatory privilege" outside of school.  How did that influence their experience of this lesson?`
  }, {
    key: 'asian-population-growth',
    context: `It's a ninth grade social studies class.  Students are presenting short speeches about global isssues, and at one table the topic is population growth.`,
    scenario: `Christine: Population growth exploded in Asia in particular.  In the next few years, India will be the most populous country.\nMarcus: Oh Raj, this is all because of your people.  There's just too many of you.\nRaj: Yeah, we are taking over.`,
    coaching: `How did you interpret what happened?`
  }, {
    key: 'maria-absent',
    context: `Maria is a junior, and she just moved to town this year.  She's frequently late or absent to first period.  Today, she just walked in 15 minutes late.`,
    scenario: `Maria: Sorry, I just can't seem to wake up on time, I'm always tired...`,
    coaching: `What assumptions did you make about Maria in this situation?`
  }
];


export const CSSPaperPrototypes = [
  {
    key: 'tom-absent',
    context: `Tom is missing a lot of school.  The techer has participation and attendance policies that includes points.  Tom's grade is affected due to missed points for attendance.  Tom has not communicated with his teazcher and there's been no communication from home.`,
    scenario: `Tom comes to school after missing two weeks and asks the teacher, "How can I get my grade up?"`,
    coaching: `What assumptions about Tom did you make?`,
    debrief: `Improvements: grade level might be good, a statement about teacher's history with the student.  First, inquire about why he's been gone to check your assumptions.  Second, give students choice and agency over the solution.`
  }, {
    key: 'inclusion-special-ed',
    context: `Ms. Carlson is a special education teacher.  She's sharing accommodations about a special education student who is new to the school with the mainstream classroom teacher, Mr. Johnson.`,
    scenario: `Mrs. Carlson, the special education teacher walks into Mr. Johnson's classroom to discuss a new student's IEP accomodations for the upcoming meeting.\nMr. Johnson: Why are you bringing me these accommodations for this student?  The student has a severe disability and cannot be successful in my class.`,
    coaching: `As the special education teacher, how would you respond to this situation?  How might your response model inclusive excellence?`
  }/*, {
    key: '',
    context: `Twenty-five students are in a middle school math class.  There are about 10 boys and 12 girls, and the students are considered high achieving.  The teacher is well-loved.`,
    scenario: `You are teaching about variables and show an example of how "x" can be used in an equation.  A girl in the back raises her hand to ask a question.\bShawna: "Could you please give another example?"\nTwo boys in the front of the room roll their eyes around and one says.  Mrs. Carlson, the special education teacher walks into Mr. Johnson's classroom to discuss a new student's IEP accomodations for the upcoming meeting.\nMr. Johnson: Why are you bringing me these accommodations for this student?  The student has a severe disability and cannot be successful in my class.`,
    coaching: `As the special education teacher, how would you respond to this situation?  How might your response model inclusive excellence?`
  },*/
];

export function toSlides(prototype) {
  const {context, scenario, coaching} = prototype;
  const style = {
    whiteSpace: 'pre-wrap'
  };


  var slides = [];
  slides.push({ el: 
    <div>
      <div><b>1: Read context</b></div>
      <div style={style}>{context}</div>
      <div style={{marginTop: 30}}>What are you anticipating?</div>
    </div>
  , force: true, open: true});

  slides.push({ text: scenario, applesSceneNumber: 1});

  slides.push({ el: 
    <div>
      <div><b>3: Ask this question to kick off coaching or discussion</b></div>
      <div style={style}>{coaching}</div>
    </div>
  , force: true, open: true});

  slides.push({ el: 
    <div>
      <div><b>4: Debrief together</b></div>
      <div style={style}>How could we improve this prototype?</div>
    </div>
  , force: true, open: true});

  return slides;
}