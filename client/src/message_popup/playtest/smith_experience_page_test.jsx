/* @flow weak */
import React from 'react';

import {shallow} from 'enzyme';
import {expect} from 'chai';
import sinon from 'sinon';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import SmithExperiencePage from './smith_experience_page.jsx';


const context = {
  muiTheme: getMuiTheme(),
  auth: {
    userProfile: {
      email: 'user@foo.com'
    },
    doLogout: sinon.spy()
  }
};

const questions = [
  { text: 'hello' },
  { el: 'first thing happens' },
  { text: 'What did you notice? Take notes below!', notes: true },
  { el: 'something else happens' },
  { text: 'What did you notice? Take notes below!', notes: true },
  { text: 'Give feedback!', feedback: true },
  { text: 'PAUSE' },
  { el: 'second section scene' },
  { text: 'What did you notice? Take notes below!', notes: true },
  { text: 'Give feedback!', feedback: true },
];

describe('<SmithExperiencePage />', () => {
  it('#getNotesBeforeFeedbackIndex for first section', () => {
    const wrapper =  shallow(<SmithExperiencePage query={{}} />, { context});
    const responses = [
      { question: questions[0] },
      { question: questions[1] },
      { question: questions[2], responseText: 'foo' },
      { question: questions[3] },
      { question: questions[4], responseText: 'bar' },
    ];
    expect(wrapper.instance().getNotesBeforeFeedbackIndex(questions, responses, 5)).to.deep.equal(['foo', 'bar']);
  });

  it('#getNotesBeforeFeedbackIndex for second section', () => {
    const wrapper =  shallow(<SmithExperiencePage query={{}} />, { context});
    const responses = [
      { question: questions[0] },
      { question: questions[1] },
      { question: questions[2], responseText: 'foo' },
      { question: questions[3] },
      { question: questions[4], responseText: 'bar' },
      { question: questions[5], responseText: 'this is my feedback' },
      { question: questions[6] },
      { question: questions[7] },
      { question: questions[8], responseText: 'yaaaaay' },
    ];
    expect(wrapper.instance().getNotesBeforeFeedbackIndex(questions, responses, 9)).to.deep.equal(['yaaaaay']);
  });
});
