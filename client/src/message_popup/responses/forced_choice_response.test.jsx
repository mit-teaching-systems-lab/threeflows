/* @flow weak */
import React from 'react';

import {shallow} from 'enzyme';
import {expect} from 'chai';
import sinon from 'sinon';
import RaisedButton from 'material-ui/RaisedButton';
import ForcedChoiceResponse from './forced_choice_response.jsx';
import {ResponseTypes} from '../data/response_types.js';

function testProps(props = {}) {
  return {
    choices: ['choice #1','choice #2','choice #3'],
    onLogMessage: sinon.spy(),
    onResponseSubmitted: sinon.spy(),
    ...props
  };
}

describe('<ForcedChoiceResponse />', ()=>{
  it('renders each choice as a button', () => {
    const props = testProps();
    const wrapper = shallow(<ForcedChoiceResponse {...props} />);
    expect(wrapper.find(RaisedButton)).to.have.length(3);
  });

  it('logs a message and submits a response when clicked', () => {
    const props = testProps();
    const wrapper = shallow(<ForcedChoiceResponse {...props} />);
    wrapper.instance().onChoiceTapped(props.choices[0]);
    expect(props.onLogMessage.firstCall.args).to.deep.equal([
      ResponseTypes.FORCED_CHOICE_RESPONSE.type,
      { choice: 'choice #1' }
    ]);
    expect(props.onResponseSubmitted.firstCall.args).to.deep.equal([
      { choice: 'choice #1' }
    ]);
  });
});