/* @flow weak */
import React from 'react';
import {shallow} from 'enzyme';
import {expect} from 'chai';

import ConsentPage from './consent_page.jsx';
import ResearchConsent from '../components/research_consent.jsx';


describe('<ConsentPage />', () => {
  it('renders', () => {
    const wrapper = shallow(<ConsentPage />);
    expect(wrapper.find(ResearchConsent).length).to.equal(1);
  });
});
