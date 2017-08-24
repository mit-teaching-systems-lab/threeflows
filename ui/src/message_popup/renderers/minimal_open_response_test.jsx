/* @flow weak */
import React from 'react';

import {shallow} from 'enzyme';
import {expect} from 'chai';
import sinon from 'sinon';

import MinimalOpenResponse from './minimal_open_response.jsx';


function testProps(props) {
  return {
    onLogMessage: sinon.spy(),
    onResponseSubmitted: sinon.spy(),
    ...props
  };
}

describe('<MinimalOpenResponse />', () => {
  it('logs and submits response when capture flow is done', () => {
    const props = testProps();
    const wrapper = shallow(<MinimalOpenResponse {...props} />);
    wrapper.instance().onDoneText({responseText: 'foo'});

    // calls to onLogMessage are done by an inner component, but this is a shallow test
    expect(props.onResponseSubmitted.callCount).to.equal(1);
    expect(props.onResponseSubmitted.firstCall.args).to.deep.equal([
      { textResponse: { responseText: 'foo' } }
    ]);
    expect(props.onResponseSubmitted.firstCall.args[0]).to.deep.equal({ textResponse: { responseText: 'foo' } });
  });
});
