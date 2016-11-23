/* @flow weak */
import React from 'react';
import {shallow} from 'enzyme';
import {expect} from 'chai';
import Divider from 'material-ui/Divider';

import FeedbackForm from './feedback_form.jsx';

describe('<FeedbackForm />', ()=>{
  it('renders text with link to form', ()=>{
    const props = { feedbackFormUrl: 'https://foo.com/feedback' };
    const wrapper = shallow(<FeedbackForm {...props} />);
    expect(wrapper.find(Divider)).to.have.length(1);
    expect(wrapper.find('a')).to.have.length(1);
    expect(wrapper.find({ href: props.feedbackFormUrl })).to.have.length(1);
  });
});