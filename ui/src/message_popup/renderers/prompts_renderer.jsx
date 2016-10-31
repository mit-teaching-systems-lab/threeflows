/* @flow weak */
import React from 'react';

import StudentCard from '../student_card.jsx';
import HintCard from './hint_card.jsx';


// Supports rendering a text student card as a prompt
export default React.createClass({
  displayName: 'PromptsRenderer',

  propTypes: {
    showStudentCard: React.PropTypes.bool.isRequired,
    scaffolding: React.PropTypes.object.isRequired,
    question: React.PropTypes.object.isRequired,
    student: React.PropTypes.object
  },

  render() {
    const {scaffolding, showStudentCard, student, question} = this.props;
    const {examples, nonExamples} = question;
    return (
      <div>
        {showStudentCard && student &&
          <StudentCard useCardStyles={true} student={student} />}
        {scaffolding.helpType === 'hints' && 
          <div style={styles.hintCard}>
            <HintCard examples={examples} nonExamples={nonExamples} />
          </div>}
      </div>
    );
  }
});

const styles = {
  hintCard: {
    padding: 10,
    paddingBottom: 0
  }
};
