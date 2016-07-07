/* @flow weak */
import _ from 'lodash';
//“”’

// Example Usage:
//   questions.map(_.partial(forLearningObjective, 39));
function forLearningObjective(learningObjectiveId) {
  return function(question) {
    return {
      ...question,
      ...{learningObjectiveId}
    };
  };
}

function forIndicator(indicatorId) {
  return function(question) {
    return {
      ...question,
      ...{indicatorId}
    };
  };
}

export type Question = {
  studentIds?: [number],
  id: number,
  text: string,
  examples: [string],
  nonExamples: [string]
};
export const inquiryQuestions:[Question] = [
  { 
    studentIds: [4], 
    id: 101,
    text: `At the conclusion of your lesson plan for this challenge, you seed a group discussion by asking "What are you curious about related to photosynthesis?"  Hayin says "Why are plants green?"  What do you do?`,
    encodedText: `[:i]At the conclusion of your lesson plan for this challenge, you seed a group discussion.[:u]What are you curious about related to photosynthesis?[:s]Why are plants green?`,
    examples: [
      `"We spent some time already studying that question, is there something else you're curious about, or how can you take that question to the next level?"`,
      `"Oh, are all plants green?"`,
      `"Okay, what kind of experiment would help you learn about that? Or how could you phrase it as something you could test?"`,
      `"That is a great question. What do you think? Can anyone else add to Hayin's"`
    ],
    nonExamples: [
      `"That's not a good question."`,
      `"That's not a well-formed enough hypothesis, in order for it to be testable you need independent variables."`,
      `"Well, most plants are green because of chloroplasts in their leaves that have a green pigment..."`,
      `"We already talked about that question. Why don't you look for the answer on the internet. Any other things that folks are curious about?"`
    ]
  },  
  {
    studentIds: [10], 
    id: 102,
    text: `Imagine a new student, Sasha, joins your classroom during the lesson plan you developed for this challenge.  As part of helping her feel comfortable, you give her a quick overview of what's happening.  She asks "what is photosynthesis again?"  How can you give a brief direct answer to her question?`,
    encodedText: `[:i]Imagine a new student, Sasha, joins your classroom during the lesson plan you developed for this challenge.  As part of helping her feel comfortable, you give her a quick overview of what's happening.[:s]What is photosynthesis again?[:i]How can you give a brief direct answer to her question?`,
    examples: [
      `"Photosynthesis is the process where plants take in sunlight and carbon dioxide from the air, and produce sugar they can use and breathe out oxygen." [Candidate might use intonation or guestures]`,
      `"Maia, this is Sasha. Sasha, this is Maia. Maia, will you take a couple minutes to help Sasha learn about photosynthesis. If you two have any questions, call me back over."`,
      `"What have you heard about photosynthesis before in your last school? Let's build on what you remember."`,
      `"Ok, what did you have for lunch? So, french fries come from what? How did that potato grow?"`
    ],
    nonExamples:[
      `[A ten minute response.]`,
      `"It's a biology concept."`,
      `"Take out the textbook from under your desk and read pages 55-60."`
    ]
  },
  { 
    studentIds: [2], 
    id: 103,
    text: `In the context of the lesson plan you developed for this challenge, Floyd says "why are we even doing this?"  Respond in way that engages his natural curiosity and tendency towards asking questions`,
    encodedText: `[:i]In the context of the lesson plan you developed for this challenge...[:s]Why are we even doing this?[:i]Respond in way that engages his natural curiosity and tendency towards asking questions.`,
    examples: [
      `"Well, imagine what would happen if there was no sunlight."`,
      `"If we'll all going to live on Mars by the time you're an adult, we're going to have to figure out how plants can grow up there."`,
      `"Take a breath. What are you breathing? Where do you think it came from?"`,
      `[Take what you know about Floyd...he wants to be a firefighter] "What does fire need to burn? Let's talk about then where that oxygen comes from."`
    ],
    nonExamples:[
      `"These are important skills for college."`,
      `"It's part of the MCAS, so you need to do it to graduate."`,
      `"Because."`
    ]
  },
  {
    studentIds: [8],
    id: 104,
    text: `Imagine in the context of the lesson plan you developed for this challenge, there is an activity where students are coming up with questions to investigate.  Ada says "How many questions should I write and what do you want me to include in them?"  Respond in a way that draws out the student's curiosity and pushes them towards asking questions that are meaningful to them.`,
    encodedText: `[:i]Imagine in the context of the lesson plan you developed for this challenge, there is an activity where students are coming up with questions to investigate.[:s]How many questions should I write and what do you want me to include in them?[:i]Respond in a way that draws out the student's curiosity and pushes them towards asking questions that are meaningful to them.`,
    examples: [
      '"Right now come up with as many ideas as you can, then we will build on those ideas for the next step."',
      '"I really appreciated your ideas during the last discussion, and know you\'ll have great ones here too."',
      '"Start by coming up with a few questions, and then I\'ll check back with you."',
      `"I want you to ask the kinds of questions you think are meaningful, not the ones I think are meaningful."`,
      `"Well, you have to come up with your own questions that matter to you.  I'll share a question I think is interesting: Plants can get hurt and lose leaves and branches and they grow right back.  That's different than people - you can't break off an arm and have it grow right back or we wouldn't need doctors.  That's something I'm curious about, so you can't use that question, but what else are you curious about?"`,
      `"Let's step back a second. What are you curious about after seeing the demonstration? What are you wondering? Ok, then let's work on turning that into a question that you can answer with an experiment."`,
      `"Tell me one question that you are burning know the answer to."`
    ],
    nonExamples:[
      `"To get an A, make three questions and include an IV, DV in each one."`,
      `"At least 2 questions focused on how you could collect the oxygen made by a plant."`,
      `Tell students that there is really only one right question to ask related to photosynthesis.`,
      `"Eight questions."`
    ]
  },
  {
    studentIds: [10],
    id: 105,
    text: `Imagine a new student, Sasha, joins your classroom during the lesson plan you developed for this challenge.  As part of helping her feel comfortable, you pull her aside and give her a quick overview of what's happening at the beginning of the class.  She interrupts and asks, "I do better with visuals, can you draw me a picture of photosynthesis?"  Describe what you could quickly sketch to directly answer her question.`,
    encodedText: `[:i]Imagine a new student, Sasha, joins your classroom during the lesson plan you developed for this challenge.  As part of helping her feel comfortable, you pull her aside and give her a quick overview of what's happening at the beginning of the class.[:s]I do better with visuals, can you draw me a picture of photosynthesis?[:i]Describe what you could quickly sketch to directly answer her question.`,
    examples: [
      `[Insert simple drawings here]`
    ],
    nonExamples:[
      `"Go look in the textbook." (This is fine, but not answering the pop-up question.)`,
      `[Insert very complex drawing here]`
    ]
  },
  {
    studentIds: [3],
    id: 106,
    text: `Imagine in the context of the lesson plan you developed for this challenge, you pause and ask the whole class if they have anything they want to check their understanding on or clarify.  Maia asks "How can plants be breathing, you don't see them inhaling and exhaling, and you don't see their breath in the cold?"`,
    encodedText: `[:i]Imagine in the context of the lesson plan you developed for this challenge, you pause and ask the whole class if they have anything they want to check their understanding on or clarify.[:s]How can plants be breathing, you don't see them inhaling and exhaling, and you don't see their breath in the cold?`,
    examples: [
      `"Well, is there a difference in scale?  Think of everything that's happening on your skin, but you can't see individual bacteria without a microscope."`,
      `"Great question. How can set up an experiment to test out if plants really breathe?"`,
      `"Great question. Everyone take a minute and write down how we might know that plants breathe?"`,
    ],
    nonExamples:[
      `"Well, plants have stomata that open and close to take in oxygen and release carbon dioxide just like the stomata open and close to take in carbon dioxide and release oxygen."`
    ]
  },
  {
    studentIds: [5],
    id: 107,
    text: `Imagine in the context of the lesson plan you developed for this challenge, you provide a summarizing explanation of photosynthesis to the whole class.  Mike asks, "I'm still a little confused, can you explain it again in a different way?"`,
    encodedText: `[:i]Imagine in the context of the lesson plan you developed for this challenge, you provide a summarizing explanation of photosynthesis to the whole class.[:s]I'm still a little confused, can you explain it again in a different way?`,
    examples: [
      `"Plants need to breathe and eat just like we do, and like all living things do.  Photosynthesis is like the process of you digesting your food, and your body giving you energy from it."`,
      `"OK, everyone turn to a partner. Work together to come up with your own short explanation of photosynthesis. Draw or write explanation on your small whiteboard. Everyone will hold up their whiteboards when we're done to share our ideas."`,
      `"Miquel, you had a great way to show photosynthesis in a drawing when we talked earlier. Will you share it with the class?"`
    ],
    nonExamples:[
      `"Check out your textbook, pages 55-60."`,
      `"Mike, we need to move on. Let's chat after class."`
    ]
  },
  {
    studentIds: [2],
    id: 108,
    text: `Imagine in the context of the lesson plan you developed for this challenge, you provide a summarizing explanation of photosynthesis to the whole class.  Floyd asks, "But how can plants take in sunlight, do they like grab it?"`,
    encodedText: `[:i]Imagine in the context of the lesson plan you developed for this challenge, you provide a summarizing explanation of photosynthesis to the whole class.[:s]But how can plants take in sunlight, do they like grab it?`,
    examples: [
      `"They absorb the light, yeah.  It's just like when you're outside in the sun, your skin absorbs the sunlight.  Your skin gets warmer, and if you're out there too long then you might even get sunburnt from absorbing too much of the sunlight energy."`,
      `"What do you mean by grab? Can anyone else share another word that may help explain how plants take in sunlight?"`,
      `"Great question. Let me pull out the small solar panel that we've used in different experiments. Let's talk about how a plant and this solar panel may be similar in how they get sunlight."`,
      `"Look, there is sunshine coming in through the window. Mike, come hold your hand in the sunshine. What does it feel like?"`
    ],
    nonExamples:[
      `"Plants absorb sunlight through chloroplasts."`
    ]
  },
  {
    studentIds: [9],
    id: 109,
    text: 'You challenge Steve and ask, "What is another hypothesis you could test?" He asks, "why don\'t you just tell me what the right answer is?"',
    encodedText: '[:i]You challenge Steve.[:u]What is another hypothesis you could test?[:s]Why don\'t you just tell me what the right answer is?',
    examples: [
      'Discuss that scientific inquiry often starts when there is no clear right answer.',
      'Discuss that scientists ask questions about things they are interested in.',
      `"Let's think about photosynthesis together. What do you know about this process? What are some things you want to know?"`
    ],
    nonExamples: [
      'Criticize the student for not being self-initiative',
      'Say that there\'s only one correct hypothesis.'
    ]
  },
  {
    studentIds: [],
    id: 110,
    text: 'You ask the whole class, "how can you test if the amount of sunlight influences the amount of O2 generated as a result of photosynthesis?"  You wait a few seconds and nobody comes forward with an answer.  What would you do?',
    encodedText: '[:u]How can you test if the amount of sunlight influences the amount of O2 generated as a result of photosynthesis?[:i]You wait a few seconds and nobody comes forward with an answer.  What would you do?',
    examples: [
      'Ask the same question again',
      'Rephrase the question to clarify',
      'Rephrase the question to clarify',
      'Have students brainstorm ideas on paper for 30 sections, then call on students randomly'
    ],
    nonExamples: [
      'Criticize the students for not responding',
      'Give a very specific suggestion (answer the question directly)'
    ]
  },
  {
    studentIds: [1],
    id: 111,
    text: 'You set up an experiment that tests how light intensity affects photosynthesis over time and recorded the data. Kevin says, "Plant A probably grew more because it was genetically modified by Home Depot," and the whole class laughs. Prompt the student to clarify and use evidence.',
    encodedText: '[:i]You set up an experiment that tests how light intensity affects photosynthesis over time and recorded the data.[:s]Plant A probably grew more because it was genetically modified by Home Depot[:i]The whole class laughs. Prompt the student to clarify and use evidence.',
    examples: [
      'Ask the student to make claims using evidence',
      `That's a great point! Genetically modified plants are going to be a part of our lives. I'm curious - do you think Home Depot would genetically modify a plant? Could you clarify your ideas a little more?`,
      'OK, so yes genetic modification of plants is definitely happening. How could we measure whether that affects photosynthesis?'
    ],
    nonExamples: [
      `"You're wrong."`
    ]
  },
  {
    studentIds: [6],
    id: 112,
    text: `As you walk around, you see that Jasmine is missing some data in their data tables. What could you do to nudge her in the right direction?`,
    encodedText: `[:i]As you walk around, you see that Jasmine is missing some data in their data tables. What could you do to nudge her in the right direction?`,
    examples: [
      `Tell them being systematic is an important part of science.`,
      `Ask if the collected data reveals any patterns.`,
      `Ask student to see each variable is increasing or decreasing.`,
      `"You want to test each variable a number of times, so that you have enough data to be confident of the accuracy of your measurements."`
    ],
    nonExamples: [
      'You need to collect more data.'
    ]
  },
  {
    studentIds: [7],
    id: 113,
    text: 'Miquel finished generating questions (i.e. hypotheses) about photosynthesis, and some are not testable. How can you connect his responses with the idea of planning research?',
    encodedText: '[:i]Miquel finished generating questions (i.e. hypotheses) about photosynthesis, and some are not testable. How can you connect his responses with the idea of planning research?',
    examples: [
      'Explain what a testable hypothesis is.'
    ],
    nonExamples: [
      'Your hypotheses are not testable. Come up with new ones.'
    ]
  },
  {
    studentIds: [5],
    id: 114,
    text: `You set up a photosynthesis experiment for the class, and students report the data they\'ve collected. As it turns out, Mike has experimented with only two variables: hours of light and water.  Respond to this by connecting this with data collection planning.`,
    encodedText: `[:i]You set up a photosynthesis experiment for the class, and students report the data they\'ve collected. As it turns out, Mike has experimented with only two variables: hours of light and water.  Respond to this by connecting this with data collection planning.`,
    examples: [
      'Ask students to carefully examine the collected data to determine if they have enough data to support or refute their initial hypothesis.'
    ],
    nonExamples: [
      'Tell student to run more experiments with amount of CO2 as a variable.'
    ]

  }
].map(forLearningObjective(39)).map(forIndicator(502));

export const motivationQuestions:[Question] = [
  {
    studentIds: [8],
    id: 115,
    text: 'Ada is frustrated that she cannot figure out how her data supports her initial hypothesis. She refuses to modify her question, instead saying, "I don\'t want to try again because I will just mess up again."',
    encodedText: '[:i]Ada is frustrated that she cannot figure out how her data supports her initial hypothesis. She refuses to modify her question.[:s]I don\'t want to try again because I will just mess up again.',
    examples: [
      'Try the principle: Persisting through challenges is how we grow (Duckworth)',
      'Try the principle: Project to students that you believe they can be successful (Expectancy)'
    ],
    nonExamples: []
  },
  {
    studentIds: [3, 8],
    id: 116,
    text: 'At the end of the photosynthesis unit, you introduce a list of topics that students choose for a project they want to do. Maia raises her hand and says, "I don\'t want to do any of these. Can I just come up with my own thing?" Even before you have a chance to respond to her, another student says, "I want to do my own topic too!"  Respond.',
    encodedText: '[:i]At the end of the photosynthesis unit, you introduce a list of topics that students choose for a project they want to do. Maia raises her hand.[:s]I don\'t want to do any of these. Can I just come up with my own thing?[:i]Even before you have a chance to respond to her, another student, another student, says, "I want to do my own topic too!"  Respond.',
    examples: [
      'Try the principle: Interest-powered learning',
      'Try the principle: Encourage choice (Glasser)'
    ],
    nonExamples: []
  },
  {
    studentIds: [8, 5],
    id: 117,
    text: 'Students are working individually on a worksheet. You notice that a student is distracted.  She lashes out, "I can\'t do this! And Mike gets it. He just gets science and I don\'t. Why do I even need to try?"',
    encodedText: '[:i]Students are working individually on a worksheet. You notice that a student is distracted.[:s]I can\'t do this! And Mike gets it. He just gets science and I don\'t. Why do I even need to try?',
    examples: [
      'Try the principle: Everyone has the capacity to grow (Dweck)',
      'Try the principle: Persisting through challenges is how we grow (Duckworth)'
    ],
    nonExamples: []
  },
  {
    studentIds: [],
    id: 118,
    text: 'For the end of the photosynthesis unit, you arranged a field trip to a local farm so that students could present their findings on improving crop yield potential to professionals in the field. However, when you tell the class about the project, they don\'t seem to be excited.  What would you do to communicate the benefits of this field trip to your class?',
    encodedText: '[:i]For the end of the photosynthesis unit, you arranged a field trip to a local farm so that students could present their findings on improving crop yield potential to professionals in the field. However, when you tell the class about the project, they don’t seem to be excited.  What would you do to communicate the benefits of this field trip to your class?',
    examples: [
      'Try the principle: Principles of real-world impact',
      'Try the principle: Authentic audiences',
      'Try the principle: Learning by doing'
    ],
    nonExamples: []
  },
  {
    studentIds: [10],
    id: 119,
    text: 'You divide students into groups to perform a photosynthesis experiment. Students get to divide themselves into groups. A new student, Sasha, doesn\'t get picked until the last minute.  What would you do?',
    encodedText: '[:i]You divide students into groups to perform a photosynthesis experiment. Students get to divide themselves into groups. A new student, Sasha, doesn\'t get picked until the last minute.  What would you do?',
    examples: [
      'Try the principle: Sense of belonging',
      'Try the principle: Choice'
    ],
    nonExamples: []
  },
  {
    studentIds: [3, 1],
    id: 120,
    text: 'You introduced a game related to photosynthesis, and have pairs of two working on a game. Maia is paired with Kevin, and she asks, "How are we getting graded on this?" You tell her that there will be no grade for either completion or participation. "Why are we doing this then?" she asks.',
    encodedText: '[:i]You introduced a game related to photosynthesis, and have pairs of two working on a game. Maia is paired with Kevin.[:s]How are we getting graded on this?[:u]There will be no grade for either completion or participation.[:s]Why are we doing this then?',
    examples: [
      'Try the principle: Learning as the goal',
      'Try the principle: Outcome as the goal',
      'Try the principle: Learn by teaching (Schwartz)'
    ],
    nonExamples: []
  }
].map(forLearningObjective(35)).map(forIndicator(501));


export const doSomethingQuestions:[Question] = [
  {
    studentIds: [],
    id: 301,
    text: 'During afternoon homeroom, two students are playing a hand slap game which gets out of control after a few rounds when a student yells and is about to cry.',
    examples: [],
    nonExamples: []
  },
  {
    studentIds: [],
    id: 302,
    text: 'It is the first public share of student work.  Students are sharing their thinking maps in small groups.  One student clearly spent more time on his piece and added glitter and neon.  When he begins to share, the most volatile student lets out a laugh, "ohh my god that is sooo gay."',
    examples: [],
    nonExamples: []
  },
  {
    studentIds: [],
    id: 303,
    text: 'After lunch, you come back to the room and see someone took down the color chart or homework chart and threw it on the floor.  It is not clear who did this.',
    examples: [],
    nonExamples: []
  },
  {
    studentIds: [],
    id: 304,
    text: 'During a mini lesson you inadvertently say a phrase that clearly is taken as a sexual innuendo by a small group of students who start laughing out loud.  Others are in the dark or missed it.  You hear them ask, "what?.."',
    examples: [],
    nonExamples: []
  },
  {
    studentIds: [],
    id: 305,
    text: 'You are checking homework, and you notice Danny doesn\'t have his hw out and ready.  You write it down on your clipboard without interrupting his Do Now.  You ask his partner where her homework is.  Danny looks up and says loudly, "you didn\'t ask me for my homework--what, it\'s cause I\'m black!"',
    examples: [],
    nonExamples: []
  },
  {
    studentIds: [],
    id: 306,
    text: 'During a lesson on the rug, you are engaging the class in a Read Aloud, students are clearly engaged.  However, you soon notice that one student in the back of the room is writing all over her desk top seeming not to be paying attention.',
    examples: [],
    nonExamples: []
  },
  {
    studentIds: [],
    id: 307,
    text: 'Students are working in small groups of three or four. You scan and notice that in one group only one student is doing all the work while the other two are drawing and in another group one of the students keeps calling another student "stupid" and telling the student that his/her ideas, "suck".',
    examples: [],
    nonExamples: []
  },
  {
    studentIds: [],
    id: 308,
    text: 'You have started a well planned launch of a lesson where just about every word and idea is critical to the student entry into the problem solving part of the lesson. A student waves his/her hand and asks to go to the bathroom.',
    examples: [],
    nonExamples: []
  },
  {
    studentIds: [],
    id: 309,
    text: 'It is group work time, and students are working on a problem solving protocol on chart papers.  One group calls out, “who has a green marker?”  Across the room--the green marker flies, successfully, from one group to another.',
    examples: [],
    nonExamples: []
  },
  {
    studentIds: [],
    id: 310,
    text: 'It\'s rug time. You transition the class to the rug. One student refuses to leave his seat and starts yelling out negative comments, "I hate this class. The work we do is stupid."',
    examples: [],
    nonExamples: []
  },
  {
    studentIds: [],
    id: 311,
    text: 'The lesson is going along smoothly. You ask a question and calls on a student, as the student begins to respond, another student then yells out, "You NEVER call on me!" and rips their paper up.',
    examples: [],
    nonExamples: []
  },
  {
    studentIds: [],
    id: 313,
    text: 'The class is actively engaged in a discussion about a time they felt grown up, and as you scan the room, you notice a student has their head down and is staring into space.',
    examples: [],
    nonExamples: []
  },
  {
    studentIds: [],
    id: 314,
    text: 'Students have just returned to class from special and have started the routine of independent reading. You are passing out the snack for the day - bananas. As you reach one student, she asks, "What can we have if we don\'t like bananas?" You say, "Bananas are the only choice. It\'s bananas or you can wait until lunch." The student yells out "WHAT?! I don\'t like bananas," walks out of her seat, rolls up half the rug, and then starts slamming the door repeatedly.',
    examples: [],
    nonExamples: []
  },
  {
    studentIds: [],
    id: 315,
    text: 'The class is lining up for specials in line order. One of your students decides to cut in front of another student. You hear the other student ask her to kindly move but she refuses with a smirk on her face. You tell the student she needs to return to her line spot, but she continues to stand there silently. Your student who was cut starts to stomp her feet and yell "That\'s not fair that she gets to cut!"',
    examples: [],
    nonExamples: []
  },
  {
    studentIds: [],
    id: 316,
    text: 'It\'s the third day of school, a student walks in the middle of the mini lesson and yells, "Ms. I\'m in your class now!" The class bursts out in equal parts "ooooohhhh" and "oh nooooooo"  The newly entering student begins to answer back, "What?"',
    examples: [],
    nonExamples: []
  },
  {
    studentIds: [],
    id: 317,
    text: 'Students are getting ready for dismissal. There are few students out in the classroom getting their backpacks as you are monitoring the other students working at their desks. One student comes in and reports two students are fighting in the hallway. You walk out and see one student pinning the other student to the ground. Many students from the class have gotten out of their desks and are watching in the doorway.',
    examples: [],
    nonExamples: []
  },
  {
    studentIds: [],
    id: 318,
    text: 'It is the second full week of school and during your silent do now, you hear a student\'s phone buzz.  The student starts texting.  You ask her to put the phone away and she says, loud enough for others to hear, "it\'s my mom..." and continues texting.',
    examples: [],
    nonExamples: []
  }
].map(forLearningObjective(50)).map(forIndicator(601));



function hashCode(s){
  return s.split("").reduce(function(a,b){a=((a<<5)-a)+b.charCodeAt(0);return a&a;},0);              
}

// Temporary workaround for no question ids
export function questionId(question) {
  return Math.abs(hashCode(question.text)).toString().slice(0, 4);
}

export const allQuestions = _.flatten([
  inquiryQuestions,
  motivationQuestions,
  doSomethingQuestions
], true);