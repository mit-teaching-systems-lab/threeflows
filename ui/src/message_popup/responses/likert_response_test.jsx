/* @flow weak */
import React from 'react';

import {shallow} from 'enzyme';
import {expect} from 'chai';
import sinon from 'sinon';
import RaisedButton from 'material-ui/RaisedButton';
import LikertResponse from './likert_response.jsx';
import {ResponseTypes} from '../data/response_types.js';

function testProps(props = {}) {
  return {
    onLogMessage: sinon.spy(),
    onResponseSubmitted: sinon.spy(),
    ...props
  };
}

describe('<LikertResponse />', ()=>{
  it('renders each choice as a button', () => {
    const props = testProps();
    const wrapper = shallow(<LikertResponse {...props} />);
    expect(wrapper.find(RaisedButton)).to.have.length(7);
  });

  it('logs a message and submits a response when clicked, showing all choices', () => {
    const props = testProps();
    const expectedParams = { 
      "choice": "Disagree",
      "choices": [
        "Strongly disagree",
        "Disagree",
        "Somewhat disagree",
        "Neither agree or disagree",
        "Somewhat agree",
        "Agree",
        "Strongly agree"
      ]
    };
    const wrapper = shallow(<LikertResponse {...props} />);
    wrapper.instance().onChoiceTapped('Disagree');
    expect(props.onLogMessage.firstCall.args).to.deep.equal([
      ResponseTypes.LIKERT_RESPONSE.type,
      expectedParams
    ]);
    expect(props.onResponseSubmitted.firstCall.args).to.deep.equal([
      expectedParams
    ]);
  });
});