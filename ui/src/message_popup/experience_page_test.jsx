/* flow weak */
import React from 'react';
import ReactDOM from 'react-dom';

import {shallow, mount} from 'enzyme';
import {expect} from 'chai';
import TestAuthContainer from '../test_auth_container.jsx';

import ExperiencePage from './experience_page.jsx';
import NavigationAppBar from '../components/navigation_app_bar.jsx';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

//
describe('<ExperiencePage />', () => {
  it('renders', () => {    
    const wrapper = mount(
      <MuiThemeProvider>
        <TestAuthContainer>
          <ExperiencePage query={{modes: true}} />
        </TestAuthContainer>
      </MuiThemeProvider>
    );
    // console.log(wrapper.debug());
    expect(wrapper.find(NavigationAppBar)).to.have.length(1);
    // const el = ReactDOM.findDOMNode(wrapper.instance());
    // expect(getComputedStyle(el).width).to.equal(33);
    // expect(wrapper.props()).to.equal(4);
  });
});
