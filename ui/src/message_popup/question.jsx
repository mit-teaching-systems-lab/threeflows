// // @flow
// import _ from 'lodash';
// import React from 'react';
// import request from 'superagent';
// import StudentCard from './student_card.jsx';
// import TextField from 'material-ui/TextField';
// import RaisedButton from 'material-ui/RaisedButton';


// /*
// Pure UI component for showing Message PopUp questions, or questions with responses.
// */
// export default React.createClass({
//   displayName: 'Question',

//   propTypes: {
//     question: React.PropTypes.object.isRequired,
//     initialResponseText: React.PropTypes.string.isRequired,
//     shouldShowStudentCard: React.PropTypes.bool.isRequired,
    
//     helpType: React.PropTypes.string,
//     disabled: React.PropTypes.bool,
//     tickerText: React.PropTypes.string,
//     onTextChanged: React.PropTypes.func,
//     onSavePressed: React.PropTypes.func
//   },

//   getDefaultProps() {
//     return {
//       helpType: 'none',
//       disabled: false
//     };
//   },

//   render() {
//     const {
//       tickerText,
//       initialResponseText,
//       shouldShowStudentCard,
//       question
//     } = this.props;
//     const {student, text} = question;

//     return (
//       <div style={styles.container}>
//         <div style={styles.question}>{text}</div>
//         {shouldShowStudentCard && student &&
//           <div style={styles.studentCard}>
//             <StudentCard student={student} />
//           </div>}
//         <div style={styles.textAreaContainer}>
//           <TextField
//             style={styles.textField}
//             textareaStyle={styles.textareaInner}
//             underlineShow={false}
//             floatingLabelText='Speak directly to the student'
//             onChange={this.props.onTextChanged}
//             multiLine={true}
//             disabled={this.props.disabled}
//             value={initialResponseText}
//             rows={2}/>
//         </div>
//         <div style={styles.buttonRow}>
//           <RaisedButton
//             onTouchTap={this.props.onSavePressed}
//             style={styles.button}
//             secondary={true}
//             label={this.props.helpType === 'feedback' ? 'Save' : 'Send'}
//             disabled={this.props.disabled}/>
//           <div style={styles.ticker}>{tickerText}</div>
//         </div>
//       </div>
//     );
//   }
// });

// const styles = {
//   container: {
//     border: '1px solid #ccc',
//     width: 400,
//     fontSize: 20,
//     padding: 0
//   },
//   studentCard: {
//     backgroundColor: '#F1C889',
//     marginTop: 5,
//     padding: 10
//   },
//   question: {
//     whiteSpace: 'pre-wrap',
//     padding: 20
//   },
//   textAreaContainer: {
//     marginTop: 10,
//     margin: 20,
//     marginBottom: 10
//   },
//   textField: {
//     width: '100%'
//   },
//   textareaInner: {
//     border: '1px solid #eee',
//     marginBottom: 0
//   },
//   buttonRow: {
//     margin: 20,
//     marginTop: 10
//   },
//   button: {
//     display: 'inline-block',
//   },
//   ticker: {
//     display: 'inline-block',
//     marginLeft: 15
//   }
// };