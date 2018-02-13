/* @flow weak */
import React from 'react';

import {mount} from 'enzyme';
import {expect} from 'chai';
import withContext from '../../test/with_context.jsx';

import DemoPage from './demo_page.jsx';
import PopupQuestion from './popup_question.jsx';
import PlainTextQuestion from './renderers/plain_text_question.jsx';
import NavigationAppBar from '../components/navigation_app_bar.jsx';


describe('<DemoPage />', () => {
  it('renders instructions', () => {    
    const wrapper = mount(withContext(<DemoPage />));

    expect(wrapper.find('.outer-frame').length).to.equal(1);
    expect(wrapper.find('.inner-frame').length).to.equal(1);
    expect(wrapper.find('.instructions').length).to.equal(1);
    expect(wrapper.find('.prototype').length).to.equal(0);
    expect(wrapper.find('.done').length).to.equal(0);
    expect(wrapper.find('.question').length).to.equal(0);

    // Not sure why the deep find doesn't work, working around for now
    expect(wrapper.find(NavigationAppBar).props().iconElementLeft.props.children.type.displayName).to.equal('NavigationRefresh');
  });

  it('transitions to first question', () => {
    const wrapper = mount(withContext(<DemoPage />));
    wrapper.find(DemoPage).instance().onSave();

    expect(wrapper.find(PopupQuestion).length).to.equal(1);
    expect(wrapper.find(PopupQuestion).props().scaffolding).to.deep.equal({
      helpType: 'none',
      shouldShowSummary: false
    });
    expect(wrapper.find(PlainTextQuestion).length).to.equal(1);
  });
});
