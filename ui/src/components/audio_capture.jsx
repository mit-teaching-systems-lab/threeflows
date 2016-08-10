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
    this.auo = new AuO(null, null, this.onSaveWhenOffline);
  },

  componentDidUpdate(prevProps, prevState) {
    if (!prevProps.isRecording && this.props.isRecording) {
      this.startRecording();
    }
    if (prevProps.isRecording && !this.props.isRecording) {
      this.stopRecording();
    }
  },

  componentWillUnmount() {
    if (this.auo) {
      this.auo.close();
      this.auo = null;
    }
  },

  auo: null,

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
  
  startRecording() {
    // We want direct access to the blob and don't want the UI.
    const auo = this.auo;
    if (!auo) return;
    
    auo.launch();
    auo.reset();
    auo.record();
  },

  stopRecording() {
    const auo = this.auo;
    if (!auo) return;

    // hack: add an async tick here, to allow state.audioBuffer
    // to be set after stopping.
    auo.stop();
    window.setTimeout(() => {
      // force offline mode to just get the blob ourselves
      auo.setOnline(false);
      auo.save();
    }, 100);
  },

  onSaveWhenOffline(blob) {
    this.props.onDoneCapture(blob);
  },

  render() {
    return null;
  }
});