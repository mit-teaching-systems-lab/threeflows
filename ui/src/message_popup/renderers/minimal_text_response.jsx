/* @flow weak */
import React from 'react';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';


// This response supports responding with text.
export default React.createClass({
  displayName: 'MinimalTextResponse',

  propTypes: {
    onLogMessage: React.PropTypes.func.isRequired,
    onResponseSubmitted: React.PropTypes.func.isRequired,
    forceResponse: React.PropTypes.bool,
    responsePrompt: React.PropTypes.string,
    recordText: React.PropTypes.string,
    ignoreText: React.PropTypes.string
  },

  getDefaultProps() {
    return {
      forceResponse: false,
      responsePrompt: 'Speak directly to the student.',
      recordText: 'Respond',
      ignoreText: 'Say nothing'
    };
  },

  getInitialState() {
    return {
      responseText: ''
    };
  },

  onTextChanged(e) {
    const responseText = e.target.value;
    this.setState({responseText});
  },

  onRespondTapped() {
    const {responseText} = this.state;
    this.props.onLogMessage('message_popup_text_response', {responseText});
    this.props.onResponseSubmitted({responseText});
  },

  onIgnoreTapped() {
    this.props.onLogMessage('message_popup_text_ignore');
    this.props.onResponseSubmitted({ignore: true});
  },

  render() {
    const {responsePrompt, forceResponse, recordText, ignoreText} = this.props;
    const {responseText} = this.state;
   
    return (
      <div className="MinimalTextResponse" style={styles.container}>
        <div>{responsePrompt}</div>
        <div>
          <TextField
            id="minimal-text-response-text-field"
            style={styles.textField}
            textareaStyle={styles.textareaInner}
            underlineShow={false}
            multiLine={true}
            rows={2}
            autoFocus={true}
            value={responseText}
            onChange={this.onTextChanged}
          />
        </div>
        <div style={styles.buttonRow}>
          <RaisedButton key="record" onTouchTap={this.onRespondTapped} label={recordText} secondary={true} />
          {!forceResponse && <RaisedButton key="ignore" onTouchTap={this.onIgnoreTapped} label={ignoreText} />}
        </div>
      </div>
    );
  }
});

const styles = {
  container: {
    paddingBottom: 5,
    margin: 20
  },
  textField: {
    width: '100%'
  },
  // Fixing the height to two rows large, since TextField reflects on the
  // DOM to size its height, and when animating with Velocity it's still hidden
  // and doesn't have its full size yet.
  textareaInner: {
    border: '1px solid #ddd',
    height: 48,
    marginBottom: 0
  },
  buttonRow: {
    // margin: 20,
    marginTop: 10
  }
};