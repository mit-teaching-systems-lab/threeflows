import React from "react";

/*
Defines common shapes of data.  Can moves this to Flow annotations over time.
*/
export const LearningObjective = React.PropTypes.shape({
  id: React.PropTypes.string.isRequired,
  competencyGroup: React.PropTypes.string.isRequired,
  text: React.PropTypes.string.isRequired
});

export const LearningExperience = React.PropTypes.shape({
  img: React.PropTypes.string.isRequired,
  title: React.PropTypes.string.isRequired,
  href: React.PropTypes.string
});

export const Challenge = React.PropTypes.shape({
  id: React.PropTypes.number.isRequired,
  name: React.PropTypes.string.isRequired,
  scenario: React.PropTypes.string.isRequired,
  learningObjectives: React.PropTypes.arrayOf(LearningObjective).isRequired,
  learningExperiences: React.PropTypes.arrayOf(LearningExperience).isRequired
});

export const User = React.PropTypes.shape({
  driveFolderId: React.PropTypes.string.isRequired
});

export const Student = React.PropTypes.shape({
  name: React.PropTypes.string.isRequired,
  grade: React.PropTypes.string.isRequired,
  gender: React.PropTypes.string.isRequired,
  race: React.PropTypes.string.isRequired,
  behavior: React.PropTypes.string,
  ell: React.PropTypes.string,
  learningDisabilities: React.PropTypes.string,
  academicPerformance: React.PropTypes.string,
  interests: React.PropTypes.string,
  familyBackground: React.PropTypes.string,
  ses: React.PropTypes.string
});