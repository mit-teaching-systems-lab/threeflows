/* @flow weak */
import PropTypes from 'prop-types';

import React from 'react';
import AudioRecorder from './audio_recorder.js';


/*
This is a React API to capture audio using an audio recorder class.
*/
export default class extends React.Component {
  props: {
    isRecording: boolean,
    onDoneCapture: Function,
    onCaptureFailed: Function
  };

  static displayName = 'AudioCapture';

  static propTypes = {
    isRecording: PropTypes.bool.isRequired,
    onDoneCapture: PropTypes.func.isRequired,
    onCaptureFailed: PropTypes.func.isRequired
  };

  static isAudioSupported() {
    const navigator = window.navigator;
    const getUserMedia = navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia ||
      navigator.msGetUserMedia;
    return getUserMedia !== undefined;
  }

  componentDidUpdate(prevProps, prevState) {
    if (!prevProps.isRecording && this.props.isRecording) {
      this.startRecording();
    }
    if (prevProps.isRecording && !this.props.isRecording) {
      this.stopRecording();
    }
  }

  recorder: ?Object = null;

  teardownRecorder() {
    if (this.recorder) this.recorder.destroy();
    delete this.recorder;
  }

  startRecording() {
    const recorder = this.recorder = new AudioRecorder();
    recorder.record();
  };

  stopRecording() {
    const recorder = this.recorder;
    if (!recorder) return;

    recorder.stop(this.onBlobReady, this.onCaptureFailed);
  };

  onCaptureFailed(error) {
    this.props.onCaptureFailed({error});
    this.teardown();
  }

  onBlobReady(blob) {
    this.props.onDoneCapture(blob);
    this.teardown();
  };

  render() {
    return null;
  }
}