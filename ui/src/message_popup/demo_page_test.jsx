/* @flow weak */
import React from 'react';

import {mount} from 'enzyme';
import {expect} from 'chai';
import TestAuthContainer from '../test_auth_container.jsx';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import DemoPage from './demo_page.jsx';
import PopupQuestion from './popup_question.jsx';
import PlainTextQuestion from './renderers/plain_text_question.jsx';
import RefreshIcon from 'material-ui/svg-icons/navigation/refresh';

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

describe('<DemoPage />', () => {
  it('renders instructions', () => {    
    const wrapper = mount(withContext(<DemoPage />));

    expect(wrapper.find('.instructions').length).to.equal(1);
    expect(wrapper.find('.prototype').length).to.equal(0);
    expect(wrapper.find('.done').length).to.equal(0);
    expect(wrapper.find('.question').length).to.equal(0);
    expect(wrapper.find(RefreshIcon).length).to.equal(1);
  });

  it('transitions to first question', () => {
    const wrapper = mount(withContext(<DemoPage />));
    wrapper.find(DemoPage).node.onSave();

    expect(wrapper.find(PopupQuestion).length).to.equal(1);
    expect(wrapper.find(PopupQuestion).props().scaffolding).to.deep.equal({
      helpType: 'none',
      shouldShowSummary: false
    });
    expect(wrapper.find(PlainTextQuestion).length).to.equal(1);
  });
});
