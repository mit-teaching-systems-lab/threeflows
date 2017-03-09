/* @flow weak */
import React from 'react';

import {shallow} from 'enzyme';
import {expect} from 'chai';
import sinon from 'sinon';

import ChoiceForBehaviorResponse from '../renderers/choice_for_behavior_response.jsx';
import RaisedButton from 'material-ui/RaisedButton';

describe('<ChoiceForBehaviorResponse />', ()=>{
  it('renders each choice as a button', ()=>{
    const props = {
      choices: ['choice #1','choice #2','choice #3'],
      onLogMessage: sinon.spy(),
      onResponseSubmitted: sinon.spy()
    };
    const wrapper = shallow(<ChoiceForBehaviorResponse {...props} />);
    expect(wrapper.find(RaisedButton)).to.have.length(3);
  });
});