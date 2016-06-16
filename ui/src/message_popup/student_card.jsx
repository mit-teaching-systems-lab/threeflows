// @flow
import React from 'react';

/*
Shows a card for a student from the virtual school.
*/
export default React.createClass({
  displayName: 'StudentCard',

  propTypes: {
    student: React.PropTypes.shape({
      name: React.PropTypes.string.isRequired,
      grade: React.PropTypes.string.isRequired,
      gender: React.PropTypes.string.isRequired,
      race: React.PropTypes.string.isRequired,
      behavior: React.PropTypes.string,
      ell: React.PropTypes.string,
      learningDisabilities: React.PropTypes.string,
      academicPerformace: React.PropTypes.string,
      interests: React.PropTypes.string,
      familyBackground: React.PropTypes.string,
      ses: React.PropTypes.string
    }).isRequired
  },

  render() {
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
      <div>
        <div style={styles.name}>{name}</div>
        <div style={styles.attribute}>{`${grade} ${gender}, ${race}`}</div>
        {behavior && <div style={styles.attribute}>{behavior}</div>}
        {ell && <div style={styles.attribute}>{ell}</div>}
        {learningDisabilities && <div style={styles.attribute}>{learningDisabilities}</div>}
        {academicPerformance && <div style={styles.attribute}>{academicPerformance}</div>}
        {interests && <div style={styles.attribute}>{interests}</div>}
        {familyBackground && <div style={styles.attribute}>{familyBackground}</div>}
        {ses && <div style={styles.attribute}>{ses}</div>}
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