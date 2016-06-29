// // @flow
// import _ from 'lodash';
// import React from 'react';
// import VelocityTransitionGroup from "velocity-react/velocity-transition-group";
// import 'velocity-animate/velocity.ui';
// import request from 'superagent';
// import StudentCard from './student_card.jsx';
// import TextField from 'material-ui/TextField';
// import RaisedButton from 'material-ui/RaisedButton';
// import Question from './question.jsx';
// import AppBar from 'material-ui/AppBar';
// import SelectField from 'material-ui/SelectField';
// import MenuItem from 'material-ui/MenuItem';
// import {List, ListItem} from 'material-ui/List';
// import HelpIcon from 'material-ui/svg-icons/action/help-outline';
// import CheckIcon from 'material-ui/svg-icons/action/check-circle';
// import Paper from 'material-ui/Paper';
// import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
// import * as colors from 'material-ui/styles/colors';


// /*
// Pure UI for scoring a question
// */
// export default React.createClass({
//   displayName: 'ScoringSection',

//   propTypes: {
//     logId: React.PropTypes.number.isRequired,
//     initialResponseText: React.PropTypes.string.isRequired,
//     elapsedMs: React.PropTypes.number.isRequired,
//     onDoneScoring: React.PropTypes.func.isRequired,
//     question: React.PropTypes.object.isRequired,
//     learningObjective: React.PropTypes.object.isRequired
//   },

//   contextTypes: {
//     muiTheme: React.PropTypes.object.isRequired
//   },

//   getInitialState() {
//     return {
//       scoreComment: ''
//     };
//   },

//   onCommentChanged(e, scoreComment) {
//     this.setState({scoreComment});
//   },

//   onScoreClicked(scoreValue) {
//     const {scoreComment} = this.state;
//     const {learningObjective, logId, question} = this.props;

//     this.props.onDoneScoring({
//       scoreValue,
//       scoreComment,
//       learningObjective,
//       logId,
//       question
//     });
//   },

//   render() {
//     const {question, learningObjective, initialResponseText, elapsedMs} = this.props;

//     return (
//       <div style={styles.scoringContainer}>
//         <div style={styles.titleText}>Score this response</div>
//         <Card key="competency">
//           <CardHeader title="Learning Objective" />
//           <CardText style={styles.competencyText}>{learningObjective.text}</CardText>
//         </Card>
//         {this.renderExamplesCard({
//           titleText: 'Examples',
//           examples: question.examples,
//           style: {
//             card: {
//               backgroundColor: colors.green100
//             }
//           }
//         })}
//         {this.renderExamplesCard({
//           titleText: 'Non-examples',
//           examples: question.nonExamples,
//           style: {
//             card: {
//               backgroundColor: colors.amber100
//             }
//           }
//         })}
//         <Card key="scoring">
//           <CardHeader title="Score this response" />
//           <CardText>
//             <div style={styles.responseText}>{initialResponseText}</div>
//             <div style={styles.elapsedTimeText}>{Math.round((elapsedMs) / 1000)} seconds to respond</div>
//             <div>
//               <TextField
//                 fullWidth={true}
//                 underlineShow={true}
//                 hintText="Share candid feedback to help them improve"
//                 errorText="Be candid"
//                 errorStyle={{color: this.context.muiTheme.palette.primary1Color}}
//                 onChange={this.onCommentChanged}
//                 value={this.state.scoreComment}
//                 multiLine={true} />
//             </div>
//             <div style={styles.scoringList}>
//               <RaisedButton
//                 onTouchTap={this.onScoreClicked.bind(this, 1)}
//                 disabled={this.state.scoreComment === ''}
//                 secondary={true}
//                 label="Competency demonstrated" />
//               <RaisedButton
//                 onTouchTap={this.onScoreClicked.bind(this, 0)}
//                 style={styles.notYetButton}
//                 disabled={this.state.scoreComment === ''}
//                 label="Not yet" />
//             </div>
//           </CardText>
//         </Card>
//       </div>
//     );
//   },

//   renderExamplesCard(props = {}) {
//     const {examples, titleText} = props;
//     const listStyle = _.merge({}, styles.examplesList, props.style);

//     return (
//       <Card key={titleText} style={props.style.card}>
//         <CardHeader
//           title={titleText}
//           actAsExpander={true}
//           initiallyExpanded={true}
//           showExpandableButton={true}
//         />
//           <CardText expandable={true}>
//             <ul style={listStyle}>{examples.map((text) => {
//               return <li key={text} style={{paddingBottom: 20}}>{text}</li>;
//             })}</ul>
//           </CardText>
//       </Card>
//     );
//   }
// });

// const styles = {
//   titleText: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     paddingBottom: 10,
//     paddingLeft: 5
//   },
//   competencyText: {
//     paddingTop: 10,
//     paddingBottom: 10
//   },
//   scoringContainer: {
//     paddingTop: 40,
//     width: 400
//   },
//   textField: {
//   },
//   examplesList: {
//     padding: 0,
//     paddingLeft: 20,
//     listStyle: 'none',
//     margin: 0
//   },
//   nonExamplesText: {
//     color: colors.amber700
//   },
//   responseText: {
//     paddingBottom: 10,
//     paddingLeft: 20
//   },
//   elapsedTimeText: {
//     color: colors.grey500,
//     paddingLeft: 20,
//     paddingBottom: 20
//   },
//   scoringList: {
//     paddingTop: 20
//   },
//   notYetButton: {
//     marginLeft: 10
//   }
// };