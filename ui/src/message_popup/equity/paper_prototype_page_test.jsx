/* @flow weak */
import React from 'react';
import ReactDOM from 'react-dom';
import {shallow} from 'enzyme';
// import {expect} from 'chai';

import PaperPrototypePage from './paper_prototype_page.jsx';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TestAuthContainer from '../../test_auth_container.jsx';
// import Paper from 'material-ui/Paper';


describe('#doStart', () => {
  const prototypeKeys = [
    'group-unfair',
    'mixing-languages',
    'cell-posters',
    'coordinates-privilege',
    'asian-population-growth',
    'maria-absent',
    'tom-absent',
    'inclusion-special-ed',
    'math-questions',
    'bethany-conference-ela',
    'bethany-conference-elementary-science'
  ];
  prototypeKeys.forEach(prototypeKey => {
    it('does not throw for prototypeKey=' + prototypeKey, () => {
      const wrapper = shallow(<PaperPrototypePage prototypeKey={prototypeKey} query={{}} />);
      wrapper.instance().doStart();
    });
  });
});


it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <MuiThemeProvider>
      <TestAuthContainer>
        <PaperPrototypePage prototypeKey="cell-posters" query={{}} />
      </TestAuthContainer>
    </MuiThemeProvider>
  , div);
});
