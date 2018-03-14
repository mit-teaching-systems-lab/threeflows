/* @flow weak */
import React from 'react';

import {render} from 'enzyme';
import {expect} from 'chai';
import withContext from '../../test/with_context.jsx';
import ExperiencePage from './experience_page.jsx';


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
