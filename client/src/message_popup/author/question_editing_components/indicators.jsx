/* @flow weak */
import PropTypes from 'prop-types';

import React from 'react';

import {indicators} from '../../../data/indicators.js';

import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';

export default React.createClass({
  displayName: 'Indicators',

  propTypes: {
    indicator: PropTypes.object.isRequired,
    onIndicatorChange: PropTypes.func.isRequired
  },

  onRadioButtonGroupChanged(e) {
    this.props.onIndicatorChange(e.target.value);
  },

  render(){
    const {indicator} = this.props;
    return (
      <Paper style={styles.container}>
        <div style={styles.title}>Indicator</div>
        <Divider />
        <RadioButtonGroup
          style={styles.indicatorRadioGroup}
          name="indicator"
          valueSelected={indicator.id.toString()}
          onChange={this.onRadioButtonGroupChanged}
        >
          {indicators.map(otherIndicator =>
            <RadioButton
              key={'indicator-' + otherIndicator.id}
              value={otherIndicator.id.toString()}
              label={otherIndicator.text}
            />
          )}
        </RadioButtonGroup>
      </Paper>
      );
  }
});

const styles = {
  container: {
    margin: 5,
    padding: 10,
    fontSize: 14
  },
  title: {
    marginBottom: 5,
    fontSize: 18,
    fontWeight: 'bold'
  },
  indicatorRadioGroup: {
    marginTop: 10,
    fontSize: 14
  }
};