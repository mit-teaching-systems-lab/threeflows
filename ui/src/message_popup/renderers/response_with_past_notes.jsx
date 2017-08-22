/* @flow weak */
import React from 'react';


// This shows a past set of notes from previous scenes, for writing feedback based on those notes.
// `children` is intended to be an response like MinimalTextResponse.
export default React.createClass({
  displayName: 'ResponseWithNotes',

  propTypes: {
    pastNotes: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
    children: React.PropTypes.element
  },


  render() {
    const {pastNotes, children} = this.props;
    return (
      <div>
        <div style={styles.container}>
          <div>Your notes:</div>
          <ul>{pastNotes.map(note => <li style={{}}>{note}</li>)}</ul>
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