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
      return <div style={styles.summaryQuestion}>{this.props.fulltext}</div>;
    }
    if(this.state.expanded) {
      return (
        <div style={styles.summaryQuestion}>
          {this.props.fulltext} <a href='#' onClick={this.collapse}>show less</a>
        </div>
      );
    } else {
      return (
        <div style={styles.summaryQuestion}>
          {this.props.fulltext.substring(0, this.props.charCount) + '... '}
          <a href='#' onClick={this.expand}>read more</a>
        </div>);
    }
  },
});

const styles = {
  summaryQuestion: {
    whiteSpace: 'pre-wrap',
    fontSize: 16,
    lineHeight: 1.2,
    paddingTop: 20,
    paddingBottom: 10
  }
};

