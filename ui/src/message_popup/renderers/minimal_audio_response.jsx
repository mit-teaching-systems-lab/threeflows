/* @flow weak */
import React from 'react';

import RaisedButton from 'material-ui/RaisedButton';
import * as Colors from 'material-ui/styles/colors';

import * as Routes from '../../routes.js';
import AudioRecorderFlow from '../../components/audio_recorder_flow.jsx';


/*
Component that handles recording a minimal audio response or responding by doing nothing.
Users can't review their responses.
This component also handles saving the wav file to the server, and then ultimately
passing back a URL to the audio as part of the response.
*/
export default React.createClass({
  displayName: 'MinimalAudioResponse',

  propTypes: {
    onLogMessage: React.PropTypes.func.isRequired,
    onResponseSubmitted: React.PropTypes.func.isRequired,
    recordText: React.PropTypes.string,
    ignoreText: React.PropTypes.string
  },

  getDefaultProps() {
    return {
      recordText: 'Record',
      ignoreText: 'Say nothing'
    };
  },

  onDone(audioUrl) {
    this.props.onLogMessage('message_popup_audio_response', {audioUrl});
    this.props.onResponseSubmitted({audioUrl});
  },

  onIgnoreTapped() {
    this.props.onLogMessage('message_popup_audio_ignore');
    this.props.onResponseSubmitted({ignore: true});
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
        <RaisedButton key="record" onTouchTap={onRecord} label={this.props.recordText} secondary={true} />
        <RaisedButton key="ignore" onTouchTap={this.onIgnoreTapped} label={this.props.ignoreText} />
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
    window.setTimeout(onSubmit, 0);
    return null;
  },

  // TODO(kr) hack
  renderDone({uploadedUrl}) {
    window.setTimeout(this.onDone.bind(this, uploadedUrl), 0);
    return null;
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