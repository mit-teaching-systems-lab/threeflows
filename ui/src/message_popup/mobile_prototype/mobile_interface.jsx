/* @flow weak */
//normal imports
import React from 'react';
import _ from 'lodash';

//other file imports
import SetIntervalMixin from '../../helpers/set_interval_mixin.js';
import TextBody from './text_body_component.jsx';
import TextFooter from './text_footer_component.jsx';
import type {RevisingTextResponseT} from '../popup_question.jsx';

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
  
  propTypes: {
    scaffolding: React.PropTypes.shape({
      helpType: React.PropTypes.string.isRequired,
      shouldShowSummary: React.PropTypes.bool.isRequired,
    }).isRequired,
    question: React.PropTypes.object.isRequired,
    onQuestionDone: React.PropTypes.func.isRequired,
    limitMs: React.PropTypes.number.isRequired,
    onLog: React.PropTypes.func.isRequired,
    isLastQuestion: React.PropTypes.bool.isRequired,
  },

  getInitialState() {
    const goodExamples = _.map(this.props.question.examples, (example) => { return {type: 'Good', text: example}; });
    const badExamples = _.map(this.props.question.nonExamples, (example) => { return {type: 'Bad', text: example}; });
    const allExamples = _.shuffle(_.clone(goodExamples).concat(badExamples)); 
    return ({
      animatedMessages: [],
      messages: this.getInitialMessages(this.props.question),
      allExamples,
      initialResponse: undefined,
      revisedResponse: undefined,
      elapsedMs: 0,
      exampleIndex: 0,
      dialog: null,
      messageId: 1,
    });
  },

  componentDidMount() {
    this.setInterval(this.updateTimer, ONE_SECOND);
  },

  getInitialMessages(questionObject){
    if(_.has(questionObject, 'messages')) return this.props.question.messages.map(message => { 
      return ({
        type: message.type,
        text: message.text,
        student: _.find(this.props.question.students, {id: message.studentId}),
        key: `question-${message.text}`
      }); 
    });
    return [
      {
        type: 'info',
        text: questionObject.text,
        key: `question-${questionObject.text}`
      }
    ];
  },

  updateTimer() {
    if(!this.isReadyToMoveOn()){
      if(this.state.elapsedMs === 90000){
        this.addMessages([{type: 'info', text: 'Remember, these are supposed to be quick responses.'}]);
      }
      this.setState({ elapsedMs: this.state.elapsedMs + ONE_SECOND });
    }
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

  addMessages(messageList){
    var messageId = this.state.messageId;
    var newMessages = messageList.map(message => {
      messageId ++;
      return {key: messageId, ... message};
    });
    this.setState({messages: [...this.state.messages, ...newMessages], messageId});
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

  sendRevision(response){
    var messages = [{type: 'user', text: response}];
    if(this.props.question.examples.length > 0) messages.push({type: 'info', text: "Here's an example of something you could say/do:\n\n" + _.shuffle(this.props.question.examples)[0] + "\n\nWould you like to revise your response?"});
    this.addMessages(messages);
    if(this.props.question.examples.length === 0) this.setPassedResponse();
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
    const {helpType} = scaffolding;
    const {finalResponseText} = params;
    const response:RevisingTextResponseT = {
      question,
      helpType,
      elapsedMs,
      initialResponseText: initialResponse,
      didShowStudentCard: true,
      finalResponseText
    };
    this.props.onLog(type, response);
  },
  
  onNextQuestion(){
    this.props.onQuestionDone(this.state.elapsedMs);
    this.setState(this.getInitialState());
  },
  
  onShowExampleClicked(){
    const example = this.nextExample(true);
    const messageText = example.type + ' Example:\n' + example.text;
    this.addMessages([{type: 'info', text: messageText}]);
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

  onAnimationDone(){
    var messages = _.clone(this.state.messages);
    if(messages.length > 0){
      const message = messages.shift();
      this.setState({animatedMessages: this.state.animatedMessages.concat(message), messages});
    }
  },
  
  render(){
    const {scaffolding, question} = this.props;
    const {helpType} = scaffolding;
    return (
      <div>
        <div style={styles.textBody}>
          <TextBody 
            question={this.props.question}
            animatedMessages={this.state.animatedMessages}
            messages={this.state.messages}
            onOpenStudentDialog={this.onOpenStudentDialog}
            onOpenInfoDialog={this.onOpenInfoDialog}
            onAnimationDone={this.onAnimationDone}
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
    const {question} = this.props;
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