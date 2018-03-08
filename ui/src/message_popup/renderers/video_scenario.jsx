/* @flow weak */
import React from 'react';
import YouTube from 'react-youtube';


/*
Renders a YouTube video and provides a callback for when the video is done.
Uses the YouTube iframe API.
*/
export default React.createClass({
  displayName: 'VideoScenario',

  propTypes: {
    youTubeId: React.PropTypes.string.isRequired,
    onDonePlaying: React.PropTypes.func.isRequired,
    youTubeParams: React.PropTypes.object
  },

  getDefaultProps() {
    return {
      youTubeParams: {}
    };
  },

  // see https://developers.google.com/youtube/player_parameters#Overview
  playerParams() {
    const {youTubeParams} = this.props;
    return {
      width: '100%',
      height: '100%',
      playerVars: {
        rel: 0,
        controls: 1,
        fs: 0,
        modestbranding: 1,
        playsinline: 1,
        showinfo: 1, // showinfo: 0 shows YouTube branding while the video plays
        end: youTubeParams && youTubeParams.end // optional, for cutting off ends of videos
      }
    };
  },

  onVideoEnded() {
    this.props.onDonePlaying();
  },

  render() {
    const {youTubeId} = this.props;
    
    return (
      <YouTube
        videoId={youTubeId}
        onEnd={this.onVideoEnded}
        opts={this.playerParams()}
      />
    );
  }
});