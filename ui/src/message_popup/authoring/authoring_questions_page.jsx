import React from 'react';
import _ from 'lodash';

import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';

import SearchIcon from 'material-ui/svg-icons/action/search';
import SchoolIcon from 'material-ui/svg-icons/social/school';

import NavigationAppBar from '../../components/navigation_app_bar.jsx';
import QuestionButton from './question_button.jsx';

import {allQuestions} from '../questions.js';
import {withLearningObjectiveAndIndicator} from '../transformations.jsx';
import {allStudents} from '../../data/virtual_school.js';

export default React.createClass({
	displayName: 'AuthoringQuestionsPage',
	render(){
		return(
			<div>
				<NavigationAppBar
					title="MP Questions"
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
					<div style={styles.questionsContainer}>
						{allQuestions.map(question => {
					 	return (
					 		<QuestionButton question={question} key={question.id} />
					 		);
						})}
					</div>
				</div>
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
		top: 112,
		bottom: 0,
		overflowY: 'scroll'
	}
}