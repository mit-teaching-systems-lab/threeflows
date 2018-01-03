/* @flow weak */
import React from 'react';

import {render} from 'enzyme';
import {expect} from 'chai';
import withContext from '../../../test/with_context.jsx';
import HMTCAExperiencePage from './hmtca_experience_page.jsx';


describe('<HMTCAExperiencePage />', () => {
  it('renders instructions', () => {    
    const wrapper = render(withContext(<HMTCAExperiencePage query={{}} />));
    expect(wrapper.text()).to.contain("What's your anonymous identifier?");
  });
});
