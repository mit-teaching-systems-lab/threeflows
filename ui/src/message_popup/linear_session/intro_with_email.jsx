/* @flow weak */
import React from 'react';

import VelocityTransitionGroup from "velocity-react/velocity-transition-group";
import 'velocity-animate/velocity.ui';
import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField';


// Show some introduction elements, and ask for email to continue
export default React.createClass({
  displayName: 'IntroWithEmail',

  propTypes: {
    onDone: React.PropTypes.func.isRequired,
    defaultEmail: React.PropTypes.string,
    children: React.PropTypes.node
  },

  getInitialState() {
    return {
      email: this.props.defaultEmail
    };
  },

  onTextChanged(e) {
    this.setState({ email: e.target.value });
  },

  onDone() {
    this.props.onDone(this.state.email);
  },

  onSubmit(e) {
    e.preventDefault();
    this.onDone();
  },

  render() {
    return (
      <VelocityTransitionGroup enter={{animation: "callout.pulse", duration: 500}} leave={{animation: "slideUp"}} runOnMount={true}>
        <div style={{...styles.container, ...styles.instructions}}>
          {this.props.children}
        </div>
        <Divider />
        <div style={{padding: 20}}>
          <form onSubmit={this.onSubmit}>
            <TextField
              name="email"
              style={{width: '100%'}}
              underlineShow={false}
              floatingLabelText="What's your email address?"
              value={this.state.email}
              onChange={this.onTextChanged}
              rows={2} />
            <div style={styles.buttonRow}>
              <RaisedButton
                disabled={this.state.email === ''}
                onTouchTap={this.onDone}
                type="submit"
                style={styles.button}
                secondary={true}
                label="Start" />
            </div>    
          </form>
        </div>
      </VelocityTransitionGroup>
    );
  }
});

const styles = {
  container: {
    fontSize: 20,
    padding: 0,
    margin:0,
    paddingBottom: 45
  },
  instructions: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  buttonRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end'
  },
  button: {
    marginTop: 20
  }
};