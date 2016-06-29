/* @flow weak */
import React from 'react';

export default React.createClass({
  displayName: 'SlatePage',

  propTypes: {
    slate: React.PropTypes.object.isRequired
  },

  render() {
    return (
      <div style={styles.pageContainer}>
        <h1>Slate</h1>
        For the Slate about <b>{this.props.slate.topic}</b>, see Jonathan and he'll get you started!
      </div>
    );
  }
});

const styles = {
  pageContainer: {
    padding: 20
  }
};