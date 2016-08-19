import React from 'react';
import {shallow} from 'enzyme';
import {expect} from 'chai';
import sinon from 'sinon';

import Indicators from './indicators.jsx';

import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';

import {testQuestion} from '../../test_fixtures.js'
import {withIndicator} from '../../transformations.jsx';
import {indicators} from '../../../data/indicators.js';

function testProps(props){
  return ({
    indicator: withIndicator(testQuestion).indicator,
    onIndicatorChange: sinon.spy()
  });
}

describe('<EditingComponent.Inidicators />', ()=>{
  it('renders all the available indicators', ()=>{
    const props = testProps();
    const wrapper = shallow(<Indicators {...props} />);
    expect(wrapper.find(RadioButtonGroup)).to.have.length(1);
    expect(wrapper.find(RadioButton)).to.have.length(indicators.length);
    wrapper.find(RadioButton).forEach((node) => {
      expect(node.props().value).to.be.oneOf(indicators.map(indicator => indicator.id.toString()));
    });
  });
  it('selects the correct initial indicator', ()=>{
    const props = testProps();
    const wrapper = shallow(<Indicators {...props} />);
    expect(wrapper.find(RadioButtonGroup).props().valueSelected).to.equal(testQuestion.indicatorId.toString());
  });
  it('changes to the correct indicator', ()=>{
    const props = testProps();
    const wrapper = shallow(<Indicators {...props} />);
    const newIndicator = indicators[1];
    wrapper.find(RadioButtonGroup).simulate('change', {target: {value: newIndicator.id}});
    expect(props.onIndicatorChange.callCount).to.equal(1);
    expect(props.onIndicatorChange.firstCall.args).to.deep.equal([{target: {value: newIndicator.id}}]);
  });
});