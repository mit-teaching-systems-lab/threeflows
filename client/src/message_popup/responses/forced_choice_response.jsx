/* @flow weak */
import PropTypes from 'prop-types';

import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import {ResponseTypes} from '../data/response_types.js';


// This response allows choosing from a set of responses.
export default class extends React.Component {
  props: {
    choices: Array<string>,
    onLogMessage: Function,
    onResponseSubmitted: Function,
  };

  static displayName = 'ForcedChoiceResponse';

  static propTypes = {
    choices: PropTypes.arrayOf(PropTypes.string).isRequired,
    onLogMessage: PropTypes.func.isRequired,
    onResponseSubmitted: PropTypes.func.isRequired
  };

  onChoiceTapped = (choice) => {
    const response = ResponseTypes.FORCED_CHOICE_RESPONSE;
    this.props.onLogMessage(response.type, response.params({choice}));
    this.props.onResponseSubmitted({choice});
  };

  render() {
    const {choices} = this.props;
    return (
      <div className="ForcedChoiceResponse">
        <div style={styles.textAreaContainer}>
          {choices.map((choice) =>
            <RaisedButton
              key={choice}
              onTouchTap={this.onChoiceTapped.bind(this, choice)}
              label={choice}
              style={styles.button}
              secondary={false}
            />
          )}
        </div>
      </div>
    );
  }
}

const styles = {
  textAreaContainer: {
    marginTop: 10,
    margin: 20,
    marginBottom: 10
  },
  button: {
    display: 'block',
    marginTop: 5
  }
};