/* @flow weak */
import React from 'react';


// This component wraps another `Response` component and also
// shows a past set of notes from previous scenes.  This can be used
// for writing feedback based on those notes.
// `children` is intended to be a response component like MinimalTextResponse.
export default React.createClass({
  displayName: 'ResponseWithPastNotes',

  propTypes: {
    pastNotes: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
    children: React.PropTypes.element
  },

  render() {
    const {pastNotes, children} = this.props;
    return (
      <div className="ResponseWithPastNotes">
        <div style={styles.container}>
          <div>Your notes:</div>
          <ul>{pastNotes.map(note => <li key={note} style={{}}>{note}</li>)}</ul>
        </div>
        {children}
      </div>
    );
  }
});

const styles = {
  container: {
    paddingBottom: 5,
    margin: 20
  }
};