/* @flow weak */
import React from 'react';
import ReactDOM from 'react-dom';
import {shallow} from 'enzyme';
import {expect} from 'chai';
import withContext from '../../../test/with_context.jsx';
import EquityFairPage from './equity_fair_page.jsx';
import Paper from 'material-ui/Paper';


describe('<EquityFairPage />', () => {
  it('renders', () => {
    const div = document.createElement('div');
    ReactDOM.render(withContext(<EquityFairPage />), div);
  });

  it('renders Paper for each practice space', () => {
    const wrapper = shallow(<EquityFairPage />);
    expect(wrapper.find(Paper).length).to.equal(19);
  });
});
