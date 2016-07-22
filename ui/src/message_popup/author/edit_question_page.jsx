import React from 'react';
import _ from 'lodash';

import {allQuestions} from '../questions.js';
import {withStudents, withLearningObjectiveAndIndicator} from '../transformations.jsx';
import * as Routes from '../../routes.js';

import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';

import ArrowBackIcon from 'material-ui/svg-icons/navigation/arrow-back';

export default React.createClass({
	displayName: 'EditQuestionPage',

	propTypes: {
		questionId: React.PropTypes.string.isRequired
	},

	getInitialState() {
		const {questionId} = this.props;
		const question = withLearningObjectiveAndIndicator(_.find(withStudents(allQuestions), question => question.id.toString()===questionId));

		return ({
			originalQuestion: question,
			questionText: question.text,
		});
	},

	returnToQuestions(){
		Routes.navigate(Routes.messagePopupAuthorQuestionsPath());
	},

	onQuestionTextChange(event, value){
		this.setState({questionText: value});
	},

	render(){
		return (
			<div>
				<AppBar 
					title={`Editing Question #${this.props.questionId}`}
					iconElementLeft={<IconButton onTouchTap={this.returnToQuestions}><ArrowBackIcon /></IconButton>}
					/>
				<Paper style={styles.container}>
					<div style={styles.originalQuestion}>
						<div style={styles.originalQuestionTitle}>Original Question Text</div>
						<div style={styles.originalQuestionText}>{this.state.originalQuestion.text}</div>
						<TextField 
							id='new-text'
							value={this.state.questionText}
							fullWidth={true}
							multiLine={true}
							onChange={this.onQuestionTextChange}
							floatingLabelText='Type out the question text here.'/>
					</div>
				</Paper>
			</div>
			);
	}
});

const styles = {
	container: {
		margin: 10,
		padding: 10,
	},
	originalQuestion: {
		padding: 5,
		fontSize: 14
	},
	originalQuestionTitle: {
		fontSize: 14,
		fontWeight: 'bold'
	},
	originalQuestionText: {
		padding: 10,
		paddingTop: 5
	}
}