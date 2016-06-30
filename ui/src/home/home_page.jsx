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
    const {userProfile, authHash} = this.context.auth;

    return (
      <div style={{marginTop: 50, border: '1px solid #eee'}}>
        <div><img src={userProfile.picture} width="64" height="64"/></div>
        <div>{userProfile.name}</div>
        <div>{userProfile.email}</div>
        <pre>{JSON.stringify(userProfile, null, 2)}</pre>
        <pre>{JSON.stringify(authHash, null, 2)}</pre>
        <div><a href="#" onClick={this.context.auth.doLogout}>Logout</a></div>
      </div>
    );
  }
});
