/* @flow weak */
import React from 'react';
import AudioCapture from './audio_capture.jsx';

/*
This is a minimal UI for asking a user to:

 - record audio
 - listen to what they recorded and review with a prompt
 - allow them to re-record or submit

*/
export default React.createClass({
  displayName: 'AudioRecorder',

  propTypes: {
    url: React.PropTypes.string.isRequired,
    reviewEl: React.PropTypes.element.isRequired
  },

  getInitialState() {
    return {
      isRecording: false,
      haveRecorded: false,
      downloadUrl: null,
      uploadState: 'idle',
      blob: null,
      uploadedUrl: null
    };
  },

  onRecordClicked() {
    this.setState({
      ...this.getInitialState(),
      isRecording: true
    });
  },

  onStopClicked() {
    this.setState({
      isRecording: false,
      haveRecorded: true
    });
  },

  onDoneRecording(blob) {
    var downloadUrl = URL.createObjectURL(blob);
    this.setState({ blob, downloadUrl });
  },

  onSubmit() {
    this.setState({ uploadState: 'pending' });
    this.uploadBlob(this.state.blob);
  },

  uploadBlob(blob) {
    const {url} = this.props;;
    const xhr = new XMLHttpRequest();
    xhr.open('POST', url);
    xhr.onload = this.onDoneUploading;
    xhr.send(blob);
  },

  onDoneUploading(event) {
    const {url} = JSON.parse(event.target.response);
    this.setState({
      uploadState: 'done',
      uploadedUrl: url
    });
  },

  // Determine which step we're at in the flow through
  // these states.
  whichStep(state) {
    const {
      isRecording,
      haveRecorded,
      blob,
      uploadState,
      uploadedUrl
    } = state;

    if (!isRecording && !haveRecorded) return 'idle';
    if (isRecording) return 'recording';
    if (haveRecorded && !blob) return 'capturing';
    if (haveRecorded && blob && uploadState === 'idle') return 'reviewing';
    if (blob && uploadState === 'pending') return 'submitting';
    if (blob && uploadedUrl) return 'done';
  },

  render() {
    const step = this.whichStep(this.state);
    const {
      isRecording,
      downloadUrl,
      uploadedUrl
    } = this.state;
    
    return (
      <div style={{border: '1px solid #eee', padding: 20}}>
        <AudioCapture
          isRecording={isRecording}
          onDoneRecording={this.onDoneRecording} />
        {step === 'idle' && <button onClick={this.onRecordClicked}>Record</button>}
        {step === 'recording' && 
          <div>
            <div>Recording...</div>
            <button onClick={this.onStopClicked}>Stop</button>
          </div>
        }
        {step === 'capturing' && <div>Processing...</div>}
        {step === 'reviewing' && this.renderReview(downloadUrl)}
        {step === 'submitting' && <div>Saving...</div>}
        {step === 'done' && this.renderDone(uploadedUrl)}
      </div>
    );
  },

  renderReview(downloadUrl) {
    return (
      <div>
        <div>Review your answer!</div>
        <audio controls={true} src={downloadUrl} />
        {this.props.reviewEl}
        <button onClick={this.onSubmit}>Submit</button>
      </div>
    );
  },

  renderDone(uploadedUrl) {
    return (
      <div>
        <div>
          <a href={uploadedUrl} target="_blank">{uploadedUrl}</a>
        </div>
        <button>Done!</button>
      </div>
    );
  }
});