/* @flow weak */
import React from 'react';

import MinimalAudioResponse from '../renderers/minimal_audio_response.jsx';
import MinimalTextResponse from '../renderers/minimal_text_response.jsx';
import AudioCapture from '../../components/audio_capture.jsx';


// Record open-ended audio response.
// If audio isn't available (eg., desktop Safari or mobile)
// fall back to text.
export default React.createClass({
  displayName: 'MinimalOpenResponse',

  propTypes: {
    onLogMessage: React.PropTypes.func.isRequired,
    onResponseSubmitted: React.PropTypes.func.isRequired,
    forceResponse: React.PropTypes.bool,
    responsePrompt: React.PropTypes.string,
    recordText: React.PropTypes.string,
    ignoreText: React.PropTypes.string
  },

  onDoneAudio(audioResponse) {
    this.props.onResponseSubmitted({audioResponse});
  },

  onDoneText(textResponse) {
    this.props.onResponseSubmitted({textResponse});
  },

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
});