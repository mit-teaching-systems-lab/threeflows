/* @flow weak */
import React from 'react';

import PlainTextQuestion from '../renderers/plain_text_question.jsx';
import OpenThenClassifyResponse from './open_then_classify_response.jsx';


// Render plain question with OpenThenClassifyResponse.
export default React.createClass({
  displayName: 'RecordThenClassifyQuestion',

  propTypes: {
    question: React.PropTypes.object.isRequired,
    onLogMessage: React.PropTypes.func.isRequired,
    onResponseSubmitted: React.PropTypes.func.isRequired,
    skipAudioRecording: React.PropTypes.bool,
    forceResponse: React.PropTypes.bool
  },

  render() {
    const {
      question,
      onLogMessage,
      onResponseSubmitted,
      skipAudioRecording,
      forceResponse
    } = this.props;

    return (
      <div>
        <PlainTextQuestion question={question} />
        <OpenThenClassifyResponse
          choices={question.choices}
          onLogMessage={onLogMessage}
          onResponseSubmitted={onResponseSubmitted}
          skipAudioRecording={skipAudioRecording}
          forceResponse={forceResponse}
        />
      </div>
    );
  }
});