import React from 'react';
import {shallow} from 'enzyme';
import {expect} from 'chai';
import sinon from 'sinon';

import QuestionText from './question_text.jsx';

import TextField from 'material-ui/TextField';

import {testQuestion} from '../../test_fixtures.js';

function testProps(props){
  return ({
    originalText: testQuestion.text,
    questionText: testQuestion.text + ' THIS HAS BEEN EDITED!',
    onQuestionTextChange: sinon.spy(),
    ...props
  });
}

describe('<QuestionText />', ()=>{
  it('renders the original question text', ()=>{
    const props = testProps();
    const wrapper = shallow(<QuestionText {...props} />);
    expect(wrapper.find(".originalQuestionText").text()).to.equal(props.originalText);
    expect(wrapper.find(TextField)).to.have.length(1);
    expect(wrapper.find(TextField).props().value).to.equal(props.questionText);
  });
  it('does not render original question text if not provided', ()=>{
    const props = testProps({originalText: undefined});
    const wrapper = shallow(<QuestionText {...props} />);
    expect(wrapper.find(".originalQuestionText")).to.have.length(0);
  });
  it('returns the changed text', ()=>{
    const props = testProps();
    const wrapper = shallow(<QuestionText {...props} />);
    wrapper.find(TextField).simulate('change', { target: { value: testQuestion.text } });
    expect(props.onQuestionTextChange.callCount).to.equal(1);
    expect(props.onQuestionTextChange.firstCall.args).to.deep.equal([testQuestion.text]);
  });
});