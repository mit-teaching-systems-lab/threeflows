/* @flow weak */
import React from 'react';
import _ from 'lodash';

import {shallow} from 'enzyme';
import {expect} from 'chai';
import sinon from 'sinon';
import * as TestFixtures from '../test_fixtures.js';
import {allStudents} from '../../data/virtual_school.js';

import ScenarioRenderer from './scenario_renderer.jsx';
import PlainTextQuestion from './plain_text_question.jsx';
import VideoScenario from './video_scenario.jsx';
import TextModelScenario from './text_model_scenario.jsx';


describe('<ScenarioRenderer />', () => {
  it('renders plain text', () => {
    const question = TestFixtures.testQuestion;
    const wrapper = shallow(
      <ScenarioRenderer
        scaffolding={TestFixtures.solutionScaffolding}
        showStudentCard={false}
        question={question}
        onScenarioDone={sinon.spy()}
      />
    );
    expect(wrapper.find(PlainTextQuestion).length).to.equal(1);
  });

  it('renders video scenarios', () => {
    const question = {...TestFixtures.testQuestion, youTubeId: 'foo'};
    const wrapper = shallow(
      <ScenarioRenderer
        scaffolding={TestFixtures.solutionScaffolding}
        showStudentCard={false}
        question={question}
        onScenarioDone={sinon.spy()}
      />
    );
    expect(wrapper.find(VideoScenario).length).to.equal(1);
  });

  it('renders text model scenarios for students with data', () => {
    const question = TestFixtures.testQuestion;
    const student = _.find(allStudents, { id: 4001 });
    const wrapper = shallow(
      <ScenarioRenderer
        scaffolding={TestFixtures.solutionScaffolding}
        showStudentCard={false}
        question={question}
        student={student}
        onScenarioDone={sinon.spy()}
      />
    );
    expect(Object.keys(student.sketchFab)).to.have.members(['id', 'eye', 'target']);
    expect(wrapper.find(TextModelScenario).length).to.equal(1);
  });
});
