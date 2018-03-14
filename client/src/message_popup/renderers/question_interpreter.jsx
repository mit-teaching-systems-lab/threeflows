/* @flow weak */
import PropTypes from 'prop-types';

import React from 'react';

import MixedQuestion from '../renderers/mixed_question.jsx';
import ForcedChoiceResponse from '../responses/forced_choice_response.jsx';
import OkResponse from '../responses/ok_response.jsx';
import MinimalOpenResponse from '../renderers/minimal_open_response.jsx';
import MinimalTextResponse from '../renderers/minimal_text_response.jsx';
import AudioCapture from '../../components/audio_capture.jsx';
import TimedAutoAdvanceResponse from '../responses/timed_auto_advance_response.jsx';
import ApplesTextResponse from '../renderers/apples_text_response.jsx';
import ResponseWithPastNotes from '../responses/response_with_past_notes.jsx';

// This renders a question and an interaction, and strives towards being a
// general-purpose interpreter that over time ends up converging towards shared
// data structures/components across different scenarios.
export default class extends React.Component {
  props: {
    question: Object,
    onLog: Function,
    onResponseSubmitted: Function,
    forceText?: boolean,
  };

  static displayName = 'QuestionInterpreter';

  static propTypes = {
    question: PropTypes.object.isRequired,
    onLog: PropTypes.func.isRequired,
    onResponseSubmitted: PropTypes.func.isRequired,
    forceText: PropTypes.bool
  };

  static defaultProps = {
    forceText: false
  };

  render() {
    const {question, onLog, onResponseSubmitted} = this.props;
    return (
      <div>
        <MixedQuestion question={question} />
        {this.renderInteractionEl(question, onLog, onResponseSubmitted)}
      </div>
    );
  }

  renderInteractionEl = (question, onLogMessage, onResponseSubmitted) => {
    const key = JSON.stringify(question);
    const {forceText} = this.props;


    // Open response with audio by default, falling back to text if unavailable, and
    // allowing text responses to be forced.
    if (question.open) {
      if (forceText) {
        return <MinimalTextResponse
          key={key}
          forceResponse={question.force || false}
          responsePrompt=""
          recordText="Respond"
          ignoreText="Move on"
          onLogMessage={onLogMessage}
          onResponseSubmitted={onResponseSubmitted}
        />;
      } else {
        const buttonText = AudioCapture.isAudioSupported()
          ? "Click then speak"
          : "Respond";
        return <MinimalOpenResponse
          key={key}
          forceResponse={question.force || false}
          responsePrompt=""
          recordText={buttonText}
          ignoreText="Move on"
          onLogMessage={onLogMessage}
          onResponseSubmitted={onResponseSubmitted}
        />;
      }
    }

    // Double-log for reading back safely during group reviews
    if (question.applesSceneNumber !== undefined) {
      return <ApplesTextResponse
        key={key}
        applesSceneNumber={question.applesSceneNumber}
        forceResponse={question.force || false}
        responsePrompt=""
        recordText="Respond"
        textHeight={96}
        ignoreText="Ignore"
        onLogMessage={onLogMessage}
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

    if (question.notes) {
      return <MinimalTextResponse
        key={key}
        textHeight={192}
        forceResponse={true}
        responsePrompt="Notes:"
        recordText="Next"
        onLogMessage={onLogMessage}
        onResponseSubmitted={onResponseSubmitted}
      />;
    }

    if (question.feedback && question.pastNotes) {
      return (
        <ResponseWithPastNotes key={key} pastNotes={question.pastNotes}>
          <MinimalTextResponse
            textHeight={192}
            forceResponse={true}
            responsePrompt="Feedback to Mr. Smith:"
            recordText="Next"
            onLogMessage={onLogMessage}
            onResponseSubmitted={onResponseSubmitted}
          />
        </ResponseWithPastNotes>
      );
    }


    if (question.timedAutoAdvance) {
      return <TimedAutoAdvanceResponse
        key={key}
        recordText="Next"
        onLogMessage={onLogMessage}
        onResponseSubmitted={onResponseSubmitted}
      />;
    }


    if (question.choices && question.choices.length > 0) {
      return <ForcedChoiceResponse
        key={key}
        choices={question.choices}
        onLogMessage={onLogMessage}
        onResponseSubmitted={onResponseSubmitted}
      />;
    }

    return <OkResponse
      key={key}
      onLogMessage={onLogMessage}
      onResponseSubmitted={onResponseSubmitted}
    />;
  };
}