/* @flow weak */
import React from 'react';

import {shallow} from 'enzyme';
import sinon from 'sinon';
import {expect} from 'chai';
import * as TestFixtures from './test_fixtures.js';

import ScaffoldingCard from './scaffolding_card.jsx';
import RaisedButton from 'material-ui/RaisedButton';
import {RadioButtonGroup} from 'material-ui/RadioButton';
import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';
import Slider from 'material-ui/Slider';


function testProps(props) {
  return {
    scaffolding: TestFixtures.practiceScaffolding,
    initialEmail: 'user@test.com',
    query: {},
    onSessionConfigured: sinon.spy(),
    ...props
  };
}

function expectCoreOptions(wrapper) {
  expect(wrapper.text()).to.contain('Practice scenarios:');
  expect(wrapper.find('RadioButtonGroup[name="indicatorId"]').length).to.equal(1);

  expect(wrapper.text()).to.contain('Session length:');
  expect(wrapper.find(Slider).length).to.equal(1);

  expect(wrapper.find('TextField[name="email"]').props().floatingLabelText).to.equal("What's your email address?");
  expect(wrapper.find('RaisedButton[label="Start"]').length).to.equal(1);
}



describe('<ScaffoldingCard />', () => {
  it('renders', () => {
    const props = testProps();
    const wrapper = shallow(<ScaffoldingCard {...props} />);
    expectCoreOptions(wrapper);
  });

  it('renders all options with ?all in query params', () => {
    const props = testProps({ query: { all: true }});
    const wrapper = shallow(<ScaffoldingCard {...props} />);

    expectCoreOptions(wrapper);
    expect(wrapper.text()).to.contain('Respond by:');
    expect(wrapper.find('RadioButtonGroup[name="responseMode"]').length).to.equal(1);

    expect(wrapper.text()).to.contain('Scaffolding');
    expect(wrapper.find(Toggle).length).to.equal(3);
    expect(wrapper.find('RadioButtonGroup[name="helpOptions"]').length).to.equal(1);
  });
});
