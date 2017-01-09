/* @flow weak */
import React from 'react';

import MenuItem from 'material-ui/MenuItem';
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
    return (
      <ResponsiveFrame>
        <div>
          <NavigationAppBar
            title="Teacher Moments"
            prependMenuItems={
              <MenuItem
                onTouchTap={this.props.onResetSession}
                leftIcon={<RefreshIcon />}
                primaryText="Restart session" />
            }
          />
          {this.props.children}
        </div>
      </ResponsiveFrame>
    );
  }
});
