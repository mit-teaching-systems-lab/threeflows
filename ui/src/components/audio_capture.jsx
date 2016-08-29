/* @flow weak */
import React from 'react';
import AudioRecorder from './audio_recorder.js';


/*
This is a React API to capture audio using an audio recorder class.
*/
export default React.createClass({
  displayName: 'AudioCapture',

  propTypes: {
    isRecording: React.PropTypes.bool.isRequired,
    onDoneCapture: React.PropTypes.func.isRequired
  },

  statics: {
    isAudioSupported() {
      const navigator = window.navigator;
      const getUserMedia = navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia ||
        navigator.msGetUserMedia;
      return getUserMedia !== undefined;
    }
  },

  componentDidUpdate(prevProps, prevState) {
    if (!prevProps.isRecording && this.props.isRecording) {
      this.startRecording();
    }
    if (prevProps.isRecording && !this.props.isRecording) {
      this.stopRecording();
    }
  },

  recorder:(null: ?Object),
  
  startRecording() {
    const recorder = this.recorder = new AudioRecorder();
    recorder.record();
  },

  stopRecording() {
    const recorder = this.recorder;
    if (!recorder) return;

    recorder.stop(this.onBlobReady);
  },

  onBlobReady(blob) {
    this.props.onDoneCapture(blob);
    delete this.recorder;
  },

  render() {
    return null;
  }
});