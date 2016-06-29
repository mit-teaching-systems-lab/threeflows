// @flow
import React from 'react';
import * as PropTypes from '../prop_types.js';

/*
Shows a card for a student from the virtual school.
*/
export default React.createClass({
  displayName: 'StudentCard',

  propTypes: {
    student: PropTypes.Student.isRequired,
    useCardStyles: React.PropTypes.bool,
    style: React.PropTypes.object,
    attributeStyle: React.PropTypes.object
  },

  render() {
    const attributeStyle = {
      ...styles.attribute,
      ...this.props.attributeStyle
    };
    const containerStyle = {
      ...(this.props.useCardStyles ? styles.cardStyles : {}),
      ...this.props.style
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
      <div style={containerStyle}>
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
  cardStyles: {
    backgroundColor: '#F1C889',
    marginTop: 5,
    padding: 10
  },
  name: {
    fontWeight: 'bold',
    marginBottom: 10
  },
  attribute: {
    fontSize: 12,
    marginTop: 2
  },
};