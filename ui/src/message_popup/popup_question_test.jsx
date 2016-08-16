/* flow weak */
import React from 'react';

import {shallow} from 'enzyme';
import sinon from 'sinon';
import {expect} from 'chai';
import * as TestFixtures from './test_fixtures.js';

import PopupQuestion from './popup_question.jsx';
import SummaryCard from './summary_card.jsx';
import ScenarioRenderer from './renderers/scenario_renderer.jsx';
import PromptsRenderer from './renderers/prompts_renderer.jsx';
import ResponseRenderer from './renderers/response_renderer.jsx';


function testProps(props) {
  return {
    question: TestFixtures.testQuestion,
    scaffolding: TestFixtures.practiceScaffolding,
    limitMs: 30000,
    onLog: sinon.spy(),
    onDone: sinon.spy(),
    isLastQuestion: false,
    ...props
  };
}

function expectChildElementsIn(wrapper) {
  expect(wrapper.find(ScenarioRenderer).length).to.equal(1);
  expect(wrapper.find(PromptsRenderer).length).to.equal(1);
  expect(wrapper.find(SummaryCard).length).to.equal(0);
}

describe('<PopupQuestion />', () => {
  it('renders the question in practice mode', () => {    
    const props = testProps();
    const wrapper = shallow(<PopupQuestion {...props} />);
    expectChildElementsIn(wrapper);
    expect(wrapper.find(ResponseRenderer).length).to.equal(0);
  });

  it('renders the question in solution mode', () => {    
    const props = testProps({ scaffolding: TestFixtures.solutionScaffolding });
    const wrapper = shallow(<PopupQuestion {...props} />);
    expectChildElementsIn(wrapper);
    expect(wrapper.find(ResponseRenderer).length).to.equal(0);
  });

  it('renders the response', () => {    
    const props = testProps();
    const wrapper = shallow(<PopupQuestion {...props} />);
    wrapper.setState({ showResponse: true });

    expectChildElementsIn(wrapper);
    expect(wrapper.find(ResponseRenderer).length).to.equal(1);
  });
});
