/* @flow weak */
import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import {ResponseTypes} from '../data/response_types.js';


// This response supports timed auto advance to next slide
export default React.createClass({
  displayName: 'TimedAutoAdvanceResponse',

  propTypes: {
    onLogMessage: React.PropTypes.func.isRequired,
    onResponseSubmitted: React.PropTypes.func.isRequired,
    recordText: React.PropTypes.string,
    autoFocus: React.PropTypes.bool,
    textHeight: React.PropTypes.number,
    delayMs: React.PropTypes.number
  },

  getDefaultProps() {
    return {
      recordText: 'Respond',
      autoFocus: true,
      textHeight: 48,
      delayMs: 25000
    };
  },

  componentDidMount() {
    const {delayMs} = this.props;
    this.sceneTimer = window.setTimeout(this.onTimer, delayMs);
  },

  componentWillUnmount(){
    window.clearTimeout(this.sceneTimer);
  },

  sceneTimer: (null: ?number),
  
  onTimer() {
    const response = ResponseTypes.TIMED_AUTO_ADVANCE_RESPONSE;
    this.props.onLogMessage(response.type, response.params({}));
    this.props.onResponseSubmitted({ignore: true});
  },

  onSkipTapped() {
    const response = ResponseTypes.TIMED_AUTO_ADVANCE_RESPONSE;
    this.props.onLogMessage(response.type, response.params({skipTapped: true}));
    this.props.onResponseSubmitted({ignore: true});
  },

  render() {
    const {recordText} = this.props;
   
    return (
      <div className="TimedAutoAdvanceResponse" style={styles.container}>
        <div style={styles.buttonRow}>
          <RaisedButton
            key="record"
            onTouchTap={this.onSkipTapped}
            label={recordText}
            secondary={true} />
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
};
