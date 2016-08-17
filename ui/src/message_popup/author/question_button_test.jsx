import React from 'react';
import {mount, shallow, render} from 'enzyme';
import {expect} from 'chai';

import QuestionButton from './question_button.jsx';
import {testQuestion} from '../test_fixtures.js';
import {ListItem} from 'material-ui/List';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

describe('<QuestionButton />', () => {
  it('can shallow render with question text', () => {
    const wrapper = shallow(<QuestionButton question={testQuestion}/>);
    expect(wrapper.find(ListItem).props().secondaryText).to.equal(testQuestion.text);
  });

  it('can navigate when touched', () => {
    const wrapper = shallow(<QuestionButton question={testQuestion}/>);
    wrapper.find(ListItem).simulate('touchTap');
    expect(window.location.href).to.equal(`/teachermoments/author/questions/${testQuestion.id}`);
  });
});