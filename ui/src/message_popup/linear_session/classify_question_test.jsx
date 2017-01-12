/* @flow weak */
import _ from 'lodash';
import React from 'react';

import {shallow} from 'enzyme';
import {expect} from 'chai';
import sinon from 'sinon';

import ClassifyQuestion from './classify_question.jsx';
import PlainTextQuestion from '../renderers/plain_text_question.jsx';
import ChoiceForBehaviorResponse from '../renderers/choice_for_behavior_response.jsx';
import {InsubordinationScenarios} from '../playtest/insubordination_scenarios.js';

describe('<ClassifyQuestion />', ()=>{
  it('renders', ()=>{
    const question = _.first(InsubordinationScenarios.questionsFor(0));
    const props = {
      question: question,
      choices: question.choices,
      onLogMessage: sinon.spy(),
      onResponseSubmitted: sinon.spy()
    };
    const wrapper = shallow(<ClassifyQuestion {...props} />);
    expect(wrapper.find(PlainTextQuestion)).to.have.length(1);
    expect(wrapper.find(ChoiceForBehaviorResponse)).to.have.length(1);
  });
});