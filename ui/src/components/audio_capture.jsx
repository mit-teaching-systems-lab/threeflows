/* @flow weak */
import React from 'react';
import {AuO} from './AuO.js';


/*
This wraps Au0 and uses it to grab audio on Chrome and Firefox for a
one-time use recording.
We want direct access to the blob and don't want the UI, but since the UI
is rendering the audio stream, the microphone stays active.
*/
class WilliamRecorder {
  auo: ?Object;
  inlineStyleNode: ?HTMLStyleElement;
  onBlobReady: ?Function;

  _error(...params) {
    console.error(params); // eslint-disable-line no-console
  }

  // Hide the UI
  _injectStyles() {
    const inlineStyleNode = this.inlineStyleNode = document.createElement('style');
    inlineStyleNode.type = 'text/css';
    const styleText = document.createTextNode(`
      .AuO * {
        display: none;
        color: red;
      }
    `);
    inlineStyleNode.appendChild(styleText);
    document.head.appendChild(inlineStyleNode);
  }

  record() {
    this._injectStyles();
    const auo = new AuO(null, null, this._onSaveWhenOffline.bind(this));
    auo.launch();
    auo.record();
    this.auo = auo;
  }

  stop(onBlobReady) {
    const auo = this.auo;
    if (!auo) return this._error('Unexpected state: auo', auo);
    if (this.onBlobReady) return this._error('Unexpected state: this.onBlobReady', this.onBlobReady);

    this.onBlobReady = onBlobReady;
    auo.stop(this._onAudioProcessed.bind(this));
  }

  // Force offline mode to just get the blob ourselves
  _onAudioProcessed() {
    const auo = this.auo;
    if (!auo) return this._error('Unexpected state: auo', auo);

    auo.setOnline(false);
    auo.save();
  }
  
  _onSaveWhenOffline(blob) {
    if (!this.onBlobReady) return this._error('Unexpected state: this.onBlobReady', this.onBlobReady);
    this.onBlobReady(blob);
    this.destroy();
  }

  destroy() {
    if (this.auo) {
      this.auo.close();
      delete this.auo;
    }
    if (this.inlineStyleNode) {
      document.head.removeChild(this.inlineStyleNode);
      delete this.inlineStyleNode;
    }
  }
}


/*
This is a React API to capture audio using a fork of the AuO widget.

It's a hack and hides all the UI features of AuO, while taking
advantage of its audio capture and encoding features.

Future work could swap in another implementation here, or extract the
necessary code from AuO.
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
    const recorder = this.recorder = new WilliamRecorder();
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