/* @flow weak */
import _ from 'lodash';
import React from 'react';


// This file defines the content for the HMTCA scenarios.
// Note: This only supports text scenes right now.
export type QuestionT = {
  type:string, // Used as a label
  text:string, // Plain question text
  applesSceneNumber?:number, // Ask for text response and log it specially
};



const TEAM_CODES = _.sortBy([
  'blackberry',
  'mango',
  'lemon',
  'papaya',
  'apple',
  'guava',
  'apricot',
  'lime',
  'pomegranate',
  'banana',
  'nectarine',
  'peach',
  'blueberry',
  'strawberry',
  'grape',
  'pineapple',
  'raspberry',
  'avocado',
  'orange',
  'cantaloupe',
  'tangerine',
  'passion fruit',
  'dragon fruit',
  'lychee',
  'pear',
  'cherry',
  'watermelon',
  'kiwi',
  'coconut',
]);


function addInAppleSceneNumber(slide, index) {
  return {...slide, applesSceneNumber: index + 1};
}

function slidesFor(cohortKey, options = {}) {
  var slides:[QuestionT] = [];
  slides.push(options.firstSlide || { el: 
    <div>
    <div><b>PART 1: Practice Individually</b> (10 minutes)</div>
    <br />
    <div>In Part 1, you’ll read through 4 separate classroom management scenes and type how you’d respond to each scene.</div>
    <br />
    <div>For each scene, simulate how you’d respond to the student(s) in the moment and type your response in the textbox located below the scene. </div>
    <br />
    <div>Once you’re finished with your responses, wait for your group to finish. You will move on to Part 2 after 10 minutes. Clicking on “Ok” will take you to your first scene. Ready?</div>
    </div>
  });

  const selectedSlides = [

    { text: 'You’re walking around the classroom going desk-to-desk taking your students’ assignments. You arrive at William’s desk and he doesn’t acknowledge your presence, keeping his head down and staring at his phone. You tell William, “It’s time to hand in your paper.” William doesn’t respond. You ask William if he completed his paper, to which he mutters under his breath without looking up, “Fuck off.”'},

    { text: `Students are working on their group projects in class today. You overhear one group discussing their project and this exchange unfolds between Krystal and Johnny:

Johnny: “Why was 6 afraid of 7? Because 7 ate 9!”

Krystal: “That’s a stupid joke.”

Johnny: “You’re just being a bitch because you’re on your period.” `},
    
    { text: 'You are a history teacher and you’re teaching a lesson on the Women’s Suffrage Movement. Jamika has her head down and is scrolling through her phone. A classmate sitting next to Jamika taps her on the shoulder and says, “Pay attention.” Jamika responds by saying, “I’m not paying attention to this whitewashed crap. Where are the black people?”'},

    { text: 'It’s March and students are starting to receive their college acceptance letters. You are teaching Physics and you hear Amy talk about getting accepted to MIT. Another student, Mike, responds to her by saying, “You only got accepted to MIT because you’re a girl.”'}];




  slides = slides.concat(selectedSlides.map(addInAppleSceneNumber));
    

  return slides;
}




export default {
  TEAM_CODES,
  questionsFor(cohortKey, options = {}) {
    return slidesFor(cohortKey, options);
  }
};