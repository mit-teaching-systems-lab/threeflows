/* @flow weak */
import React from 'react';

import {render} from 'enzyme';
import {expect} from 'chai';
import TestAuthContainer from '../test_auth_container.jsx';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import ExperiencePage from './experience_page.jsx';
import MenuIcon from 'material-ui/svg-icons/navigation/menu';

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

// TODO(kr) it doesn't yet work to do a full render of ExperiencePage,
// because the TextField Material UI component relies on element.scrollHeight,
// which isn't present in jsdom.
// Not sure of a good workaround, but submitted
// https://github.com/callemall/material-ui/pull/5015 as a workaround and
// to get input.
describe('<ExperiencePage />', () => {
  it('renders instructions', () => {    
    const wrapper = render(withContext(<ExperiencePage query={{modes: true}} />));

    expect(wrapper.find('.instructions').length).to.equal(1);
    expect(wrapper.find('.prototype').length).to.equal(0);
    expect(wrapper.find('.done').length).to.equal(0);
    expect(wrapper.find('.question').length).to.equal(0);
  });
});
