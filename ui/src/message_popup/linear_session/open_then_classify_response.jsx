/* @flow weak */
import React from 'react';

import Divider from 'material-ui/Divider';

import ForcedChoiceResponse from '../responses/forced_choice_response.jsx';
import MinimalOpenResponse from '../renderers/minimal_open_response.jsx';


// Record audio, then classify your response.
// If audio isn't available (eg., desktop Safari or mobile)
// then it falls back to text.
export default React.createClass({
  displayName: 'OpenThenClassifyResponse',

  propTypes: {
    choices: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
    onLogMessage: React.PropTypes.func.isRequired,
    onResponseSubmitted: React.PropTypes.func.isRequired,
    skipAudioRecording: React.PropTypes.bool,
    forceResponse: React.PropTypes.bool
  },

  getInitialState() {
    return {
      audioResponse: null,
      textResponse: null
    };
  },

  onDoneAudio(audioResponse) {
    this.setState({audioResponse});
  },

  onDoneText(textResponse) {
    this.setState({textResponse});
  },

  // Include the audioResponse and textResponse in the fixed-choice response
  onChoiceSelected(response) {
    const {audioResponse, textResponse} = this.state;
    this.props.onResponseSubmitted({
      ...response,
      ...audioResponse,
      ...textResponse
    });
  },

  render() {
    const {skipAudioRecording} = this.props;
    const {audioResponse} = this.state;

    return (
      <div>
        {(!audioResponse && !skipAudioRecording)
          ? this.renderOpenEndedResponse()
          : this.renderClassifyResponse()}
      </div>
    );
  },
  
  renderClassifyResponse() {
    const {choices, onLogMessage} = this.props;
    return (
      <div>
        <Divider style={{margin: 20}} />
        <div style={{paddingTop: 20, paddingLeft: 20}}>Which best describes your response?</div>  
        <ForcedChoiceResponse
          choices={choices}
          onLogMessage={onLogMessage}
          onResponseSubmitted={this.onChoiceSelected}
        />
      </div>
    );
  },

  // Audio, but fall back to text if platform doesn't support it
  renderOpenEndedResponse() {
    const {onLogMessage, forceResponse} = this.props;
    return (
      <MinimalOpenResponse
        responsePrompt=""
        recordText="Respond"
        onLogMessage={onLogMessage}
        forceResponse={forceResponse}
        onResponseSubmitted={this.onDoneAudio}
      />
    );
  }
});