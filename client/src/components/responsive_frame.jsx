/* @flow weak */
import PropTypes from 'prop-types';

import React from 'react';
import Media from 'react-media';

/*
A frame that resizes responsively, to take full screen on
mobile and to simulate mobile on desktop (for demo purposes).
*/
export default class extends React.Component {
  props: {
    children: React.Node,
    minWidth: number,
    minHeight: number,
  };

  static displayName = 'ResponsiveFrame';

  static propTypes = {
    children: PropTypes.element.isRequired,
    minWidth: PropTypes.number.isRequired,
    minHeight: PropTypes.number.isRequired
  };

  static defaultProps = {
    minWidth: 450,
    minHeight: 400
  };

  render() {
    const {minWidth, minHeight} = this.props;
    const query = `(min-width: ${minWidth}px) and (min-height: ${minHeight}px)`;
    return <Media query={query}>{this.renderResponsiveFrame}</Media>;
  }

  renderResponsiveFrame = (isNotWide) => {
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
  };
}

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