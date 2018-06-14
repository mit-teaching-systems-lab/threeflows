import * as React from 'react';

class AudioPlayerComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      token: this.props.token,
      audioID: this.props.audioID,
      audioBlob: ""
    };

    this.getAudio = this.getAudio.bind(this);
  }

  componentDidMount() {
    this.getAudio()
      .then( blob => {
        this.setState({ audioBlob: blob });
      });
  }

  getAudio() {
    //fetch audio file from s3
    return fetch('/server/research/wav/'+this.state.audioID+'.wav', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'x-teachermoments-token': this.state.token,
      },
      method: 'GET'
    })
      .then(results => {
        var response = new Response(results.body, {headers: {"Content-Type": "audio/wav"}});
        return response.blob()
          .then(function(myBlob) {
            return Promise.resolve(URL.createObjectURL(myBlob));
          });
      })
      .catch(err => {
        console.log('there was an error:', err);
      });
  }

  render() {
    return (
      <audio controls id={this.state.audioID} src={this.state.audioBlob} type="audio/wav"> </audio>
    );
  }
}
export default AudioPlayerComponent;