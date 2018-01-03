/* @flow weak */
import React from 'react';

import {render} from 'enzyme';
import {expect} from 'chai';
import withContext from '../../../test/with_context.jsx';
import InsubordinationPage from './insubordination_page.jsx';

describe('<InsubordinationPage />', () => {
  it('renders HTML', () => {    
    const wrapper = render(withContext(<InsubordinationPage />));
    expect(wrapper.find('.outer-frame').length).to.equal(1);
    expect(wrapper.find('.inner-frame').length).to.equal(1);
  });
});
