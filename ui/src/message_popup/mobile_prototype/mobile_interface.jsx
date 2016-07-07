//normal imports
import React from 'react';
import _ from 'lodash';

//other file imports
import SetIntervalMixin from '../../helpers/set_interval_mixin.js';
import {TextBody, TextFooter} from './texting_interface.jsx';

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
    var allExamples = [];
    var messages = [];
    if(this.props.question !== undefined){
      const goodExamples = _.map(this.props.question.examples, (example) => { return {type: 'Good', text: example}; });
      const badExamples = _.map(this.props.question.nonExamples, (example) => { return {type: 'Bad', text: example}; });
      allExamples = _.shuffle(_.clone(goodExamples).concat(badExamples)); 
      messages = this.getInitialMessages(this.props.question, this.props.scaffolding.shouldShowStudentCard);
    }
    return ({
      messages,
      allExamples,
      initialResponse: undefined,
      revisedResponse: undefined,
      elapsedMs: 0,
      exampleIndex: 0,
      dialog: 'none'
    });
  },
  
  propTypes: {
    scaffolding: React.PropTypes.shape({
      helpType: React.PropTypes.string.isRequired,
      shouldShowStudentCard: React.PropTypes.bool.isRequired,
      shouldShowSummary: React.PropTypes.bool.isRequired,
    }).isRequired,
    question: React.PropTypes.object,
    onQuestionDone: React.PropTypes.func.isRequired,
    limitMs: React.PropTypes.number.isRequired,
    onLog: React.PropTypes.func.isRequired,
    isLastQuestion: React.PropTypes.bool.isRequired,
  },
  
  addMessages(messageList){
    var messages = _.clone(this.state.messages);
    for(var messageIndex = 0; messageIndex < messageList.length; messageIndex++){
      this.messageId+=1;
      const message = _.extend({key: this.messageId}, messageList[messageIndex]);
      messages.push(message);
    }
    this.setState({messages});
  },
  
  addResponse(response){
    this.addMessages([{type: 'user', text: response}]);
  },

  setInitialResponse(response){
    this.setState({initialResponse: response});
    if(this.props.scaffolding.helpType === 'feedback'){
      this.sendRevision(response);
    }else{
      this.addResponse(response);
    }
  },

  setRevisedResponse(response){
    this.addResponse(response);
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
    if(this.props.question.examples.length > 0){
      this.addMessages([
        {type: 'user', text: response},
        {type: 'info', text: "Here's an example of something you could say/do:\n\n" + _.shuffle(this.props.question.examples)[0] + "\n\nWould you like to revise your response?"}, 
      ]);
    }else{
      this.addMessages([
        {type: 'user', text: response},
        {type: 'info', text: "There aren't any examples for this situation yet but your response will be recorded for feedback."}, 
      ]);
      this.setPassedResponse();
    }
  },
  
  showExample(){
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

  setDialog(value){
    this.setState({dialog: value});
  },

  onCloseDialog(){
    this.setDialog('none');
  },

  onOpenInfoDialog(){
    this.setDialog('info');
  },

  onOpenStudentDialog(){
    this.setDialog('student');
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
      initialResponse,
      finalResponseText
    };
    this.props.onLog(type, response);
  },

  getInitialMessages(questionObject, shouldShowStudentCard){
    var messages = [];
    if(_.has(questionObject, 'encodedText')){
      var arrayOfMessages = questionObject.encodedText.split('[:');
      for (var index in arrayOfMessages){
        var rawMessageText = arrayOfMessages[index];
        if(rawMessageText !== ''){
          const messageCode = rawMessageText.substring(0, 2);
          const messageText = rawMessageText.substring(2, rawMessageText.length);
          var messageType = undefined;
          messageCode === 'i]' ? messageType = 'info' : messageCode === 's]' ? messageType = 'student' : messageType = 'user';
          const message = {
            type: messageType,
            text: messageText,
            key: messageText
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
  
  componentWillMount(){
    this.messageId = 1;
  },
  
  render(){
    const {scaffolding, question} = this.props;
    const {helpType, shouldShowStudentCard} = scaffolding;
    const student = question === undefined ? undefined : question.student;
    return (
      <div>
        <div>
          <div>
            <div style={styles.textBody}>
              <TextBody 
                messages={this.state.messages}
                onOpenStudentDialog={this.onOpenStudentDialog}
                onOpenInfoDialog={this.onOpenInfoDialog}
                />
            </div>
          </div>
        </div>
        <div>
          <div> 
            <div style={styles.textFooter}>
              <TextFooter 
                onQuestionDone={this.onNextQuestion}
                setInitialResponse={this.setInitialResponse}
                setRevisedResponse={this.setRevisedResponse}
                setPassedResponse={this.setPassedResponse}
                log={{logResponse: this.logResponse, logRevision: this.logRevision, logRevisionDeclined: this.logRevisionDeclined}}
                isReadyToMoveOn={this.isReadyToMoveOn}
                helpType={helpType}
                elapsedMs={this.state.elapsedMs}
                showExample={this.showExample}
                nextExample={this.nextExample}
                nextButtonLabel={this.props.isLastQuestion ? 'Finish' : 'Next Question'}
                />
            </div>
            <div>
              {question !== undefined && student !== undefined &&
                <div>
                  <Dialog 
                    title="Involved Students"
                    actions={<FlatButton label="Close" onTouchTap={this.onCloseDialog}/>}
                    open={this.state.dialog === 'info'}
                    onRequestClose={this.onCloseDialog}>
                    <Chip
                      onTouchTap={this.onOpenStudentDialog}
                      backgroundColor='#F1C889'
                      style={{margin: 4}}>
                      <Avatar color={fullBlack} backgroundColor='#F1C889' icon={<FaceIcon />} />
                      {student.name}
                    </Chip>
                  </Dialog>
                  <Dialog 
                    title={student.name}
                    actions={<FlatButton label="Close" onTouchTap={this.onCloseDialog}/>}
                    open={this.state.dialog === 'student'}
                    onRequestClose={this.onCloseDialog}>
                    <div style={styles.studentAttribute}>{`${student.grade} ${student.gender}, ${student.race}`}</div>
                    {shouldShowStudentCard && student.behavior && <div style={styles.studentAttribute}>{student.behavior}</div>}
                    {shouldShowStudentCard && student.ell && <div style={styles.studentAttribute}>{student.ell}</div>}
                    {shouldShowStudentCard && student.learningDisabilities && <div style={styles.studentAttribute}>{student.learningDisabilities}</div>}
                    {shouldShowStudentCard && student.academicPerformance && <div style={styles.studentAttribute}>{student.academicPerformance}</div>}
                    {shouldShowStudentCard && student.interests && <div style={styles.studentAttribute}>{student.interests}</div>}
                    {shouldShowStudentCard && student.familyBackground && <div style={styles.studentAttribute}>{student.familyBackground}</div>}
                    {shouldShowStudentCard && student.ses && <div style={styles.studentAttribute}>{student.ses}</div>}
                  </Dialog>
                </div>
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
});


const styles = {
  appBar: {
    position: 'absolute',
    top: 0
  },
  instructionsBody: {
    position: 'absolute',
    top: 64,
    bottom: 0,
    overflowY: 'scroll'
  },
  progressBar: {
    width: '100%',
    position:'absolute',
    top: 64,
    
  },
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
  doneBody:{
    position: 'absolute',
    top: 64,
    bottom: 0,
    width: '100%',
    padding: 20,
    fontSize: 20
  },
  doneBodyText:{
    paddingBottom: 10
  },
  doneBodyButton: {
    marginTop: 20
  },
  studentAttribute: {
    fontSize: 14,
    marginTop: 2
  },
};