/* @flow weak */
import React from 'react';

import RaisedButton from 'material-ui/RaisedButton';
import * as Colors from 'material-ui/styles/colors';

import * as Routes from '../../routes.js';
import AudioRecorderFlow from '../../components/audio_recorder_flow.jsx';


/*
Component that handles recording a minimal audio response, with no review.  It also
handles saving the wav file to the server, and then ultimately
passing back a URL to the audio as part of the response.
*/
export default React.createClass({
  displayName: 'MinimalAudioResponse',

  propTypes: {
    onLogMessage: React.PropTypes.func.isRequired,
    onResponseSubmitted: React.PropTypes.func.isRequired,
    responsePrompt: React.PropTypes.node
  },

  getDefaultProps() {
    return {
      responsePrompt: 'Respond.'
    };
  },
  
  onDone(audioUrl) {
    this.props.onLogMessage('message_popup_audio_response', {audioUrl});
    this.props.onResponseSubmitted({audioUrl});
  },

  render() {
    return (
      <div style={styles.container}>
        <AudioRecorderFlow
          url={Routes.messagePopupUploadWavPath()}
          start={this.renderStart}
          reviewing={this.renderReviewing}
          recording={this.renderRecording}
          onDone={this.onDone}
          onLogMessage={this.props.onLogMessage}
        />
      </div>
    );
  },


  renderStart({onRecord}) {
    return (
      <div>
        <div style={styles.instruction}>{this.props.responsePrompt}</div>
        <RaisedButton key="record" onTouchTap={onRecord} label="Record" secondary={true} />
      </div>
    );
  },

  renderRecording({onDone}) {
    return (
      <div>
        <div style={{...styles.instruction, color: Colors.accent1Color}}>Recording...</div>
        <RaisedButton key="done" onTouchTap={onDone} label="Done" primary={true} />
      </div>
    );
  },

  // TODO(kr) hack
  renderReviewing({blob, downloadUrl, onSubmit, onRetry}) {
    this.setTimeout(onSubmit, 0);
    return null;
  },

  // TODO(kr) hack
  renderDone({uploadedUrl}) {
    this.setTimeout(this.onDone.bind(this, uploadedUrl), 0);
  }
});

const styles = {
  container: {
    padding: 20,
    fontSize: 14
  },
  instruction: {
    paddingBottom: 5
  },
  ticker: {
    display: 'inline-block',
    marginLeft: 15,
    fontSize: 20
  }
};