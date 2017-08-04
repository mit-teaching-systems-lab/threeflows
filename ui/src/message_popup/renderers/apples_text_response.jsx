/* @flow weak */
import React from 'react';

import MinimalTextResponse from './minimal_text_response.jsx';


// This double-logs text responses for Apples-to-Apples style group reviewing.
// It's intended to be have the same API as MinimalTextResponse.
export default React.createClass({
  displayName: 'ApplesTextResponse',

  propTypes: {
    applesSceneNumber: React.PropTypes.number.isRequired,
    onLogMessage: React.PropTypes.func.isRequired,
    onResponseSubmitted: React.PropTypes.func.isRequired,
    forceResponse: React.PropTypes.bool,
    responsePrompt: React.PropTypes.string,
    recordText: React.PropTypes.string,
    ignoreText: React.PropTypes.string,
    autoFocus: React.PropTypes.bool,
    textHeight: React.PropTypes.number
  },


  // Watch for text responses, and double-log them.
  onApplesLogMessage(type, response) {
    if (type === 'message_popup_text_response' && response.responseText) {
      this.props.onLogMessage('anonymized_apples_to_apples_partial', {
        sceneNumber: this.props.applesSceneNumber,
        anonymizedText: response.responseText
      });
    } else if (type === 'message_popup_text_ignore') {
      this.props.onLogMessage('anonymized_apples_to_apples_partial', {
        sceneNumber: this.props.applesSceneNumber,
        anonymizedText: "(Move on)"
      });
    }
  },

  render() {
    const props = {
      ...this.props,
      onLogMessage: this.onApplesLogMessage
    };

    return <MinimalTextResponse {...props} />;
  }
});