import React from 'react';

import * as SharedPropTypes from '../../prop_types.js';
import PropTypes from 'prop-types';
import createReactClass from 'create-react-class';
import PlainTextQuestion from './plain_text_question.jsx';

// Render a text scenario with an image.
export default createReactClass({
  displayName: 'TextImageScenario',

  propTypes: {
    question: PropTypes.object.isRequired,
    student: SharedPropTypes.Student.isRequired,
    modelHeight: PropTypes.number.isRequired,
    onScenarioDone: PropTypes.func.isRequired,
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