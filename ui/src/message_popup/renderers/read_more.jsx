/* @flow weak */
import React from 'react';

/*
  Component that displays a text block that can be expanded or collapsed.
*/
export default React.createClass({
  displayName: 'ReadMore',

  propTypes: {
    fulltext: React.PropTypes.node.isRequired,
    charCount: React.PropTypes.node,
  },

  getDefaultProps() {
    return {
      charCount: 140
    };
  },

  getInitialState() {
    return {
      expanded: false
    };
  },

  expand() {
    this.setState({
      expanded: true
    });
  },

  collapse() {
    this.setState({
      expanded: false
    });
  },

  render() {    
    if (this.props.fulltext.length <= this.props.charCount) {
      return <div>{this.props.fulltext}</div>;
    }
    if(this.state.expanded) {
      return (
        <div>
          {this.props.fulltext} <a href='#' onClick={this.collapse}>show less</a>
        </div>
      );
    } else {
      return (
        <div>
          {this.props.fulltext.substring(0, this.props.charCount) + '... '}
          <a href='#' onClick={this.expand}>read more</a>
        </div>);
    }
  },
});