import * as React from 'react';
import {requestTranscript} from './Transcribe.js';

class TranscriptComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      token: this.props.token,
      audioID: this.props.audioID,
      transcript: ""
    };

    this.getTranscript = this.getTranscript.bind(this);
  }

  componentDidMount() {
    this.getTranscript()
      .then( transcript => {
        this.setState({ transcript: transcript });
      });
  }

  getTranscript() {
    //request transcript for audio
    return requestTranscript(this.state.token,this.state.audioID)
      .then(results => {
        if (results.transcript){
          return results.transcript;
        }
        return "Unable to transcribe";
      })
      .catch(err => {
        console.log('failure in transcription');
      });
  }

  render() {
    return (
      <div id={this.state.audioID+"-transcript"}>Transcript: "{this.state.transcript}"</div>
    );
  }
}

export default TranscriptComponent;