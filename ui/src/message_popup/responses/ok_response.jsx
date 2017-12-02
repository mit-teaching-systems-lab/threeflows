/* @flow weak */
import React from 'react';
import ForcedChoiceResponse from './forced_choice_response.jsx';


// Wraps ForcedChoiceResponse with a default 'OK' to advance.
export default React.createClass({
  displayName: 'OkResponse',

  propTypes: {
    onLogMessage: React.PropTypes.func.isRequired,
    onResponseSubmitted: React.PropTypes.func.isRequired,
    label: React.PropTypes.string
  },

  render() {
    const {onLogMessage, onResponseSubmitted} = this.props;
    const label = this.props.label || 'OK';
    return <ForcedChoiceResponse
      choices={[label]}
      onLogMessage={onLogMessage}
      onResponseSubmitted={onResponseSubmitted} />;
  }
});