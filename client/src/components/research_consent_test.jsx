/* @flow weak */
import React from 'react';

import {shallow} from 'enzyme';
import {expect} from 'chai';
import sinon from 'sinon';

import RaisedButton from 'material-ui/RaisedButton';
import ResearchConsent from './research_consent.jsx';


function createProps() {
  return {
    onLogMessage: sinon.spy()
  };
}

describe('<ResearchConsent />', ()=>{
  it('renders', ()=>{
    const props = createProps();
    const wrapper = shallow(<ResearchConsent {...props} />);
    expect(wrapper.find('.explain-consent').length).to.equal(1);
    expect(wrapper.find(RaisedButton).length).to.equal(2);
  });
});