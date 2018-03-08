/* @flow weak */
import {expect} from 'chai';

import JaydenScenario from './jayden_scenario.jsx';


describe('JaydenScenario', () => {
  it('includes line about audio', () => {
    const lineText = JaydenScenario.lineAboutResponseMode();
    expect(lineText).to.equal("\nClick and speak aloud the words you'd say to the student.\n");
  });

  it('does not include line about audio', () => {
    const lineText = JaydenScenario.lineAboutResponseMode({ forceText: true });
    expect(lineText).to.equal('');
  });
});
