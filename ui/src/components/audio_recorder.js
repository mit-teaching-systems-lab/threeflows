import encodeWAV from './encode_wav.js';


// Audio recorder class for one-time use recording.  Only works on Chrome and Firefox.
// Adapted from https://github.com/danrouse/react-audio-recorder
export default class AudioRecorder {
  buffers: ?[[number]];
  bufferLength: number;
  bufferSize: number;
  audioContext: ?AudioContext;
  sampleRate: number;
  processor: ?Object;
  recordingStream: ?Object;
  getUserMedia: ?Object;

  constructor() {
    this.buffers = [[], []];
    this.bufferLength = 0;
    this.bufferSize = 4096; // tuned up since we care about throughput and capturing all frames, not latency
    this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    this.sampleRate = this.audioContext.sampleRate;
    this.recordingStream = null;
    this.getUserMedia = (window.navigator.getUserMedia ||
                         window.navigator.webkitGetUserMedia ||
                         window.navigator.mozGetUserMedia ||
                         window.navigator.msGetUserMedia).bind(window.navigator);
  }

  record() {
    this.getUserMedia({ audio: true }, this._onStreamReady.bind(this), this._onStreamError.bind(this));
  }

  _onStreamError(err) {
    console.error('AudioRecorder._onStreamError', err); // eslint-disable-line no-console
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

  stop(onBlobReady) {
    // Guard for if the various stages of initialization aren't completed yet
    if (!this.processor) return;
    if (!this.recordingStream) return;
    const audioTracks = this.recordingStream.getTracks();
    if (audioTracks.length === 0) return;

    // Stop actively recording, encode the data and pass it back
    audioTracks[0].stop();
    const audioData = encodeWAV(this.buffers, this.bufferLength, this.sampleRate);
    onBlobReady(audioData);
  }

  destroy() {
    if (this.recordingStream.stop) this.recordingStream.stop();
    if (this.audioContext.close) this.audioContext.close();

    delete this.processor;
    delete this.buffers;
    delete this.bufferLength;
    delete this.bufferSize;
    delete this.audioContext;
    delete this.recordingStream;
  }
}
