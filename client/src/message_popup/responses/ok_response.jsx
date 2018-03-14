/* @flow weak */
import PropTypes from 'prop-types';

import React from 'react';
import ForcedChoiceResponse from './forced_choice_response.jsx';


// Wraps ForcedChoiceResponse with a default 'OK' to advance.
export default class extends React.Component {
  props: {
    onLogMessage: Function,
    onResponseSubmitted: Function,
    label?: string,
  };

  static displayName = 'OkResponse';

  static propTypes = {
    onLogMessage: PropTypes.func.isRequired,
    onResponseSubmitted: PropTypes.func.isRequired,
    label: PropTypes.string
  };

  render() {
    const {onLogMessage, onResponseSubmitted} = this.props;
    const label = this.props.label || 'OK';
    return <ForcedChoiceResponse
      choices={[label]}
      onLogMessage={onLogMessage}
      onResponseSubmitted={onResponseSubmitted} />;
  }
}