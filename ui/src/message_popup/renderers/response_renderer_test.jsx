/* flow weak */
import React from 'react';

import {shallow} from 'enzyme';
import {expect} from 'chai';
import sinon from 'sinon';
import * as TestFixtures from '../test_fixtures.js';

import ResponseRenderer from './response_renderer.jsx';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FeedbackCard from '../feedback_card.jsx';
import Snackbar from 'material-ui/Snackbar';

function testProps(props) {
  return {
    question: TestFixtures.testQuestion,
    scaffolding: TestFixtures.practiceScaffolding,
    limitMs: 30000,
    onLogMessage: sinon.spy(),
    onResponseSubmitted: sinon.spy(),
    ...props
  };
}

describe('<ResponseRenderer />', () => {
  it('renders in practice mode', () => {
    const props = testProps();
    const wrapper = shallow(<ResponseRenderer {...props} />);
    
    expect(wrapper.find(TextField).props().disabled).to.equal(false);
    expect(wrapper.find(RaisedButton).props().label).to.equal('Save Response');
    expect(wrapper.find(Snackbar).props().open).to.equal(false);
    expect(wrapper.find(FeedbackCard).length).to.equal(0);
  });

  it('renders differently in solution mode', () => {
    const props = testProps({ scaffolding: TestFixtures.solutionScaffolding });
    const wrapper = shallow(<ResponseRenderer {...props} />);

    expect(wrapper.find(RaisedButton).props().label).to.equal('Respond');
  });

  it('allows revision in practice mode', () => {
    const props = testProps();
    const wrapper = shallow(<ResponseRenderer {...props} />);
    
    wrapper.find(RaisedButton).simulate('touchTap');
    expect(wrapper.find(FeedbackCard).length).to.equal(1);
    expect(props.onLogMessage.callCount).to.equal(1);
    expect(props.onResponseSubmitted.callCount).to.equal(0);
  });

  it('submits response immediately in solution mode', () => {
    const props = testProps({ scaffolding: TestFixtures.solutionScaffolding });
    const wrapper = shallow(<ResponseRenderer {...props} />);
    const responseText = 'foo';

    wrapper.find(TextField).simulate('change', { target: { value: responseText } });
    wrapper.find(RaisedButton).simulate('touchTap');
    expect(wrapper.find(FeedbackCard).length).to.equal(0);
    expect(props.onLogMessage.callCount).to.equal(1);
    expect(props.onResponseSubmitted.firstCall.args[0]).to.deep.equal({
      initialResponseText: responseText,
      finalResponseText: responseText,
      elapsedMs: 0, // timer doesn't start since this is a shallow test
      didRevise: false
    });
  });
});
