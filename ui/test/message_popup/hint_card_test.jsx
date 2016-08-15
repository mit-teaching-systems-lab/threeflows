import React from 'react';
import {mount, shallow} from 'enzyme';
import {expect} from 'chai';
import sinon from 'sinon';

import RaisedButton from 'material-ui/RaisedButton';
import HintCard from '../src/message_popup/hint_card.jsx';
import VelocityTransitionGroup from "velocity-react/velocity-transition-group";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


describe('<HintCard />', () => {
  it('can shallow render', () => {
    const wrapper = shallow(<HintCard />);
    expect(wrapper.find('.HintCard').length).to.equal(1);
    expect(wrapper.find(RaisedButton).length).to.equal(1);
    expect(wrapper.find(RaisedButton).props().label).to.equal("Show Example");
  });

  it('DOES NOT fail, only warns when missing required props', () => {
    const wrapper = shallow(<HintCard />);
    expect(wrapper.find('.HintCard').length).to.equal(1);
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

  it('DOES NOT work to mock methods, because of autobinding', () => {
    sinon.spy(HintCard.prototype, 'onHintsToggled');
    const wrapper = shallow(<HintCard examples={['exampleText']} nonExamples={[]} />);
    wrapper.find(RaisedButton).simulate('touchTap');
    expect(HintCard.prototype.onHintsToggled.callCount).to.equal(0);
  });

  it('DOES NOT render VelocityTransitionGroup correctly with full rendering', (done) => {
    const wrapper = mount(<MuiThemeProvider>
      <HintCard examples={['exampleText']} nonExamples={[]} />
    </MuiThemeProvider>);
    wrapper.find(RaisedButton).simulate('click');

    expect(wrapper.find('.HintCard').length).to.equal(1);
    setTimeout(() => {
      expect(wrapper.find(VelocityTransitionGroup).find(RaisedButton).length).to.equal(0);
      done();
    }, 1500);
  });
});



// nested integration-style tests
// rendering inside VelocityTransitionGroup
// web inspector debugging
// warning only if prop is missing or the wrong type
