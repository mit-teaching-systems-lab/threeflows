/* @flow weak */
import React from 'react';

import * as Api from '../../helpers/api.js';
import * as Routes from '../../routes.js';

import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';
import MenuItem from 'material-ui/MenuItem';
import Dialog from 'material-ui/Dialog';
import {Card, CardHeader, CardText} from 'material-ui/Card';

import SearchIcon from 'material-ui/svg-icons/action/search';
import AddIcon from 'material-ui/svg-icons/content/add';
import ChatBubbleOutlineIcon from 'material-ui/svg-icons/communication/chat-bubble-outline';

import NavigationAppBar from '../../components/navigation_app_bar.jsx';
import QuestionButton from './question_button.jsx';
import ArchivedQuestionButton from './archived_question_button.jsx';

import {allQuestions} from '../questions.js';
import {allArchivedQuestions} from './archived_questions.js';
import {withStudents, withIndicator} from '../transformations.jsx';

export default React.createClass({
  displayName: 'QuestionsPage',

  getInitialState(){
    return ({
      loaded: false,
      searchText: '',
      allDatabaseQuestions: {
        currentQuestions: allQuestions,
        archivedQuestions: allArchivedQuestions
      },
      showArchivedQuestions: false,
      selectedArchivedQuestion: null
    });
  },

  componentDidMount(){
    Api.questionsQuery().end(this.onQuestionsReceived);
  },

  getQuestionString(question){
    question = withIndicator(withStudents([question])[0]);
    const questionString = [
      question.id, 
      question.text, 
      question.indicator.text, 
      ...question.students.map(student => student.id),
      ...question.students.map(student => student.name),
      ...question.examples,
      ...question.nonExamples
    ].join(' ');
    return questionString;
  },

  searchQuestionForText(text, question){
    const questionString = this.getQuestionString(question);
    return questionString.toLowerCase().includes(text);
  },

  countTextOccurrences(text, question){
    const questionString = this.getQuestionString(question);
    return questionString.split(text).length;
  },
  
  getSearchResults(text, list){
    const results = list
      .filter(question => this.searchQuestionForText(text, question))
      .sort(question => this.countTextOccurrences(text, question));
    return results;
  },

  getAllSearchResults(){
    const {searchText} = this.state;
    if(searchText === '') return this.state.allDatabaseQuestions;
    const currentQuestions = this.getSearchResults(searchText, this.state.allDatabaseQuestions.currentQuestions);
    const archivedQuestions = this.getSearchResults(searchText, this.state.allDatabaseQuestions.archivedQuestions);
    return {currentQuestions, archivedQuestions};
  },

  onQuestionsReceived(err, response){
    const questions = JSON.parse(response.text).questions;
    if(questions !== undefined){
      this.setState({loaded: true, allDatabaseQuestions: questions});
      return;
    }
    this.setState({loaded: true});
  },

  onNewQuestion(){
    Routes.navigate(Routes.messagePopupAuthorQuestionsNewPath());
  },

  onQuestionRestore(){
    const {selectedArchivedQuestion} = this.state;
    if(selectedArchivedQuestion !== null){
      const archivedQuestions = this.state.allDatabaseQuestions.archivedQuestions.filter(question => question.id !== selectedArchivedQuestion.id);
      const currentQuestions = this.state.allDatabaseQuestions.currentQuestions.concat(selectedArchivedQuestion);
      const allDatabaseQuestions = {currentQuestions, archivedQuestions};
      Api.saveQuestions(allDatabaseQuestions);
      this.setState({allDatabaseQuestions, selectedArchivedQuestion: null});
    }
  },

  onSearchBarChange(event){
    const value = event.target.value.toLowerCase().trim();
    this.setState({searchText: value});
  },

  onTouchArchivedQuestion(question){
    this.setState({selectedArchivedQuestion: question});
  },

  render(){
    const {selectedArchivedQuestion, loaded} = this.state;
    const {currentQuestions, archivedQuestions} = this.getAllSearchResults();
    return(
      <div>
        <NavigationAppBar
          title="Message PopUp Questions"
          iconElementRight={<IconButton onTouchTap={this.onNewQuestion}><AddIcon /></IconButton>}
          prependMenuItems={
            <div>
              <MenuItem
                onTouchTap={this.onNewQuestion}
                leftIcon={<ChatBubbleOutlineIcon />}
                primaryText="New Question" />
            </div>
          }
          />
        <div style={styles.container}>
          <div style={styles.searchbar}>
            <SearchIcon />
            <TextField
              hintText="Search for a specific question"
              fullWidth={true}
              style={styles.searchbarText}
              underlineShow={false}
              onChange={this.onSearchBarChange}
            />
          </div>
          <Divider />
          <div style={styles.questionsContainer}>
            <Paper rounded={false}>
              {loaded && currentQuestions.map(question => {
                return (
                 <QuestionButton question={question} key={question.id} />
                 );
              })}
            </Paper>
            <Card style={styles.archivedQuestionsContainer} rounded={false} expanded={this.state.showArchivedQuestions} onExpandChange={function(){this.setState({showArchivedQuestions: !this.state.showArchivedQuestions});}.bind(this)}>
              <CardHeader 
                title="Archived/Deleted Questions"
                actAsExpander={true}
                showExpandableButton={true}/>
              <CardText expandable={true}>
                <div>
                  {loaded && archivedQuestions.map(question => 
                    <ArchivedQuestionButton 
                      question={question}
                      onTouchQuestion={this.onTouchArchivedQuestion}
                      key={question.id}/>
                  )}
                </div>
              </CardText>
            </Card>
          </div>
        </div>
        {selectedArchivedQuestion !== null &&
          <Dialog
            open={selectedArchivedQuestion !== null}
            onRequestClose={function(){this.setState({selectedArchivedQuestion: null});}.bind(this)}
            autoScrollBodyContent={true}
            actions={[
              <div style={{padding: 0, margin: 0, display: 'flex', flexDirection: 'row', flexWrap: 'nowrap', justifyContent: 'space-around'}}>
                <FlatButton label="Cancel" onTouchTap={function(){this.setState({selectedArchivedQuestion: null});}.bind(this)} />
                <FlatButton label="Restore" onTouchTap={this.onQuestionRestore} style={styles.selectionRestoreButton}/>
              </div>
            ]}>
            <div style={styles.dialogTitle}>Question #{selectedArchivedQuestion.id}</div>
            <div style={styles.dialogText}><b>Question Text:</b> {selectedArchivedQuestion.text}</div>
            <div style={styles.dialogText}><b>Students:</b>{selectedArchivedQuestion.students.map(student => " " + student.name)}</div>
            <div style={styles.dialogText}><b>Indicator:</b> {selectedArchivedQuestion.indicator.text}</div>
            {selectedArchivedQuestion.examples.length > 0 && 
              <div style={styles.dialogText}><b>Good Examples:</b> {selectedArchivedQuestion.examples.map(example => <div key={`example-text:${example}`}>{example}</div>)}</div>
            }
            {selectedArchivedQuestion.nonExamples.length > 0 && 
              <div style={styles.dialogText}><b>Bad Examples:</b> {selectedArchivedQuestion.nonExamples.map(example => <div key={`example-text:${example}`}>{example}</div>)}</div>
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
  questionsContainer: {
    position: 'absolute',
    width: '100%',
    top: 112,
    bottom: 0,
    overflowY: 'scroll'
  },
  archivedQuestionsContainer: {
    backgroundColor: "#F4F4F4"
  },
  selectionRestoreButton: {
    color: 'green',
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