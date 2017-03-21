/* @flow weak */
import {expect} from 'chai';

import {PairsScenario} from './pairs_scenario.jsx';

describe('PairsScenario', () => {
  it('questionsFor', () => {    
    expect(PairsScenario.questionsFor('foo').length).to.equal(29);
  });

  it('meredithQuestionsFor are different', () => {    
    const meredithQuestions = PairsScenario.meredithQuestionsFor('foo');
    const playtestQuestions = PairsScenario.questionsFor('foo');
    expect(meredithQuestions.length).to.equal(29);
    expect(JSON.stringify(meredithQuestions)).not.to.equal(JSON.stringify(playtestQuestions));
  });
});
