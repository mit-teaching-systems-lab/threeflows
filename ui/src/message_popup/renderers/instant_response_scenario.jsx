/* @flow weak */
import React from 'react';


import * as Colors from 'material-ui/styles/colors';
import RaisedButton from 'material-ui/RaisedButton';
import YouTube from 'react-youtube';

import * as Routes from '../../routes.js';
import type {QuestionT} from '../playtest/turner_scenarios.js';
import AudioRecorderFlow from '../../components/audio_recorder_flow.jsx';


/*
Component that handles recording a minimal audio response or responding by doing nothing.
Users can't review their responses.
This component also handles saving the wav file to the server, and then ultimately
passing back a URL to the audio as part of the response.
*/
export default React.createClass({
  displayName: 'InstantResponseScenario',

  propTypes: {
    onLogMessage: React.PropTypes.func.isRequired,
    onResponseSubmitted: React.PropTypes.func.isRequired,
    question: React.PropTypes.object.isRequired
  },

  getDefaultProps() {
    return {
      idlePrompt: "Not Recording",
      idleText: "Respond",
      recordingPrompt: "Recording...",
      recordingText: "Done",
      uploadingPrompt: "Saving...",
      uploadingText: "Finished"
    };
  },

  getInitialState() {
    return {
      haveShownScenario: false,
      haveRecorded: false,
      haveUploaded: false,
    };

  },

  onDoneUploading({uploadedUrl, downloadUrl}) {
    const audioUrl = uploadedUrl;
    this.props.onLogMessage('message_popup_audio_response', {audioUrl});
    this.props.onResponseSubmitted({audioUrl, downloadUrl});
  },

  onSkipScenario() {
    // this.youtubePlayer.internalPlayer.pauseVideo();
    this.onDoneScenario();
  },

  onDoneScenario() {
    this.setState({haveShownScenario: true});
  },

  onDoneRecording() {
    this.setState({haveRecorded: true});
  },

  render() {
    console.log('rendering InstantResponseScenario');
    if(!this.state.haveShownScenario) {
      return (
        <div>
          <div>
            {this.renderScenario(true)}
          </div>
          <div>
            {this.renderRecorder(false)}
          </div>
        </div>
      );
    }

    if(!this.state.haveRecorded) {
      return (
        <div>
          <div>
            {this.renderImage()}
          </div>
          <div>
            {this.renderRecorder(true)}
          </div>
        </div>
      );
    }

    if(!this.state.haveUploaded) {
      return (
        <div>
          <div>
            {this.renderImage()}
          </div>
          <div>
            {this.renderUploader()}
          </div>
        </div>
      );
    }

    // return (
    //   <div style={styles.container}>
    //     <AudioRecorderFlow
    //       url={Routes.messagePopupUploadWavPath()}
    //       start={this.renderStart}
    //       reviewing={this.renderReviewing}
    //       recording={this.renderRecording}
    //       onDone={this.onDone}
    //       onLogMessage={this.props.onLogMessage}
    //     />
    //   </div>
    // );
  },

  renderScenario(autoplay) {
    // If autoplay is true, start playing the video immediately. Return video
    const question = this.props.question;
    console.log("showing scenario");
    return (
      <div>
        <div style={styles.videoContainer}>
          <YouTube
            ref={(videoPlayer) => { this.youtubePlayer = videoPlayer;}}
            videoId={question.youTubeId}
            onEnd={this.onDoneScenario}
            opts={{
              height: '100%',
              width: '100%',
              playerVars: { // https://developers.google.com/youtube/player_parameters
                autoplay: autoplay ? 1 : 0,
                controls: 0,
                rel: 0,
                showinfo: 0,
                start: question.start,
                end: question.end
              }
            }} 
          />
          <div style={styles.invisible}>
            { /* Todo (Kes): This is a hack to minimize wait time on first image display */ }
            {this.renderImage()}
          </div>
        </div>
      </div>
    );
  },

  renderImage() {
    return (
      <img style={styles.imageContainer} src="https://www.dropbox.com/s/jfru86qp15tw2q0/turner4b.png?raw=1" alt="Jennifer Turner" />
    );
  },

  renderRecorder(autoRecord) {
    // If autoRecord is true, start recording immediately.
    if(autoRecord) {
      return (
        <div style={styles.buttonContainer}>
          <div style={styles.instruction}>{this.props.recordingPrompt}</div>
          <RaisedButton key="record" onTouchTap={this.onDoneRecording} label={this.props.recordingText} secondary={true}/>
        </div>
      );
    }

    return (
      <div style={styles.buttonContainer}>
        <div style={styles.instruction}>{this.props.idlePrompt}</div>
        <RaisedButton key="record" onTouchTap={this.onSkipScenario} label={this.props.idleText} primary={true}/>
      </div>
    );
  },

  renderUploader() {
    return (
      <div style={styles.buttonContainer}>
        <div style={styles.instruction}>{this.props.uploadingPrompt}</div>
        <RaisedButton key="record" onTouchTap={this.onDoneUploading} label={this.props.uploadingText} secondary={true}/>
      </div>
    );
    
    // After uploading, call onDoneUploading()
  },

  renderStart({onRecord}) {
    const {forceResponse} = this.props;

    return (
      <div>
        <div style={styles.instruction}>{this.props.idlePrompt}</div>
        <RaisedButton key="record" onTouchTap={onRecord} label={this.props.recordText} secondary={true} />
        {!forceResponse && <RaisedButton key="ignore" onTouchTap={this.onIgnoreTapped} label={this.props.ignoreText} />}
      </div>
    );
  },

  renderRecording({onDone}) {
    return (
      <div>
        <div style={styles.instruction}></div>
        <RaisedButton key="done" onTouchTap={onDone} label="Done" secondary={true} style={styles.button} />
        <div style={{...styles.recordingMessage, color: Colors.accent1Color}}>Recording...</div>
      </div>
    );
  },

  // // TODO(kr) hack
  // renderReviewing({blob, downloadUrl, onSubmit, onRetry}) {
  //   window.setTimeout(onSubmit, 0);
  //   return null;
  // },

  // // TODO(kr) hack
  // renderDone({uploadedUrl}) {
  //   window.setTimeout(this.onDone.bind(this, uploadedUrl), 0);
  //   return null;
  // }
});

const styles = {
  buttonContainer: {
    marginTop: 20,
    paddingLeft: 10
  },
  container: {
    padding: 20,
    fontSize: 14
  },
  instruction: {
    paddingBottom: 5,
    fontSize: 14
  },
  recordingMessage: {
    paddingTop: 10
  },
  videoContainer: {
    height: 230
  },
  imageContainer: {
    height: 230
  },
  invisible: {
    display: 'none'
  }
};