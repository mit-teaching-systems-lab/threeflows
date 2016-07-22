import React from 'react';

import {withLearningObjectiveAndIndicator} from '../transformations.jsx';

import {ListItem} from 'material-ui/List';

import SchoolIcon from 'material-ui/svg-icons/social/school';

export default React.createClass({
	displayName: 'QuestionButton',

	propTypes: {
		question: React.PropTypes.object.isRequired
	}, 

	render(){
		const question = withLearningObjectiveAndIndicator(this.props.question);
		return (
			<ListItem
				style={{cursor: 'pointer', fontSize: 14}} 
				leftIcon={<SchoolIcon />}
				primaryText={"#" + question.id + " " + question.learningObjective.competencyGroup}
				secondaryText={question.text}
				secondaryTextLines={2}
			/>
			);
	}
});