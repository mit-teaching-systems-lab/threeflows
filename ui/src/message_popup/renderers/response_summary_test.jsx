/* @flow weak */
import React from 'react';

import {shallow} from 'enzyme';
import {expect} from 'chai';

import ResponseSummary from './response_summary.jsx';


describe('<ResponseSummary />', () => {
  it('#computeSummaryItems for audio responses and two types of text responses', () => {
    const responses = [{
      question: { id: 'foo1', text: 'hello1' },
      choice: 'OK'
    }, {
      question: { id: 'foo2', text: 'hello2' },
      audioResponse: { downloadUrl: 'bar2'  }
    }, {
      question: { id: 'foo3', text: 'hello3' },
      textResponse: { responseText: 'bar3' }
    }, {
      question: { id: 'foo4', text: 'hello4' },
      responseText: 'bar4'
    }];
    const wrapper =  shallow(<ResponseSummary responses={responses} />);
    expect(wrapper.instance().computeSummaryItems()).to.deep.equal([
      { questionId: 'foo2', questionText: 'hello2', audioUrl: 'bar2' },
      { questionId: 'foo3', questionText: 'hello3', responseText: 'bar3' },
      { questionId: 'foo4', questionText: 'hello4', responseText: 'bar4' }
    ]);
  });
});