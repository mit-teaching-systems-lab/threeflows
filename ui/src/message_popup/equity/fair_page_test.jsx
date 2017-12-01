/* @flow weak */
import React from 'react';
import ReactDOM from 'react-dom';
import {shallow} from 'enzyme';
import {expect} from 'chai';

import FairPage from './fair_page.jsx';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TestAuthContainer from '../../test_auth_container.jsx';
import Paper from 'material-ui/Paper';


describe('<FairPage />', () => {
  it('renders', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <MuiThemeProvider>
        <TestAuthContainer>
          <FairPage />
        </TestAuthContainer>
      </MuiThemeProvider>
    , div);
  });

  it('renders Paper for each practice space', () => {
    const wrapper = shallow(<FairPage />);
    expect(wrapper.find(Paper).length).to.equal(7);
  });
});
