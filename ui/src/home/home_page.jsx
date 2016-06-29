/* @flow weak */
import React from 'react';
import * as PropTypes from '../prop_types.js';
import ChallengeCard from './challenge_card.jsx';


export default React.createClass({
  displayName: 'HomePage',

  propTypes: {
    challenges: React.PropTypes.arrayOf(PropTypes.Challenge).isRequired
  },

  render() {
    return (
      <div>
        <h1>Home page</h1>
        {this.props.challenges.map((challenge) => {
          return <ChallengeCard key="{challenge.name}" {...challenge} />;
        })}
      </div>
    );
  }
});
