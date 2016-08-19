/* @flow weak */
import React from 'react';

import {shallow} from 'enzyme';
import {expect} from 'chai';
import sinon from 'sinon';
import * as TestFixtures from '../test_fixtures.js';

import AudioResponse from './audio_response.jsx';
import AudioRecorderFlow from '../../components/audio_recorder_flow.jsx';

function testProps(props) {
  return {
    question: TestFixtures.testQuestion,
    scaffolding: TestFixtures.practiceScaffolding,
    limitMs: 30000,
    elapsedMs: 0,
    onLogMessage: sinon.spy(),
    onResponseSubmitted: sinon.spy(),
    ...props
  };
}

describe('<AudioResponse />', () => {
  it('renders', () => {
    const props = testProps();
    const wrapper = shallow(<AudioResponse {...props} />);
    expect(wrapper.find(AudioRecorderFlow).length).to.equal(1);
  });

  it('logs and submits response when capture flow is done', () => {
    const audioUrl = 'https://foo.bar/123';
    const props = testProps();
    const wrapper = shallow(<AudioResponse {...props} />);
    wrapper.instance().onDone(audioUrl);

    expect(props.onLogMessage.callCount).to.equal(1);
    expect(props.onLogMessage.firstCall.args).to.deep.equal([
      'message_popup_audio_response',
      {audioUrl}
    ]);
    expect(props.onResponseSubmitted.firstCall.args[0]).to.deep.equal({audioUrl});
  });
});
