/* @flow weak */
import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

var sceneTimer;

// This response supports responding with text.
export default React.createClass({
  displayName: 'MinimalTimedView',

  propTypes: {
    onLogMessage: React.PropTypes.func.isRequired,
    onResponseSubmitted: React.PropTypes.func.isRequired,
    recordText: React.PropTypes.string,
  },

  getDefaultProps() {
    return {
      recordText: 'Respond',
      autoFocus: true,
      textHeight: 48
    };
  },


  getInitialState() {
    sceneTimer = setTimeout(this.onTimer, 25000);
    return {
      responseText: 'type here!'
    };
  },

  onTextChanged(e) {
    const responseText = e.target.value;
    this.setState({responseText});
  },

  onTimer() {
    const {responseText} = this.state;
    this.props.onLogMessage('message_popup_text_response', {responseText});
    this.props.onResponseSubmitted({ignore: true});
  },


  onSkipTapped() {
    clearTimeout(sceneTimer);
    const {responseText} = this.state;
    this.props.onLogMessage('message_popup_text_response', {responseText});
    this.props.onResponseSubmitted({ignore: true});
  },


  render() {
    const {
      recordText
    } = this.props;
   
    return (
      <div className="MinimalTimedView" style={styles.container}>
        <div style={styles.buttonRow}>
          <RaisedButton key="record" onTouchTap={this.onSkipTapped} label={recordText} secondary={true} />
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
    marginBottom: 0
  },
  buttonRow: {
    // margin: 20,
    marginTop: 10
  }
};
