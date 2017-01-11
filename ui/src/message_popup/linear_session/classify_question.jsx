/* @flow weak */
import React from 'react';

import PlainTextQuestion from '../renderers/plain_text_question.jsx';
import ChoiceForBehaviorResponse from '../renderers/choice_for_behavior_response.jsx';


// Classify your response by clicking a choice
export default React.createClass({
  displayName: 'ClassifyQuestion',

  propTypes: {
    question: React.PropTypes.object.isRequired,
    choices: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
    onLogMessage: React.PropTypes.func.isRequired,
    onResponseSubmitted: React.PropTypes.func.isRequired
  },

  render() {
    const {question, choices, onLogMessage, onResponseSubmitted} = this.props;

    return (
      <div>
        <PlainTextQuestion question={question} />
        <ChoiceForBehaviorResponse
          choices={choices}
          onLogMessage={onLogMessage}
          onResponseSubmitted={onResponseSubmitted}
        />
      </div>
    );
  }
});