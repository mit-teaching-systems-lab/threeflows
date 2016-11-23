/* @flow weak */
import React from 'react';

import {mount} from 'enzyme';
import {expect} from 'chai';
import TestAuthContainer from '../../test_auth_container.jsx';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import TwinePage from './twine_page.jsx';
import NavigationAppBar from '../../components/navigation_app_bar.jsx';

// Wrap with application context for a full render
// (eg., theming, authorization).
function withContext(child) {
  return (
    <MuiThemeProvider>
      <TestAuthContainer>
        {child}
      </TestAuthContainer>
    </MuiThemeProvider>
  );
}

describe('<TwinePage />', () => {
  it('renders instructions', () => {    
    const wrapper = mount(withContext(<TwinePage />));

    expect(wrapper.find('.outer-frame').length).to.equal(1);
    expect(wrapper.find('.inner-frame').length).to.equal(1);
    expect(wrapper.find('.instructions').length).to.equal(1);
    expect(wrapper.find('.prototype').length).to.equal(0);
    expect(wrapper.find('.done').length).to.equal(0);
    expect(wrapper.find('.choice').length).to.equal(0);

    // Not sure why the deep find doesn't work, working around for now
    expect(wrapper.find(NavigationAppBar).props().iconElementLeft.props.children.type.displayName).to.equal('NavigationRefresh');
  });

  it('transitions to first choice', () => {
    const wrapper = mount(withContext(<TwinePage />));
    wrapper.find(TwinePage).node.onStartSession();

    expect(wrapper.find('.choice').length).to.equal(1);
  });
});
