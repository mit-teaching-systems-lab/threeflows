/* @flow weak */
import React from 'react';
import hash from '../../helpers/hash.js';


// Define the types of questions
type TextQuestionT = {
  type:string,
  text:string
};
type ReactQuestionT = {
  type:string,
  el:any
};
type ProjectQuestionT = {
  type:string,
  project:any
};
type WrittenReflectionQuestionT = {
  type:string,
  text:string,
  writtenReflection:bool
};

type ScoresQuestionT = {
  type:string,
  text:string,
  scores:[ScoreT],
  studentName:string,
  projectLabel:string
}
export type QuestionT = TextQuestionT | ReactQuestionT | ProjectQuestionT | ScoresQuestionT | WrittenReflectionQuestionT;



function renderIntroEl() {
  return (
    <div>
      <p>Welcome!</p>
      <p>This is an interactive case study simulating a small part of a high school computer science principles course.</p>
      <p>You'll review the context of the scenario briefly, share what you anticipate, and then try it out!  Afterward you'll reflect individually before sharing with your cohort online.</p>
      <p>Please use <a href="https://www.google.com/chrome/">Chrome</a> on a laptop or desktop computer.</p>
    </div>
  );
}


export type ScoreT = {
  label:string,
  key: string,
  max: number
};
const scores:[ScoreT] = [
  { label: 'Analyzing Impact of Computing', key: 'impact', max: 3 },
  { label: 'Analyzing Data and Information', key: 'data', max: 2 },
  { label: 'Using Development Processes & Tools', key:  'processes', max: 1 },
  { label: 'Finding and Evaluating Information', key: 'finding', max: 1 }
];


type ImageProjectT = {
  label:string,
  img:string,
  a:string,
  b:string,
  c:string,
  d:string,
  e:string
};
type VideoProjectT = {
  label:string,
  video:string,
  a:string,
  b:string,
  c:string,
  d:string,
  e:string
};
type ProjectT = VideoProjectT | ImageProjectT;
const projects:{A:ProjectT, E:ProjectT, C:ProjectT, D:ProjectT} = {
  A: {
    label: 'A',
    img: "https://tsl-public.s3.amazonaws.com/threeflows/csfair-a.png",
    a: 'The computing innovation that is represented by my computational artifact is that of virtual reality. Virtual reality is using technology to create a reality outside of the real world by tricking fooling your brain to think you are in a different environment. The artifact attached with this starts by going through the basic functions that allow vr to work. With the headset and a cpu working together to seamlessly stream this information back and forth. The bottom part goes more into the stats associated with vr, and that this is a growing industry for young people, and seesm to be on the move to grow even more.',
    b: 'I used a website called piktochart to create my artifact. So what I did is I split up the infographic area into separate blocks to contain the graphics on how vr works and the other block on stats associated with it. I then chose pictures off of the internet that fit the background with a vr headset and computer tower so that I could simulate the stream of data in between and how the system works as a whole and show that it is a cycle. I then added all of my text to explain this along with arrows that were in the graphics area to show the cycle that the data takes. I found some graphs that showed huge popularity and projected popularity and added those in with an explanation to show how big vr is becoming.',
    c: 'A beneficial effect that vr has on society is the ability to run simulations using this system. For the things in career paths with dangerous situations it is much better to be able to simulate this using a created environment where no one will get hurt but still allows for people in training to learn valuable skills.(3) Another great effect is that it can revolutionize the entertainment industry with the ability to go on film sets or into a video game, or even see a fashion show without being there and experiencing it as if you were.(2) This really makes you feel like you are there and get all new experiences out of it you might have never been able to get before. There are harmful effects as well. One of the harmful effects is that with this being such an immersive technology many people tend to forget about their real life and only focus on the virtual one.(3) This can lead many to be much more antisocial and distract them from what they should be doing. This is why society as a whole still needs to do some thinking on the subject of vr as it has huge possible social consequences that could affect many later on down the road.',
    d: 'The kind of data that vr would work primarily with are visual representation with RGB values, user input such as direction of view or 3d location of headset, and the sound files that go with it all. The headpiece tracks the users relative position to previously and sends this to cpu in the form of coordinates in this virtual world. The cpu takes that data and moves the user in its virtual reality that it is keeping track of. It decides how the screen should change to to keep up this new environment as it is tracking of the movement of the user and sends it to the user so that they receive believable imagery and sound that they believe they are in this new environment. If there is any lag or lack of bandwidth in between the headset and cpu then the user immediately tells out that it is not real and this the new world falls apart. That is why this data stream must be seamless in the communication between the headset and the cpu for the user to receive a great time. This creates issues that you need to be able to transfer huge gobs of data in this connection in as little time as possible. This creates issues of how much ram the cpu has and as of now most vr systems require about a 8 gb of ram.(1)',
    e:
`1 http://iq.intel.com/howvirtualrealityworks/, Kevin Ohannessian, "How Virtual Reality Works," source: intel , date viewed: 1/26/16

2 http://www.forbes.com/sites/rachelarthur/2016/01/20/virtualrealityandrobotsheadforstockholminlatestfashionweektechnologyintegration/#2715e4857a0b2a40148f6600, Rachel Arthur, "Virtual Reality And Robots Head For Stockholm In Latest Fashion Week Technology Integration," source: Forbes, date viewed: 1/25/16, posted: 1/20/16

3 http://reporter.rit.edu/views/dangersgivingvirtualreality, Tim Henry, "The Dangers of Giving in to Virtual Reality," source: Reporter, date viewed: 1/25/16, posted: 10/2/14`
  },
  E: {
    label: 'E',
    video: "https://www.youtube.com/embed/QZFLT_awBqI",
    a:
`Name: IPhone 6s

Description: The iPhone 6s allows you to call, text, and allows you to connect with others online

Purpose: The purpose of this device is to communicate with others by text, calls, and apps that let you connect with different people around the world

Function: The iPhone 6s works more efficiently and more intuitively. This iPhone includes an A9 chip that brings a new level of performance. It's not only a faster experience, but a better one. It also boosts graphics performance by 90 percent compared to the previous generation. The iPhone 6s also has a M9 motion coprocessor which improves performance and battery life.

In the video I made about the iPhone 6s, I explained and showed the two new features that came with the iPhone 6s. The first feature was the 3D touch, which allows you to do the thing you love to do faster. By applying pressure on the screen with your finger, it gives you an option to do shortcuts. For example if you apply pressure on the camera app, the app will give an option to where you can either take selfies, video, picture or slo mo, instead of clicking on the app and swiping left and right. The second feature is the live wallpaper which allows your wallpaper to move by pressing on the screen.`,
    b: 'To make my iPhone 6s video, I went to the Sprint store to take a short clip showing the features of the iPhone 6s. After that, I put the video into an app called iMovie which allows you to edit videos and put audio into it. After I finished editing the video I added background music; the music I used comes with the app. When I was done editing the sound volume for my background music, I recorded myself explaining the two new features of the iPhones 6s and showed how it works.',
    c:
`Benefit: The iPhone 6s can be beneficial. This device has an A9 chip which makes the iPhone two times faster than the previous iPhones. This is iPhone has 3D touch, which allows people to peek by pressure touch into apps such as mails, instagram, the camera app, etc. The iPhone has a 12-megapixel camera that captures detailed and sharp photos. This iPhone comes with Live Photos, a setting that allows you to take a moment before and after a pictures and it sets in motion by just a press of a finger. It takes 4k videos, which is four times the resolution of 1080p HD video. The iPhone 6s is constructed from 7000 Aluminum which makes it stronger and immune to bending like the iPhone 6. The iPhone 6s can come in 4 different colors, silver, gold, space grey, and rose gold. These are some of the benefits that the iPhone 6s and iPhone 6s Plus have.

Disadvantages: There are also disadvantages that the iPhone 6s has. One of the drawbacks is that the iPhone 6s is thicker and heavier than the previous iPhones, the iPhone 6s is 14 grams more than the iPhone 6 while the iPhone 6s plus is 20 grams more than the iPhone 6 plus. It also has a smaller battery size which also changes the battery life. Another downside of this device is the price, the iPhone 6s with 16GB is $649.00, 64GB is $749.00, and with 128GB is $849.00. The iPhone 6s Plus with 16GB is $749.00, 64GB is $849.00, and 128GB is $949.00. These are some of the problems that the iPhone 6s and iPhone 6s plus have.`,
    d:
`The iPhone 6s does not transform data but it can consume and produce data. It consumes data by receiving messages, calls, and watching videos. Producing data can be sending messages, mails, and calls. The iPhone 6s has storage concerns especially if it comes with a 16GB which is not enough space for an iPhone 6s because there is apps that can take up space and the 4K video takes massive amounts of data. Getting a 64GB or 128GB iPhone would be better.

People think that the Apple devices are more secure than any other devices but there are different security problems that are still out there. There are apps that allow you to steal user's data and collect passwords. The big issue about this app is that the app is in the app store, which is supposed to be pre-screened by the Apple staff for harmful apps.

There are also privacy concerns, for example the iPhone 6s catches audio when Siri is activated, and can record audio and video before taking a live photo.

Apple's new feature "Hey Siri" allows you to activate Siri at any time by saying the phrase, which means that the audio has to be on at all time.`,
    e:
`Description of the Iphone 6s
URL: http://www.apple.com/shop/buy-iphone/iphone6s
Article Title: Iphone 6s
Website Title: Apple

Benefits
URL: http://www.apple.com/iphone-6s/
Article Title: Iphone 6s- Apple
Website Title: Apple

Disadvantages
URL: http://www.macxdvd.com/mac-dvd-video-converter-how-to/top-iphone-6-plus-advantages-disadvantages.htm
Article Title: Top 10 Pros and Cons of Apple iPhone 6 Plus
Website Title: Top 10 Advantages and Disadvantages of iPhone 6 Plus

Security Concerns
URL: http://time.com/3926501/apple-security-mac-iphone/
Article Title: There's a Massive Security Flaw in the iPhone and Mac
Website Title: Time
Publisher: Time

Privacy Concerns
URL: http://www.theverge.com/2015/9/11/9313645/iphone-6s-privacy-concerns-apple-responds
Article Title: Apple responds to iPhone 6S privacy concerns over always-on Siri and Live Photos
Website Title: The Verge
Publication: 2015-09-11`
  },
  C: {
    label: 'C',
    img: "https://tsl-public.s3.amazonaws.com/threeflows/csfair-c.png",
    a: 'My computational artifact is bitcoins. The artifact explains the need for and usage of bitcoins and gives examples of the different types of private and commercial ways of mining for bitcoins. The intended use of bitcoins is to have a currency that can be easily stored, traded and used online and globally. Today people use bitcoins for anything that requires money. Since bitcoins are stored and created digitally (they are stored on digital wallets) there is no need to carry around a physical currency. Unlike conventional currency, bitcoins can be traded and stored anywhere in the world. My computational artifact describes this cryptocurrency because it features pictures of types of bitcoin mining machines and describes the uses for bitcoins. My artifact also describes the exchange rate of 1 bitcoin to US dollars, which fluctuates daily, ranging from a few cents to over 900 dollars.',
    b: 'When researching this topic, I chose to examine multiple sources. For my computational artifact, I researched pictures of bitcoin mining machines using the Google search engine. After I found the images, I copied them to a page in photoshop accompanied by some information from my research. . To research the artifact, I used a search engine like google to get a rough idea of the websites I would gather my information from, websites like Opposing Viewpoints, to get more in-depth information. Using Photoshop, I was able to make a clear artifact by being able to add pictures and words and by giving them a visual appeal. For the final process, I used google docs so I could work on it both at home and at school.',
    c:
`Bitcoins represent an innovative technology because they change the way we think of currency from a physical coinage to a digital currency. The fact that its digital currency makes it available to everyone, but not really because you have to have specific bitcoin mining machines (specific computers designed to do a specific task) to obtain the currency.

Positive effects of bitcoins: Bitcoins can have positive effect for investors, sellers and buyers, due to their large value. Since bitcoins have a high exchange rate, buyers and sellers can earn a lot of money over a short period of time. Someone with very little initial income could make money by buying a low cost mining rig and starting off small, then working their way up.

Bitcoins, however, can also have a harmful effect for users and even government's. Since bitcoins cannot be traced, they can be used to purchase illegal items, particularly on the deep web. Any anonymous buyer can buy whatever they want. Bitcoins can also overpower a preexisting currency in place in a country. For instance, Japan banned this currency because its citizens were relying too much on it and using it to buy illegal things such as drugs. Bitcoins can also be used to purchase weapons which can be a security threat.`,
    d: 'Bitcoins are backed up from real currency from all over the world. To acquire bitcoins, you must use the internet to find data, download software, make accounts for your digital wallet and join pools. When a computer mines for bitcoins, it is really solving equations to generate numbers that are the equivalent to decimals of a bitcoin. The longer the computer runs, the more money you can potentially make. By mining bitcoins, you are transforming data into money. The only data concern linked to bitcoin usage is the possibility of using this currency for illegal items, which can be a health and security threat.',
    e:
`Cryptocurrency Definition | Investopedia." Investopedia. Investopedia, 29 July 2015. Web. 15 Dec. 2015.

Bradbury, Danny. "Can Hobbyist Bitcoin Miners Still Make a Buck?" CoinDesk RSS. CoinDesk, 8 Nov. 2015. Web. 15 Dec. 2015.

"How to Calculate Mining Profitability." CoinDesk RSS. CoinDesk, 1 May 2015. Web. 15 Dec. 2015.`
  },
  D: {
    label: 'D',
    video: "https://www.youtube.com/embed/06ntwM2z0UI",
    a: 'My computational artifact shows the Daqri Smart Helmet. The purpose for the helmet is to make the work site an easier work environment, and, at the same time, a safer one. My computational artifact illustrates my innovation by showing what the helmet does, what it is made of, and what you would see if you had the helmet on.',
    b: 'For my computational artifact I made a video. The video I had made was on Animoto. I got pictures and uploaded them to the movie. First I downloaded the pictures on to the computer and then I uploaded the pictures onto the website. Once on the website I was able to make a slide with the picture and add a caption to help describe the picture',
    c: 'The smart helmet can be used in many ways for industrial purposes. It uses a heads up display allowing the worker using the helmet to work in an augmented reality. The helmet gives a realistic Heads Up Display showing checklists for the workers, and allows the workers to see their progress and what they still need to do. Also the 4d function of the helmet is able to see through walls. The helmet gives the workers x­ray like vision to see problems that a normal person would not see with the naked eye .For large work sites the helmet is perfect. Someone who is far away from their boss may not need to go back to the work site to talk to them, but thanks to the smart helmet offers an on screen application much like Skype. The helmet displays the face of the intended person for the talk and important information can be shared between two people. They both can see what each other can see, making the repairs or build much faster. There is also a thermal camera feature to the helmet. The thermal camera works passively showing the heat of nearby objects on the site. The user can switch between normal camera and thermal vision camera. The thermal camera can help a worker see if a machine is overheating or is too hot to touch. Lastly, the helmet has supreme audio output. The helmet offers a noise canceling comfortable feel, and allows the user to talk to other workers via cellphone or wi­fi applications.',
    d: 'The smart helmet takes in and sends out various amounts of data. With input the helmet is always scanning out the environment with its multiple cameras. The helmet is powered by the sixth gen Intel m7 processor. The helmet uses Intels RealSense technology to make the helmet aware of depth and the environment. The DAQRI INTELLITRACK is the technology used in the computer vision and navigation technology. The helmet is an augmented reality that fuses real world landscape with HUD that displays useful information for the worker on the real world landscape. The smart helmet uses all types of data input and output from video to audio. With the breakthrough that the helmet has made, there are potential legal concerns because the helmet is constantly recording everything. If the helmet were to see a person and the video goes public the person may not want to be in the video and can sue. Also, the helmet also comes with USB ports allowing for extra applications or data to be transferred into the helmet. Someone could potentially take important info about the work site if they got ahold of a helmet.',
    e:
`https://www.wareable.com/wearable-tech/daqri-smart-helmet-gives-you-x-ray-like-vision-to-see-inside-objects-2140

https://daqri.com/products/smart-helmet/

http://www.businesswire.com/news/home/20160105006921/en/DAQRI­Intel­Power­Next­Generation­Augmented­Reality­Smart

https://en.wikipedia.org/wiki/Augmented_reality#Privacy_Concerns`
  }
};

function interactionSlides(studentName, project) {
  var slides = [];

  slides.push({ type: 'Try it!', text:
`You walk over to ${studentName} and their project.

${studentName}: Hello!  Let me know what questions you have once you get a chance to look at my project.
`});

  slides.push({ type: 'Try it!', project: project});

  slides.push({ type: 'Try it!', text:
`${studentName}: What do you think, any questions?
`, ask: true, force: true});

  slides.push({ type: 'Try it!', text:
`${studentName}: Thanks for the question and for your feedback!
`});

  slides.push({ type: 'Try it!', text:
`Score ${studentName}'s project and share some written feedback.
`, scores, studentName, projectLabel: project.label});

  return slides;
}

// Overall sequence of projects is: High, Low, Medium, Medium
// The intent is that the last two are best for detecting bias.
function slidesFor(cohortKey) {
  const students:CohortT = cohorts[cohortKey];

  var slides:[QuestionT] = [];
  slides.push({ type: 'Overview', el:
  <div>
    <div>1. Review context</div>
    <div>Imagine yourself giving feedback to students on Explore Performance Tasks that they've just finished and submitted.  You won't know all the answers, and will have to improvise and adapt to make the best of the situation.</div>
    <br />
    <div>2. Anticipate</div>
    <div>Skim the project assignment.  You shouldn't have an in-depth understanding.</div>
    <br />
    <div>3. Try it!</div>
    <div>When you're ready, you'll go through a set of short scenes that simulate interactions between you and some students about their projects.</div>
    <br />
    <div>4. Reflect</div>
    <div>Finally, you'll reflect on your experience.</div>
    <br />
    <div>5. Discussion</div>
    <div>When you're done here, share your responses with your cohort on online at <a target="_blank" href="https://twitter.com/search?q=%23https://twitter.com/search?q=%23TeacherPracticeSpaces">#TeacherPracticeSpaces</a>.</div>
  </div>
  });


  // Context
  slides.push({ type: 'Context', text:
`For this assignment, you'll be helping out another teacher in the school, Ms. Ada.  This takes place in an urban public high school, towards the end of the school year.

Ms. Ada is teaching an AP Computer Science Principles class and asked you to help out.  Her students have worked on the Explore Performance Task and already submitted it to the College Board.  While they're waiting for formal feedback and scores, Ms. Ada wants to give them an opportunity to get more immediate feedback and on their project.

This isn't your class, so you so you won't have all the answers and will have to improvise and make the best of the situation.
`});

  slides.push({ type: 'Context', text:
`Here's a description of the assignment:

Computing innovations impact our lives in ways that require considerable study and reflection for us to fully understand them. In this Performance Task, you will explore a computing innovation of your choice. Your close examination of this computing innovation will deepen your understanding of computer science principles.
`});

  slides.push({ type: 'Context', text:
`There are two parts of the performance task: a computational artifact and written responses.

The computational artifact must provide an illustration, representation, or explanation of the computing innovation’s intended purpose, its function or its effect. The computational artifact must not simply repeat the information supplied in the written responses and should be primarily non‐textual.

The written responses must provide evidence of the extensive knowledge they have developed about their chosen computing innovation and its impact. Responses should be understandable to someone who is not familiar with the computing innovation, and include citations as applicable.
`});

  slides.push({ type: 'Context', text:
`In this scenario, you'll look at projects for five students.  You'll share two questions that their project left your with.  These are intended to reflect your genuine curiosity and interest in their project, or to help engage them with an interesting aspect of the topic.

Then, you'll provide written feedback that will be submitted anonymously and also score their project.  Each project will receive a score of 0-7 points.  The categories for points are:

  3 pts: Analyzing Impact of Computing
  2 pts: Analyzing Data and Information
  1 pt:  Using Development Processes & Tools
  1 pt:  Finding and Evaluating Information

These point categories will be visible to you during the scenario as well.
`});

  slides.push({ type: 'Context', text:
`Here's an example of what the scoring and feedback sheet will look like for each student.  Feel free to try it out.
`, scores, studentName: 'this example', projectLabel: 'demo'});


  // Anticipate
  slides.push({ type: 'Anticipate', text:
`Before you begin, we have three questions about what you anticipate.
`});

  slides.push({ type: 'Anticipate', text:
`After skimming the performance task, what do you anticipate students' projects will be like?
`, ask: true, force: true});

  slides.push({ type: 'Anticipate', text:
`What ways might bias inadvertently come up when asking questions about the projects and sharing feedback?
`, ask: true, force: true});

  slides.push({ type: 'Anticipate', text:
`What are some best case and worst case outcomes for students during this scenario?
`, ask: true, force: true});


  // Try it!
  slides.push({ type: 'Try it!', text:
`When you're ready, you'll go through a set of scenes.  Imagine you're walking around the classroom, and meeting with each student individually. 

In the simulation, you'll visit one student, ask them a question about their project intended to express interest, evoke curiosity, or get them excited about computing.  Then, you'll thank them and walk away to complete written feedback.

Improvise how you would act as a teacher in those moments.  Click and speak aloud the words you'd say to those students, and type the written feedback you'd share with them.


Ready to start?
`});

  slides = slides.concat(interactionSlides(students.A, projects.A));  
  slides = slides.concat(interactionSlides(students.E, projects.E));
  slides = slides.concat(interactionSlides(students.C, projects.C));
  slides = slides.concat(interactionSlides(students.D, projects.D));


  // Reflect
  slides.push({ type: 'Reflect', text:
`That's the end of the simulation.  Thanks!

Let's shift to reflecting on your experience.
`});

  slides.push({ type: 'Reflect', text:
`Before you finish, we have four questions about what you experienced in this simulation.

After that, you'll take some of your reflection and share it with your cohort.

Also, for now please hold questions or feedback about this activity itself.
`});

  slides.push({ type: 'Reflect', text:
`Which projects did you score the highest and lowest?
`, writtenReflection: true});

  slides.push({ type: 'Reflect', text:
`What kinds of feedback did you give?
`, writtenReflection: true});

  slides.push({ type: 'Reflect', text:
`Where did you struggle in grading student work?
`, writtenReflection: true});

  slides.push({ type: 'Reflect', text:
`Were there ways where bias could have inadvertently come up when asking questions about the projects and sharing feedback?
`, writtenReflection: true});

  slides.push({ type: 'Reflect', el:
    <div>
      <div>Finally, on the next screen you can review your reflections before sharing back with your cohort (eg., on a discussion board or in class).</div>
      <br />
      <div>If you'd like, you can also share online at <a target="_blank" href="https://twitter.com/search?q=%23https://twitter.com/search?q=%23TeacherPracticeSpaces">#TeacherPracticeSpaces</a>.</div>
      <br />
      <div>And if you're curious to learn more, check out the commentaries on these projects and scoring guidelines from the <a target="_blank" href="http://apcentral.collegeboard.com/apc/public/exam/exam_information/231726.html">College Board</a>.</div>
    </div>
  });

  return slides;
}


// These are the comparisons we're curious about detecting bias in:
// for C: white female/black female
// for D: asian male/hispanic male
type CohortT = {
  A: string,
  E: string,
  C: string,
  D: string
};
const cohorts:[CohortT] = [
  { A: 'Sofía', E: 'Connor', C: 'Emily', D: 'Shinji' },
  { A: 'Sofía', E: 'Connor', C: 'Emily', D: 'Carlos' },
  { A: 'Sofía', E: 'Connor', C: 'Lakisha', D: 'Shinji' },
  { A: 'Sofía', E: 'Connor', C: 'Lakisha', D: 'Carlos' }
];

export const CsFairScenario = {
  renderIntroEl() {
    return renderIntroEl();
  },
  questionsFor(cohortKey) {
    return slidesFor(cohortKey);
  },
  cohortKey(email) {
    return hash(email) % cohorts.length;
  }
};
