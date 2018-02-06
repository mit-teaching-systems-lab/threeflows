/* @flow weak */
import PropTypes from 'prop-types';

import React from "react";

/*
Defines common shapes of data.  Can moves this to Flow annotations over time.
*/
export const Student = PropTypes.shape({
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  grade: PropTypes.string.isRequired,
  gender: PropTypes.string.isRequired,
  race: PropTypes.string.isRequired,
  behavior: PropTypes.string,
  ell: PropTypes.string,
  learningDisabilities: PropTypes.string,
  academicPerformance: PropTypes.string,
  interests: PropTypes.string,
  familyBackground: PropTypes.string,
  ses: PropTypes.string
});

export const Scaffolding = PropTypes.shape({
  helpType: PropTypes.string.isRequired,
  shouldShowSummary: PropTypes.bool.isRequired
});