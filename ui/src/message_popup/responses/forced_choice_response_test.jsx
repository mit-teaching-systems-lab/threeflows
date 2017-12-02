/* @flow weak */
import React from 'react';

import {shallow} from 'enzyme';
import {expect} from 'chai';
import sinon from 'sinon';
import RaisedButton from 'material-ui/RaisedButton';
import ForcedChoiceResponse from './forced_choice_response.jsx';

describe('<ForcedChoiceResponse />', ()=>{
  it('renders each choice as a button', () => {
    const props = {
      choices: ['choice #1','choice #2','choice #3'],
      onLogMessage: sinon.spy(),
      onResponseSubmitted: sinon.spy()
    };
    const wrapper = shallow(<ForcedChoiceResponse {...props} />);
    expect(wrapper.find(RaisedButton)).to.have.length(3);
  });

  it('logs the expected message', () => {
    // const props = {
    //   choices: ['choice #1','choice #2','choice #3'],
    //   onLogMessage: sinon.spy(),
    //   onResponseSubmitted: sinon.spy()
    // };
    // const wrapper = shallow(<ForcedChoiceResponse {...props} />);
    // expect(wrapper.find(RaisedButton)).to.have.length(3);
  });
});