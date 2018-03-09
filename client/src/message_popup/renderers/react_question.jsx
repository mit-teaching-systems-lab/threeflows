/* @flow weak */
import React from 'react';
import PropTypes from 'prop-types';
import createReactClass from 'create-react-class';

// Render a React component
export default createReactClass({
  displayName: 'ReactQuestion',

  propTypes: {
    el: PropTypes.node.isRequired
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
