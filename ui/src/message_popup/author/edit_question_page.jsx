import React from 'react';
import _ from 'lodash';

import {allQuestions} from '../questions.js';
import {withStudents, withLearningObjectiveAndIndicator} from '../transformations.jsx';

export default React.createClass({
	displayName: 'EditQuestionPage',

	propTypes: {
		questionId: React.PropTypes.string.isRequired
	},

	getInitialState() {
		const {questionId} = this.props;
		const question = withLearningObjectiveAndIndicator(_.find(withStudents(allQuestions), question => question.id.toString()===questionId));

		return ({
			questionText: question.text
		});
	},

	render(){
		return (
			<div>
				{this.props.questionId}
				{this.state.questionText}
			</div>
			);
	}
});