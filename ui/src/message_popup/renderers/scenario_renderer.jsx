/* @flow weak */
import React from 'react';
import VideoScenario from './video_scenario.jsx';


// Supports rendering a scenario as text or as a YouTube video.
export default React.createClass({
  displayName: 'ScenarioRenderer',

  propTypes: {
    question: React.PropTypes.object.isRequired,
    onScenarioDone: React.PropTypes.func.isRequired
  },

  // Text scenarios can be responded to immediately, while
  // videos need to finish playing first.
  componentDidMount() {
    const {question} = this.props;
    if (question.text) return this.props.onScenarioDone();
  },

  onVideoDone() {
    this.props.onScenarioDone();
  },

  render() {
    const {question} = this.props;
    if (question.text) return this.renderText(question.text);
    if (question.youTubeId) return this.renderVideo(question);
  },

  renderText(questionText) {
    return <div style={styles.textQuestion}>{questionText}</div>;
  },

  renderVideo(question) {
    return (
      <div style={styles.videoContainer}>
        <VideoScenario
          youTubeId={question.youTubeId}
          youTubeParams={question.youTubeParams}
          onDonePlaying={this.onVideoDone} />
      </div>
    );
  }
});

const styles = {
  textQuestion: {
    whiteSpace: 'pre-wrap',
    padding: 20
  },
  videoContainer: {
    height: 390
  }
};
