/* @flow weak */
import React from 'react';
import {AuO} from './AuO.js';

export default React.createClass({
  displayName: 'Audio',

  getInitialState() {
    return {
      isRecording: false,
      downloadUrl: null
    };
  },

  componentDidMount() {
    this.injectStyles();
  },

  componentWillUnmount() {
    this.auo.suspend();
    this.auo = null;
  },

  // Keep the UI just hide it as simplest step
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

  onRecordClicked() {
    this.setState({
      isRecording: true,
      downloadUrl: null
    });

    // We want direct access to the blob and don't want the UI.
    this.auo = new AuO(null, null, this.onSaveWhenOffline);
    this.auo.launch();
    this.auo.stateReset();
    this.auo.onRecordClicked();
    console.log(this.auo);
  },

  onStopClicked() {
    console.log(this.auo);
    this.setState({ isRecording: false });
    console.log(this.auo);
    this.auo.onStopClicked();

    console.log('state', this.auo.state);
    // hack: an async tick here, to let state.audioBuffer
    // be set
    window.setTimeout(() => {
      console.log('state', this.auo.state);
      // force offline to just get the blob ourselves.
      this.auo.state.online = false;
      this.auo.onSaveClicked();
    }, 100);
  },

  onSaveWhenOffline(blob) {
    this.onBlob(blob);
  },

  // onStopClicked() {
  //   this.rec.stop();
  //   console.log('stop', this.rec);
  //   this.setState({ isRecording: false });
  //   // this.createDownloadLink();
  //   this.rec.exportWAV(this.onBlob, 'audio/wav');
  // },

  onBlob(blob) {
    console.log('blob', blob);
    var downloadUrl = URL.createObjectURL(blob);
    debugger
    console.log('downloadUrl', downloadUrl);
    this.setState({downloadUrl});
    // Recorder.forceDownload(blob, downloadUrl);
  },

  // onRecordClicked() {
  //   this.setState({ isRecording: true });
  //   this.getUserMedia({audio: true, video: false}, (stream) => {
  //     // const object = window.URL.createObjectURL(stream);
  //     // this.videoEl.src = object;
  //     // this.videoEl.play();
  //     this.onUserMedia(stream);
  //   }, (err) => { console.log('error', error); });
  // },

  // onUserMedia(stream) {
  //   const AudioContext = window.AudioContext || window.webkitAudioContext;
  //   this.audioContext = new AudioContext();
  //   this.audioStream = this.audioContext.createMediaStreamSource(stream);
  //   this.rec = new Recorder(this.audioStream, {
  //     type: 'audio/wav'
  //   });
  //   // this.audioEl.src = window.URL.createObjectURL(stream);
  // },

  // // See https://github.com/webrtc/adapter
  // getUserMedia(params, success, error) {
  //   const getUserMediaFn = navigator.getUserMedia ||
  //     navigator.webkitGetUserMedia ||
  //     navigator.mozGetUserMedia ||
  //     navigator.msGetUserMedia;
  //   if (!getUserMediaFn) return error('Not supported');

  //   return getUserMediaFn.apply(navigator, arguments);
  // },

  // onStopClicked() {
  //   this.setState({ isRecording: false });
  // },

  // onRecordClicked() {
  //   this.setState({ isRecording: true });
  //   console.log('this.videoEl', this.videoEl);  
  //   this.getUserMedia({audio: true, video: true}, (stream) => {
  //     console.log('stream', stream);
  //     const object = window.URL.createObjectURL(stream);
  //     console.log('object', object);
  //     this.videoEl.src = object;
  //     this.videoEl.play();
  //   }, (err) => { console.log('error', error); });
  // },

  render() {
    const {downloadUrl} = this.state;

    return (
      <div>
        <div>audio</div>
        {this.state.isRecording
          ? <div onClick={this.onStopClicked}>STOP</div>
          : <div onClick={this.onRecordClicked}>record!</div>
        }
        {downloadUrl && 
          <div>
            <div>download!</div>
            <audio controls={true} src={downloadUrl} />
            <a href={downloadUrl} target="_blank">sound.wav</a>
          </div>
        }
        {false && <div>
          {this.state.isRecording
            ? <div onClick={this.onStopClicked}>STOP</div>
            : <div onClick={this.onRecordClicked}>record!</div>
          }
          <video style={{width: 400, height: 300}} ref={(el) => {
            if (el) this.videoEl = el;
          }} />
          <audio controls={true} style={{width: 400, height: 300}} ref={(el) => {
            if (el) this.audioEl = el;
          }} />
        </div>}
      </div>
    );
  }
});