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
    scenario: `Angel: Alright, I've done enough here, I outlined the mitochondria and Golgi apparatus.\n\nLexi: What about the rest?\n\nAngel: I don't know, you should take it from here, you'll make it look way neater and pretty.`,
    coaching: `What assumptions did you make about what was happening?`
  }, {
    key: 'coordinates-privilege',
    context: `It's a 10th grade math class.  Students are working in pairs on converting polar coordinates to x/y coordinates.`,
    scenario: `Huey: Do you remember what we do here?\n\nNoah: Yeah, we use the sine and cosine.  This is basic trigonometry, I did something like this at videogame coding camp this summer, even the middle school kids did it.`,
    coaching: `Huey and Noah have different levels of "preparatory privilege" outside of school.  How did that influence their experience of this lesson?`
  }, {
    key: 'asian-population-growth',
    context: `It's a ninth grade social studies class.  Students are presenting short speeches about global isssues, and at one table the topic is population growth.`,
    scenario: `Christine: Population growth exploded in Asia in particular.  In the next few years, India will be the most populous country.\n\nMarcus: Oh Raj, this is all because of your people.  There's just too many of you.\n\nRaj: Yeah, we are taking over.`,
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
    context: `Tom is missing a lot of school.  The teacher has participation and attendance policies that includes points.  Tom's grade is affected due to missed points for attendance.  Tom has not communicated with his teacher and there's been no communication from home.`,
    scenario: `Tom comes to school after missing two weeks and asks the teacher, "How can I get my grade up?"`,
    coaching: `What assumptions about Tom did you make?`
  }, {
    key: 'inclusion-special-ed',
    context: `You're a special education teacher sharing about the accommodations for a special education student who is new to the school with the mainstream classroom teacher, Mr. Johnson.`,
    scenario: `You walk into Mr. Johnson's classroom to discuss the new student's IEP accomodations for the upcoming year.\n\nMr. Johnson: Why are you bringing me these accommodations for this student?  The student has a severe disability and cannot be successful in my class.`,
    coaching: `As the special education teacher, how would you respond to this situation?  How might your response model inclusive excellence?`
  }, {
    key: 'math-questions',
    context: `Twenty-five students are in a middle school math class.  There are about 10 boys and 12 girls, and the students are considered high achieving.  They respect you as as teacher.`,
    scenario: `You are teaching about variables and show an example of how "x" can be used in an equation.  A girl in the back raises her hand to ask a question.\n\nShawna: "Could you please give another example?"\n\nTwo boys in the front of the room roll their eyes around.  Neil: "You're asking ANOTHER question?"\n\nThe boys laugh and others in the class join in.`,
    coaching: `What are the dynamics in the room that are allowing this?`
  }, {
    key: 'jamaal-conference',
    context: `You are preparing for a conference with a particular student, Jamaal Hampton. The conference has been requested by his mom, and all of the teachers that student has will be involved. Jamaal is currently receiving D’s and F’s in all of his classes.`,
    anticipate: `What do you anticipate Mom’s goal being?`,
    scenario: `During the conference, Jamaal’s mother Ms. Hampton accuses the staff of treating him differently because he is black.\n\nMs. Hampton: "I do not believe these grades are an accurate reflection of my son."`,
    coaching: `What questions might you ask of Ms. Hampton?`
  }, paperPrototypeForConference({
    key: 'bethany-conference-ms-science',
    text: `Bethany is a 7th grade student currently receiving all 2’s and 3’s on a 4 point Standards Based Grading scale in your class.  She is currently missing five assignments, and all of them were assigned during the last 10 days.\n\nThe following learning targets are being taught:\nI can tell the difference between specialized cells in multicellular organisms such as nerve cells, muscle cells, skin cells bone cells and blood cells.\nI can recognize that specialized cells in multicellular organisms are organized into tissues (muscle, nerve, skin) and tissues into organs and organs into organ systems that perform special jobs.\nI can identify differences between plant and animal cells.\nI can understand that cells divide to make more for growth and repair.`,
  }), paperPrototypeForConference({
    key: 'bethany-conference-elementary-science',
    text: `Bethany is a fourth grade student currently receiving all 2’s and 3’s on a 4 point Standards Based Grading scale in your class.  She is currently missing five assignments, and all of them were assigned during the last 10 days.\n\nThe following learning targets are being taught:\nI can label a diagram showing an animal’s needs space, water, food, shelter, and air.\nI can demonstrate understanding of an animal’s needs by making sure its needs are met space, water, food, shelter, and air.\nI can draw and describe the changes I observe as an animal progresses through portions of their life cycle using a science journal.\nI can draw and label all of the stages of an animal’s life cycle.`
  }), paperPrototypeForConference({
    key: 'bethany-conference-ela',
    text: `Bethany is a sophomore student scurrently receiving all 2’s and 3’s on a 4 point Standards Based Grading scale in your class.  She is currently missing five assignments, and all of them were assigned during the last 10 days.\n\nThe following learning targets are being taught:\nI can identify supporting details in a variety of informational texts\nI can demonstrate literal comprehension of an information text.\nI can make reasonable inferences from informational texts\nI can use my knowledge of common word parts to determine the meaning of unknown words.\nI can use context clues to determine the meaning of unknown words`
  })
];

// via email
function paperPrototypeForConference({key, text}) {
  return {
    key,
    context: `You are preparing for conferences with a student.  The school uses standards based grading.  ${text}`,
    anticipate: `What will you prepare ahead of time, and what will you discuss that can't already be seen in the online gradebook?`,
    scenario: `During the conference, Bethany's guardian Sue shares that Bethany is excelling in most of her other classes.\n\nSue: "If she's doing so well in her other classes, why isn't she doing well in this class?`,
    coaching: `What are Bethany's academic strengths and what are her areas of growth?  What questions might you have for her guardian Sue?`
  };
}

export function toSlides(prototype) {
  const {context, scenario, anticipate, coaching} = prototype;
  const style = {
    whiteSpace: 'pre-wrap'
  };


  var slides = [];
  slides.push({ el: 
    <div>
      <div><b>PART 1: Practice Individually</b></div>
      <br />
      <div>In Part 1, you’ll read through a few scenes and type how you’d respond to each scene.</div>
      <br />
      <div>For each scene, simulate how you’d respond to the student(s) in the moment and type your response in the textbox located below the scene. </div>
      <br />
      <div>Once you’re finished with your responses, You'll review how people have responded and discuss.  Clicking on “Ok” will take you to your first scene. Ready?</div>
    </div>
  });

  slides.push({
    type: '1. Read context',
    el: <div style={style}>{context}</div>
  });

  slides.push({
    type: '2. Anticipate',
    force: true,
    open: true,
    el: <div style={style}>{anticipate || "What are you anticipating?"}</div>,
  });

  slides.push({
    type: '3. Try it!',
    applesSceneNumber: 1,
    text: scenario
  });

  slides.push({
    type: '4. Reflect',
    force: true,
    open: true,
    el: <div style={style}>{coaching}</div>
  });

  return slides;
}