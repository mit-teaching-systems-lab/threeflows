//@flow
import React from 'react';
import {allStudents} from '../message_popup/data_lists.jsx';
import StudentCard from '../message_popup/student_card.jsx';
import * as PropTypes from '../prop_types.js';
import {Card, CardHeader, CardText} from 'material-ui/Card';



export default React.createClass({
  displayName: 'VirtualSchoolPage',

  propTypes: {
    students: React.PropTypes.arrayOf(PropTypes.Student).isRequired
  },

  getDefaultProps() {
    return {
      students: allStudents
    };
  },

  render() {
    const {students} = this.props;
    return (
      <div style={styles.pageContainer}>
        <div style={styles.section}>{this.renderSchool()}</div>
        <div style={styles.section}>{this.renderClassroom(students)}</div>
        <div style={styles.section}>{this.renderStudents(students)}</div>
      </div>
    );
  },

  renderSchool() {
    return (
      <Card
        initiallyExpanded={true}>
        <CardHeader
          titleStyle={styles.cardTitleHeader}
          title="MIT Middle School"
          subtitle="Where you are teaching"
          actAsExpander={true}
          showExpandableButton={true} />
        <CardText expandable={true}>
          <div style={styles.text}>School type: Urban school</div>
          <div style={styles.text}>Grades: 6-8</div>
          <div style={styles.text}>School enrollment: 150 students</div>
          <div style={styles.text}>Classroom teachers: 15</div>
          <div style={styles.text}>Student/teacher ratio: 10:1</div>
          <div style={styles.text}>Title 1 school (Title 1 funds aim to bridge the gap between low-income students and other students. The U.S. Department of Education provides supplemental funding to local school districts to meet the needs of at-risk and low-income students.)</div>
        </CardText>
      </Card>
    );
  },

  renderClassroom(students:[PropTypes.Student]) {
    return (
      <Card
        initiallyExpanded={true}>
        <CardHeader
          titleStyle={styles.cardTitleHeader}
          title="Classroom"
          subtitle="What kind of classroom you have"
          actAsExpander={true}
          showExpandableButton={true} />
        <CardText expandable={true}>
          <div style={styles.text}>Grade: 7</div>
          <div style={styles.text}>Subject: Science</div>
          <div style={styles.text}>Available technology: teacher laptop, laptop cart with 8 laptops, projector </div>
          <div style={styles.text}>Class period: 2nd period</div>
          <div style={styles.text}>Class size: {students.length} students</div>
        </CardText>
      </Card>
    );
  },

  renderStudents(students:[PropTypes.Student]) {
    return (
      <Card
        initiallyExpanded={true}>
        <CardHeader
          titleStyle={styles.cardTitleHeader}
          title="Students"
          subtitle="Who your students are"
          actAsExpander={true}
          showExpandableButton={true} />
        <CardText expandable={true}>
          {this.renderCards(students)}
        </CardText>
      </Card>
    );
  },

  renderCards(students:[PropTypes.Student]) {
    return (
      <div>
        {students.map((student) => {
          return <StudentCard
            key={student.id}
            student={student}
            attributeStyle={styles.studentCardAttribute}
            style={styles.studentCard} />;
        })}
      </div>
    );
  }
});

const styles = {
  section: {
    marginTop: 20,
    marginBottom: 20
  },
  cardTitleHeader: {
    fontSize: 24
  },
  pageContainer: {
    padding: 20,
    paddingTop: 5,
    backgroundColor: '#A31F34'
  },
  text: {
    fontSize: 16,
    lineHeight: 1.5
  },
  studentCard: {
    display: 'inline-block',
    verticalAlign: 'top',
    backgroundColor: '#eee',
    margin: 10,
    padding: 10,
    border: '1px solid #ccc',
    minHeight: 200,
    width: 380,
    fontSize: 18
  },
  studentCardAttribute: {
    fontSize: 16,
    padding: 3
  }
};