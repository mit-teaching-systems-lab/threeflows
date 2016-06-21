// @flow
import _ from 'lodash';

// Example Usage:
//   questions.map(_.partial(forLearningObjective, 39));
function forLearningObjective(learningObjectiveId, question) {
  return {
    ...question,
    ...{learningObjectiveId}
  };
}

export type Question = {
  studentId?: number,
  text: string,
  examples: [string],
  nonExamples: [string]
};
export const inquiryQuestions:[Question] = [
  { 
    studentId: 4, 
    text: `At the conclusion of your lesson plan for this challenge, you seed a group discussion by asking "What are you curious about related to photosynthesis?"  Hayin says "Why are plants green?"  What do you do?`,
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
    studentId: 10, 
    text: `Imagine a new student, Sasha, joins your classroom during the lesson plan you developed for this challenge.  As part of helping her feel comfortable, you give her a quick overview of what's happening.  She asks "what is photosynthesis again?"  How can you give a brief direct answer to her question?`,
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
    studentId: 2, 
    text: `In the context of the lesson plan you developed for this challenge, Floyd says "why are we even doing this?"  Respond in way that engages his natural curiosity and tendency towards asking questions`,
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
    studentId: 8,
    text: `Imagine in the context of the lesson plan you developed for this challenge, there is an activity where students are coming up with questions to investigate.  Ada says "How many questions should I write and what do you want me to include in them?"  Respond in a way that draws out the student's curiosity and pushes them towards asking questions that are meaningful to them.`,
    examples: [
      `"I want you to ask the kinds of questions you think are meaningful, not the ones I think are meaningful."`,
      `"Well, you have to come up with your own questions that matter to you.  I'll share a question I think is interesting: Plants can get hurt and lose leaves and branches and they grow right back.  That's different than people - you can't break off an arm and have it grow right back or we wouldn't need doctors.  That's something I'm curious about, so you can't use that question, but what else are you curious about?"`,
      `"Let's step back a second. What are you curious about after seeing the demonstration? What are you wondering? Ok, then let's work on turning that into a question that you can answer with an experiment."`,
      `"Tell me one question that you are burning know the answer to."`
    ],
    nonExamples:[
      `"To get an A, make three questions and include an IV, DV in each one."`,
      `"At least 2 questions focused on how you could collect the oxygen made by a plant."`
    ]
  },
  {
    studentId: 10,
    text: `Imagine a new student, Sasha, joins your classroom during the lesson plan you developed for this challenge.  As part of helping her feel comfortable, you pull her aside and give her a quick overview of what's happening at the beginning of the class.  She interrupts and asks, "I do better with visuals, can you draw me a picture of photosynthesis?"  Describe what you could quickly sketch to directly answer her question.`,
    examples: [
      `[Insert simple drawings here]`
    ],
    nonExamples:[
      `"Go look in the textbook." (This is fine, but not answering the pop-up question.)`,
      `[Insert very complex drawing here]`
    ]
  },
  {
    studentId: 3,
    text: `Imagine in the context of the lesson plan you developed for this challenge, you pause and ask the whole class if they have anything they want to check their understanding on or clarify.  Maia asks "How can plants be breathing, you don't see them inhaling and exhaling, and you don't see their breath in the cold?"`,
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
    studentId: 5,
    text: `Imagine in the context of the lesson plan you developed for this challenge, you provide a summarizing explanation of photosynthesis to the whole class.  Mike asks, "I'm still a little confused, can you explain it again in a different way?"`,
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
    studentId: 2,
    text: `Imagine in the context of the lesson plan you developed for this challenge, you provide a summarizing explanation of photosynthesis to the whole class.  Floyd asks, "But how can plants take in sunlight, do they like grab it?"`,
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
    studentId: 9,
    text: 'You challenge Steve and ask, "What is another hypothesis you could test?" He asks, "why don\'t you just tell me what the right answer is?"',
    examples: [
      'Discuss that scientific inquiry often starts when there is no clear right answer.',
      'Discuss that scientists ask questions about things they are interested in.',
      `"Let's think about photosynthesis together. What do you know about this process? What are some things you want to know?"`
    ],
    nonExamples: [
      'Criticize the student for not being self-initiative',
      'Say that there’s only one correct hypothesis.'
    ]
  },
  {
    text: 'You ask the whole class, "how can you test if the amount of sunlight influences the amount of O2 generated as a result of photosynthesis?"  You wait a few seconds and nobody comes forward with an answer.  What would you do?',
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
  }
  // {
  //   text: 'You introduce an experiment about photosynthesis, the student says, “Why are we even doing this?”  Generate some seed questions to spark curiosity and prompt students to generate their own questions.',
  //   examples: [],
  //   nonExamples: []
  // }
];

export const motivationQuestions:[Question] = [{
  studentId: 6,
  text: 'A student is frustrated that she cannot figure out how her data supports her initial hypothesis. She refuses to modify her question, instead saying, "I don\'t want to try again because I will just mess up again."',
  examples: [
    'Try the principle: Persisting through challenges is how we grow (Duckworth)',
    'Try the principle: Project to students that you believe they can be successful (Expectancy)'
  ],
  nonExamples: []
}, {
  studentId: 3,
  text: 'At the end of the photosynthesis unit, you introduce a list of topics that students choose for a project they want to do. A student raises her hand and says, "I don\'t want to do any of these. Can I just come up with my own thing?" Even before you have a chance to respond to her, another student, another student, says, "I want to do my own topic too!"  Respond.',
  examples: [],
  nonExamples: []
}];


export const allQuestions = _.flatten([
  inquiryQuestions.map(_.partial(forLearningObjective, 39)),
  motivationQuestions.map(_.partial(forLearningObjective, 35))
], true);

