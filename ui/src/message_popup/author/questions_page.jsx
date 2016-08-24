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

import {withStudents, withIndicator} from '../transformations.jsx';

export default React.createClass({
  displayName: 'QuestionsPage',

  propTypes: {
    loaded: React.PropTypes.bool.isRequired,
    allQuestions: React.PropTypes.object.isRequired,
    doNavigate: React.PropTypes.func
  },

  getDefaultProps(){
    return ({
      doNavigate: Routes.navigate,
      loaded: false,
      allQuestions: {
        currentQuestions: [],
        archivedQuestions: []
      }
    });
  },

  getInitialState(){
    return ({
      loaded: this.props.loaded,
      allQuestions: this.props.allQuestions,
      searchText: '',
      showArchivedQuestions: false,
      selectedArchivedQuestion: null
    });
  },

  componentDidMount(){
    this.queryDatabase();
  },

  queryDatabase(){
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
    const {allQuestions, searchText} = this.state;
    if(searchText === '') return allQuestions;
    const currentQuestions = this.getSearchResults(searchText, allQuestions.currentQuestions);
    const archivedQuestions = this.getSearchResults(searchText, allQuestions.archivedQuestions);
    return {currentQuestions, archivedQuestions};
  },

  onNewQuestion(){
    const url = Routes.messagePopupAuthorQuestionsNewPath();
    this.props.doNavigate(url);
  },

  onQuestionsReceived(err, response){
    if(err){
      this.setState({loaded: true});
      return;
    }
    const allQuestions = JSON.parse(response.text).questions;
    this.setState({ loaded: true, allQuestions });
  },

  onQuestionRestore(){
    const {allQuestions, selectedArchivedQuestion} = this.state;
    if(selectedArchivedQuestion !== null){
      const archivedQuestions = allQuestions.archivedQuestions.filter(question => question.id !== selectedArchivedQuestion.id);
      const currentQuestions = allQuestions.currentQuestions.concat(selectedArchivedQuestion);
      Api.saveQuestions({currentQuestions, archivedQuestions});
      this.queryDatabase();
      this.setState({selectedArchivedQuestion: null});
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
    const {loaded, selectedArchivedQuestion} = this.state;
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
              {loaded && currentQuestions.map(question => 
                 <QuestionButton
                   key={question.id}
                   question={question}
                   doNavigate={this.props.doNavigate} />
              )}
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
                      key={question.id}
                      question={question}
                      onTouchQuestion={this.onTouchArchivedQuestion} />
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