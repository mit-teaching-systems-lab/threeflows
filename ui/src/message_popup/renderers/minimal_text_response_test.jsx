/* @flow weak */
import React from 'react';

import {shallow} from 'enzyme';
import {expect} from 'chai';
import sinon from 'sinon';

import MinimalTextResponse from './minimal_text_response.jsx';


function testProps(props) {
  return {
    onLogMessage: sinon.spy(),
    onResponseSubmitted: sinon.spy(),
    ...props
  };
}

describe('<MinimalTextResponse />', () => {
  it('logs and submits response when capture flow is done', () => {
    const props = testProps();
    const wrapper = shallow(<MinimalTextResponse {...props} />);
    wrapper.instance().setState({responseText: 'foo'});
    wrapper.instance().onRespondTapped();

    expect(props.onLogMessage.callCount).to.equal(1);
    expect(props.onLogMessage.firstCall.args).to.deep.equal([
      'message_popup_text_response',
      { responseText: 'foo' }
    ]);
    expect(props.onResponseSubmitted.firstCall.args[0]).to.deep.equal({ responseText: 'foo' });
  });
});
