/* @flow weak */
import React from 'react';

/*
This file defines the content for the scenario around detecting microaggressions.
*/

export type QuestionT = {
  type:string, // Used as a label
  text:string,
  open:?bool, // Ask for open-ended user response
  choices:?bool // Forced-choice response
};



function slidesFor(cohortKey, options) {
  const slides:[QuestionT] = [];


  slides.push({ type: 'Overview', el:
    <div>
    <div>1. Set Context</div>
    <div>Imagine yourself as an observer in a highschool computer science classroom taught by a fellow teacher. Your role is to observe your fellow teacher and give feedback to the best of your ability.</div>
    <br />
    <div>2. Background</div>
    <div>You'll receive a bit of background information on the lesson being taught.</div>
    <br />
    <div>3. Try it!</div>
    <div>When you're ready, you'll go through a set of short scenes that simulate moments in the classroom. Note what you observe.</div>
    <br />
    {(options.isFacilitated)
      ? <div>
        <div>4. PAUSE!</div>
       <div>After the first set of scenes, pause for a brief group discussion before resuming.</div></div>
      : <div>
        <div>4. Reflect</div>
       <div>After the first set of scenes you'll get a chance to reflect on what you observed before moving on.</div>
       </div>}
    <br />
    <div>5. Lenses</div>
    <div>Finally, you'll be given a second set of scenes to observe. This time you'll be asked to view the classroom interactions with a more specific focus.</div>
  </div>
  });


// Context
  slides.push({type: 'Context', text: 
      `Imagine you're a teacher at a suburban high school. Your friend and experienced colleague, Mr. Smith, asks you to sit in and observe his CS class for a day.

The class, taught by Mr. Smith, has 6 students. The demographics of the class are as follows:
  
  Cody: White Male
  George: White Male
  Jamal: African American Male
  Kevin: African American Male
  Molly: White Female
  Tim: White Male
`
  });



  // -----------------------------------------------------
  // BACKGROUND
  // -----------------------------------------------------

  slides.push({type: 'Background', text: 
      `Mr. Smith will be teaching a class on encoding and sending formatted text. 

In doing so, his students will be working with the standard internet encoding protocol, ASCII. The class will be using pair programming to complete a project developing their own protocol for sending formatted (i.e bold, italicized, etc.) text. 

      `
    });

  slides.push({type: 'Background', el: 
<div>
  <div>Useful Knowledge:</div>
  <br />
  <div>ASCII is a protocol for representing alphabetic, numeric, and special characters with specific 7-bit binary numbers.</div>
  <br />
  <div>Binary is a number scheme that represents data through the use of only two possible digits: 0 or 1. A bit, which is the smallest unit of information that can be stored on a computer, thus consists of a 1 or a 0.  </div>
  <br />
  <div>The term “Internet Simulator” will come up in some scenes. It is a tool which the students will use to test communication protocols on the internet.</div>
  <br />
  <div>If you don't entirely understand all the details of this lesson, that's just fine!  Accepting that uncertainty and doing your best within it is exactly what we're looking for.</div>
</div> 
    });

  // -----------------------------------------------------
  // Try it! 
  // -----------------------------------------------------

  slides.push({type: 'Try it!', text: 
      `When you are ready, you'll progress through a set of scenes which span a single lesson in Mr. Smith’s class. The scenes represent small snapshots of time within a full lesson, and are not the full lesson themselves. 

For each scene you will get 25 seconds to view the image and read the dialogue. Use both the images and text to get a feel for what is happening. After each scene you will be given a page to write down any notes or thoughts you have about the scene. What did you notice? Was there anything worth mentioning to Mr. Smith?  Think of these as personal notes you would jot down while observing the class. Remember, at the end you will be giving feedback to Mr. Smith! 

Try not to spend too much time writing notes on any one slide. There will be plenty of time to reflect at the end! 

Okay! Ready to start?`
    });


  slides.push({type: 'Try it!', el:
    <div>
      <div>Mr. Smith is addressing the students at the beginning of the class: </div>
      <div> <img src="https://s3-us-west-2.amazonaws.com/tsl-public/threeflows/smith-scenario/MA-SmithIntro.jpg" style={{display: 'block', width: '90%', margin: 20}} /> </div> 

      <div>Mr. Smith: "Good morning Everyone! Today we’ll doing some pair programming work around encoding and sending formatted text. Molly and Cody, you’ll be a group. Jamal, you are working with Kevin. Tim with George…” </div>
    
    </div>,
    timedAutoAdvance: true
    });


  slides.push({type: 'Try it!', text:
`What did you notice? Take notes below!` , notes: true
});






  slides.push({type: 'Try it!', el:
  <div>
    <div>Molly and Cody are beginning to work on the assignment: </div>
    <br />
    <div><img src="https://s3-us-west-2.amazonaws.com/tsl-public/threeflows/smith-scenario/MA-M%26C.jpg" style={{display: 'block', width: '90%', margin: 20}} /></div>
    <br />
    <div>Molly: “For the first part all we need to do is use ASCII protocol with the Internet Simulator.”</div>
    <br />  
    <div>Cody: “Easy. So the Internet Simulator is just going to allow us to test our protocol, allowing us to use ASCII as if we were communicating on the internet. You remember how we did that? To make it simpler, just think of it as texting on the internet.”</div>
    <br />
    <div>Molly: “I know. We used it last class.”</div>
  </div>,
  timedAutoAdvance: true
});


  slides.push({type: 'Try it!', text:
``,notes: true

});







  slides.push({type: 'Try it!', el:
  <div>
    <div>Jamal and Kevin sit down to work together:</div>
    <br />
    <div><img src="https://s3-us-west-2.amazonaws.com/tsl-public/threeflows/smith-scenario/MA-M%26K.jpg" style={{display: 'block', width: '90%', margin: 20}} /></div>
    <br />
    <div>Jamal: “Hey Kevin.”</div>
    <br />
    <div>Kevin: “Hey. Looks like they put the black brothers together.”</div>
    <br />
    <div>Jamal: “Yup, like always. You ready to get started?”</div> 
    <br />
    <div>Kevin: “Yeah, let’s get this binary thing over with.”</div>
  </div>
  ,
  timedAutoAdvance: true
  });


  slides.push({type: 'Try it!', text:
`` , notes: true

});






  slides.push({type: 'Try it!', el:
<div> 
  <div>Tim and George are working on the assignment:</div>
  <br />
<div><img src="https://s3-us-west-2.amazonaws.com/tsl-public/threeflows/smith-scenario/image.png" style={{display: 'block', width: '90%', margin: 20}} /></div>
<br />
<div>Tim: "Okay, this stuff makes no sense to me.”</div>
<br />
<div>George: “What do you mean? This is pretty simple. You just gotta…" *begins typing away*</div>
<br />
<div>Tim: “I’m not following you at all. How’d you do that?”</div>
<br />
<div>George: “Here, watch.”</div>
<br />
<div>Mr. Smith: "George, why don't you try explaining what you're doing to Tim?"</div>
<br />
<div>George: "Sure, Mr. Smith. Okay Tim. First, we define the protocol we want to use in the simulator using this tool here."</div>
</div>,
  timedAutoAdvance: true
  });


  slides.push({type: 'Try it!', text:
`` , notes: true

});








  slides.push({type: 'Try it!', el:
  <div>  
    <div>Molly and Cody are working on the assignment:</div>
    <br />
    <div><img src="https://s3-us-west-2.amazonaws.com/tsl-public/threeflows/smith-scenario/MA-M%26C2.jpg" style={{display: 'block', width: '90%', margin: 20}} /></div>
    <br />
    <div>Cody: “I love this stuff. I’ve been playing with coding since I was in middle school. </div>
    <br />
    <div>Molly: “That's cool. It's pretty new to me.”</div>
    <br />
    <div>Cody: "You haven’t done this before? Why did you decide to take this class?"</div>
    <br />
  <div>Molly: “I dunno. I wanted to try it out.”</div>
</div>,
  timedAutoAdvance: true
  });


  slides.push({type: 'Try it!', text:
`` , notes: true

});







  slides.push({type: 'Try it!', el:
<div>   
  <div>Kevin and Jamal are working on the project:</div>
  <br />
  <div><img src="https://s3-us-west-2.amazonaws.com/tsl-public/threeflows/smith-scenario/MA-M%26K2.jpg" style={{display: 'block', width: '90%', margin: 20}} /></div>
  <br />
  <div>Jamal: “Let’s send, ‘I am Groot.’”</div>
  <br />
  <div>Kevin: “Hahaha yeah! What a great movie. Have you seen the new one?”</div>
  <br />
  <div>Jamal: “No not yet. Really want to though.”</div>
  <br />
  <div>Kevin: “You have to. It’s just as good. Next, try sending it in bold.”</div>
</div>,
  timedAutoAdvance: true
  });



  slides.push({type: 'Try it!', text:
`` , notes: true

});






  slides.push({type: 'Try it!', el:
<div>   
  <div>Mr. Smith is holding group discussion at the end of class:</div>
  <div><img src="https://s3-us-west-2.amazonaws.com/tsl-public/threeflows/smith-scenario/MA-SmithGroup2.jpg" style={{display: 'block', width: '90%', margin: 20}} /></div>
  <br />
  <div>Mr. Smith: “What are some benefits of the ASCII protocol?”</div>
  <br />
  <div>Jamal: “In only 128 possible characters, it allows you to send all the common characters and numbers.”</div>
  <br />
  <div>Mr. Smith: “Yeah, anyone else?”</div>
  <br />
  <div>Tim: “It includes both capital and lowercase letters, which is nice.”</div>
  <br />
  <div>Mr. Smith: “That’s great! It is cool isn’t it? Thanks for sharing, Tim.” </div>
</div>,
  timedAutoAdvance: true
});


  slides.push({type: 'Try it!', text:
`` , notes: true

});



  if (options.isFacilitated) {
    slides.push({type: 'Try it!', text:
    `That's the end of the class! Take a moment to reflect on how you felt the class went overall.` 

    });
        

    slides.push({type: 'Try it!', text:
    `Once the students have left, your friend Mr. Smith comes up to you and asks for your thoughts. What feedback would you give him about what you observed?`, feedback: true
    });

    slides.push({type: 'PAUSE!', text:
    `PAUSE HERE


    Pause here and return to the group. We will continue with this part of the simulation after a brief group discussion. 
    `});
  }

  else {
    slides.push({type: 'Reflect', text:
    ` That's the end of the class! You will now get a chance to reflect on what you observed.
    ` 
    });

    slides.push({type: 'Reflect', text:
    `How do you feel the class went overall?`, notes: true 
    });

    slides.push({type: 'Reflect', text:
    `How did different students experience the class?`, notes: true 
    });

    slides.push({type: 'Reflect', text:
    `How did Mr. Smith's actions impact the students' experience?`, notes: true 
    });

    slides.push({type: 'Reflect', text:
    `Once the students have left, your friend Mr. Smith comes up to you and asks for your thoughts. What feedback would you give him about what you observed?`, notes: true
    });
  }




  slides.push({type: 'Class #2', text:
`

Take a moment and collect yourself. It's time for class #2! 

` 

});



    // ---------------------------------
    // Round TWO
    // ---------------------------------

  slides.push({type: 'Set Context - Lenses', el:
    <div>
    <div>Mr. Smith comes back to you and asks you to observe another class of his later in the day. It will cover similar subject matter. For this viewing, Mr. Smith has specifically asked you to focus on student engagement and equity. </div>
    <br />
    <div>Questions to ask yourself while viewing the scenes may be:</div>
    <br />
    <div>- Which students seem to be engaged with the activity?</div>
    <div>- How are the interactions impacting the learning and confidence of the students involved?</div>
    <br />
    <div>Feel free to jot down notes for each slide and be prepared to give new feedback to Mr. Smith!</div>
    </div>
    });


  slides.push({type: 'Set Context - Lenses', text:
`The new class being taught by Mr. Smith also has 6 students. The names and demographics of the class are as follows:

  Ashley: White Female
  Jasmine: African American Female
  Jimmy: White Male
  Jose: Hispanic Male
  Li: Asian American Male
  Mark: White Male
` 
});

  slides.push({type: 'Set Context - Lenses', text:
`
Once again, you will have 25 seconds per scene. Use both the images and text to get a feel for each scene. What did you notice?  Anything worth mentioning to Mr. Smith?

Note that these next scenes contain a lot of CS specific language. Don't worry if you do not understand the technical jargon. Try focusing on the interactions and images themselves. 

Ready? Okay! Go!
` 
});


  slides.push({type: 'Try it! - Lenses', el:
  <div>
    <div>Mr. Smith hosts class discussion:</div>
    <div><img src="https://s3-us-west-2.amazonaws.com/tsl-public/threeflows/smith-scenario/SmithB-class1.jpg" style={{display: 'block', width: '90%', margin: 20}} /></div>
    <div>Mr. Smith: "If it were up to you, how would you go about encoding text to binary?"</div>
    <br />
    <div>Jimmy: "You mean like write letters in binary? Couldn't you just make 'a' equal to '1' and so on?"</div>
    <br />
    <div>Mr. Smith: "That's an interesting idea, but then how would you deal with numbers and capital letters?"</div>
    <br />
    <div>Jimmy: "I'm not sure. Hadn't thought of that."</div>
    <br />
    <div>Mr. Smith: "Why doesn't everyone take a few minutes to dicuss and jot down ideas with your partners?"</div>
  </div>, timedAutoAdvance: true
  });


  slides.push({type: 'Try it! - Lenses', text:
`What did you notice? Take notes below!` , notes: true

});




  slides.push({type: 'Try it! - Lenses', el:
  <div>
    <div>Ashley and Mark discuss the question:</div>
    <div><img src="https://s3-us-west-2.amazonaws.com/tsl-public/threeflows/smith-scenario/SmithB-Partner1.jpg" style={{display: 'block', width: '90%', margin: 20}} /></div>
    <div>Mark: "Got any ideas?"</div>
    <br />
    <div>Ashley: "Well we could..."</div>
    <br />
    <div>Mark: "I've got it! Here's our solution. We can add a capital letter indicator which when added to the end of a letter tells us if it's a capital!"</div>
    <br />
    <div>Ashley: "Okay, but then how would you distinguish that indicator from the rest of the binary?"</div>
    <br />
    <div>Mark: "I see what you're saying, but I don't know how to solve that. I think we should just go with it, and maybe it'll be close enough that Mr. Smith will show us how to tell it apart."</div>
  </div>, timedAutoAdvance: true
  });


  slides.push({type: 'Try it! - Lenses', text:
`` , notes: true

});





  slides.push({type: 'Try it! - Lenses', el:
  <div>
    <div>Jimmy and Li dicuss the question:</div>
    <div><img src="https://s3-us-west-2.amazonaws.com/tsl-public/threeflows/smith-scenario/SmithB-Partner2.jpg" style={{display: 'block', width: '90%', margin: 20}} /></div>
    <div>Jimmy: "Well my idea wasn't right. You've gotta be good at this. What do you think, Li?"</div>
    <br />
    <div>Li: "I don't know about that. As far as the question goes, I'm not sure you were actually wrong. What if capital letters are binary 27-52?"</div>
    <br />
    <div>Jimmy: "Oh you're right! And we could start the alphabet at ten. That would leave us room for numbers zero to nine, which should be all the numbers we need! See, I knew you'd be good at this!"</div>
  </div>, timedAutoAdvance: true
  });


  slides.push({type: 'Try it! - Lenses', text:
`` , notes: true

});





  slides.push({type: 'Try it! - Lenses', el:
  <div>
    <div>Mr. Smith returns the class to discussion:</div>
    <div><img src="https://s3-us-west-2.amazonaws.com/tsl-public/threeflows/smith-scenario/SmithB-Class2.jpg" style={{display: 'block', width: '90%', margin: 20}} /></div>
    <div>Mr. Smith: "What did you all come up with in your groups? Li?"</div>
    <br />
    <div>Li: "Jimmy and I realized that we can use his original idea. We only need numbers zero to nine, which we can map to binary zero to nine. Then, the 26 letters of the alphabet can map to binary 10-35, and the 26 captial letters can map to 36-61."</div>
    <br />
    <div>Mr. Smith: "That's a great fix guys!"</div>
  </div>, timedAutoAdvance: true
  });


  slides.push({type: 'Try it! - Lenses', text:
`` , notes: true

});





  slides.push({type: 'Try it! - Lenses', el:
  <div>
    <div>Mr. Smith hosts class discussion:</div>
    <div><img src="https://s3-us-west-2.amazonaws.com/tsl-public/threeflows/smith-scenario/SmithB-Class3.jpg" style={{display: 'block', width: '90%', margin: 20}} /></div>
    <div>Mr. Smith: "Taking the encoding scheme you developed with your partner, how many bits does your encoding scheme require? For example, how many bits would it take your encoding scheme to send the word 'soccer'? Jose?"</div>
    <br />
    <div>Jose: "Oh. I'm not sure."</div>
    <br />
    <div>Mr. Smith: "Come on, try it out!"</div>
    <br />
    <div>Jose: "About 70 I think?"</div>
  </div>, timedAutoAdvance: true
  });


  slides.push({type: 'Try it! - Lenses', text:
`` , notes: true

});







  slides.push({type: 'Try it! - Lenses', el:
  <div>
    <div>Mr. Smith discusses homework with the class:</div>
    <div><img src="https://s3-us-west-2.amazonaws.com/tsl-public/threeflows/smith-scenario/SmithB-class4focus.jpg" style={{display: 'block', width: '90%', margin: 20}} /></div>
    <div>Mr. Smith: "You have all done an amazing job today on this activity. For homework there is an online project I would like you all to begin working on. It will give you an opportunity to take what you've done today and apply it. With that, I just want to make sure that everyone has access to all the necessary resources at home to complete the assignment. Jasmine, Jose - do you have everything you need?"</div>
    <br />
    <div>Jose: "Yeah..."</div>
    <br />
    <div>Jasmine: "Yes, Mr. Smith."</div>
  </div>, timedAutoAdvance: true
  });


  slides.push({type: 'Try it! - Lenses', text:
`` , notes: true

});



  if (options.isFacilitated) {
    slides.push({type: 'Try it! - Lenses', text:
    `
    That's the end of the class! Take a moment to reflect on how you felt the class went overall.
    ` 
    });
        

    slides.push({type: 'Try it! - Lenses', text:
    `At the end of the second class, Mr. Smith again comes up to you and asks for your thoughts. What feedback would you give him about what you observed?`,
      feedback: true
    });
  }


  else {
    slides.push({type: 'Reflect - Lenses', text:
    ` That's the end of the class! You will now get a chance to reflect on what you observed.` 
    });


    slides.push({type: 'Reflect - Lenses', text:
    `How do you feel the class went overall?`, notes: true 
    });

    slides.push({type: 'Reflect - Lenses', text:
    `Did you notice any social dynamics between students related to race/ethnicity/gender/class?`, notes: true 
    });

    slides.push({type: 'Reflect - Lenses', text:
    `How are the interactions impacting the confidence of the students involved and their motivation to learn?`, notes: true 
    });

    slides.push({type: 'Reflect - Lenses', text:
    `At the end of the second class, Mr. Smith again comes up to you and asks for your thoughts. What would you say to Mr. Smith?`, notes: true
    });
  }





  return slides;
}


export const smithScenario = {
  questionsFor(cohortKey, options) {
    return slidesFor(cohortKey, options);
  }
};