/* @flow weak */
import React from 'react';
import _ from 'lodash';

import {allStudents} from '../../../data/virtual_school.js';

import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import {ListItem} from 'material-ui/List';
import AutoComplete from 'material-ui/AutoComplete';
import IconButton from 'material-ui/IconButton';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

import AddIcon from 'material-ui/svg-icons/content/add';
import FaceIcon from 'material-ui/svg-icons/action/face';
import CloseIcon from 'material-ui/svg-icons/navigation/close';


export default React.createClass({
  displayName: 'Students',

  propTypes: {
    students: React.PropTypes.array.isRequired,
    addStudent: React.PropTypes.func.isRequired,
    removeStudent: React.PropTypes.func.isRequired,
  },

  getInitialState(){
    return ({
      selectedStudent: null,
      studentText: ''
    });
  },

  selectStudent(studentId){
    return function(){
      this.setState({selectedStudent: studentId});
    }.bind(this);
  },

  deselectStudent(){
    this.setState({selectedStudent: null});
  },

  onStudentTextChange(searchText, dataSource){
    this.setState({studentText: searchText});
  },

  addAutoStudent(name, value){
    this.props.addStudent(name);
  },

  isStudentSelectionValid(selection){
    if(selection === '') return true;
    if(_.find(allStudents, student => student.name.toLowerCase() === selection.toLowerCase()) === undefined) return false;
    if(_.find(this.props.students, student => student.name.toLowerCase() === selection.toLowerCase()) !== undefined) return false;
    return true;
  },

  render(){
    const {
      students,
      addStudent,
      removeStudent,
    } = this.props;

    const {studentText} = this.state;

    const selectedStudent = _.find(allStudents, student => student.id === this.state.selectedStudent);

    return (
      <div>
        <Paper style={styles.container}>
          <div style={styles.title}>Involved Students</div>
          <Divider />
          <div style={styles.studentButtonSection}>
            {students.map(student => {
              return <ListItem
                style={styles.studentButton}
                key={"student-" + student.id}
                primaryText={student.name} 
                onTouchTap={this.selectStudent(student.id)}
                leftIcon={<FaceIcon />}
                rightIconButton={<IconButton onTouchTap={removeStudent(student.id)}><CloseIcon /></IconButton>}/>;
            })}
          </div>
          <div style={styles.studentTextSection}>
            <AutoComplete
              id='student-selection'
              searchText={studentText}
              onUpdateInput={this.onStudentTextChange}
              onNewRequest={this.addAutoStudent}
              hintText="Type a student's name..."
              errorText={this.isStudentSelectionValid(studentText) ? '' : ' '}
              fullWidth={true}
              dataSource={_.filter(allStudents, student => this.isStudentSelectionValid(student.name)).map(student => student.name)}
              filter={AutoComplete.fuzzyFilter}
              maxSearchResults={4}
             />
             <IconButton onTouchTap={function(){addStudent(studentText);}}><AddIcon/></IconButton>
          </div>
        </Paper> 
        {selectedStudent !== null && selectedStudent !== undefined &&
          <Dialog
            title={selectedStudent.name}
            open={selectedStudent !== null}
            actions={[
              <FlatButton 
                label="Close"
                onTouchTap={this.deselectStudent}/>,
              <FlatButton 
                label="Remove"
                onTouchTap={function(){
                  removeStudent(selectedStudent.id)(); 
                  this.deselectStudent();}.bind(this)}/>
            ]}
            onRequestClose={this.deselectStudent}>
            <div style={styles.studentAttribute}>{`${selectedStudent.grade} ${selectedStudent.gender}, ${selectedStudent.race}`}</div>
            {selectedStudent.behavior && <div style={styles.studentAttribute}>{selectedStudent.behavior}</div>}
            {selectedStudent.ell && <div style={styles.studentAttribute}>{selectedStudent.ell}</div>}
            {selectedStudent.learningDisabilities && <div style={styles.studentAttribute}>{selectedStudent.learningDisabilities}</div>}
            {selectedStudent.academicPerformance && <div style={styles.studentAttribute}>{selectedStudent.academicPerformance}</div>}
            {selectedStudent.interests && <div style={styles.studentAttribute}>{selectedStudent.interests}</div>}
            {selectedStudent.familyBackground && <div style={styles.studentAttribute}>{selectedStudent.familyBackground}</div>}
            {selectedStudent.ses && <div style={styles.studentAttribute}>{selectedStudent.ses}</div>}
          </Dialog>
        }
      </div>
      );
  }
});

const styles = {
  container: {
    margin: 5,
    padding: 10,
    fontSize: 14
  },
  title: {
    marginBottom: 5,
    fontSize: 18,
    fontWeight: 'bold'
  },
  studentButtonSection: {
    padding: 10,
  },
  studentButton: {
    padding: 0,
    width: '100%',
    fontSize: 14,
  },
  studentTextSection: {
    display: 'flex',
    flexDirection: 'row'
  },
  studentAttribute: {
    fontSize: 14,
    marginTop: 2
  },
};