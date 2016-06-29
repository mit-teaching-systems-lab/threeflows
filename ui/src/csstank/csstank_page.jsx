/* @flow weak */
import React from 'react';


export default React.createClass({
  displayName: 'CSSTankPage',

  propTypes: {},

  render() {
    return (
      <div style={styles.pageContainer}>
        <h1>Cognitive Science Shark Tank</h1>
        Meet in-person in the conference room at 10am!
      </div>
    );
  }
});

const styles = {
  pageContainer: {
    padding: 20
  }
};