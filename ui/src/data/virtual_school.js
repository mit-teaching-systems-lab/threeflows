/* @flow weak */

/*
This script can be used to read data from a Google Docs table.
var text = `
`;
var pieces = text.trim().split('\n\n').join('\n').split('\n');
function orNull(value) { return value === '' ? null : value; }
console.log(JSON.stringify({
  id: null,
  grade: `7th grade`,
  name: orNull(pieces[0]),
  gender: pieces[1] === 'M' ? 'male' : 'female',
  race: orNull(pieces[2]),
  behavior: orNull(pieces[3]),
  ell: orNull(pieces[4]),
  learningDisabilities: orNull(pieces[5]),
  interests: orNull(pieces[6]),
  familyBackground: orNull(pieces[7]),
  ses: orNull(pieces[8]),
  academicPerformance: orNull(pieces[9])
}, null, 2));
*/

function addFields(fields) {
  return (student)=> {
    return {
      ...student,
      ...fields
    };
  };
}

const initialStudents = [
  { 
    id: 1,
    name: `Kevin`,
    grade: `7th grade`,
    gender: `male`,
    race: `Hispanic`,
    behavior: `Disruptive in class`,
    ell: null,
    learningDisabilities: null,
    academicPerformance: `Grades are C/D and borderline failing. Failed science the last two semesters. Reading and writing is at the 5th grade level. Arrives late to class most of the time.`,
    interests: null,
    familyBackground: null,
    ses: null,
  },
  {
    id: 2,
    name: `Floyd`,
    grade: `7th grade`,
    gender: `male`,
    race: `Caucasian`,
    behavior: `Attendance issues`,
    ell: null,
    learningDisabilities: `ADHD`,
    academicPerformance: null,
    interests: `Wants to be a firefighter`,
    familyBackground: `Divorced parents, younger brother`,
    ses: `Free and reduced lunch`
  },
  {
    id: 3,
    name: `Maia`,
    grade: `7th grade`,
    gender: `female`,
    race: `Caucasian`,
    behavior: `Discipline report`,
    ell: null,
    learningDisabilities: null,
    academicPerformance: null,
    interests: `In theater and loves art`,
    familyBackground: `Single mom, two olders sisters`,
    ses: null
  },
  { 
    id: 4, 
    name: `Hayin`,
    grade: `7th grade`,
    gender: `female`,
    race: `Korean`,
    behavior: null,
    ell: null,
    learningDisabilities: null,
    academicPerformance: null,
    interests: `Plays the flute, very involved in church, loves coding`,
    familyBackground: `1st generation parents, twin sister`,
    ses: `Free and reduced lunch`
    
  },
  {
    id: 5,
    name: `Mike`,
    grade: `7th grade`,
    gender: `male`,
    race: `African American`,
    behavior: null,
    ell: null,
    learningDisabilities: null,
    academicPerformance: null,
    interests: `Plays in a band, sings in the school chorus`,
    familyBackground: `1 older brother`,
    ses: null,
  },
  {
    id: 6,
    name: `Jasmine`,
    grade: `7th grade`,
    gender: `female`,
    race: `African American`,
    behavior: `Quiet`,
    ell: null,
    learningDisabilities: null,
    academicPerformance: null,
    interests: `Plays tennis and soccer`,
    familyBackground: `Divorced parents, only child`,
    ses: `Free and reduced lunch`
  },
  {
    id: 7,
    name: 'Miquel',
    grade: '7th grade',
    gender: 'male',
    race: 'Latino',
    behavior: 'Attendance issues',
    ell: 'Spanish is native language',
    learningDisabilities: null,
    academicPerformance: null,
    interests: `Has an after school job`,
    familyBackground: `3 younger siblings`,
    ses: `Free and reduced lunch`
  },
  {
    id: 8,
    name: `Ada`,
    grade: `7th grade`,
    gender: `female`,
    race: `Haitian`,
    behavior: null,
    ell: `Haitian Creole is native language`,
    learningDisabilities: `Auditory disability`,
    academicPerformance: null,
    interests: `High-achiever, teacher's pet. Wants to be a doctor, is in yearbook`,
    familyBackground: `Aunt is guardian`,
    ses: null
  },
  {
    id: 9,
    name: `Steve`,
    grade: `7th grade`,
    gender: `male`,
    race: `Caucasian`,
    behavior: `Often tired in class`,
    ell: null,
    learningDisabilities: null,
    academicPerformance: null,
    interests: `Prefers ELA over math and science. Plays drums at home with his family. Has an after school job`,
    familyBackground: `Younger sister`,
    ses: null
  },
  { 
    id: 10, 
    name: `Sasha`,
    grade: `7th grade`,
    gender: `female`,
    race: `African American`,
    familyBackground: `Family recently moved to town`
  }
].map(addFields({
  isMursion: false,
  cohortKey: 'initial'
}));


// From Virtual School Context_Update_072716
const julyStudentsNotFromMursion = [
  {
    id: 2000,
    grade: `7th grade`,
    name: `Mike Bilson`,
    gender: `male`,
    race: `African American`,
    behavior: null,
    ell: null,
    learningDisabilities: null,
    interests: `Plays in a band, sings in the school chorus`,
    familyBackground: `Lives with Mom, 1 older brother`,
    ses: null,
    academicPerformance: `A in 6th grade science, A in 6th grade math`
  }, {
    id: 2001,
    grade: `7th grade`,
    name: `Miguel Fernandez`,
    gender: `male`,
    race: `Salvadoran`,
    behavior: `Attendance issues`,
    ell: `Spanish is native language`,
    learningDisabilities: null,
    interests: `Helps out in his dad’s store after school and on weekends, plays soccer in the fall`,
    familyBackground: `Lives with both parents, 3 younger sisters`,
    ses: `Free and reduced lunch`,
    academicPerformance: `C in 6th grade science, B in 6th grade math`
  }, {
    id: 2002,
    grade: `7th grade`,
    name: `Floyd Markey`,
    gender: `male`,
    race: `Caucasian`,
    behavior: `Attendance issues`,
    ell: null,
    learningDisabilities: `ADHD`,
    interests: `Wants to be a forensic scientist`,
    familyBackground: `Divorced parents, splits time between parents, younger brother`,
    ses: `Free and reduced lunch`,
    academicPerformance: `D in 6th grade science, C in 6th grade math`
  }, {
    id: 2003,
    grade: `7th grade`,
    name: `Jasmine Martine`,
    gender: `male`,
    race: `African American`,
    behavior: `Reserved`,
    ell: null,
    learningDisabilities: `ADHD`,
    interests: `Plays a sport every season`,
    familyBackground: `Divorced parents, lives mainly with Mom, only child`,
    ses: `Free and reduced lunch`,
    academicPerformance: `B in 6th grade science, B in 6th grade math`
  }, {
    "id": 2004,
    "grade": "7th grade",
    "name": "Manuel Martinez",
    "gender": "male",
    "race": "Puerto Rican",
    "behavior": "Arrives late to class frequently",
    "ell": null,
    "learningDisabilities": null,
    "interests": "Does not like to read, very interested in Puerto Rican politics",
    "familyBackground": "Lives with both parents, parents speak Spanish at home and English is their 2nd language, 2 younger cousins live with family",
    "ses": null,
    "academicPerformance": "C in 6th grade science, B in 6th grade math"
  }, {
    "id": 2005,
    "grade": "7th grade",
    "name": "Hayin Park",
    "gender": "female",
    "race": "Korean",
    "behavior": null,
    "ell": null,
    "learningDisabilities": null,
    "interests": "Plays the flute, very involved in church, loves coding",
    "familyBackground": "Lives with both parents, 1st generation parents and English is their 2nd language, twin sister",
    "ses": "Free and reduced lunch",
    "academicPerformance": "A in 6th grade science, A  in 6th grade math"
  }, {
    "id": 2006,
    "grade": "7th grade",
    "name": "Ada Phillipe",
    "gender": "female",
    "race": "Haitian",
    "behavior": null,
    "ell": "Yes, Haitian Creole is native language",
    "learningDisabilities": "Auditory disability, has IEP",
    "interests": "Wants to be a doctor, is in yearbook club",
    "familyBackground": "Adopted, lives with both parents who ar Caucasian, one younger brother who is biological son of parents",
    "ses": null,
    "academicPerformance": "B in 6th grade science, B in 6th grade math"
  }, {
    "id": 2007,
    "grade": "7th grade",
    "name": "Steve Timland",
    "gender": "male",
    "race": "Caucasian",
    "behavior": "Often tired in class",
    "ell": null,
    "learningDisabilities": null,
    "interests": "Plays Mindcraft all the time",
    "familyBackground": "Lives with both parents - two moms, Younger sister",
    "ses": null,
    "academicPerformance": "A in 6th grade science, A in 6th grade math"
  }, {
    "id": 2008,
    "grade": "7th grade",
    "name": "Lucy Winston",
    "gender": "female",
    "race": "Caucasian",
    "behavior": "Sent to principal for fighting with CJ",
    "ell": null,
    "learningDisabilities": null,
    "interests": "In drama club and loves art",
    "familyBackground": "Single mom, two older sisters",
    "ses": null,
    "academicPerformance": "C in 6th grade science, B in 6th grade science"
  }
].map(addFields({
  isMursion: false,
  cohortKey: '20160722'
}));


// From Virtual School Context_Update_072716
const julyStudentsFromMursion = [
  {
    "id": 3001,
    "grade": "7th grade",
    "name": "Maria Gonzales",
    "gender": "female",
    "race": "Dominican",
    "behavior": "Quiet",
    "ell": null,
    "learningDisabilities": null,
    "interests": "Loves to draw, write, and read",
    "familyBackground": "Lives with both parents, 2 older brothers",
    "ses": null,
    "academicPerformance": "A in 6th grade science, A in 6th grade math"
  }, {
    "id": 3002,
    "grade": "7th grade",
    "name": "Cindy “CJ” Harper",
    "gender": "female",
    "race": "Caucasian",
    "behavior": "Sent to principal for fighting with Lucy",
    "ell": null,
    "learningDisabilities": null,
    "interests": "Loves movies, spends lots of time with 9th grade boyfriend",
    "familyBackground": "Mom is ill, Dad is not present, older brother is often truant from high school",
    "ses": null,
    "academicPerformance": "F in 6th grade science, C in 6th grade math"
  }, {
    "id": 3003,
    "grade": "7th grade",
    "name": "Kevin Jordan",
    "gender": "male",
    "race": "African American",
    "behavior": null,
    "ell": null,
    "learningDisabilities": null,
    "interests": "Plays guitar, loves mixing music",
    "familyBackground": "Lives with grandmother, ½ sister lives with Mom and boyfriend",
    "ses": "Free and reduced lunch",
    "academicPerformance": "C in 6th grade science, C in 6th grade math"
  }, {
    "id": 3004,
    "grade": "7th grade",
    "name": "Ed Lewis",
    "gender": "male",
    "race": "African American",
    "behavior": null,
    "ell": null,
    "learningDisabilities": null,
    "interests": "Wants to be an air force pilot like uncle, plays basketball",
    "familyBackground": "Lives with both parents, younger sister and younger twin brothers",
    "ses": null,
    "academicPerformance": "B in 6th grade science, B in 6th grade math"
  }, {
    "id": 3005,
    "grade": "7th grade",
    "name": "Sean McGowen",
    "gender": "male",
    "race": "Caucasian",
    "behavior": "Talkative",
    "ell": null,
    "learningDisabilities": null,
    "interests": "Boy scouts, video games, math camp",
    "familyBackground": "Lives with both parents, only child",
    "ses": null,
    "academicPerformance": "B in 6th grade science, C in 6th grade math"
  }
].map(addFields({
  isMursion: true,
  cohortKey: '20160722'
}));

const demoStudents = [{
  id: 4001,
  sketchFab: {
    id: 'f6548660b118491fbf32d78d5dbc8403',
    eye: [-3, -20, -6],
    target: [0.0, 0.01, 0.15]
  },
  sketchFabId: '',
  name: `Danny`,
  grade: `7th grade`,
  gender: `male`,
  race: `African American`,
  behavior: null,
  ell: null,
  learningDisabilities: null,
  academicPerformance: null,
  interests: `Plays in a band, sings in the school chorus`,
  familyBackground: `1 older brother`,
  ses: null,
}, {
  id: 4002,
  sketchFab: {
    id: '2106cb61b95c48dc8b506ffb3c1daa6e',
    eye: [-12, -20, -1],
    target: [-0.09, -0.05, 0.10]
  },
  name: `Sheena`,
  grade: `7th grade`,
  gender: `female`,
  race: `Asian`,
  behavior: null,
  ell: null,
  learningDisabilities: null,
  academicPerformance: null,
  interests: null,
  familyBackground: null,
  ses: null
}, {
  id: 4003,
  name: `Rita`,
  grade: `7th grade`,
  gender: `female`,
  race: `Caucasian`,
  behavior: null,
  ell: null,
  learningDisabilities: `ADHD`,
  academicPerformance: null,
  interests: 'Active in theater clubs',
  familyBackground: null,
  ses: null
}].map(addFields({
  isMursion: false,
  cohortKey: '20161026'
}));

export const allStudents = initialStudents.concat(
  julyStudentsFromMursion,
  julyStudentsNotFromMursion,
  demoStudents
);

// Only include the latest cohort of students (others are essentially archived).
export const activeStudents = allStudents.filter(student => student.cohortKey === '20160722');
