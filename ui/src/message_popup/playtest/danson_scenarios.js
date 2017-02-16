/* @flow weak */
import hash from '../../helpers/hash.js';


export type QuestionT = {
  id:number,
  choices:[string],
  text:string
};


// Make questions and choices.
export const InsubordinationScenarios = {
  choices() {
    return [];
  },

  data() {
    // Read scenario
    return [
      'After the initial introductions, Mrs. Danson starts speaking:\n\n\"I requested today\'s conference in order to get to know you better, to frankly and clearly discuss Brian and his needs, and to establish an early pattern of communication between you and me.\
      \n\nBrian was diagnosed with mild autism when he was 3 years old. As Brian entered and progressed through elementary school, I learned through experience that teachers often struggled with including Brian in regular education classrooms and providing him with formative and supportive learning environments.\
      \n\nBrian has had various struggles with teachers and peers. For example, he\'s been removed from a school party because of organizational difficulties such as forgetting to hand work in. Also, students have harassed him verbally and physically, for example, by spitting at him, even while teachers were nearby.\
      \n\nIn spite of these challenges, he has been able to achieve various successes at school. For example, he has helped many teachers troubleshoot computer problems, he performed well in a solo singing part in a school play, and he gets high scores in math standardized tests.\
      \n\nI\'m here just to try and advocate for my son and get him through the educational system.\
      \n\nI\'d like to talk to you about some of the typical behaviors Brian exhibits and discuss how you will work with Brian if/when he exhibits these behaviors in class.\
      \n\nCould you please tell me what you know about autism.\"',
      'If Brian walks up to a girl, gives her an unwanted hug, and begins talking to her continuously and loudly about his computer games, how will you address this?',
      'How can we establish regular communication patterns between you and me?',
      'Is this really the best you can offer?',
      'I\'m no dummy. Are you sure this is how you\'re going to communicate with me when you also serve many other kids and their families?',
      'I\'m concerned with Brian\'s academic performance, but I\'m also concerned about his social behaviors. Frankly, you have to be my eyes for me, watching over Brian while he\'s at school. I have to trust that you\'ll watch over him as his teacher. So … tell me how you\'re observant to the social behaviors of students?',
      'How can we include Brian in sports or other extracurricular activities that require him to work with other students?',
      'I\'m sure you think I\'m a pain in the neck kind of parent, but I\'m just trying to protect my son.',
      'I recognize that you\'re a young teacher. I don\'t want teachers to be afraid of students with special needs and I don\'t want you to be afraid of me. But, I\'m here because in the past some teachers have struggled with serving and including my son.\
      \n\nDespite Brian\'s difficult history, he is always upbeat and many people gain personal satisfaction from helping him',
    ];
  },

  // Return questions.
  questions() {
    const allQuestions = this.data().map((text, index) => {
      const question:QuestionT = {
        id: hash(text),
        choices: [],
        text: text
      };
      if(index === 2) {
        question.choices = ['Contact me anytime', 'I will send you regular updates', 'I may not always be available', 'I will let you know later', 'None of the above'];
      }
      return question;
    }, this);

    return allQuestions;
  }
};
