/* @flow weak */
import React from 'react';
import TestRenderer from 'react-test-renderer';

import {shallow} from 'enzyme';
import {expect} from 'chai';
import sinon from 'sinon';
import ResponseWithPastNotes from './response_with_past_notes.jsx';
import OkResponse from './ok_response.jsx';
import TestAuthContainer from '../../test_auth_container.jsx';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

function testProps(props = {}) {
  return {
    onLogMessage: sinon.spy(),
    onResponseSubmitted: sinon.spy(),
    ...props
  };
}

// Wrap with application context for a full render
// (eg., theming, authorization).
function withContext(child) {
  return (
    <MuiThemeProvider>
      <TestAuthContainer>
        {child}
      </TestAuthContainer>
    </MuiThemeProvider>
  );
}

describe('<ResponseWithPastNotes />', ()=>{
  it('renders each choice as a button', () => {
    const pastNotes = ['hi', 'bye'];
    const props = testProps();
    const inst = TestRenderer.create(withContext(
      <ResponseWithPastNotes pastNotes={pastNotes}>
        <OkResponse {...props} />
      </ResponseWithPastNotes>
    ));
    expect(inst.toJSON().props).to.deep.equal({ className: 'ResponseWithPastNotes' });
    expect(inst.toJSON().children.length).to.equal(2);
    expect(inst.toJSON().children[1].props).to.deep.equal({ className: 'ForcedChoiceResponse' });
  });
});