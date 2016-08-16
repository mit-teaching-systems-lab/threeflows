import React from 'react';
import _ from 'lodash';

import {shallow, mount} from 'enzyme';
import sinon from 'sinon';
import {expect} from 'chai';
import {allQuestions} from './questions.js';
import {withStudents} from './transformations.jsx';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import PopupQuestion from './popup_question.jsx';
import SummaryCard from './summary_card.jsx';
import ScenarioRenderer from './renderers/scenario_renderer.jsx';
import PromptsRenderer from './renderers/prompts_renderer.jsx';
import ResponseRenderer from './renderers/response_renderer.jsx';

const testQuestion = _.first(withStudents(allQuestions));
const practiceScaffolding = {
  helpType: 'feedback',
  shouldShowStudentCard: true,
  shouldShowSummary: true
};

const solutionScaffolding = {
  helpType: 'solution',
  shouldShowStudentCard: true,
  shouldShowSummary: false
};

function createResponse() {
  return {
    initialResponseText: 'foo',
    finalResponseText: 'bar',
    elapsedMs: 4303,
    didRevise: false
  };
}

function testProps(props) {
  const onLogSpy = sinon.spy();
  const onDoneSpy = sinon.spy();

  return {
    question: testQuestion,
    scaffolding: practiceScaffolding,
    limitMs: 30000,
    onLog: onLogSpy,
    onDone: onDoneSpy,
    isLastQuestion: false,
    ...props
  };
}


describe('<PopupQuestion />', () => {
  it('renders the question in practice mode', () => {    
    const props = testProps();
    const wrapper = shallow(<PopupQuestion {...props} />);
    expect(wrapper.find(ScenarioRenderer).length).to.equal(1);
    expect(wrapper.find(PromptsRenderer).length).to.equal(1);
    expect(wrapper.find(ResponseRenderer).length).to.equal(1);
    expect(wrapper.find(SummaryCard).length).to.equal(0);
  });

  it('renders the question in solution mode', () => {    
    const props = testProps({ scaffolding: solutionScaffolding });
    const wrapper = shallow(<PopupQuestion {...props} />);
    expect(wrapper.find(ScenarioRenderer).length).to.equal(1);
    expect(wrapper.find(PromptsRenderer).length).to.equal(1);
    expect(wrapper.find(ResponseRenderer).length).to.equal(1);
    expect(wrapper.find(SummaryCard).length).to.equal(0);
  });

  // This is stuck on full mounting, maybe because of Material?
  // it('shows the summary after the user responds', (done) => {    
  //   const props = testProps();
  //   const response = createResponse();
  //   const wrapper = shallow(<PopupQuestion {...props} />);
  //   wrapper.instance().onResponseSubmitted(response);
    
  //   expect(wrapper.state().response).to.equal(response);
  //   // expect(4).to.equal(5);
  //   // expect(wrapper.find(ResponseRenderer).find(length).to.equal(1);
  //   // wrapper.find(RaisedButton).simulate('touchTap');
  //   setTimeout(() => {
  //     console.log(wrapper.debug());
  //     expect(wrapper.find('.foo').length).to.equal(1);
  //     done();
  //   }, 1000);
  // });
});
