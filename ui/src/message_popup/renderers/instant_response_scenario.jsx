/* @flow weak */
import React from 'react';

import YouTube from 'react-youtube';

import * as Routes from '../../routes.js';
import InstantAudioRecorder from './instant_audio_recorder.jsx';


/*
Component that handles displaying a YouTube video scenario and recording an audio 
response immediately after the video.
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

  getInitialState() {
    return {
      haveShownScenario: false
    };
  },

  onDoneUploading({uploadedUrl, downloadUrl}) {
    this.props.onLogMessage('message_popup_audio_response', {uploadedUrl});
    this.props.onResponseSubmitted({uploadedUrl, downloadUrl});
  },

  onDoneScenario() {
    this.props.onLogMessage('finished_playing_scenario');
    this.setState({haveShownScenario: true});
  },

  render() {
    if(!this.state.haveShownScenario) {
      return (
        <div>
          <div>
            {this.renderScenario()}
          </div>
          <div>
            {this.renderRecorder(false)}
          </div>
        </div>
      );
    }

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
  },

  renderScenario() {
    const question = this.props.question;
    return (
      <div style={styles.videoContainer}>
        <YouTube
          videoId={question.youTubeId}
          onEnd={this.onDoneScenario}
          opts={{
            height: '100%',
            width: '100%',
            playerVars: { // https://developers.google.com/youtube/player_parameters
              autoplay: 1,
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
    );
  },

  renderImage() {
    return (
      <img style={styles.imageContainer} src="https://www.dropbox.com/s/jfru86qp15tw2q0/turner4b.png?raw=1" alt="Jennifer Turner" />
    );
  },

  renderRecorder(autoRecord) {
    return (
      <InstantAudioRecorder
        url={Routes.messagePopupUploadWavPath()}
        instantRecord={autoRecord}
        onDoneUploading={this.onDoneUploading}
        onLogMessage={this.props.onLogMessage}
      />
    );
  },
});

const styles = {
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