/* @flow weak */
//normal imports
import React from 'react';
import _ from 'lodash';

//other file imports
import SetIntervalMixin from '../../helpers/set_interval_mixin.js';
import TextBody from './text_body_component.jsx';
import TextFooter from './text_footer_component.jsx';
import type {Response} from '../popup_question.jsx';

//material-ui imports
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import Chip from 'material-ui/Chip';
import Avatar from 'material-ui/Avatar';
import {fullBlack} from 'material-ui/styles/colors';

//material-ui icon imports
import FaceIcon from 'material-ui/svg-icons/action/face';

//
const ONE_SECOND = 1000;

export default React.createClass({
  displayName: 'MobileInterface',

  mixins: [SetIntervalMixin],
  
  getInitialState() {
    const goodExamples = _.map(this.props.question.examples, (example) => { return {type: 'Good', text: example}; });
    const badExamples = _.map(this.props.question.nonExamples, (example) => { return {type: 'Bad', text: example}; });
    const allExamples = _.shuffle(_.clone(goodExamples).concat(badExamples)); 
    const messages = this.getInitialMessages(this.props.question);
    return ({
      messages,
      allExamples,
      initialResponse: undefined,
      revisedResponse: undefined,
      elapsedMs: 0,
      exampleIndex: 0,
      dialog: null,
      messageIndex: 1
    });
  },
  
  propTypes: {
    scaffolding: React.PropTypes.shape({
      helpType: React.PropTypes.string.isRequired,
      shouldShowStudentCard: React.PropTypes.bool.isRequired,
      shouldShowSummary: React.PropTypes.bool.isRequired,
    }).isRequired,
    question: React.PropTypes.object.isRequired,
    onQuestionDone: React.PropTypes.func.isRequired,
    limitMs: React.PropTypes.number.isRequired,
    onLog: React.PropTypes.func.isRequired,
    isLastQuestion: React.PropTypes.bool.isRequired,
  },
  
  addMessages(messageList){
    var messages = _.clone(this.state.messages);
    var messageId = this.state.messageIndex;
    for(var messageIndex = 0; messageIndex < messageList.length; messageIndex++){
      messageId+=1;
      const message = _.extend({key: messageId}, messageList[messageIndex]);
      messages.push(message);
    }
    this.setState({messages, messageIndex: messageId});
  },

  setInitialResponse(response){
    this.setState({initialResponse: response});
    if(this.props.scaffolding.helpType === 'feedback'){
      this.sendRevision(response);
    }else{
      this.addMessages([{type: 'user', text: response}]);
    }
  },

  setRevisedResponse(response){
    this.addMessages([{type: 'user', text: response}]);
    this.setState({revisedResponse: response});
  },

  setPassedResponse(){
    this.setState({revisedResponse: ''});
  },
  
  isReadyToMoveOn(){
    if(this.props.scaffolding.helpType === 'feedback'){
      if(this.state.revisedResponse !== undefined){ 
        return true;
      }
    }else{
      if(this.state.initialResponse !== undefined){
        return true;
      }
    }
    return false;
  },
  
  onNextQuestion(){
    this.props.onQuestionDone(this.state.elapsedMs);
    this.setState(this.getInitialState());
  },
  
  sendRevision(response){
    var messages = [{type: 'user', text: response}];
    if(this.props.question.examples.length > 0) messages.push({type: 'info', text: "Here's an example of something you could say/do:\n\n" + _.shuffle(this.props.question.examples)[0] + "\n\nWould you like to revise your response?"});
    this.addMessages(messages);
    if(this.props.question.examples.length === 0) this.setPassedResponse()
    
  },
  
  onShowExampleClicked(){
    const example = this.nextExample(true);
    const messageText = example.type + ' Example:\n' + example.text;
    this.addMessages([{type: 'info', text: messageText}]);
  },
  
  nextExample(increment){
    const currentIndex = this.state.exampleIndex;
    if(this.state.allExamples.length > currentIndex){
      if(increment){
        this.setState({exampleIndex: this.state.exampleIndex + 1});
      }
      return this.state.allExamples[currentIndex];
    }else{
      return null;
    }
  },

  onCloseDialog(){
    this.setState({dialog: null});
  },

  onOpenInfoDialog(){
    this.setState({dialog: {type: 'info'}});
  },

  onOpenStudentDialog(student){
    return (function() {
      this.setState({dialog: {type: 'student', student}});
    }.bind(this));
  },

  logResponse() {
    this.logData('message_popup_response');
  },
  
  logRevision(finalText) {
    this.logData('message_popup_revision', {finalResponseText: finalText});
  },
  
  logRevisionDeclined(){
    this.logData('message_popup_revision_declined');
  },
  
  logData(type, params = {}) {
    const {elapsedMs, initialResponse} = this.state;
    const {question, scaffolding} = this.props;
    const {shouldShowStudentCard, helpType} = scaffolding;
    const {finalResponseText} = params;
    const response:Response = {
      question,
      shouldShowStudentCard,
      helpType,
      elapsedMs,
      initialResponseText: initialResponse,
      finalResponseText
    };
    this.props.onLog(type, response);
  },

  getInitialMessages(questionObject){
    var messages = [];
    if(_.has(questionObject, 'encodedText')){
      var arrayOfMessages = questionObject.encodedText.split('[:');
      for (var index in arrayOfMessages){
        var rawMessageText = arrayOfMessages[index];
        if(rawMessageText !== ''){
          const messageCode = rawMessageText.substring(0, 2);
          var messageText = rawMessageText.substring(2, rawMessageText.length);
          var messageType = undefined;
          var student = undefined;
          messageCode === 'i]' ? messageType = 'info' : messageCode === 'u]' ? messageType = 'user' : messageType = 'student';
          if(messageType === 'student'){
            const splitStudentMessage = rawMessageText.split('s]');
            const studentId = Number(splitStudentMessage[0]);
            messageText = splitStudentMessage[1];
            student = _.find(this.props.question.students, student => student.id===studentId);
          }
          const message = {
            type: messageType,
            text: messageText,
            key: messageText,
            student
          };
          messages.push(message);
        }
      }
    }else{
      const message = {
        type: 'info',
        text: questionObject.text,
        key: questionObject.text
      };
      messages.push(message);
    }
    
    return messages;
  },
  
  componentDidMount() {
    this.setInterval(this.updateTimer, ONE_SECOND);
  },

  updateTimer() {
    if(!this.isReadyToMoveOn()){
      if(this.state.elapsedMs === 90000){
        this.addMessages([{type: 'info', text: 'Remember, these are supposed to be quick responses.'}]);
      }
      this.setState({ elapsedMs: this.state.elapsedMs + ONE_SECOND });
    }
  },
  
  render(){
    const {scaffolding, question} = this.props;
    const {helpType, shouldShowStudentCard} = scaffolding;
    return (
      <div>
        <div style={styles.textBody}>
          <TextBody 
            question={this.props.question}
            messages={this.state.messages}
            onOpenStudentDialog={this.onOpenStudentDialog}
            onOpenInfoDialog={this.onOpenInfoDialog}
            />
        </div>
        <div style={styles.textFooter}>
          <TextFooter 
            onQuestionDone={this.onNextQuestion}
            setInitialResponse={this.setInitialResponse}
            setRevisedResponse={this.setRevisedResponse}
            setPassedResponse={this.setPassedResponse}
            log={{logResponse: this.logResponse, logRevision: this.logRevision, logRevisionDeclined: this.logRevisionDeclined}}
            isReadyToMoveOn={this.isReadyToMoveOn()}
            helpType={helpType}
            elapsedMs={this.state.elapsedMs}
            onShowExampleClicked={this.onShowExampleClicked}
            nextExample={this.nextExample}
            nextButtonLabel={this.props.isLastQuestion ? 'Finish' : 'Next Question'}
            mainStudent={question.students[0]}
            />
        </div>
        <div>
          {question.students.length > 0 && this.renderDialogs()}
        </div>
      </div>
    );
  },

  renderDialogs(){
    const {scaffolding, question} = this.props;
    const {shouldShowStudentCard} = scaffolding;
    const {dialog} = this.state;
    const selectedStudent = dialog !== null ? (dialog.type === 'student' ? dialog.student : undefined) : undefined;
    return (
      <div>
        <Dialog 
          title="Involved Students"
          actions={<FlatButton label="Close" onTouchTap={this.onCloseDialog}/>}
          open={dialog !== null && dialog.type === 'info'}
          onRequestClose={this.onCloseDialog}>
          <div style={{display: 'flex', flexDirection: 'row'}}>
            {question.students.map(student => (
              <Chip
                key={"Student:" + student.id}
                onTouchTap={this.onOpenStudentDialog(student)}
                backgroundColor='#F1C889'
                style={{margin: 4}}>
                <Avatar color={fullBlack} backgroundColor='#F1C889' icon={<FaceIcon />} />
                {student.name}
              </Chip>
            ))}
          </div>
        </Dialog>
        {selectedStudent !== undefined &&
          <Dialog 
            title={selectedStudent.name}
            actions={<FlatButton label="Close" onTouchTap={this.onCloseDialog}/>}
            open={dialog !== null && dialog.type === 'student'}
            onRequestClose={this.onCloseDialog}>
            <div style={styles.studentAttribute}>{`${selectedStudent.grade} ${selectedStudent.gender}, ${selectedStudent.race}`}</div>
            {shouldShowStudentCard && selectedStudent.behavior && <div style={styles.studentAttribute}>{selectedStudent.behavior}</div>}
            {shouldShowStudentCard && selectedStudent.ell && <div style={styles.studentAttribute}>{selectedStudent.ell}</div>}
            {shouldShowStudentCard && selectedStudent.learningDisabilities && <div style={styles.studentAttribute}>{selectedStudent.learningDisabilities}</div>}
            {shouldShowStudentCard && selectedStudent.academicPerformance && <div style={styles.studentAttribute}>{selectedStudent.academicPerformance}</div>}
            {shouldShowStudentCard && selectedStudent.interests && <div style={styles.studentAttribute}>{selectedStudent.interests}</div>}
            {shouldShowStudentCard && selectedStudent.familyBackground && <div style={styles.studentAttribute}>{selectedStudent.familyBackground}</div>}
            {shouldShowStudentCard && selectedStudent.ses && <div style={styles.studentAttribute}>{selectedStudent.ses}</div>}
          </Dialog>
        }
      </div>
      );
  }
});


const styles = {
  textBody: {
    position: 'absolute',
    top: 69,
    bottom: 144,
    width: '100%',
    overflowY: 'scroll'
  },
  textFooter:{
    position: 'absolute',
    bottom: 0,
    paddingBottom: 15,
    width: '100%',
    backgroundColor: '#ffffff'
  },    
  studentAttribute: {
    fontSize: 14,
    marginTop: 2
  },
};