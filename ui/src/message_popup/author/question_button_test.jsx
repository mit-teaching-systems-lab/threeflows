import React from 'react';
import {mount, shallow, render} from 'enzyme';
import {expect} from 'chai';

import QuestionButton from './question_button.jsx';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

describe('<QuestionButton />', () => {
  it('can shallow render without a Material UI Theme', () => {
    const wrapper = shallow(<Foo hello="world" />);
    expect(wrapper.find(RaisedButton)).to.have.length(1);
    expect(wrapper.contains(<RaisedButton label="success!" />)).to.equal(true);
    expect(wrapper.find('.plain-div')).to.have.length(1);
    expect(wrapper.find('.plain-div').text()).to.equal('hello');
  });
});