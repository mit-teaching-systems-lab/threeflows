/* @flow weak */
import React from 'react';
import {challengePath} from '../routes';

const styles = {
  challengeCard: {
    padding: 10,
    border: '1px solid #ccc',
  }
};

export default React.createClass({
  displayName: 'ChallengeCard',

  propTypes: {
    id: React.PropTypes.number.isRequired,
    name: React.PropTypes.string.isRequired
  },
  render: function() {
    return (
      <div style={styles.challengeCard}>
        <a href={challengePath(this.props.id)}>{this.props.name}</a>
      </div>
    );
  }
});