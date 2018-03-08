/* @flow weak */
import React from 'react';


import * as PropTypes from '../../prop_types.js';
import PromptsRenderer from './prompts_renderer.jsx';
import TextModelScenario from './text_model_scenario.jsx';
import TextImageScenario from './text_image_scenario.jsx';
import PlainTextQuestion from './plain_text_question.jsx';
import VideoScenario from './video_scenario.jsx';
import AudioCapture from '../../components/audio_capture.jsx';

// Supports rendering a scenario as text or as a YouTube video.
export default React.createClass({
  displayName: 'ScenarioRenderer',

  propTypes: {
    scaffolding: PropTypes.Scaffolding.isRequired,
    question: React.PropTypes.object.isRequired,
    student: PropTypes.Student,
    showStudentCard: React.PropTypes.bool.isRequired,
    onScenarioDone: React.PropTypes.func.isRequired
  },

  // Plain text scenarios can be responded to immediately,
  // others have some delay.
  componentDidMount() {
    const scenarioType = this.scenarioType();
    if (scenarioType === 'plainText') this.props.onScenarioDone();
  },

  // Audio support (not available on mobile) is used as a rough but synchronous
  // proxy for detecting whether we should fall back to an image instead
  // of loading the 3D model.
  // This is a workaround and there's lots we could improve here.
  isNetworkFast() {
    return AudioCapture.isAudioSupported();
  },

  scenarioType() {
    const {question, student} = this.props;
    
    if (question.text && student && student.sketchFab) {
      return (!this.isNetworkFast() && student.sketchFab.fallbackUrl) ? 'textImage' : 'textModel';
    }
    if (question.youTubeId) return 'video';
    if (question.text) return 'plainText';
  },

  render() {
    return <div>
      {this.renderScenario()}
      {this.renderPrompts()}
    </div>;
  },

  renderScenario() {
    const scenarioType = this.scenarioType();

    if (scenarioType === 'textModel') return this.renderTextModel();
    if (scenarioType === 'textImage') return this.renderTextImage();
    if (scenarioType === 'video') return this.renderVideo();
    if (scenarioType === 'plainText') return this.renderText();
  },

  renderPrompts() {
    const {question, student, scaffolding, showStudentCard} = this.props;
    return (
      <PromptsRenderer
        scaffolding={scaffolding}
        showStudentCard={showStudentCard}
        student={student}
        question={question}
      />
    );
  },

  renderTextImage() {
    const {question, student} = this.props;
    return (
      <TextImageScenario
        question={question}
        student={student}
        modelHeight={styles.textModel.height}
        onScenarioDone={this.props.onScenarioDone}
      />
    );
  },

  renderTextModel() {
    const {question, student, scaffolding} = this.props;

    return (
      <TextModelScenario
        question={question}
        student={student}
        modelHeight={styles.textModel.height}
        scaffolding={scaffolding} 
        onScenarioDone={this.props.onScenarioDone}
      />
    );
  },

  renderVideo() {
    const {question} = this.props;
    return (
      <div style={styles.videoContainer}>
        <VideoScenario
          youTubeId={question.youTubeId}
          youTubeParams={question.youTubeParams}
          onDonePlaying={this.props.onScenarioDone} />
      </div>
    );
  },

  renderText() {
    const {question} = this.props;
    return <PlainTextQuestion question={question} />;
  }
});

const styles = {
  textModel: {
    height: 230
  },
  videoContainer: {
    height: 370
  }
};
