/* @flow weak */
import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import AudioCapture from '../../components/audio_capture.jsx';

type State = {
  haveRecorded: bool,
  downloadUrl: ?string,
  uploadState: 'idle' | 'pending' | 'done',
  blob: ?Blob,
  uploadedUrl: ?string
};

/*
This file is very similar to audio_recorder_flow.jsx. The main difference in terms 
of functionality is that this component begins recording as soon as it gets rendered. 
The main difference in terms of the code is that this component has fewer states.
*/
export default React.createClass({
  displayName: 'InstantAudioRecorder',

  propTypes: {
    url: React.PropTypes.string.isRequired,
    onDoneUploading: React.PropTypes.func.isRequired,
    onLogMessage: React.PropTypes.func.isRequired,
    instantRecord: React.PropTypes.bool,
    recordingPrompt: React.PropTypes.string,
    recordingText: React.PropTypes.string,
  },

  getDefaultProps() {
    return {
      instantRecord: false,
      recordingPrompt: "Recording...",
      recordingText: "Done",
    };
  },

  getInitialState():State {
    return {
      haveRecorded: false,
      downloadUrl: null,
      uploadState: 'idle',
      blob: null,
      uploadedUrl: null
    };
  },


  uploadBlob(blob:Blob) {
    const {url} = this.props;
    const xhr = new XMLHttpRequest();
    xhr.open('POST', url);
    xhr.onload = this.onDoneUploading;
    xhr.onerror = this.onErrorUploading;
    xhr.send(blob);
  },

  isRecording() {
    return this.whichStep(this.state) === 'recording';
  },

  // Determine which step we're at in the flow through
  // these states.
  whichStep(state:State) {
    const {
      haveRecorded,
      blob,
      uploadState,
      uploadedUrl
    } = state;

    if (!this.props.instantRecord && !haveRecorded) return 'idle';
    if (this.props.instantRecord && !haveRecorded) return 'recording';
    if (haveRecorded && !blob) return 'processing';
    if (blob && uploadState === 'pending') return 'saving';
    if (blob && uploadedUrl) return 'done';
  },

  onDoneRecordingClicked() {
    this.props.onLogMessage('message_popup_audio_done_recording_clicked');
    this.setState({
      // isRecording: false,
      haveRecorded: true
    });
  },

  onDoneCapture(blob:Blob) {
    var downloadUrl = URL.createObjectURL(blob);
    this.props.onLogMessage('message_popup_audio_on_done_capture', {'blobUrl': downloadUrl});
    this.setState({blob, downloadUrl, uploadState: 'pending'});
    this.uploadBlob(blob);
  },

  onDoneUploading(event) {
    this.props.onLogMessage('message_popup_audio_done_uploading');
    const uploadedUrl = JSON.parse(event.target.response).url;
    const {downloadUrl} = this.state;
    this.setState({
      uploadedUrl,
      uploadState: 'done',
    });
    this.props.onDoneUploading({uploadedUrl, downloadUrl});
  },

  // Log error (user flow will halt)
  onErrorUploading(event) {
    this.props.onLogMessage('message_popup_audio_error_uploading');
    console.error('AudioRecorderFlow.onErrorUploading', event); // eslint-disable-line no-console
  },

  render() {
    const step = this.whichStep(this.state);
    const isRecording = this.isRecording();
    return (
      <div style={styles.buttonContainer}>
        <AudioCapture
          isRecording={isRecording}
          onDoneCapture={this.onDoneCapture} />
        {step === 'idle' && null}
        {step === 'recording' && this.renderRecording()}
        {step === 'processing' && <div>Processing...</div>}
        {step === 'saving' && <div>Saving...</div>}
        {step === 'done' && null}
      </div>
    );
  },

  renderRecording() {
    return (
      <div>
        <div style={styles.instruction}>{this.props.recordingPrompt}</div>
        <RaisedButton key="record" onTouchTap={this.onDoneRecordingClicked} label={this.props.recordingText} secondary={true}/>
      </div>
    );
  },
});


const styles = {
  buttonContainer: {
    marginTop: 20,
    paddingLeft: 10
  },
  instruction: {
    paddingBottom: 5,
    fontSize: 14
  },
};