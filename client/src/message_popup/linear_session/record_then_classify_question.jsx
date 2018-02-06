/* @flow weak */
import PropTypes from 'prop-types';

import React from 'react';

import PlainTextQuestion from '../renderers/plain_text_question.jsx';
import OpenThenClassifyResponse from './open_then_classify_response.jsx';


// Render plain question with OpenThenClassifyResponse.
export default class extends React.Component {
  props: {
    question: Object,
    onLogMessage: Function,
    onResponseSubmitted: Function,
    skipAudioRecording?: boolean,
    forceResponse?: boolean,
  };

  static displayName = 'RecordThenClassifyQuestion';

  static propTypes = {
    question: PropTypes.object.isRequired,
    onLogMessage: PropTypes.func.isRequired,
    onResponseSubmitted: PropTypes.func.isRequired,
    skipAudioRecording: PropTypes.bool,
    forceResponse: PropTypes.bool
  };

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
}