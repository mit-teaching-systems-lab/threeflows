/* @flow weak */
import React from 'react';
import {AuO} from './AuO.js';

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

  componentDidMount() {
    this.injectStyles();
  },

  componentWillUnmount() {
    if (this.auo) {
      this.auo.suspend();
      this.auo = null;
    }
  },

  // Hide the UI
  injectStyles() {
    const inlineStyleNode = document.createElement('style');
    inlineStyleNode.type = 'text/css';
    const styleText = document.createTextNode(`
      .AuO * {
        display: none;
        color: red;
      }
    `);
    inlineStyleNode.appendChild(styleText);
    document.head.appendChild(inlineStyleNode);
  },
  
  componentDidUpdate(prevProps, prevState) {
    if (!prevProps.isRecording && this.props.isRecording) {
      this.startRecording();
    }
    if (prevProps.isRecording && !this.props.isRecording) {
      this.stopRecording();
    }
  },

  startRecording() {
    // We want direct access to the blob and don't want the UI.
    this.auo = new AuO(null, null, this.onSaveWhenOffline);
    this.auo.launch();
    this.auo.stateReset();
    this.auo.onRecordClicked();
  },

  stopRecording() {
    this.auo.onStopClicked();

    // hack: add an async tick here, to allow state.audioBuffer
    // to be set.
    window.setTimeout(() => {
      // force offline mode to just get the blob ourselves
      this.auo.state.online = false;
      this.auo.onSaveClicked();
    }, 100);
  },

  onSaveWhenOffline(blob) {
    this.props.onDoneCapture(blob);
  },

  render() {
    return null;
  }
});