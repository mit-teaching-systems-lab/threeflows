/* @flow weak */
import React from 'react';

import RaisedButton from 'material-ui/RaisedButton';

import Routes from '../routes.js';
import NavigationAppBar from '../components/navigation_app_bar.jsx';
import AudioRecorderFlow from '../components/audio_recorder_flow.jsx';


/*
Prototype page showing the flow through recording an audio response.
*/
export default React.createClass({
  displayName: 'AudioFlowPrototype',

  onDone() {
    window.location.reload();
  },

  render() {
    return (
      <div>
        <NavigationAppBar title="Audio flow prototype" />
        <div style={{border: '1px solid #eee', padding: 20}}>
          <AudioRecorderFlow
            url={Routes.messagePopupUploadWavPath()}
            start={this.renderStart}
            reviewing={this.renderReviewing}
            recording={this.renderRecording}
            done={this.renderDone}
          />
        </div>
      </div>
    );
  },

  renderStart({onRecord}) {
    return (
      <div>
        <div>Speak directly to the student.</div>
        <RaisedButton onTouchTap={onRecord} label="Record" primary={true} />
      </div>
    );
  },

  renderRecording({onDone}) {
    return (
      <div>
        <div style={{color: 'red'}}>Recording...</div>
        <RaisedButton onTouchTap={onDone} label="Done" primary={true} />
      </div>
    );
  },

  renderReviewing({blob, downloadUrl, onSubmit, onRetry}) {
    return (
      <div>
        <div>Review your answer!</div>
        <audio controls={true} src={downloadUrl} />
        <div style={{marginTop: 20}}>Consider:</div>
        <ul>
          <li>NGSS inquiry practices</li>
          <li>Motivation</li>
          <li>Strong voice</li>
        </ul>
        <RaisedButton onTouchTap={onRetry} label="Record again" />
        <RaisedButton onTouchTap={onSubmit} label="Submit" primary={true} />
      </div>
    );
  },

  renderDone({uploadedUrl}) {
    return (
      <div>
        <div>
          <a href={uploadedUrl} target="_blank">{uploadedUrl}</a>
        </div>
        <RaisedButton label="Done" onTouchTap={this.onDone} primary={true} />
      </div>
    );
  }
});