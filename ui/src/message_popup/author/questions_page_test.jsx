import React from 'react';
import {shallow} from 'enzyme';
import sinon from 'sinon';
import {expect} from 'chai';

import QuestionsPage from './questions_page.jsx';
import QuestionButton from './question_button.jsx';
import ArchivedQuestionButton from './archived_question_button.jsx';
import {testQuestions} from '../test_fixtures.js';

function testProps(props) {
  return {
    allQuestions: testQuestions,
    onReloadQuestions: sinon.spy(),
    loaded: true,
    ...props
  };
}

describe('<QuestionsPage />', ()=>{
  it('renders questions when loaded', ()=>{
    const props = testProps();
    const wrapper = shallow(<QuestionsPage {...props} />);
    expect(wrapper.find(QuestionButton)).to.have.length(testQuestions.currentQuestions.length);
    expect(wrapper.find(ArchivedQuestionButton)).to.have.length(testQuestions.archivedQuestions.length);
  });
  it('does not render questions when not loaded', ()=>{
    const props = testProps({loaded: false});
    const wrapper = shallow(<QuestionsPage {...props} />);
    expect(wrapper.find(QuestionButton)).to.have.length(0);
    expect(wrapper.find(ArchivedQuestionButton)).to.have.length(0);
  });
  it('does not render questions when none exist', ()=>{
    const props = testProps({
      allQuestions: {
        currentQuestions: [],
        archivedQuestions: []
      }
    });
    const wrapper = shallow(<QuestionsPage {...props} />);
    expect(wrapper.find(QuestionButton)).to.have.length(0);
    expect(wrapper.find(ArchivedQuestionButton)).to.have.length(0);
  });
});