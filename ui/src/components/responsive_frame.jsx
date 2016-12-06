/* @flow weak */
import React from 'react';
import Media from 'react-media';

/*
A frame that resizes responsively, to take full screen on
mobile and to simulate mobile on desktop (for demo purposes).
*/
export default React.createClass({
  displayName: 'ResponsiveFrame',

  propTypes: {
    children: React.PropTypes.element.isRequired,
    minWidth: React.PropTypes.number.isRequired,
    minHeight: React.PropTypes.number.isRequired
  },

  getDefaultProps() {
    return {
      minWidth: 400,
      minHeight: 400
    };
  },

  render() {
    const {minWidth, minHeight} = this.props;
    const query = `(min-width: ${minWidth}px) and (min-height: ${minHeight}px)`;
    return <Media query={query}>{this.renderResponsiveFrame}</Media>;
  },

  renderResponsiveFrame(isNotWide) {
    const {children} = this.props;
    const outerFrameStyles = (isNotWide)
      ? styles.desktopOuterFrame
      : {};
    const innerFrameStyles = (isNotWide)
      ? styles.desktopInnerFrame
      : {};

    return (
      <div className="outer-frame" style={outerFrameStyles}>
        <div className="inner-frame" style={innerFrameStyles}>
          {children}
        </div>
      </div>
    );
  }
});

const styles = {
  desktopOuterFrame: {
    background: 'black',
    paddingTop: 20,
    display: 'flex',
    justifyContent: 'center'
  },
  desktopInnerFrame: {
    width: 375,
    height: 667,
    overflowY: 'scroll',
    background: 'white',
    border: '1px solid #999'
  }
};