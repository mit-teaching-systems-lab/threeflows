/* @flow */
import _ from 'lodash';
import type {QuestionT} from './question.js';

function forIndicator(indicatorId) {
  return function(question:QuestionT):QuestionT {
    return {
      ...question,
      ...{indicatorId}
    };
  };
}


const inquiryQuestions:[QuestionT] = [
  { 
    studentIds: [4], 
    id: 101,
    text: `At the conclusion of your lesson plan for this challenge, you seed a group discussion by asking "What are you curious about related to photosynthesis?"  Hayin says "Why are plants green?"  What do you do?`,
    messages: [
      {
        type: 'info',
        text: 'At the conclusion of your lesson plan for this challenge, you seed a group discussion.'
      },
      {
        type: 'user',
        text: 'What are you curious about related to photosynthesis?'
      },
      {
        type: 'student',
        studentId: 4,
        text: 'Why are plants green?'
      }
    ],
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
    messages: [
      {
        type: 'info',
        text: 'Imagine a new student, Sasha, joins your classroom during the lesson plan you developed for this challenge.  As part of helping her feel comfortable, you give her a quick overview of what\'s happening.'
      },
      {
        type: 'student',
        studentId: 10,
        text: 'What is photosynthesis again?'
      },
      {
        type: 'info',
        text: 'How can you give a brief direct answer to her question?'
      }
    ],
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
    messages: [
      {
        type: 'info',
        text: 'In the context of the lesson plan you developed for this challenge...'
      },
      {
        type: 'student',
        studentId: 2,
        text: 'Why are we even doing this?'
      },
      {
        type: 'info',
        text: 'Respond in way that engages his natural curiosity and tendency towards asking questions.'
      }
    ],
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
    messages: [
      {
        type: 'info',
        text: 'Imagine in the context of the lesson plan you developed for this challenge, there is an activity where students are coming up with questions to investigate.'
      },
      {
        type: 'student',
        studentId: 8,
        text: 'How many questions should I write and what do you want me to include in them?'
      },
      {
        type: 'info',
        text: 'Respond in a way that draws out the student\'s curiosity and pushes them towards asking questions that are meaningful to them.'
      }
    ],
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
    messages: [
      {
        type: 'info',
        text: 'Imagine a new student, Sasha, joins your classroom during the lesson plan you developed for this challenge.  As part of helping her feel comfortable, you pull her aside and give her a quick overview of what\'s happening at the beginning of the class.'
      },
      {
        type: 'student',
        studentId: 10,
        text: 'I do better with visuals, can you draw me a picture of photosynthesis?'
      },
      {
        type: 'info',
        text: 'Describe what you could quickly sketch to directly answer her question.'
      }
    ],
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
    messages: [
      {
        type: 'info',
        text: 'Imagine in the context of the lesson plan you developed for this challenge, you pause and ask the whole class if they have anything they want to check their understanding on or clarify.'
      },
      {
        type: 'student',
        studentId: 3,
        text: 'How can plants be breathing, you don\'t see them inhaling and exhaling, and you don\'t see their breath in the cold?'
      }
    ],
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
    messages: [
      {
        type: 'info',
        text: 'Imagine in the context of the lesson plan you developed for this challenge, you provide a summarizing explanation of photosynthesis to the whole class.'
      },
      {
        type: 'student',
        studentId: 5,
        text: 'I\'m still a little confused, can you explain it again in a different way?'
      }
    ],
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
    messages: [
      {
        type: 'info',
        text: 'Imagine in the context of the lesson plan you developed for this challenge, you provide a summarizing explanation of photosynthesis to the whole class.'
      },
      {
        type: 'student',
        studentId: 2,
        text: 'But how can plants take in sunlight, do they like grab it?'
      }
    ],
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
    messages: [
      {
        type: 'info',
        text: 'You challenge Steve.'
      },
      {
        type: 'user',
        text: 'What is another hypothesis you could test?'
      },
      {
        type: 'student',
        studentId: 9,
        text: 'Why don\'t you just tell me what the right answer is?'
      }
    ],
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
    messages: [
      {
        type: 'info',
        text: 'You ask the entire class a question.'
      },
      {
        type: 'user',
        text: 'How can you test if the amount of sunlight influences the amount of O2 generated as a result of photosynthesis?'
      },
      {
        type: 'info',
        text: 'You wait a few seconds and nobody comes forward with an answer. What would you do?'
      }
    ],
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
    messages: [
      {
        type: 'info',
        text: 'You set up an experiment that tests how light intensity affects photosynthesis over time and recorded the data.'
      },
      {
        type: 'student',
        studentId: 1,
        text: 'Plant A probably grew more because it was genetically modified by Home Depot.'
      },
      {
        type: 'info',
        text: 'The whole class laughs. Prompt the student to clarify and use evidence.'
      }
    ],
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
    messages: [
      {
        type: 'info',
        text: 'As you walk around, you see that Jasmine is missing some data in their data tables. What could you do to nudge her in the right direction?'
      }
    ],
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
    messages: [
      {
        type: 'info',
        text: 'Miquel finished generating questions (i.e. hypotheses) about photosynthesis, and some are not testable. How can you connect his responses with the idea of planning research?'
      }
    ],
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
    messages: [
      {
        type: 'info',
        text: 'You set up a photosynthesis experiment for the class, and students report the data they\'ve collected. As it turns out, Mike has experimented with only two variables: hours of light and water.  Respond to this by connecting this with data collection planning.'
      }
    ],
    examples: [
      'Ask students to carefully examine the collected data to determine if they have enough data to support or refute their initial hypothesis.'
    ],
    nonExamples: [
      'Tell student to run more experiments with amount of CO2 as a variable.'
    ]

  }
].map(forIndicator(502));

export const motivationQuestions = [
  {
    studentIds: [8],
    id: 115,
    text: 'Ada is frustrated that she cannot figure out how her data supports her initial hypothesis. She refuses to modify her question, instead saying, "I don\'t want to try again because I will just mess up again."',
    messages: [
      {
        type: 'info',
        text: 'Ada is frustrated that she cannot figure out how her data supports her initial hypothesis. She refuses to modify her question.'
      },
      {
        type: 'student',
        studentId: 8,
        text: 'I don\'t want to try again because I will just mess up again.'
      }
    ],
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
    messages: [
      {
        type: 'info',
        text: 'At the end of the photosynthesis unit, you introduce a list of topics that students choose for a project they want to do. Maia raises her hand.'
      },
      {
        type: 'student',
        studentId: 3,
        text: 'I don\'t want to do any of these. Can I just come up with my own thing?'
      },
      {
        type: 'info',
        text: 'Even before you have a chance to respond to her, another student raises her hand.'
      },
      {
        type: 'student',
        studentId: 8,
        text: 'I want to do my own topic too!'
      }
    ],
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
    messages: [
      {
        type: 'info',
        text: 'Students are working individually on a worksheet. You notice that a student is distracted.'
      },
      {
        type: 'student',
        studentId: 8,
        text: 'I can\'t do this! And Mike gets it. He just gets science and I don\'t. Why do I even need to try?'
      }
    ],
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
    messages: [
      {
        type: 'info',
        text: 'For the end of the photosynthesis unit, you arranged a field trip to a local farm so that students could present their findings on improving crop yield potential to professionals in the field. However, when you tell the class about the project, they don’t seem to be excited.  What would you do to communicate the benefits of this field trip to your class?'
      }
    ],
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
    messages: [
      {
        type: 'info',
        text: 'You divide students into groups to perform a photosynthesis experiment. Students get to divide themselves into groups. A new student, Sasha, doesn\'t get picked until the last minute.  What would you do?'
      }
    ],
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
    messages: [
      {
        type: 'info',
        text: 'You introduced a game related to photosynthesis, and have pairs of two working on a game. Maia is paired with Kevin.'
      },
      {
        type: 'student',
        studentId: 3,
        text: 'How are we getting graded on this?'
      },
      {
        type: 'user',
        text: 'There will be no grade for either completion or participation.'
      },
      {
        type: 'student',
        studentId: 3,
        text: 'Why are we doing this then?'
      }
    ],
    examples: [
      'Try the principle: Learning as the goal',
      'Try the principle: Outcome as the goal',
      'Try the principle: Learn by teaching (Schwartz)'
    ],
    nonExamples: []
  }
].map(forIndicator(501));


export const doSomethingQuestions:[QuestionT] = [
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
    studentIds: [4001],
    id: 305,
    text: 'You are checking homework, and you notice Danny doesn\'t have his homework out and ready.  You write it down on your clipboard without interrupting his Do Now.  You ask his partner where her homework is.  Danny looks up and says loudly, "you didn\'t ask me for my homework--what, it\'s cause I\'m black!"',
    examples: [],
    nonExamples: []
  },
  {
    studentIds: [4002],
    id: 306,
    text: 'During a lesson on the rug, you are engaging the class in a Read Aloud, students are clearly engaged.  However, you soon notice Sheena in the back of the room writing all over her desk top seeming not to be paying attention.',
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
].map(forIndicator(601));

export const playtestQuestions:[QuestionT] = [
  {
    studentIds: [],
    id: 331,
    text: 'After lunch, you come back to the room and see someone took down the color chart or homework chart and threw it on the floor.  It is not clear who did this. How would you Respond to the class?',
    examples: [],
    nonExamples: []
  },
  {
    studentIds: [],
    id: 332,
    text: 'During a mini lesson you inadvertently say a phrase that clearly is taken as a sexual innuendo by a small group of students who start laughing out loud.  Others are in the dark or missed it.  You hear them ask, "what?.." How would you Respond to the class?',
    examples: [],
    nonExamples: []
  },
  {
    studentIds: [],
    id: 333,
    text: 'You are checking homework, and you notice Danny doesn\'t have his homework out and ready.  You write it down on your clipboard without interrupting his Do Now.  You ask his partner where her homework is.  Danny looks up and says loudly, "you didn\'t ask me for my homework--what, it\'s cause I\'m black!" How do you respond to Danny?',
    examples: [],
    nonExamples: []
  },
  {
    studentIds: [],
    id: 334,
    text: 'It is the first public share of student work.  Students are sharing their thinking maps in small groups.  One student clearly spent more time on his piece and added glitter and neon.  When he begins to share, the most volatile student lets out a laugh, “ohh my god that is sooo gay.” How do you respond to the student?',
    examples: [],
    nonExamples: []
  },
  {
    studentIds: [],
    id: 335,
    text: 'You are having a class discussion about career paths. All the students are actively engaged in the conversation and taking turns to talk about what they would like to be when they grow up. When it gets to Peter’s turn, he says he would like to become a nurse. At this point, the most volatile student lets out a laugh, “ohh my god that is sooo lame.” How do you respond to the student?',
    examples: [],
    nonExamples: []
  },
  {
    studentIds: [],
    id: 336,
    text: 'Students are working in small groups of two. Danny and James are working together. You hear Danny call James "stupid" and tells him that his ideas "suck". How do you respond to Danny?',
    examples: [],
    nonExamples: []
  },
  {
    studentIds: [],
    id: 337,
    text: 'You have started a well planned launch of a lesson where just about every word and idea is critical to the student entry into the problem solving part of the lesson. A student waves his/her hand and asks to go to the bathroom. How do you respond to the student?',
    examples: [],
    nonExamples: []
  },
  {
    studentIds: [],
    id: 338,
    text: 'It\'s rug time. You transition the class to the rug. One student refuses to leave his seat and starts yelling out negative comments, "I hate this class. The work we do is stupid." How do you respond to the student?',
    examples: [],
    nonExamples: []
  },
  {
    studentIds: [],
    id: 339,
    text: 'The lesson is going along smoothly. You ask a question and calls on a student, as the student begins to respond, David (another student) then yells out, "You NEVER call on me!" and rips his paper up. How do you respond to David?',
    examples: [],
    nonExamples: []
  },
  {
    studentIds: [],
    id: 340,
    text: 'The class is actively engaged in a discussion about a time they felt grown up, and as you scan the room, you notice a student has their head down and is staring into space. How do you respond to the student?',
    examples: [],
    nonExamples: []
  },
  {
    studentIds: [],
    id: 341,
    text: 'Students have just returned to class from special and have started the routine of independent reading. You are passing out the snack for the day - bananas. As you reach one student, she asks, "What can we have if we don\'t like bananas?" You say, "Bananas are the only choice. It\'s bananas or you can wait until lunch." The student yells out "WHAT?! I don\'t like bananas," walks out of her seat, rolls up half the rug, and then starts slamming the door repeatedly. How do you respond to the student?',
    examples: [],
    nonExamples: []
  },
  {
    studentIds: [],
    id: 342,
    text: 'It\'s the third day of school, a student walks in the middle of the mini lesson and yells, "Ms. I\'m in your class now!" The class bursts out in equal parts "ooooohhhh" and "oh nooooooo"  The newly entering student begins to answer back, "What?" How would you Respond to the class?',
    examples: [],
    nonExamples: []
  },
].map(forIndicator(601));

export const dansonQuestions:[QuestionT] = [
  {
    studentIds: [],
    id: 351,
    text: 'After the initial introductions, Mrs. Danson starts speaking:\n\n\"I requested today\'s conference in order to get to know you better, to frankly and clearly discuss Brian and his needs, and to establish an early pattern of communication between you and me.\
    \n\nBrian was diagnosed with mild autism when he was 3 years old. As Brian entered and progressed through elementary school, I learned through experience that teachers often struggled with including Brian in regular education classrooms and providing him with formative and supportive learning environments.\
    \n\nBrian has had various struggles with teachers and peers. For example, he\'s been removed from a school party because of organizational difficulties such as forgetting to hand work in. Also, students have harassed him verbally and physically, for example, by spitting at him, even while teachers were nearby.\
    \n\nIn spite of these challenges, he has been able to achieve various successes at school. For example, he has helped many teachers troubleshoot computer problems, he performed well in a solo singing part in a school play, and he gets high scores in math standardized tests.\
    \n\nI\'m here just to try and advocate for my son and get him through the educational system.\
    \n\nI\'d like to talk to you about some of the typical behaviors Brian exhibits and discuss how you will work with Brian if/when he exhibits these behaviors in class.\
    \n\nCould you please tell me what you know about autism.\"',
    examples: [],
    nonExamples: []
  },
  {
    studentIds: [],
    id: 352,
    text: 'If Brian walks up to a girl, gives her an unwanted hug, and begins talking to her continuously and loudly about his computer games, how will you address this?',
    examples: [],
    nonExamples: []
  },
  {
    studentIds: [],
    id: 353,
    text: 'How can we establish regular communication patterns between you and me?',
    examples: [],
    nonExamples: []
  },
  {
    studentIds: [],
    id: 354,
    text: 'I\'m no dummy. Are you sure this is how you\'re going to communicate with me when you also serve many other kids and their families?',
    examples: [],
    nonExamples: []
  },
  {
    studentIds: [],
    id: 355,
    text: 'I\'m concerned with Brian\'s academic performance, but I\'m also concerned about his social behaviors. Frankly, you have to be my eyes for me, watching over Brian while he\'s at school. I have to trust that you\'ll watch over him as his teacher. So … tell me how you\'re observant to the social behaviors of students?',
    examples: [],
    nonExamples: []
  },
  {
    studentIds: [],
    id: 356,
    text: 'How can we include Brian in sports or other extracurricular activities that require him to work with other students?',
    examples: [],
    nonExamples: []
  },
  {
    studentIds: [],
    id: 357,
    text: 'I\'m sure you think I\'m a pain in the neck kind of parent, but I\'m just trying to protect my son.',
    examples: [],
    nonExamples: []
  },
  {
    studentIds: [],
    id: 358,
    text: 'I recognize that you\'re a young teacher. I don\'t want teachers to be afraid of students with special needs and I don\'t want you to be afraid of me. But, I\'m here because in the past some teachers have struggled with serving and including my son.\
    \n\nDespite Brian\'s difficult history, he is always upbeat and many people gain personal satisfaction from helping him',
    examples: [],
    nonExamples: []
  },
].map(forIndicator(901));

const mathMisconceptionsQuestions = [
  {
    id: 2001,
    studentIds: [],
    youTubeId: '5iUTUQ3e0_w',
    examples: [],
    nonExamples: []
  }
].map(forIndicator(801));

const justinAndRitaQuestions = [
  {
    id: 3001,
    studentIds: [4003],
    youTubeId: 'EvQ1S6-ImRk',
    youTubeParams: {
      end: 124
    },
    examples: [],
    nonExamples: []
  }
].map(forIndicator(701));


export const allQuestions:[QuestionT] = _.flatten([
  inquiryQuestions,
  motivationQuestions,
  doSomethingQuestions,
  justinAndRitaQuestions,
  mathMisconceptionsQuestions
], true);