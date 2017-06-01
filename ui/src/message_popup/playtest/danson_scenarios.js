/* @flow weak */
import hash from '../../helpers/hash.js';

export type ResponseT = {
  choice:string,
  question:QuestionT,
  audioResponse:{downloadUrl:string}
};

export type QuestionT = {
  id:number,
  choices:[string],
  text:string,
  type:string, // A string that gets displayed as the page heading
  stage:string // one of 'info', 'prereflect', 'scenario', 'postreflect'
};

// Make questions and choices
export const DansonScenarios = {
  choices() {
    return [];
  },

  getSlides() {
    const slides:[QuestionT] = [];

    slides.push({type: 'Background', stage: 'info', text: 
      `You are a new teacher recently hired to work at Pleasantville High School, a small, suburban school within 1 hour’s drive of a major metropolitan city.

It is late July and you have spent most of your summer working at the school, getting your classroom established, preliminary units planned, and materials ready for the mid-August start of the school year. You have confirmed with your principal that you’ll be teaching primarily 9th and 10th grade this year.

As the summer has progressed, you’ve gotten to know the administration, the secretaries, and support staff. Few weeks before the first day of school, one of the guidance counselors comes to you, informing you that a parent wants to speak to you.

You are a bit surprised, as you didn’t expect parent conferences prior to actually teaching any students. When you question the counselor on what this conference is all about, the only background information she can provide is that this parent (Mrs. Lori Danson) and student (Brian Danson) are new to the school district and that Brian will soon be starting 9th grade. 

You agree to the conference and ask the counselor to arrange for the parent to come in next week.`
  });

    slides.push({type: 'Pre-simulation Reflection', stage: 'prereflect', text: 
      `Given that you have little data on which to build expectations, what are your goals for this parent-initiated conference with Lori Danson?`
    });

    slides.push({type: 'Pre-simulation Reflection', stage: 'prereflect', text: 
      `Do you have any specific observations, notes, or statements you wish to document before this simulation begins?`
    });

    slides.push({type: 'Pre-simulation Reflection', stage: 'prereflect', text: 
      `Do you have any questions, concerns, or professional issues that you wish to document before this simulation begins?`
    });

    slides.push({type: 'Simulation', stage: 'info', text: 
      `Please find a quiet room to begin your simulation

You will go through a set of scenarios that simulate the conversation between you and Mrs. Danson.

You need to provide an audio response to each prompt.

Please respond as quickly as possible (like you would do in a real conversation).

This may feel uncomfortable at first, but it's better to feel uncomfortable here than with a real parent.`
    });

    slides.push({type: 'Scenario', stage: 'scenario', text: 
      `After the initial introductions, Mrs. Danson starts speaking:

"I requested today's conference in order to get to know you better, to frankly and clearly discuss Brian and his needs, and to establish an early pattern of communication between you and me.

Brian was diagnosed with mild autism when he was 3 years old. As Brian entered and progressed through elementary school, I learned through experience that teachers often struggled with including Brian in regular education classrooms and providing him with formative and supportive learning environments.

Brian has had various struggles with teachers and peers. For example, he's been removed from a school party because of organizational difficulties such as forgetting to hand work in. Also, students have harassed him verbally and physically, for example, by spitting at him, even while teachers were nearby.

In spite of these challenges, he has been able to achieve various successes at school. For example, he has helped many teachers troubleshoot computer problems, he performed well in a solo singing part in a school play, and he gets high scores in math standardized tests.

I'm here just to try and advocate for my son and get him through the educational system.

I'd like to talk to you about some of the typical behaviors Brian exhibits and discuss how you will work with Brian if/when he exhibits these behaviors in class.

Could you please tell me what you know about autism."`
    });

    slides.push({type: 'Scenario', stage: 'scenario', text: 
      `If Brian walks up to a girl, gives her an unwanted hug, and begins talking to her continuously and loudly about his computer games, how will you address this?`
    });

    slides.push({type: 'Scenario', stage: 'scenario', text: 
      `How can we establish regular communication patterns between you and me?`
    });

    slides.push({type: 'Scenario', stage: 'scenario', text: 
      `I'm no dummy. Are you sure this is how you're going to communicate with me when you also serve many other kids and their families?`
    });

    slides.push({type: 'Scenario', stage: 'scenario', text: 
      `I'm concerned with Brian's academic performance, but I'm also concerned about his social behaviors. Frankly, you have to be my eyes for me, watching over Brian while he's at school. I have to trust that you'll watch over him as his teacher. So … tell me how you're observant to the social behaviors of students?`
    });

    slides.push({type: 'Scenario', stage: 'scenario', text: 
      `How can we include Brian in sports or other extracurricular activities that require him to work with other students?`
    });

    slides.push({type: 'Scenario', stage: 'scenario', text: 
      `I'm sure you think I'm a pain in the neck kind of parent, but I'm just trying to protect my son.`
    });

    slides.push({type: 'Scenario', stage: 'scenario', text: 
      `I recognize that you're a young teacher. I don't want teachers to be afraid of students with special needs and I don't want you to be afraid of me. But, I'm here because in the past some teachers have struggled with serving and including my son.

Despite Brian's difficult history, he is always upbeat and many people gain personal satisfaction from helping him`
    });


    slides.push({type: 'Post-simulation Reflection', stage: 'postreflect', text: 
      `Reflecting back on your conversation with Lori Danson, what are your initial thoughts and feelings?`
    });

    slides.push({type: 'Post-simulation Reflection', stage: 'postreflect', text: 
      `Recognizing that you had little data prior to the conference, were you able to accomplish your goals? If not, what prevented you from doing so?`
    });

    slides.push({type: 'Post-simulation Reflection', stage: 'postreflect', text: 
      `What were your strengths in this simulation? Briefly describe the portion of the simulation where you exhibited this professional strength.`
    });

    slides.push({type: 'Post-simulation Reflection', stage: 'postreflect', text: 
      `Did this simulation highlight any professional skills, knowledge base(s), or dispositions on which you need to improve? If so, briefly describe the specific portion of the simulation where you struggled or were unsure of how to proceed. Were there aspects of your broader teacher preparation experience that were targeted in this simulation?`
    });

    slides.push({type: 'Post-simulation Reflection', stage: 'postreflect', text: 
      `Reflecting on your meeting with Mrs. Danson, do you have any new or different perspectives on your professional responsibilities, policies, or expectations?`
    });

    slides.push({type: 'Post-simulation Reflection', stage: 'postreflect', text: 
      `Are there specific questions, statements, dilemmas, or situations that arose in your simulation that you want to raise for discussion during the larger group debriefing process? List below`
    });

    return slides;
  },

  // Return questions
  questions() {
    const allQuestions = this.getSlides().map((slide, index) => {
      const question:QuestionT = {
        id: hash(slide.text),
        choices: [],
        text: slide.text,
        type: slide.type,
        stage: slide.stage
      };
      return question;
    }, this);

    return allQuestions;
  }
};
