/* @flow weak */
import React from 'react';

import {render} from 'enzyme';
import {expect} from 'chai';
import sinon from 'sinon';
import ResponseWithPastNotes from './response_with_past_notes.jsx';
import OkResponse from './ok_response.jsx';

function testProps(props = {}) {
  return {
    onLogMessage: sinon.spy(),
    onResponseSubmitted: sinon.spy(),
    ...props
  };
}

describe('<ResponseWithPastNotes />', ()=>{
  it('renders each choice as a button', () => {
    const pastNotes = ['hi', 'bye'];
    const props = testProps();
    const wrapper = render(
      <ResponseWithPastNotes pastNotes={pastNotes}>
        <OkResponse {...props} />
      </ResponseWithPastNotes>);
    console.log(wrapper);
    expect(wrapper.find(<li />)).to.have.length(2);
    expect(wrapper.find(<OkResponse />)).to.have.length(1);
  });
});