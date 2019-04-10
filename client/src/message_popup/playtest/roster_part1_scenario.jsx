/* @flow weak */
import React from 'react';
import Table from 'material-ui/Table/Table';
import TableBody from 'material-ui/Table/TableBody';
import TableRow from 'material-ui/Table/TableRow';
import TableRowColumn from 'material-ui/Table/TableRowColumn';


/*
This file defines the content for the counseling scenario around talking to Rosa
*/
export type QuestionT = {
  type:string, // Used as a label
  text:string,
  open:?bool, // Ask for open-ended user response
  choices:?bool // Forced-choice response
};


function slidesFor(cohortKey) {
  const slides:[QuestionT] = [];


  // Context

  slides.push({ type: 'Context', id: 'context_2', text:
`You teach at a small high school. Specifically, the gender composition of your school is roughly 50% male, 50% female, and the racial composition of your school is the following*: 
48% White students 
23% Black students 
9% Asian students 
16% Hispanic or Latino students 
4% Two or more races 

*based off a real high school in Minnesota`
  });

  slides.push({ type: 'Context', id: 'context_3', text:
`The plan this year is that you will teach two courses of CS: “regular track” CS and “advanced” CS. Both classes are open to students new to CS, but the advanced course is meant to prepare students for an AP class. All students are required to take at least one year of CS.

Your principal, Mr. Holl, applied for several grant opportunities to bring these Regular and Advanced CS classes to your school and was very excited to offer the courses to students. However with funding, the school only has enough resources to provide one, single CS course for the 9th grade. As a result of these changes, Mr. Holl says that you have to go back to teaching 9th grade Algebra classes because “that’s where you are needed.”`
  });

  slides.push({ type: 'Context', id: 'context_4', text:
`At your school, each teacher teaches 2 class periods+, so you will be teaching the only two Algebra classes offered to the 9th grade. 

For the current year, Ms. Nelson, a veteran math teacher at your school, will be teaching the CS course along with a sophomore Geometry class.

For the time being, incoming 9th grade students choose whether to sign up for CS or a different elective (e.g. Creative Writing), and there isn’t any formalized system for counseling students around choosing their electives (students are told “Choose something that seems fun or interesting to you!”). 

+this isn’t realistic, but is done to simplify the task
`
  });
  
  slides.push({ type: 'Context', id: 'context_5', el:
  <Table>
    <TableBody displayRowCheckbox={false}>
      <TableRow>
        <TableRowColumn>Period</TableRowColumn>
        <TableRowColumn>Ms. Nelson</TableRowColumn>
        <TableRowColumn>[Your Name]</TableRowColumn>
      </TableRow>
      <TableRow>
        <TableRowColumn>1</TableRowColumn>
        <TableRowColumn>&nbsp;</TableRowColumn>
        <TableRowColumn>Algebra 1 <br/> 9th Grade</TableRowColumn>
      </TableRow>
      <TableRow>
        <TableRowColumn>2</TableRowColumn>
        <TableRowColumn>&nbsp;</TableRowColumn>
        <TableRowColumn>&nbsp;</TableRowColumn>
      </TableRow>
      <TableRow>
        <TableRowColumn>3</TableRowColumn>
        <TableRowColumn colSpan="2" rowSpan="2" style={{textAlign:"center"}}>Team Planning Time</TableRowColumn>
      </TableRow>
      <TableRow>
        <TableRowColumn>4</TableRowColumn>
      </TableRow>
      <TableRow>
        <TableRowColumn>5</TableRowColumn>
        <TableRowColumn>Intro to CS <br/>9th Grade</TableRowColumn>
        <TableRowColumn>Algebra 1 <br/> 9th Grade</TableRowColumn>
      </TableRow>
      <TableRow>
        <TableRowColumn>6</TableRowColumn>
        <TableRowColumn>Geometry<br/> 10th Grade</TableRowColumn>
        <TableRowColumn>&nbsp;</TableRowColumn>
      </TableRow>   
    </TableBody>
   
  </Table>
  });

  slides.push({type: 'Anticipate', id: 'anticipate_1', el: 
      <div>
        <p>It is now August, about three weeks before students are to arrive, when you and Ms. Nelson receive your student rosters.</p>
        <p>See the student rosters <a href="https://docs.google.com/document/d/1iZ3Il-dSX34ThnH-NfJqH7jdpox-omD3kG3E5cadJB0/edit" target="_blank" rel="noopener noreferrer">here</a>.</p>
        <p>Your job is to look through the 9th grade rosters and determine the following: </p>
        <p>As you look through the rosters take note and explain any relevant patterns you notice in both the class rosters AND the 9th Grader Teacher Schedule. Is the distribution of students in each class fair? Why or why not? </p>
        <p>In your response, be sure to explicate what “fair” would be in this case</p>
      </div>, writeNoPrompt: true
  });

  return slides;
}


export default {
  questionsFor(cohortKey) {
    return slidesFor(cohortKey);
  }
};