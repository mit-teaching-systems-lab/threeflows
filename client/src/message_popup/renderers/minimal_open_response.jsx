/* @flow weak */
import PropTypes from 'prop-types';

import React from 'react';

import MinimalAudioResponse from '../renderers/minimal_audio_response.jsx';
import MinimalTextResponse from '../renderers/minimal_text_response.jsx';
import AudioCapture from '../../components/audio_capture.jsx';


// Record open-ended audio response.
// If audio isn't available (eg., desktop Safari or mobile)
// fall back to text.
export default class extends React.Component {
  props: {
    onLogMessage: Function,
    onResponseSubmitted: Function,
    forceResponse?: boolean,
    responsePrompt?: string,
    recordText?: string,
    ignoreText?: string,
  };

  static displayName = 'MinimalOpenResponse';

  static propTypes = {
    onLogMessage: PropTypes.func.isRequired,
    onResponseSubmitted: PropTypes.func.isRequired,
    forceResponse: PropTypes.bool,
    responsePrompt: PropTypes.string,
    recordText: PropTypes.string,
    ignoreText: PropTypes.string
  };

  onDoneAudio = (audioResponse) => {
    this.props.onResponseSubmitted({audioResponse});
  };

  onDoneText = (textResponse) => {
    this.props.onResponseSubmitted({textResponse});
  };

  // Audio, but fall back to text if platform doesn't support it
  render() {
    const {onLogMessage, forceResponse, responsePrompt, recordText, ignoreText} = this.props;

    if (AudioCapture.isAudioSupported()) {
      return (
        <MinimalAudioResponse
          forceResponse={forceResponse}
          responsePrompt={responsePrompt}
          recordText={recordText}
          ignoreText={ignoreText}
          onLogMessage={onLogMessage}
          onResponseSubmitted={this.onDoneAudio}
        />
      );
    } else {
      return (
        <MinimalTextResponse
          forceResponse={forceResponse}
          responsePrompt={responsePrompt}
          recordText={recordText}
          ignoreText={ignoreText}
          onLogMessage={onLogMessage}
          onResponseSubmitted={this.onDoneText}
        />
      );
    }
  }
}