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
    name: React.PropTypes.string.isRequired,
    style: React.PropTypes.object
  },

  render: function() {
    const {style, id, name} = this.props;
    return (
      <div style={style || styles.challengeCard}>
        <a href={challengePath(id)}>{name}</a>
      </div>
    );
  }
});