/* @flow weak */
import React from 'react';

import RaisedButton from 'material-ui/RaisedButton';
import * as Colors from 'material-ui/styles/colors';

import * as Routes from '../../routes.js';
import AudioRecorderFlow from '../../components/audio_recorder_flow.jsx';


/*
Component that handles recording an audio response.  It also
handles saving the wav file to the server, and then ultimately
passing back a URL to the audio as part of the response.
*/
export default React.createClass({
  displayName: 'AudioResponse',

  propTypes: {
    question: React.PropTypes.object.isRequired,
    scaffolding: React.PropTypes.object.isRequired,
    limitMs: React.PropTypes.number.isRequired,
    elapsedMs: React.PropTypes.number.isRequired,
    onLogMessage: React.PropTypes.func.isRequired,
    onResponseSubmitted: React.PropTypes.func.isRequired
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
        />
      </div>
    );
  },

  renderStart({onRecord}) {
    const seconds = Math.round(this.props.elapsedMs / 1000);
    return (
      <div>
        <div style={styles.instruction}>Speak directly to the student.</div>
        <RaisedButton key="record" onTouchTap={onRecord} label="Record" secondary={true} />
        {seconds > 0 && <div style= {styles.ticker}>{seconds}s</div>}
      </div>
    );
  },

  renderRecording({onDone}) {
    const seconds = Math.round(this.props.elapsedMs / 1000);
    return (
      <div>
        <div style={{...styles.instruction, color: Colors.accent1Color}}>Recording...</div>
        <RaisedButton key="done" onTouchTap={onDone} label="Done" primary={true} />
        {seconds > 0 && <div style= {styles.ticker}>{seconds}s</div>}
      </div>
    );
  },

  renderReviewing({blob, downloadUrl, onSubmit, onRetry}) {
    const seconds = Math.round(this.props.elapsedMs / 1000);
    return (
      <div>
        <div style={styles.instruction}>Review your answer!</div>
        <audio controls={true} src={downloadUrl} />
        <RaisedButton onTouchTap={onRetry} label="Record again" />
        <RaisedButton onTouchTap={onSubmit} label="Submit" primary={true} />
        {seconds > 0 && <div style= {styles.ticker}>{seconds}s</div>}
      </div>
    );
  },

  renderDone({uploadedUrl}) {
    const seconds = Math.round(this.props.elapsedMs / 1000);
    return (
      <div>
        <RaisedButton label="Done" onTouchTap={this.onDone.bind(this, uploadedUrl)} primary={true} />
        {seconds > 0 && <div style= {styles.ticker}>{seconds}s</div>}
      </div>
    );
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