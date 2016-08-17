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
import RevisingTextResponse from './renderers/revising_text_response.jsx';
import AudioResponse from './renderers/audio_response.jsx';


function testProps(props) {
  return {
    question: TestFixtures.testQuestion,
    scaffolding: TestFixtures.practiceScaffolding,
    limitMs: 30000,
    onLog: sinon.spy(),
    onDone: sinon.spy(),
    isLastQuestion: false,
    drawResponseMode: () => 'text',
    ...props
  };
}

function expectChildElementsIn(wrapper) {
  expect(wrapper.find(ScenarioRenderer).length).to.equal(1);
  expect(wrapper.find(PromptsRenderer).length).to.equal(1);
  expect(wrapper.find(SummaryCard).length).to.equal(0);
}

// TODO(kr) using shallow rendering prevents all component lifecycles
// methods from working
describe('<PopupQuestion />', () => {
  it('renders the question in practice mode', () => {    
    const props = testProps();
    const wrapper = shallow(<PopupQuestion {...props} />);
    expectChildElementsIn(wrapper);
  });

  it('renders the question in solution mode', () => {    
    const props = testProps({ scaffolding: TestFixtures.solutionScaffolding });
    const wrapper = shallow(<PopupQuestion {...props} />);
    expectChildElementsIn(wrapper);
  });

  it('renders the text response', () => {    
    const props = testProps();
    const wrapper = shallow(<PopupQuestion {...props} />);
    wrapper.setState({ allowResponding: true });

    expectChildElementsIn(wrapper);
    expect(wrapper.find(RevisingTextResponse).length).to.equal(1);
  });

  it('renders audio responses', () => {    
    const props = testProps({ drawResponseMode: () => 'audio' });
    const wrapper = shallow(<PopupQuestion {...props} />);
    wrapper.setState({ allowResponding: true });

    expectChildElementsIn(wrapper);
    expect(wrapper.find(AudioResponse).length).to.equal(1);
  });
});
