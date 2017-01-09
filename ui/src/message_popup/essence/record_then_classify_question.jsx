/* @flow weak */
import React from 'react';

import Divider from 'material-ui/Divider';

import PlainTextQuestion from '../renderers/plain_text_question.jsx';
import ChoiceForBehaviorResponse from '../renderers/choice_for_behavior_response.jsx';
import MinimalAudioResponse from '../renderers/minimal_audio_response.jsx';


// Record audio, then classify your response
export default React.createClass({
  displayName: 'RecordThenClassifyQuestion',

  propTypes: {
    question: React.PropTypes.object.isRequired,
    onLogMessage: React.PropTypes.func.isRequired,
    onResponseSubmitted: React.PropTypes.func.isRequired,
    skipAudioRecording: React.PropTypes.bool
  },

  getInitialState() {
    return {
      audioResponse: null
    };
  },

  onDoneAudio(audioResponse) {
    this.setState({audioResponse});
  },

  // Include the audioResponse in the fixed-choice response
  onChoiceSelected(response) {
    const {audioResponse} = this.state;
    this.props.onResponseSubmitted({
      ...response,
      ...audioResponse
    });
  },

  render() {
    const {question} = this.props;
    return (
      <div>
        <PlainTextQuestion question={question} />
        {this.renderResponseArea()}
      </div>
    );
  },
  
  renderResponseArea() {
    const {question, skipAudioRecording, onLogMessage} = this.props;
    const {audioResponse} = this.state;
    
    if (!audioResponse && !skipAudioRecording) {
      return (
        <MinimalAudioResponse
          recordText="Record"
          onLogMessage={onLogMessage}
          onResponseSubmitted={this.onDoneAudio}
        />
      );
    }

    return (
      <div>
        <Divider style={{margin: 20}} />
        <div style={{paddingTop: 20, paddingLeft: 20}}>Which best describes your response?</div>  
        <ChoiceForBehaviorResponse
          choices={question.choices}
          onLogMessage={onLogMessage}
          onResponseSubmitted={this.onChoiceSelected}
        />
      </div>
    );
  }
});