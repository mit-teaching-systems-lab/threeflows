/* @flow weak */
import React from 'react';

import {render} from 'enzyme';
import {expect} from 'chai';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import TestAuthContainer from '../../test_auth_container.jsx';
import DisciplinePage from './discipline_page.jsx';

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

describe('<DisciplinePage />', () => {
  it('renders HTML', () => {    
    const wrapper = render(withContext(<DisciplinePage />));
    expect(wrapper.find('.outer-frame').length).to.equal(1);
    expect(wrapper.find('.inner-frame').length).to.equal(1);
  });
});
