/* @flow weak */
import React from 'react';

import MixedQuestion from '../renderers/mixed_question.jsx';
import ChoiceForBehaviorResponse from '../renderers/choice_for_behavior_response.jsx';
import MinimalOpenResponse from '../renderers/minimal_open_response.jsx';
import MinimalTextResponse from '../renderers/minimal_text_response.jsx';
import LongTextResponse from '../renderers/long_text_response.jsx';
import AudioCapture from '../../components/audio_capture.jsx';
import MinimalTimedView from '../renderers/minimal_timed_view.jsx';


// This renders a question and an interaction.
export default React.createClass({
  displayName: 'QuestionInterpreter',
  
  propTypes: {
    question: React.PropTypes.object.isRequired,
    onLog: React.PropTypes.func.isRequired,
    onResponseSubmitted: React.PropTypes.func.isRequired
  },

  render() {
    const {question, onLog, onResponseSubmitted} = this.props;
    return (
      <div>
        <MixedQuestion question={question} />
        {this.renderInteractionEl(question, onLog, onResponseSubmitted)}
      </div>
    );
  },

  renderInteractionEl(question, onLogMessage, onResponseSubmitted) {
    const key = JSON.stringify(question);

    if (question.open) {
      const buttonText = AudioCapture.isAudioSupported()
        ? "Click then speak"
        : "Respond";
      return <MinimalOpenResponse
        key={key}
        responsePrompt=""
        recordText={buttonText}
        onLogMessage={onLogMessage}
        forceResponse={question.force || false}
        onResponseSubmitted={onResponseSubmitted}
      />;
    }

    if (question.write) {
      return <MinimalTextResponse
        key={key}
        forceResponse={true}
        responsePrompt="Notes:"
        recordText="Next"
        onLogMessage={onLogMessage}
        onResponseSubmitted={onResponseSubmitted}
      />;
    }


    if (question.writeLong) {
      return <LongTextResponse
        key={key}
        forceResponse={true}
        responsePrompt="Notes:"
        recordText="Next"
        onLogMessage={onLogMessage}
        onResponseSubmitted={onResponseSubmitted}
      />;
    }


    if (question.timed) {
      return <MinimalTimedView
        key={key}
        recordText="Next"
        onLogMessage={onLogMessage}
        onResponseSubmitted={onResponseSubmitted}
      />;
    }


    if (question.choices && question.choices.length > 0) {
      return <ChoiceForBehaviorResponse
        key={key}
        choices={question.choices}
        onLogMessage={onLogMessage}
        onResponseSubmitted={onResponseSubmitted}
      />;
    }

    return <ChoiceForBehaviorResponse
      key={key}
      choices={['OK']}
      onLogMessage={onLogMessage}
      onResponseSubmitted={onResponseSubmitted}
    />;
  }
});