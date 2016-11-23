/* @flow weak */
import React from 'react';
import {shallow} from 'enzyme';
import {expect} from 'chai';
import Divider from 'material-ui/Divider';

import Feedback from './feedback.jsx';

describe('<Feedback />', ()=>{
  it('renders text with link to form', ()=>{
    const props = { feedbackFormUrl: 'https://foo.com/feedback' };
    const wrapper = shallow(<Feedback {...props} />);
    expect(wrapper.find(Divider)).to.have.length(1);
    expect(wrapper.find('a')).to.have.length(1);
    expect(wrapper.find({ href: props.feedbackFormUrl })).to.have.length(1);
  });
});