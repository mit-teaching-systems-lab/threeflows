/* @flow weak */
import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

// This response supports timed auto advance to next slide
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


  componentDidMount() {
    this.sceneTimer = setTimeout(this.onTimer, 25000);
  },

  componentWillUnmount(){
    clearTimeout(this.sceneTimer);
  },

  sceneTimer: (null: ?number),
  

  onTimer() {
    this.props.onLogMessage('timer_auto_advance_response');
    this.props.onResponseSubmitted({ignore: true});
  },


  onSkipTapped() {
    this.props.onLogMessage('timer_auto_advance_response', {skipTapped: true});
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
};
