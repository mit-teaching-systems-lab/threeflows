/* @flow weak */
import React from 'react';
import {shallow} from 'enzyme';
import {expect} from 'chai';

import DemosPage from './demos_page.jsx';
import {List, ListItem} from 'material-ui/List';


describe('<DemosPage />', () => {
  it('renders', () => {
    const wrapper = shallow(<DemosPage />);
    expect(wrapper.find(List).length).to.equal(2);
    expect(wrapper.find(ListItem).length).to.equal(13);
  });
});
