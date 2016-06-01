import React from 'react';
import ReactDOM from 'react-dom';
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