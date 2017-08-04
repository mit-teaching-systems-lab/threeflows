/* @flow weak */
import React from 'react';

import IconButton from 'material-ui/IconButton';
import RefreshIcon from 'material-ui/svg-icons/navigation/refresh';

import ResponsiveFrame from '../../components/responsive_frame.jsx';
import NavigationAppBar from '../../components/navigation_app_bar.jsx';


// The frame for an entire session, with responsiveness and menus.
export default React.createClass({
  displayName: 'SessionFrame',

  propTypes: {
    onResetSession: React.PropTypes.func.isRequired,
    children: React.PropTypes.node
  },

  render() {
    const {children, onResetSession} = this.props;
    return (
      <div className="SessionFrame">
        <ResponsiveFrame>
          <div>
            <NavigationAppBar
              title="Teacher Moments"
              iconElementLeft={
                <IconButton onTouchTap={onResetSession} >
                  <RefreshIcon />
                </IconButton>
              }
            />
            {children}
          </div>
        </ResponsiveFrame>
      </div>
    );
  }
});
