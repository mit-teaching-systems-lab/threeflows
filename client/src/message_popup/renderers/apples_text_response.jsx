/* @flow weak */
import PropTypes from 'prop-types';

import React from 'react';

import MinimalTextResponse from './minimal_text_response.jsx';


// This double-logs text responses for Apples-to-Apples style group reviewing.
// It's intended to be have the same API as MinimalTextResponse.
export default class extends React.Component {
  props: {
    applesSceneNumber: number,
    onLogMessage: Function,
    onResponseSubmitted: Function,
    forceResponse?: boolean,
    responsePrompt?: string,
    recordText?: string,
    ignoreText?: string,
    autoFocus?: boolean,
    textHeight?: number,
  };

  static displayName = 'ApplesTextResponse';

  static propTypes = {
    applesSceneNumber: PropTypes.number.isRequired,
    onLogMessage: PropTypes.func.isRequired,
    onResponseSubmitted: PropTypes.func.isRequired,
    forceResponse: PropTypes.bool,
    responsePrompt: PropTypes.string,
    recordText: PropTypes.string,
    ignoreText: PropTypes.string,
    autoFocus: PropTypes.bool,
    textHeight: PropTypes.number
  };

  // Watch for text responses, and double-log them.
  onApplesLogMessage = (type, response) => {
    if (type === 'message_popup_text_response' && response.responseText) {
      this.props.onLogMessage('anonymized_apples_to_apples_partial', {
        sceneNumber: this.props.applesSceneNumber,
        anonymizedText: response.responseText
      });
    } else if (type === 'message_popup_text_ignore') {
      this.props.onLogMessage('anonymized_apples_to_apples_partial', {
        sceneNumber: this.props.applesSceneNumber,
        anonymizedText: "(Ignore)"
      });
    }
  };

  render() {
    const props = {
      ...this.props,
      onLogMessage: this.onApplesLogMessage
    };

    return <MinimalTextResponse {...props} />;
  }
}