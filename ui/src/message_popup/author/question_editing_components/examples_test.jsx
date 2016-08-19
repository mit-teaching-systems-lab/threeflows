import React from 'react';
import {shallow} from 'enzyme';
import {expect} from 'chai';
import sinon from 'sinon';

import {testQuestion} from '../../test_fixtures.js';
import Examples from './examples.jsx';
import TextField from 'material-ui/TextField';

function testProps(props){
  return ({
    type: 'Good',
    examplesText: testQuestion.examples.join('\n\n'),
    onExamplesChange: sinon.spy(),
    ...props
  });
}

describe('<EditingComponent.Examples />', ()=>{
  it('renders the correct good examples text', ()=>{
    const props = testProps();
    const wrapper = shallow(<Examples {...props} />);
    console.log(wrapper.debug());
    const text = testQuestion.examples.join('\n\n');
    expect(wrapper.find(TextField)).to.have.length(1);
    expect(wrapper.find(TextField).props().value).to.equal(text);
  });
});