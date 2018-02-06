import React from 'react';
import {shallow} from 'enzyme';
import {expect} from 'chai';
import sinon from 'sinon';

import QuestionButton from './question_button.jsx';
import {testQuestion} from '../test_fixtures.js';
import {ListItem} from 'material-ui/List';

function testProps(props) {
  return {
    question: testQuestion,
    doNavigate: sinon.spy(),
    ...props
  };
}

describe('<QuestionButton />', () => {
  it('can shallow render with question text', () => {
    const props = testProps();
    const wrapper = shallow(<QuestionButton {...props} />);
    expect(wrapper.find(ListItem).props().secondaryText).to.equal(testQuestion.text);
  });

  it('can navigate when touched', () => {
    const props = testProps();
    const wrapper = shallow(<QuestionButton {...props} />);
    wrapper.find(ListItem).simulate('touchTap');
    expect(props.doNavigate.firstCall.args).to.deep.equal([`/teachermoments/author/questions/${testQuestion.id}`]);
  });
});