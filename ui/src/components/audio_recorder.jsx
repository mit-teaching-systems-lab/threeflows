/* @flow weak */
import React from 'react';
import AudioCapture from './audio_capture.jsx';

/*
This is a minimal UI for recording audio and getting back a blob.
*/
export default React.createClass({
  displayName: 'AudioRecorder',

  getInitialState() {
    return {
      isRecording: false,
      downloadUrl: null
    };
  },

  onRecordClicked() {
    this.setState({
      isRecording: true,
      downloadUrl: null
    });
  },

  onStopClicked() {
    this.setState({ isRecording: false });
  },

  onDoneRecording(blob) {
    var downloadUrl = URL.createObjectURL(blob);
    this.setState({downloadUrl});
  },

  render() {
    const {isRecording, downloadUrl} = this.state;

    return (
      <div style={{border: '1px solid red'}}>
        <AudioCapture
          isRecording={this.state.isRecording}
          onDoneRecording={this.onDoneRecording} />
        {isRecording
          ? <div onClick={this.onStopClicked}>STOP</div>
          : <div onClick={this.onRecordClicked}>Record!</div>
        }
        {downloadUrl && 
          <div>
            <audio controls={true} src={downloadUrl} />
            <a href={downloadUrl} target="_blank">download.wav</a>
          </div>
        }
      </div>
    );
  }
});