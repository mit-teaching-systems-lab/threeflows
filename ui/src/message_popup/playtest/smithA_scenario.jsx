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


function slidesFor(cohortKey) {
  const slides:[QuestionT] = [];

  slides.push({ type: 'Overview', el:
    <div>
    <div>1. Set Context</div>
    <div>Imagine yourself as a teacher situated in the context of the particular school, classroom and subject.</div>
    <br />
    <div>2. Background</div>
    <div>A little bit of background information on the lesson being taught.</div>
    <br />
    <div>3. Try it!</div>
    <div>When you're ready, you'll go through a set of short scenes that simulate moments in the classroom. Note what you observe.</div>
    <br />
    <div>4. PAUSE!</div>
    <div>Pause for a brief group discussion before resuming.</div>
    <br />
    <div>5. Lenses</div>
    <div>Try the scenes again, this time from a new perspective.</div>
  </div>
  });


// Context
  slides.push({type: 'Context', text: 
      `Imagine you're a teacher at a suburban high school. Your friend and colleague, Mr. Smith, asks you to sit in and observe his CS class for a day.

The class, taught by Mr. Smith, has 6 students. The demographics of the class are as follows:

      5 Male Students
      1 Female Student
      4 White Students (3 Male, 1 Female)
      2 African American Students (2 Male)`
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
  <div>Binary is a number scheme that represents data through the use of only two possible digits: 0 or 1.</div>
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
      `When you're ready, you'll progress through a set of scenes which span a single lesson in Mr. Smith’s class. 

For each slide, take notes of what you are observing. Use both the images and text to get a feel for each scene. What did you notice? Was there anything worth mentioning to Mr. Smith? Think of these as personal notes you would jot down while observing the class. Remember, at the end you will be giving feedback to Mr. Smith! 

Try not to spend too much time on any one slide. There will be plenty of time to reflect at the end! 

Okay! Ready to start?`
    });


  slides.push({type: 'Try it!', el:
    <div>
      <div>Mr. Smith is addressing the students at the beginning of the class: </div>
      <div> <img src="https://s3-us-west-2.amazonaws.com/tsl-public/threeflows/smith-scenario/MA-SmithIntro.jpg" style={{display: 'block', width: '90%', margin: 20}} /> </div> 

      <div>Mr. Smith: "Good morning Everyone! Today we’ll doing some pair programming work around encoding and sending formatted text. Molly and Cody, you’ll be a group. Jamal, you are working with Kevin. Tim with George…” </div>
    
    </div>,
    write: true
    });



  slides.push({type: 'Try it!', el:
  <div>
    <div>Molly and Cody are beginnning to work on the assignment: </div>
    <br />
    <div><img src="https://s3-us-west-2.amazonaws.com/tsl-public/threeflows/smith-scenario/MA-M%26C.jpg" style={{display: 'block', width: '90%', margin: 20}} /></div>
    <br />
    <div>Molly: “For the first part all we need to do is use ASCII protocol with the Internet Simulator.”</div>
    <br />  
    <div>Cody: “Easy. So the Internet Simulator is just going to allow us to test our protocol, allowing us to use ASCII as if we were communicating on the internet. You remember how we did that? To make it simpler, just think of it as texting on the internet.”</div>
    <br />
    <div>Molly: “I know. We used it last class.”</div>
  </div>,
  write: true
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
  write: true
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
</div>,
  write: true
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
  write: true
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
  write: true
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
  write: true
});

  slides.push({type: 'Try it!', text:
`
That's the end of the class! Take a moment to reflect on how you felt the class went overall.
` 

});
    

  slides.push({type: 'Try it!', text:
`Once the students have left, your friend Mr. Smith comes up to you and asks for your thoughts. What feedback would you give him about what you observed?
 `,
  write: true

});
    // ---------------------------------
    // PAUSE 
    // ---------------------------------

  slides.push({type: 'PAUSE!', text:
  `PAUSE HERE


Pause here and return to the group. We will continue with this part of the simulation after a brief group discussion. 
`});

    // ---------------------------------
    // Round TWO
    // ---------------------------------

  slides.push({type: 'Try it! - Lenses', el:
    <div>
    <div>You will now have the chance to re-observe Mr. Smith's earlier class. For this viewing, Mr. Smith has specifically asked you to focus on student engagement and equity.</div>
    <br />
    <div>Questions to ask yourself while viewing the scenes may be:</div>
    <br />
    <div>- Which students seem to be engaged with the activity?</div>
    <div>- How are the interactions impacting the learning and confidence of the students involved?</div>
    <br />
    <div>Feel free to jot down notes for each slide and be prepared to give new feedback to Mr. Smith!</div>
    </div>
    });


  slides.push({type: 'Try it!', el:
    <div>
      <div>Mr. Smith is addressing the students at the beginning of the class: </div>
      <div> <img src="https://s3-us-west-2.amazonaws.com/tsl-public/threeflows/smith-scenario/MA-SmithIntro.jpg" style={{display: 'block', width: '90%', margin: 20}} /> </div> 

      <div>Mr. Smith: "Good morning Everyone! Today we’ll doing some pair programming work around encoding and sending formatted text. Molly and Cody, you’ll be a group. Jamal, you are working with Kevin. Tim with George…” </div>
    
    </div>,
    write: true
    });



  slides.push({type: 'Try it!', el:
  <div>
    <div>Molly and Cody are beginnning to work on the assignment: </div>
    <br />
    <div><img src="https://s3-us-west-2.amazonaws.com/tsl-public/threeflows/smith-scenario/MA-M%26C.jpg" style={{display: 'block', width: '90%', margin: 20}} /></div>
    <br />
    <div>Molly: “For the first part all we need to do is use ASCII protocol with the Internet Simulator.”</div>
    <br />  
    <div>Cody: “Easy. So the Internet Simulator is just going to allow us to test our protocol, allowing us to use ASCII as if we were communicating on the internet. You remember how we did that? To make it simpler, just think of it as texting on the internet.”</div>
    <br />
    <div>Molly: “I know. We used it last class.”</div>
  </div>,
  write: true
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
  write: true
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
</div>,
  write: true
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
  write: true
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
  write: true
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
  write: true
});

  slides.push({type: 'Try it!', text:
`
That's the end of the class! Take a moment to reflect on how you felt the class went overall.
` 

});
    

  slides.push({type: 'Try it!', text:
`Once the students have left, your friend Mr. Smith comes up to you and asks for your thoughts. What feedback would you give him about what you observed?
 `,
  write: true

});
  return slides;
}


export const smithScenarioA = {
  questionsFor(cohortKey) {
    return slidesFor(cohortKey);
  }
};