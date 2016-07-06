import React from 'react';
import ReactDom from 'react-dom';
import _ from 'lodash';

//Material-UI imports
import AppBar from 'material-ui/AppBar';
import Paper from 'material-ui/Paper';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

//Icons
import FaceIcon from 'material-ui/svg-icons/action/face';
import InfoOutlineIcon from 'material-ui/svg-icons/action/info-outline';


export default React.createClass({
  displayName: 'MobilePrototypeCard',
  
  propTypes: {
    question: React.PropTypes.object.isRequired
  },
  
  getInitialState(){
    return ({
      question: this.props.question,
      currentStudent: undefined,
      responses: [],
      currentResponse: ''
    });
  },
  
  openStudentDialog(){
    this.setState({currentStudent: this.state.question.student});
  },
  
  
  closeStudentDialog(){
    this.setState({currentStudent: undefined});
  },
  
  sendMessage(){
    this.setState({responses: _.clone(this.state.responses).concat(this.state.currentResponse)});
  },
  
  next(){
    
  },
  
  onTextChange(event, value){
    this.setState({currentResponse: value});
  },
  
  render(){
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
    } = this.state.question.student;
      
    const studentDialogActions = [
      <FlatButton
        label="Close"
        primary={true}
        onTouchTap={this.closeStudentDialog}
      />
      
    ];
    
    return (
      <div>
        <div>
          <AppBar 
            title='Message PopUp Practice'/>
        </div>
        <div style={styles.questionContainer}>
          {<Message text={this.state.question.text} question={this.state.question} type='student' openStudentDialog={this.openStudentDialog} />}
          {_.map(this.state.responses, (response) => {
            return (
              <Message text={response} question={this.state.question} type='user' />
            );
          })}
        </div>
        <div style={styles.responseContainer}>
          <Divider />
          <div style={styles.responseTextBox}>
            <TextField
              id="responseTextField"
              multiLine={true}
              hintText="Type something you would say"
              textareaStyle={styles.responseTextAreaInner}
              rows={2}
              underlineShow={false}
              rowsMax={2}
              disabled={this.state.responses.length > 10}
              value={this.state.currentResponse}
              onChange={this.onTextChange}
              style={{width: '100%', paddingLeft: 20, paddingRight: 20}}
            />
          </div>
          <div style={styles.responseButtonRow}>
            <RaisedButton 
              label={this.state.responses.length > 10 ? 'Next' : 'Send'}
              secondary={true}
              onTouchTap={this.state.responses.length > 10 ? this.next : this.sendMessage}
            />
          </div>
        </div>
        
        <Dialog
          title="Student Information"
          actions={studentDialogActions}
          modal={false}
          open={this.state.currentStudent !== undefined}
          style={{backgroundColor: 'rgba(0, 0, 0, 0.1)'}}
          onRequestClose={this.closeStudentDialog}
        >
          <div style={styles.studentName}>{name}</div>
          <div style={styles.studentAttribute}>{`${grade} ${gender}, ${race}`}</div>
          {behavior && <div style={styles.studentAttribute}>{behavior}</div>}
          {ell && <div style={styles.studentAttribute}>{ell}</div>}
          {learningDisabilities && <div style={styles.studentAttribute}>{learningDisabilities}</div>}
          {academicPerformance && <div style={styles.studentAttribute}>{academicPerformance}</div>}
          {interests && <div style={styles.studentAttribute}>{interests}</div>}
          {familyBackground && <div style={styles.studentAttribute}>{familyBackground}</div>}
          {ses && <div style={styles.studentAttribute}>{ses}</div>}
        </Dialog>
        
      </div>
    );
  },
});

const Message = React.createClass({
  propTypes: {
    text: React.PropTypes.string.isRequired,
    question: React.PropTypes.object.isRequired,
    type: React.PropTypes.string.isRequired,
    openStudentDialog: React.PropTypes.func
  },
  
  componentDidUpdate(){ 
    ReactDom.findDOMNode(this).scrollIntoView(); 
  },
  
  render(){
    const questionStyle = this.props.type==='user' ? _.merge({justifyContent: 'flex-end'}, styles.question) : _.merge({justifyContent: 'flex-start'}, styles.question);
    
    const questionTextStyle = this.props.type==='user' ? _.merge({backgroundColor: '#e6f9ff'}, styles.questionText) : styles.questionText;
    
    return (
      <div>
        <div style={questionStyle}>
          { this.props.type === 'student' && <IconButton touch={true} onTouchTap={this.props.openStudentDialog} style={styles.questionIconButton} iconStyle={styles.questionIcon} ><FaceIcon /></IconButton> }
          { this.props.type === 'info' && <InfoOutlineIcon  style={styles.questionIcon}/> }
          <Paper style={questionTextStyle}>{this.props.text}</Paper>
          { this.props.type === 'user' && <FaceIcon  style={styles.questionIcon}/> }
        </div>
      </div>
    );
  }
});


const styles = {
  questionContainer: {
    overflowY: 'scroll',
    position: 'absolute',
    top: 64,
    bottom: 144,
    width: '100%'
  },
  question: {
    display: 'flex',
    padding: 5
  },
  questionIconButton:{
    margin: 0,
    padding: 0
  },
  questionIcon: {
    width: 30,
    height: 30,
    flexGrow: 0,
    flexShrink: 0,
    flexBasis: 30,
    padding: 0,
    margin: 5
  },
  questionText: {
    padding: 10,
    margin: 5,
    whiteSpace: 'pre-wrap',
    wordWrap: 'break-word',
    wordBreak: 'break-word',
    flexGrow: 0,
    flexShrink: 1
  },
  studentName: {
    fontWeight: 'bold',
    marginBottom: 10
  },
  studentAttribute: {
    fontSize: 12,
    marginTop: 2
  },
  responseContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#ffffff',
    paddingBottom: 15
  },
  responseTextBox: {
    display: 'flex',
    justifyContent: 'space-around'
  },
  responseTextAreaInner: {
    border: '1px solid #eee',
    marginBottom: 0
  },
  responseButtonRow:{
    marginTop: 20,
    marginLeft: 20,
  }
};