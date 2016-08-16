import React from 'react';
import {shallow} from 'enzyme';
import {expect} from 'chai';

import RaisedButton from 'material-ui/RaisedButton';
import HintCard from './hint_card.jsx';
import VelocityTransitionGroup from "velocity-react/velocity-transition-group";


describe('<HintCard />', () => {
  it('can shallow render', () => {
    const wrapper = shallow(<HintCard examples={[]} nonExamples={[]} />);
    expect(wrapper.find('.HintCard').length).to.equal(1);
    expect(wrapper.find(RaisedButton).length).to.equal(1);
    expect(wrapper.find(RaisedButton).props().label).to.equal("Show Example");
  });

  it('renders Show Example button', () => {
    const wrapper = shallow(<HintCard examples={['exampleText']} nonExamples={[]} />);
    expect(wrapper.find(RaisedButton).length).to.equal(1);
    expect(wrapper.find(RaisedButton).props().label).to.equal("Show Example");
  });

  it('updates state after tapping Show Example button', () => {
    const wrapper = shallow(<HintCard examples={['exampleText']} nonExamples={[]} />);
    expect(wrapper.state().hidden).to.equal(true);
    wrapper.find(RaisedButton).simulate('touchTap');
    expect(wrapper.state().hidden).to.equal(false);
  });

  it('updates DOM after tapping Show Example button', () => {
    const wrapper = shallow(<HintCard examples={['exampleText']} nonExamples={[]} />);
    wrapper.find(RaisedButton).simulate('touchTap');

    expect(wrapper.find('.HintCard').length).to.equal(1);
    expect(wrapper.find(VelocityTransitionGroup).length).to.equal(1);
    expect(wrapper.find(RaisedButton).props().label).to.equal("Show another");
    expect(wrapper.contains('exampleText')).to.equal(true);
  });
});
