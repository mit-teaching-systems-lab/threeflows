import React from 'react';
import _ from 'lodash';
import {mount, shallow} from 'enzyme';
import {expect} from 'chai';

import QuestionsPage from './questions_page.jsx';
import QuestionButton from './question_button.jsx';
import ArchivedQuestionButton from './archived_question_button.jsx';
import {testQuestions} from '../test_fixtures.js';

import TestAuthContainer from '../../test_auth_container.jsx';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

function testProps(props) {
  return {
    allQuestions: testQuestions,
    loaded: true,
    ...props
  };
}

function withContext(child) {
  return (
    <MuiThemeProvider>
      <TestAuthContainer>
        {child}
      </TestAuthContainer>
    </MuiThemeProvider>
  );
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
  it('redirects when a question is touched', ()=>{
    const props = testProps();
    const wrapper = mount(withContext(<QuestionsPage {...props} />));
    const firstQuestionButton = wrapper.find(QuestionButton).first();
    firstQuestionButton.simulate('touchTap');
    expect(window.location.href).to.equal(`/teachermoments/author/questions/${_.first(testQuestions.currentQuestions).id}`);
  });
});