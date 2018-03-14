/* @flow weak */
import PropTypes from 'prop-types';

import React from 'react';

import Slider from 'material-ui/Slider';
import MinimalTextResponse from '../renderers/minimal_text_response.jsx';


// This renders the interactions for scoring a student's project.  It includes
// sliders for various criteria defined in `scores` and also free-text written feedback.
export default class extends React.Component {
  props: {
    onLogMessage: Function,
    onResponseSubmitted: Function,
    scores: Array<{
      label: string,
      key: string,
      max: number,
    }>,
    studentName: string,
    projectLabel: string,
  };

  state: *;
  static displayName = 'CsFairProject';

  static propTypes = {
    onLogMessage: PropTypes.func.isRequired,
    onResponseSubmitted: PropTypes.func.isRequired,
    scores: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.string.isRequired,
      key: PropTypes.string.isRequired,
      max: PropTypes.number.isRequired
    })).isRequired,
    studentName: PropTypes.string.isRequired,
    projectLabel: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);
    const emptyScores = props.scores.reduce((map, score) => {
      return {...map, [score.key]: 0 };
    }, {});

    this.state = {
      scoreValues: emptyScores
    };
  }

  onSliderChanged = (key, event, value) => {
    const {scoreValues} = this.state;
    this.setState({
      scoreValues: {
        ...scoreValues,
        [key]: value
      }
    });
  };

  // Mix in all the context of the response
  onTextReponseSubmitted = ({responseText}) => {
    const {scores, studentName, projectLabel} = this.props;
    const {scoreValues} = this.state;
    const responseRecord = {
      isCsScoreResponse: true,
      scoreValues,
      scores,
      responseText,
      studentName,
      projectLabel
    };
    this.props.onLogMessage('message_popup_cs_fair_score_response', responseRecord);
    this.props.onResponseSubmitted(responseRecord);
  };

  render() {
    const {onLogMessage, scores, studentName} = this.props;
    
    return (
      <div className="CsFairScoreResponse">
        <div style={styles.container}>
          {scores.map(this.renderSlider)}
        </div>
        <div>
          <MinimalTextResponse
            forceResponse={true}
            responsePrompt={`Written feedback for ${studentName}:`}
            recordText="Submit"
            autoFocus={false}
            onLogMessage={onLogMessage}
            onResponseSubmitted={this.onTextReponseSubmitted}
          />
        </div>
      </div>
    );
  }

  renderSlider = (score) => {
    const {label, key, max} = score;
    const value = this.state.scoreValues[key];
    return (
      <div key={key}>
        <div>{label}</div>
        <div>Points: {value} / {max}</div>
        <Slider onChange={this.onSliderChanged.bind(this, key)} value={value} min={0} max={max} step={0.5} />
      </div>
    );
  };
}

const styles = {
  container: {
    margin: 40,
    marginTop: 10
  }
};