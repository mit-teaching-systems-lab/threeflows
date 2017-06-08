/* @flow weak */
import React from 'react';
import MediaStreamRecorder from 'msr';

export default React.createClass({
  displayName: 'VideoRecorder',

  getInitialState() {
    return {
      blobURL: null,
      videoURL: null
    };
  },

  componentDidUpdate(prevProps, prevState) {
    if (this.state.videoURL !== prevState.videoURL && this.videoEl) {
      this.videoEl.play();
    }
  },

  uploadBlob(blob:Blob) {
    const url = '/teachermoments/wav';
    const xhr = new XMLHttpRequest();
    xhr.open('POST', url);
    xhr.onload = this.onDoneUploading;
    xhr.onerror = this.onErrorUploading;
    console.log("Uploading blob...");
    console.log(blob);
    // xhr.send(blob);

    const formData = new FormData();
    formData.append('megaBlob-blob', new File([blob], "blobname"));
    xhr.send(formData);    
    console.log(formData);
  },

  onRecordVideo() {
    var mediaConstraints = {
      audio: true,    // don't forget audio!
      video: true     // don't forget video!
    };
    this.blobs = [];
    navigator.getUserMedia(mediaConstraints, this.onMediaSuccess, this.onMediaError);
  },

  onErrorUploading(event) {
    console.log("Error uploading");
  },

  onDoneUploading(event) {
    console.log("Done uploading");
  },

  onStopRecording() {
    this.mediaRecorder.stop();
    this.stream.stop();
    // this.mediaRecorder.save();
    window.ConcatenateBlobs(this.blobs, this.blobs[0].type, this.onBlobsDone);
  },

  onMediaSuccess(stream) {
    this.mediaRecorder = new MediaStreamRecorder(stream); 
    this.mediaRecorder.mimeType = 'video/webm';
    this.mediaRecorder.ondataavailable = this.onDataAvailable;
    this.mediaRecorder.start(1000);
    this.stream = stream;
    this.setState({videoURL: URL.createObjectURL(stream)});
    console.log("onMediaSuccess");
  },

  onBlobsDone(megaBlob) {

    console.log("onBlobsDone");
    console.log(megaBlob);
    // var blobURL = URL.createObjectURL(megaBlob);
    // this.uploadBlob(this.blobs[0]);
    // this.setState({ blobURL });
  },

  onDataAvailable(blob) {
    // POST/PUT "Blob" using FormData/XHR2
    // var blobURL = URL.createObjectURL(blob);
    // document.write('<a href="' + blobURL + '">' + blobURL + '</a>');
    // };
    this.blobs.push(blob);
    this.uploadBlob(blob);
    // this.setState({ blobURL });
    console.log("onDataAvailable");
  },

  onMediaError(e) {
   console.error('media error', e);
  },

  render() {
    const {videoURL} = this.state;
    return (
      <div>
        <button onClick={this.onRecordVideo}> Record</button>
        <button onClick={this.onStopRecording}> Stop</button>
        <video
          ref={(el) => {
            if (el) this.videoEl = el;
          }}
          src={videoURL}
          height={300}
          width={400}
          muted={true} controls={true}></video>

          
      </div>
    );
  }
});