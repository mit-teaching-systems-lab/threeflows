/* @flow weak */
import React from 'react';

import {shallow} from 'enzyme';
import {expect} from 'chai';
import sinon from 'sinon';
import TimedAutoAdvanceResponse from './timed_auto_advance_response.jsx';
import {ResponseTypes} from '../data/response_types.js';

function testProps(props = {}) {
  return {
    onLogMessage: sinon.spy(),
    onResponseSubmitted: sinon.spy(),
    ...props
  };
}

describe('<TimedAutoAdvanceResponse />', () => {
  it('within timeout, logs a message and submits a response', done => {
    const props = testProps({ delayMs: 100 });
    const wrapper = shallow(<TimedAutoAdvanceResponse {...props} />);
    wrapper.instance().componentDidMount();
    setTimeout(() => {
      expect(props.onLogMessage.firstCall.args).to.deep.equal([
        ResponseTypes.TIMED_AUTO_ADVANCE_RESPONSE.type,
        {}
      ]);
      expect(props.onResponseSubmitted.firstCall.args).to.deep.equal([
        { ignore: true }
      ]);
      done();
    }, 500);
  });

  it('includes skipTapped if user skips', () => {
    const props = testProps({ delayMs: 100 });
    const wrapper = shallow(<TimedAutoAdvanceResponse {...props} />);
    wrapper.instance().onSkipTapped();
    expect(props.onLogMessage.firstCall.args).to.deep.equal([
      ResponseTypes.TIMED_AUTO_ADVANCE_RESPONSE.type,
      { skipTapped: true }
    ]);
    expect(props.onResponseSubmitted.firstCall.args).to.deep.equal([
      { ignore: true }
    ]);
  });
});