/* @flow weak */
import React from 'react';
import * as PropTypes from '../prop_types.js';
import ChallengeCard from './challenge_card.jsx';


export default React.createClass({
  displayName: 'HomePage',

  propTypes: {
    challenges: React.PropTypes.arrayOf(PropTypes.Challenge).isRequired
  },

  contextTypes: {
    auth: React.PropTypes.object.isRequired
  },

  render() {
    return (
      <div>
        <h1>Home page</h1>
        {this.props.challenges.map((challenge) => {
          return <ChallengeCard key="{challenge.name}" {...challenge} />;
        })}
        {this.renderProfile()}
      </div>
    );
  },

  renderProfile() {
    const {userProfile, doLogout} = this.context.auth;

    return (
      <div style={{marginTop: 50, border: '1px solid #eee'}}>
        <div>{userProfile.email}</div>
        <div><a href="#" onClick={doLogout}>Logout</a></div>
      </div>
    );
  }
});
