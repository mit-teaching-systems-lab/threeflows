/* @flow weak */
import * as React from 'react';

import {shallow} from 'enzyme';
import {expect} from 'chai';

import AuthContainer from './auth_container.jsx';

describe('<AuthContainer />', () => {
  // Mock localStorage
  beforeEach(() => {
    window.localStorage = { getItem(key) { return null; } };
  });

  it('validateEmail', () => {    
    const wrapper = shallow(<AuthContainer isEmailRequired={true}><div /></AuthContainer>);
    expect(wrapper.instance().validateEmail('krob@mit.edu')).to.equal(true);
    expect(wrapper.instance().validateEmail('krob@@@xyz')).to.equal(false);
  });
});
