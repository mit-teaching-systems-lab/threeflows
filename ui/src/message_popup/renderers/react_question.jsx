/* @flow weak */
import React from 'react';


// Render a React component
export default React.createClass({
  displayName: 'ReactQuestion',

  propTypes: {
    el: React.PropTypes.node.isRequired
  },

  render() {
    const {el} = this.props;

    return React.cloneElement(el, {style: styles.textQuestion});
  }
});

const styles = {
  textQuestion: {
    whiteSpace: 'pre-wrap',
    fontSize: 16,
    lineHeight: 1.2,
    padding: 20
  }
};
