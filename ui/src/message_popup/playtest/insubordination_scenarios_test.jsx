/* @flow weak */
import {expect} from 'chai';

import {InsubordinationScenarios} from './insubordination_scenarios.js';


describe('InsubordinationScenarios', () => {
  it('#cohortKey', () => {    
    expect(InsubordinationScenarios.cohortKey('krob@mit.edu')).to.equal(2);
    expect(InsubordinationScenarios.cohortKey('sfd')).to.equal(1);
  });

  it('#data', () => {
    const {conditions, questionTemplates} = InsubordinationScenarios.data();
    expect(conditions.length).to.equal(4);
    expect(questionTemplates.length).to.equal(5);
  });
});
