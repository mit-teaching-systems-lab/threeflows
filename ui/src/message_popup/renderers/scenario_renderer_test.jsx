/* flow weak */
import React from 'react';
import {shallow} from 'enzyme';
import {expect} from 'chai';
import * as TestFixtures from '../test_fixtures.js';

import ScenarioRenderer from './scenario_renderer.jsx';


describe('<ScenarioRenderer />', () => {
  it('renders', () => {
    const question = TestFixtures.testQuestion;
    const wrapper = shallow(<ScenarioRenderer question={question} />);
    expect(wrapper.text()).to.equal(question.text);
  });
});
