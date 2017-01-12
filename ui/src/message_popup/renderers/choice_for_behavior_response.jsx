/* @flow weak */
import React from 'react';

import RaisedButton from 'material-ui/RaisedButton';


// This response allows choosing from a set of responses.
export default React.createClass({
  displayName: 'ChoiceForBehaviorResponse',

  propTypes: {
    choices: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
    onLogMessage: React.PropTypes.func.isRequired,
    onResponseSubmitted: React.PropTypes.func.isRequired
  },

  onChoiceTapped(choice) {
    this.props.onLogMessage({choice});
    this.props.onResponseSubmitted({choice});
  },

  render() {
    const {choices} = this.props;
    return (
      <div className="ChoiceForBehaviorResponse">
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
});

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