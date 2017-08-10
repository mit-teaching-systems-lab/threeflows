/* @flow weak */
import React from 'react';

import {render} from 'enzyme';
import {expect} from 'chai';
import TestAuthContainer from '../../test_auth_container.jsx';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import HMTCAExperiencePage from './hmtca_experience_page.jsx';


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

describe('<HMTCAExperiencePage />', () => {
  it('renders instructions', () => {    
    const wrapper = render(withContext(<HMTCAExperiencePage query={{}} />));
    expect(wrapper.text()).to.contain("What's your anonymous identifier?");
  });
});
