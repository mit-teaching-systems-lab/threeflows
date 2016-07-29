/* @flow weak */
/* eslint no-console: "off" */
import React from 'react';
import _ from 'lodash';

import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';

import SearchIcon from 'material-ui/svg-icons/action/search';
import CheckIcon from 'material-ui/svg-icons/navigation/check';
import CloseIcon from 'material-ui/svg-icons/navigation/close';
import UncheckedIcon from 'material-ui/svg-icons/toggle/check-box-outline-blank';
import CheckedIcon from 'material-ui/svg-icons/toggle/check-box';

import NavigationAppBar from '../../components/navigation_app_bar.jsx';
import ArchivedQuestionButton from './archived_question_button.jsx';

import {withStudents, withLearningObjectiveAndIndicator} from '../transformations.jsx';
import {allArchivedQuestions} from './archived_questions.js';

export default React.createClass({
  displayName: 'ArchivedQuestionsPage',

  getInitialState(){
    return ({
      checking: false,
      selectedQuestions: [],
      dialogOpened: 'none'
    });
  },

  onToggleSelection(){
    this.setState({checking: !this.state.checking, selectedQuestions: []});
  },

  onTouchQuestion(questionId){
    if(this.state.selectedQuestions.includes(questionId)){
      const newArray = _.filter(this.state.selectedQuestions, id => id !== questionId);
      this.setState({selectedQuestions: newArray});
    } else this.setState({selectedQuestions: this.state.selectedQuestions.concat(questionId)});
  },

  onSelectAll(){
    if(this.areAllSelected()) this.setState({selectedQuestions: []});
    else this.setState({selectedQuestions: allArchivedQuestions.map(question => question.id)});
  },

  areAllSelected(){
    return this.state.selectedQuestions.length === allArchivedQuestions.length;
  },

  onSetDialog(type){
    return function(){
      if(type === 'none'){
        if(this.state.checking) this.setState({dialogOpened: type});
        else this.setState({dialogOpened: type, selectedQuestions: []});
      }else this.setState({dialogOpened: type});
    }.bind(this);
  },

  onRestore(){
    _.forEach(this.state.selectedQuestions, questionId => {
      const question = _.find(allArchivedQuestions, question => question.id === questionId);
      //Do Restore Here
      console.log("RESTORE: " + question.id + " " + question.text);
    });
  },

  onDelete(){
    _.forEach(this.state.selectedQuestions, questionId => {
      const question = _.find(allArchivedQuestions, question => question.id === questionId);
      //Do Delete Here
      console.log("DELETE: " + question.id + " " + question.text);
    });
  },

  render(){
    const selectedQuestions = this.state.selectedQuestions.map(id => _.find(allArchivedQuestions, question => question.id === id));
    const selectedQuestion = this.state.selectedQuestions.length > 0 ? withLearningObjectiveAndIndicator(withStudents(selectedQuestions)[0]) : undefined;
    return (
      <div>
        <NavigationAppBar
          title="MP Archived Questions"
          iconElementRight={<IconButton onTouchTap={this.onToggleSelection}>{this.state.checking ? <CloseIcon /> : <CheckIcon />}</IconButton>}
          />
        <div style={styles.container}>
          <div style={styles.searchbar}>
            <SearchIcon />
            <TextField
              hintText="Search for a specific question"
              fullWidth={true}
              style={styles.searchbarText}
              underlineShow={false}
            />
          </div>
          <Divider />
        </div>
        {this.state.checking && 
          <div style={styles.selectionHeader}>
            <IconButton onTouchTap={this.onSelectAll}>{this.areAllSelected() ? <CheckedIcon color="white" /> : <UncheckedIcon color="white" />}</IconButton>
            <div style={{padding: 'auto'}}>{this.state.selectedQuestions.length} selected</div>
            <div>
              <FlatButton style={styles.selectionRestoreButton} onTouchTap={this.onSetDialog('selectionRestore')} label="Restore" disabled={this.state.selectedQuestions.length === 0}/>
              <FlatButton style={styles.selectionDeleteButton} onTouchTap={this.onSetDialog('selectionDelete')} label="Delete" disabled={this.state.selectedQuestions.length === 0}/>
            </div>
          </div>
        }
        <div style={{top: this.state.checking ? 160 : 112, ...styles.questionsContainer}}>
          {allArchivedQuestions.map(question => 
            <ArchivedQuestionButton 
              key={question.id} 
              onSetDialog={this.onSetDialog('singleQuestion')}
              question={question} 
              checking={this.state.checking}
              checked={this.state.selectedQuestions.includes(question.id)}
              onTouchQuestion={this.onTouchQuestion}/>
          )}
        </div>
        <Dialog 
          open={this.state.dialogOpened === 'selectionRestore'}
          onRequestClose={this.onSetDialog('none')}
          actions={[
            <FlatButton label="Cancel" onTouchTap={this.onSetDialog('none')} />,
            <FlatButton label="Restore" style={styles.selectionRestoreButton} onTouchTap={function(){
              this.onSetDialog('none')();
              this.onRestore();
            }.bind(this)} />
          ]}
          >
          <div style={styles.dialogTitle}>{this.state.selectedQuestions.length + (this.state.selectedQuestions.length === 1 ? ' Question' : ' Questions')} Selected</div>
          <div style={styles.dialogText}>Restoring adds a question back to the list of questions involved in Message Popup and does not override any updates made to it.</div>
          <div style={styles.dialogText}>Are you sure you wish to restore?</div>
        </Dialog>

        <Dialog 
          open={this.state.dialogOpened === 'selectionDelete'}
          onRequestClose={this.onSetDialog('none')}
          actions={[
            <FlatButton label="Cancel" onTouchTap={this.onSetDialog('none')} />,
            <FlatButton label="Delete" style={styles.selectionDeleteButton} onTouchTap={function(){
              this.onSetDialog('none')();
              this.onDelete();
            }.bind(this)} />
          ]}
          >
          <div style={styles.dialogTitle}>{this.state.selectedQuestions.length + (this.state.selectedQuestions.length === 1 ? ' Question' : ' Questions')} Selected</div>
          <div style={styles.dialogText}>Deleting permanently removes a question and all responses associated it from stored data. This applies to responses made before a question was archived or updated.</div>
          <div style={styles.dialogText}>Are you sure you wish to delete?</div>
        </Dialog>

        {selectedQuestion !== undefined &&
          <Dialog 
            open={this.state.dialogOpened === 'singleQuestion'}
            onRequestClose={this.onSetDialog('none')}
            autoScrollBodyContent={true}
            actions={[
              <div style={{padding: 0, margin: 0, display: 'flex', flexDirection: 'row', flexWrap: 'nowrap', justifyContent: 'space-around'}}>
                <FlatButton label="Cancel" onTouchTap={this.onSetDialog('none')} />
                <FlatButton label="Restore" style={styles.selectionRestoreButton} onTouchTap={this.onSetDialog('selectionRestore')}/>
                <FlatButton label="Delete" style={styles.selectionDeleteButton} onTouchTap={this.onSetDialog('selectionDelete')}/>
              </div>
            ]}
            >
            <div style={styles.dialogTitle}>Question #{selectedQuestion.id}</div>
            <div style={styles.dialogText}><b>Question Text:</b> {selectedQuestion.text}</div>
            <div style={styles.dialogText}><b>Students:</b>{selectedQuestion.students.map(student => " " + student.name)}</div>
            <div style={styles.dialogText}><b>Learning Objective:</b> {selectedQuestion.learningObjective.key + " " + selectedQuestion.learningObjective.text}</div>
            <div style={styles.dialogText}><b>Indicator:</b> {selectedQuestion.indicator.text}</div>
            {selectedQuestion.examples.length > 0 && 
              <div style={styles.dialogText}><b>Good Examples:</b> {selectedQuestion.examples.map(example => <div key={`example-text:${example}`}>{example}</div>)}</div>
            }
            {selectedQuestion.nonExamples.length > 0 && 
              <div style={styles.dialogText}><b>Bad Examples:</b> {selectedQuestion.nonExamples.map(example => <div key={`example-text:${example}`}>{example}</div>)}</div>
            }
          </Dialog>
        }
      </div>
      );
  }
});

const styles = {
  container: {
    padding: 0
  },
  searchbar: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  searchbarText: {
    paddingLeft: 10,
    paddingRight: 5
  },
  selectionHeader: {
    backgroundColor: '#212121',
    color: 'white',
    paddingLeft: 4,
    paddingRight: 10,
    fontSize: 12,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  selectionRestoreButton: {
    color: 'green',
  },
  selectionDeleteButton: {
    color: '#CA2300',
  },
  questionsContainer: {
    position: 'absolute',
    width: '100%',
    
    bottom: 0,
    overflowY: 'scroll'
  },
  dialogTitle: {
    fontWeight: 'bold',
    fontSize: 16
  },
  dialogText: {
    fontSize: 14,
    padding: 5
  }
};