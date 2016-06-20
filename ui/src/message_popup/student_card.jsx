// @flow
import React from 'react';
import * as PropTypes from '../prop_types.js';

/*
Shows a card for a student from the virtual school.
*/
export default React.createClass({
  displayName: 'StudentCard',

  propTypes: {
    student: PropTypes.Student,
    style: React.PropTypes.object
  },

  render() {
    const attributeStyle = {
      ...styles.attribute,
      ...this.props.attributeStyle
    };

    const {
      name,
      grade,
      gender,
      race,
      behavior,
      ell,
      learningDisabilities,
      academicPerformance,
      interests,
      familyBackground,
      ses
    } = this.props.student;

    return (
      <div style={this.props.style}>
        <div style={styles.name}>{name}</div>
        <div style={attributeStyle}>{`${grade} ${gender}, ${race}`}</div>
        {behavior && <div style={attributeStyle}>{behavior}</div>}
        {ell && <div style={attributeStyle}>{ell}</div>}
        {learningDisabilities && <div style={attributeStyle}>{learningDisabilities}</div>}
        {academicPerformance && <div style={attributeStyle}>{academicPerformance}</div>}
        {interests && <div style={attributeStyle}>{interests}</div>}
        {familyBackground && <div style={attributeStyle}>{familyBackground}</div>}
        {ses && <div style={attributeStyle}>{ses}</div>}
      </div>
    );
  }
});


const styles = {
  name: {
    fontWeight: 'bold',
    marginBottom: 10
  },
  attribute: {
    fontSize: 12,
    marginTop: 2
  },
};