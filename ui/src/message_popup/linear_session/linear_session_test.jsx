/* @flow weak */
import React from 'react';

import {shallow} from 'enzyme';
import {expect} from 'chai';
import sinon from 'sinon';

import LinearSession from './linear_session.jsx';
import VelocityTransitionGroup from "velocity-react/velocity-transition-group";
import {InsubordinationScenarios} from '../playtest/insubordination_scenarios.js';

describe('<LinearSession />', ()=>{
  it('renders', ()=>{
    const props = {
      questions: InsubordinationScenarios.questionsFor(0),
      questionEl: sinon.spy(),
      summaryEl: sinon.spy(),
      onLogMessage: sinon.spy()
    };
    const wrapper = shallow(<LinearSession {...props} />);
    expect(wrapper.find(VelocityTransitionGroup)).to.have.length(1);
  });

  it('takes responses, logs them and updates state', ()=>{
    const props = {
      questions: InsubordinationScenarios.questionsFor(0),
      questionEl: sinon.spy(),
      summaryEl: sinon.spy(),
      onLogMessage: sinon.spy()
    };
    const wrapper = shallow(<LinearSession {...props} />);
    wrapper.instance().onResponseSubmitted({}, 'black_box_response');
    expect(wrapper.instance().state.responses).to.deep.equal(['black_box_response']);
    expect(props.onLogMessage.callCount).to.equal(1);
  });
});