/* @flow weak */
import React from 'react';

import {mount} from 'enzyme';
import {expect} from 'chai';
import withContext from '../../../test/with_context.jsx';
import TwinePage from './twine_page.jsx';
import NavigationAppBar from '../../components/navigation_app_bar.jsx';


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
    wrapper.find(TwinePage).instance().onStartSession();

    expect(wrapper.find('.choice').length).to.equal(1);
  });
});
