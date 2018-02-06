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
import TextImageScenario from './text_image_scenario.jsx';
import AudioCapture from '../../components/audio_capture.jsx';

function testStudentWithModel() {
  return _.find(allStudents, { id: 4001 });
}

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
    sinon.stub(AudioCapture, 'isAudioSupported').returns(true);
    const wrapper = shallow(
      <ScenarioRenderer
        scaffolding={TestFixtures.solutionScaffolding}
        showStudentCard={false}
        question={TestFixtures.testQuestion}
        student={testStudentWithModel()}
        onScenarioDone={sinon.spy()}
      />
    );
    AudioCapture.isAudioSupported.restore();

    expect(wrapper.find(TextModelScenario).length).to.equal(1);
  });

  it('falls back to text image scenarios when slow network', () => {
    sinon.stub(AudioCapture, 'isAudioSupported').returns(false);
    const wrapper = shallow(
      <ScenarioRenderer
        scaffolding={TestFixtures.solutionScaffolding}
        showStudentCard={false}
        question={TestFixtures.testQuestion}
        student={testStudentWithModel()}
        onScenarioDone={sinon.spy()}
      />
    );
    AudioCapture.isAudioSupported.restore();

    expect(wrapper.find(TextImageScenario).length).to.equal(1);
  });
});
