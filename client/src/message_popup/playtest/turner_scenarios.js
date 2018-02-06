/* @flow weak */
import hash from '../../helpers/hash.js';

export type ResponseT = {
  choice:string,
  question:QuestionT,
  downloadUrl:string
};

export type QuestionT = {
  id:number,
  youTubeId:string,
  start: number,
  end: number,
  type:string, // A string that gets displayed as the page heading
  stage:string // one of 'info', 'prereflect', 'scenario', 'postreflect'
};


// Make questions and choices.
export const TurnerScenarios = {
  choices() {
    return [];
  },

  getSlides() {
    const slides:[QuestionT] = [];

    slides.push({type: 'Background', stage: 'info', text: 
      `Imagine you are a new teacher recently hired to work at Pleasantville High School, a small, suburban school within 1 hour’s drive of a major metropolitan city.

You are beginning the second semester of your first year of teaching at Pleasantville HS. You've established an overall solid rapport with your students, as they recognize you as a teacher who is fair, consistent, knowledgeable, and has high expectations for student achievement.

One of your courses is a general course for 11th grade students. As a teacher, you believe that all students can learn. You structure your classes such that you support students as they grow intellectually while always keeping the academic pressure on, challenging them to continue advancing and to not become passive, stagnant individuals who just show up for class. This philosophy translates to a variety of independent in-class and out-of-class assignments. Never a fan of long lectures or worksheets, you structure most classes with a combination of mini-lectures, independent and group readings, and in-class projects or assignments. At times, students show frustration with the variety of learning activities. Some students appear to be more comfortable with you simply telling them what they will need to know, instead of challenging them to discover and construct knowledge themselves.

Amber Turner is a student in this class, but has made it clear that academics are not her focus. She is known throughout the small Pleasantville community as "the model," having appeared in several well-known clothing store and shoe commercials/photo shoots. Amber displays unmistakable arrogance and disdain for her peers and teachers.

It is clear to you that Amber sees high school as a waste or her time, as she is solely focused on her modeling career. The school's guidance counselor reports to you that she is maintaining a healthy "C" average in her other classes, In your class, though, her grades are in the low '60's, resulting from a variety of absences and incomplete work. When she is in attendance and completes her work, her grades are sufficient — not the best completed assignments you've ever seen, but not "F" quality either. Amber's facial expressions, vocal sighs, and rolling eyes tell you she'd prefer a class where she didn't have to work, and where you just gave her the info and she regurgitated it back to you on a test. Your constructivist approach to your subject, though, causes Amber and her peers to actually have to put forth some effort.

You know that Amber is frustrated, and you're not surprised when you receive a somewhat curt handwritten note from her mother, requesting a conference with you. You inform Amber of a day/time that best suits your schedule, telling Amber that you're happy to meet her mother at the school. In response, Amber gives you a smirk and a distinct "now you're going to catch hell" look.`
  });

    slides.push({type: 'Pre-simulation Reflection', stage: 'info', text: 
      `Please spend a few minutes reflecting on the following questions and provide your responses`
    });

    slides.push({type: 'Pre-simulation Reflection', stage: 'prereflect', text: 
      `Based on the context in the previous page, what do you anticipate during this conference with Amber's mother, Jennifer?`
    });

    slides.push({type: 'Pre-simulation Reflection', stage: 'prereflect', text: 
      `Do you have any specific observations, notes, statements, or concerns you wish to document before this clinical simulation begins?`
    });

    slides.push({type: 'Simulation', stage: 'info', text: 
      `Please find a quiet room to begin your simulation

You will go through a set of scenarios that simulate the conversation between you and Mrs. Turner.

You need to provide an audio response immediately after each video scenario.

Please respond as quickly as possible (like you would do in a real conversation).

This may feel uncomfortable at first, but it's better to feel uncomfortable here than with a real parent.`
    });

    slides.push({type: 'Scenario', stage: 'scenario', youTubeId: 'DXdWPArayr8'});

    slides.push({type: 'Scenario', stage: 'scenario', youTubeId: 'EPeEgD3EnAY'});

    slides.push({type: 'Scenario', stage: 'scenario', youTubeId: 'Nk1a4MUn45I'});

    slides.push({type: 'Scenario', stage: 'scenario', youTubeId: 'ugUEfqG_AQc'});

    slides.push({type: 'Scenario', stage: 'scenario', youTubeId: 'z2P6WEojD1s'});

    slides.push({type: 'Scenario', stage: 'scenario', youTubeId: 'jzEOiaIlxN4'});

    slides.push({type: 'Post-simulation Reflection', stage: 'info', text: 
      `We will have a debrief in the next class. Please respond to the following reflection questions as preparation for the debrief.`
    });

    slides.push({type: 'Post-simulation Reflection', stage: 'postreflect', text: 
      `Reflecting back on your conversation with Jennifer Turner, what are your initial thoughts and feelings?`
    });

    slides.push({type: 'Post-simulation Reflection', stage: 'postreflect', text: 
      `Did the conference with Mrs. Turner occur as you had anticipated?`
    });

    slides.push({type: 'Post-simulation Reflection', stage: 'postreflect', text: 
      `What were your strengths in this simulation? Briefly describe the portion of the simulation where you exhibited this professional strength.`
    });

    slides.push({type: 'Post-simulation Reflection', stage: 'postreflect', text: 
      `Did this simulation highlight any professional skills, knowledge base(s), or dispositions on which you need to improve? If so, briefly describe the specific portion of the simulation where you struggled or were unsure of how to proceed.`
    });

    slides.push({type: 'Post-simulation Reflection', stage: 'postreflect', text: 
      `Reflecting on your meeting with Mrs. Turner, do you have any new or different perspectives on your professional responsibilities, policies, or expectations?`
    });

    slides.push({type: 'Post-simulation Reflection', stage: 'postreflect', text: 
      `Are there specific questions, statements, dilemmas, or situations that arose in your simulation that you want to raise for discussion during the larger group debriefing in class? List below`
    });

    return slides;

  },

  // Return questions.
  questions() {
    const allQuestions = this.getSlides().map((slide, index) => {
      const question:QuestionT = {
        id: slide.text ? hash(slide.text) : hash(slide.youTubeId),
        youTubeId: slide.youTubeId,
        text: slide.text,
        start: slide.start,
        end: slide.end,
        type: slide.type,
        stage: slide.stage
      };
      return question;
    }, this);

    return allQuestions;
  }
};
