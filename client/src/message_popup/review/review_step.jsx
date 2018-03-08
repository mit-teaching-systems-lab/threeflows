/* @flow weak */
import PropTypes from 'prop-types';

import React from 'react';

import RaisedButton from 'material-ui/RaisedButton';

import * as Api from '../../helpers/api.js';
import ReadMore from '../renderers/read_more.jsx';


// Render the question and response.  For now, only works with text questions
// and audio responses.
export default class extends React.Component {
  props: {
    row: Object,
    token: string,
    emailAddress: string,
  };

  static displayName = 'ReviewStep';

  static propTypes = {
    row: PropTypes.object.isRequired,
    token: PropTypes.string.isRequired,
    emailAddress: PropTypes.string.isRequired
  };

  state = {
    isAudioExpanded: false
  };

  onListenTapped = (e) => {
    const {isAudioExpanded} = this.state;
    this.setState({ isAudioExpanded: !isAudioExpanded });
  };

  render() {
    const {row, token, emailAddress} = this.props;
    const audioUrl = row.audio_url;
    if (!audioUrl) return null;

    const audioUrlWithTokens = Api.audioUrlWithTokens(audioUrl, token, emailAddress);
    const questionText = row.question.text;
    return (
      <div key={audioUrlWithTokens} className="ReviewStep" style={styles.container}>
        <ReadMore fulltext={questionText}/>
        {this.renderAudioOnDemand(audioUrlWithTokens)}
      </div>
    );
  }

  // Rendering causes the browser to load all audio files from the
  // server at once in parallel, so require a user step to defer downloading
  // all that data until they want it.
  renderAudioOnDemand = (audioUrlWithTokens) => {
    const {isAudioExpanded} = this.state;
    return (isAudioExpanded)
      ? <audio
        key={audioUrlWithTokens}
        controls={true}
        src={audioUrlWithTokens}
        autoPlay={true}
        style={{paddingTop: 10, paddingBottom: 20}} />
      : <RaisedButton
        onTouchTap={this.onListenTapped}
        style={styles.button}
        primary={true}
        label="Listen" />;
  };
}

const styles = {
  container: {
    marginBottom: 20
  },
  button: {
    marginTop: 20,
    marginLeft: 20
  }
};