// @flow
import React from 'react';
import SetIntervalMixin from '../helpers/set_interval_mixin.js';
import * as PropTypes from '../prop_types.js';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import TextChangeEvent from '../types/dom_types.js';
const ONE_SECOND = 1000;

/*
Shows a single question.
*/

export default React.createClass({
  displayName: 'PopupQuestion',
  mixins: [SetIntervalMixin],

  propTypes: {
    limitMs: React.PropTypes.number.isRequired,
    question: React.PropTypes.shape({
      text: React.PropTypes.string.isRequired
    }).isRequired,
    onResponse: React.PropTypes.func.isRequired
  },


  getInitialState: function() {
    return {
      elapsedMs: 0,
      responseText: ''
    };
  },

  componentDidMount() {
    this.setInterval(this.updateTimer, ONE_SECOND);
  },

  updateTimer() {
    this.setState({ elapsedMs: this.state.elapsedMs + ONE_SECOND });
  },

  onTextChanged({target:{value}}:TextChangeEvent) {
    this.setState({ responseText: value })
  },

  onSendPressed() {
    const {elapsedMs, responseText} = this.state;
    const {question} = this.props;
    this.props.onResponse({question, elapsedMs, responseText});
  },

  render() {
    const {elapsedMs} = this.state;
    const {limitMs} = this.props;
    const {text} = this.props.question;

    return (
      <div>
        <div style={styles.question}>{text}</div>
        <div>
          <TextField
            style={styles.textField}
            textareaStyle={styles.textareaInner}
            underlineShow={false}
            floatingLabelText='Speak directly to the student'
            onChange={this.onTextChanged}
            multiLine={true}
            rows={2}/>
        </div>
        <div>
          <RaisedButton
            onTouchTap={this.onSendPressed}
            style={styles.button}
            primary={true}
            label="Send" />
          <div style={styles.ticker}>0:{Math.round((limitMs - elapsedMs) / 1000)}s</div>
        </div>
      </div>
    );
  }
});

const styles = {
  question: {
    whiteSpace: 'pre-wrap',
    marginBottom: 10
  },
  textField: {
    width: '100%'
  },
  textareaInner: {
    border: '1px solid #eee',
    marginBottom: 10
  },
  button: {
    display: 'inline-block',
  },
  ticker: {
    display: 'inline-block',
    marginLeft: 15
  }
};