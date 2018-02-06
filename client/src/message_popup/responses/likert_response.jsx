/* @flow weak */
import PropTypes from 'prop-types';

import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import {ResponseTypes} from '../data/response_types.js';


// This response allows choosing a Likert response with labels
export default class extends React.Component {
  props: {
    onLogMessage: Function,
    onResponseSubmitted: Function,
    choices?: Array<string>,
  };

  static displayName = 'LikertResponse';

  static propTypes = {
    onLogMessage: PropTypes.func.isRequired,
    onResponseSubmitted: PropTypes.func.isRequired,
    choices: PropTypes.arrayOf(PropTypes.string)
  };

  static defaultProps = {
    choices: [
      'Strongly disagree',
      'Disagree',
      'Somewhat disagree',
      'Neither agree or disagree',
      'Somewhat agree',
      'Agree',
      'Strongly agree'
    ]
  };

  onChoiceTapped = (choice) => {
    const choices = this.props.choices || [];
    const response = ResponseTypes.LIKERT_RESPONSE;
    this.props.onLogMessage(response.type, response.params({choice, choices}));
    this.props.onResponseSubmitted({choice, choices});
  };

  render() {
    const {choices} = this.props;
    return (
      <div className="LikertResponse">
        <div style={styles.textAreaContainer}>
          {(choices || []).map((choice) =>
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