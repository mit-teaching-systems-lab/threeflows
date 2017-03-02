import encodeWAV from './encode_wav.js';


// Audio recorder class for one-time use recording.  Only works on Chrome and Firefox.
// The public API is record/stop, with other internal states hidden from the caller.
// Adapted from https://github.com/danrouse/react-audio-recorder
const STATES = {
  CREATING: 'creating',
  READY: 'ready',
  ACQUIRING: 'acquiring',
  RECORDING: 'recording',
  ENCODING: 'encoding',
  STOPPING: 'stopping',
  RESETTING: 'resetting',
  ERROR: 'error'
};
export default class AudioRecorder {
  state: string;
  buffers: ?[[number]];
  bufferLength: number;
  bufferSize: number;
  audioContext: ?AudioContext;
  sampleRate: number;
  processor: ?Object;
  recordingStream: ?Object;
  getUserMedia: ?Object;

  constructor() {
    this._setCurrentState(STATES.CREATING);
    this.bufferSize = 4096; // tuned up since we care about throughput and capturing all frames, not latency
    this.getUserMedia = (window.navigator.getUserMedia ||
                         window.navigator.webkitGetUserMedia ||
                         window.navigator.mozGetUserMedia ||
                         window.navigator.msGetUserMedia).bind(window.navigator);
    this._toReady();
  }

  // Debugging hook
  _setCurrentState(nextState) {
    this.state = nextState;
  }

  // Regardless of what state we're in, reset any internal state.
  _toReady() {
    this._setCurrentState(STATES.RESETTING);

    // recordingStream
    if (this.recordingStream && this.recordingStream.stop) this.recordingStream.stop();
    this.recordingStream = null;

    // audioContext
    if (this.audioContext && this.audioContext.close) this.audioContext.close();
    this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    this.sampleRate = this.audioContext.sampleRate;

    // processor
    if (this.processor) delete this.processor;

    // buffer
    this.buffers = [[], []];
    this.bufferLength = 0;
    
    this._setCurrentState(STATES.READY);
  }

  // public
  record() {
    this._setCurrentState(STATES.ACQUIRING);
    this.getUserMedia({ audio: true }, this._onStreamReady.bind(this), this._onStreamError.bind(this));
  }

  // Log and try to reset
  _onStreamError(err) {
    this._setCurrentState(STATES.ERROR);
    console.error('AudioRecorder._onStreamError', err); // eslint-disable-line no-console
    this._toReady();
  }

  _onStreamReady(stream) {
    const {audioContext, bufferSize} = this;
    const gain = audioContext.createGain();
    const audioSource = audioContext.createMediaStreamSource(stream);
    audioSource.connect(gain);

    const processor = audioContext.createScriptProcessor(bufferSize, 2, 2);
    processor.onaudioprocess = this._onAudioProcess.bind(this);
    gain.connect(processor);
    processor.connect(audioContext.destination);

    this.processor = processor;
    this.recordingStream = stream;
    this._setCurrentState(STATES.RECORDING);
  }

  _onAudioProcess(event) {
    if (this.buffers && this.hasOwnProperty('bufferLength')) {
      // save left and right buffers 
      for(let i = 0; i < 2; i++) {
        const channel = event.inputBuffer.getChannelData(i);
        this.buffers[i].push(new Float32Array(channel));
      }
      this.bufferLength += this.bufferSize;
    }
  }

  // public
  stop(onBlobReady) {
    this._stopTracks();

    this._setCurrentState(STATES.ENCODING);
    const audioData = encodeWAV(this.buffers, this.bufferLength, this.sampleRate);
    onBlobReady(audioData);

    this._toReady();
  }

  // Guard for if the various stages of initialization aren't completed yet
  _stopTracks() {
    if (!this.processor) return;
    if (!this.recordingStream) return;
    this._setCurrentState(STATES.STOPPING);
    const audioTracks = this.recordingStream.getTracks();
    audioTracks.forEach(audioTrack => audioTrack.stop());
  }
}
