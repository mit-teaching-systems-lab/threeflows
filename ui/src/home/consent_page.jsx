/* @flow weak */
import React from 'react';
import uuid from 'uuid';

import * as Api from '../helpers/api.js';
import SessionFrame from '../message_popup/linear_session/session_frame.jsx';
import ResearchConsent from '../components/research_consent.jsx';


// A standalone consent page, inline
export default React.createClass({
  displayName: 'ConsentPage',

  onResetSession(e) {
    window.location.reload();
  },

  onLogMessage(type, response) {
    const email = 'unknown@mit.edu';
    
    Api.logEvidence(type, {
      ...response,
      sessionId: uuid.v4(),
      email,
      name: email
    });
  },

  render() {
    return (
      <SessionFrame onResetSession={this.onResetSession}>
        <ResearchConsent onLogMessage={this.onLogMessage} />
      </SessionFrame>
    );
  }
});