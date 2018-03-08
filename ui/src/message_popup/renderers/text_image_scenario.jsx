import React from 'react';

import * as PropTypes from '../../prop_types.js';
import PlainTextQuestion from './plain_text_question.jsx';

// Render a text scenario with an image.
export default React.createClass({
  displayName: 'TextImageScenario',

  propTypes: {
    question: React.PropTypes.object.isRequired,
    student: PropTypes.Student.isRequired,
    modelHeight: React.PropTypes.number.isRequired,
    onScenarioDone: React.PropTypes.func.isRequired,
  },

  componentDidMount() {
    this.props.onScenarioDone();
  },
  
  render() {
    const {question, modelHeight} = this.props;
    const {sketchFab} = this.props.student;

    return (
      <div>
        <PlainTextQuestion question={question} />
        <div>
          <img
            src={sketchFab.fallbackUrl}
            style={{height: modelHeight}}
            width="100%"
          />
        </div>
      </div>
    );
  }
});