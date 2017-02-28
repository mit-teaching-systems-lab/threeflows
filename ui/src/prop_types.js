/* @flow weak */
import React from "react";

/*
Defines common shapes of data.  Can moves this to Flow annotations over time.
*/
export const Student = React.PropTypes.shape({
  id: React.PropTypes.number.isRequired,
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

export const Scaffolding = React.PropTypes.shape({
  helpType: React.PropTypes.string.isRequired,
  shouldShowSummary: React.PropTypes.bool.isRequired
});