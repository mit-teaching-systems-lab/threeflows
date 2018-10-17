import encodeWAV from './encode_wav.js';


// Audio recorder class for one-time use recording.  Only works on Chrome and Firefox.
// Adapted from https://github.com/danrouse/react-audio-recorder
export default class AudioRecorder {
  buffers: ?[[number]];
  bufferLength: number;
  bufferSize: number;
  audioContext: ?AudioContext;
  sampleRate: number;
  recorder: ?Object;
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

    const recorder = audioContext.createScriptProcessor(bufferSize, 2, 2);
    recorder.onaudioprocess = this._onAudioProcess.bind(this);
    gain.connect(recorder);
    recorder.connect(audioContext.destination);

    this.recorder = recorder;
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
    // If this.recordingStream has not yet been set, there
    // was a race condition between getting the recording stream
    // and the user clicking "stop."  One way this might happen
    // if there is a problem with granting permissions.  If that does
    // happen, we've already lost the audio data, so log it to Rollbar
    // for debugging and move on so the experience for learners
    // isn't impacted.
    if (this.recordingStream === null) {
    } else {
      this.recordingStream.getTracks()[0].stop();
      const audioData = encodeWAV(this.buffers, this.bufferLength, this.sampleRate);
      onBlobReady(audioData);
    }
  }

  destroy() {
    if (this.recordingStream.stop) this.recordingStream.stop();
    if (this.audioContext.close) this.audioContext.close();

    delete this.buffers;
    delete this.bufferLength;
    delete this.bufferSize;
    delete this.audioContext;
    delete this.recordingStream;
  }
}
