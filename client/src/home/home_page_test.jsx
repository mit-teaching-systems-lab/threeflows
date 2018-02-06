/* @flow weak */
import React from 'react';
import {shallow} from 'enzyme';
import {expect} from 'chai';

import HomePage from './home_page.jsx';
import RaisedButton from 'material-ui/RaisedButton';


describe('<HomePage />', () => {
  it('renders', () => {
    const wrapper = shallow(<HomePage />);
    expect(wrapper.find('a').length).to.equal(3);
    expect(wrapper.find(RaisedButton).length).to.equal(1);
  });
});
