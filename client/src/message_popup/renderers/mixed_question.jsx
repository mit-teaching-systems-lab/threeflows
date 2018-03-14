/* @flow weak */
import PropTypes from 'prop-types';

import React from 'react';

import PlainTextQuestion from '../renderers/plain_text_question.jsx';
import ReactQuestion from '../renderers/react_question.jsx';

// Render `text` or `el`
export default class extends React.Component {
  props: {question: Object};
  static displayName = 'MixedQuestion';

  static propTypes = {
    question: PropTypes.object.isRequired
  };

  render() {
    const {question} = this.props;
    return (
      <div className="MixedQuestion">
        {(question.type !== undefined) && <b style={{
          display: 'block',
          padding: '15px 20px 15px',
          background: '#09407d',
          color: 'white'
        }}>{question.type}</b>}
        {question.el && <ReactQuestion el={question.el} />}
        {question.text && <PlainTextQuestion question={{text: question.text}} />}
      </div>
    );
  }
}