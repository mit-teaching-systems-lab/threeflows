/* @flow weak */
import PropTypes from 'prop-types';
import createReactClass from 'create-react-class';

import React from 'react';
import _ from 'lodash';

import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';

import FaceIcon from 'material-ui/svg-icons/action/face';
import InfoOutlineIcon from 'material-ui/svg-icons/action/info-outline';

/*
Contains the components for messages "sent" through the message popup texting interface.
*/

const Message = createReactClass({
  propTypes: {
    type: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    messageStyle: PropTypes.object.isRequired,
    messageTextStyle: PropTypes.object.isRequired,
    leftIcon: PropTypes.element,
    rightIcon: PropTypes.element,
    label: PropTypes.string,
  },
  
  componentDidMount() { 
    if (this.el) this.el.scrollIntoView(); 
  },
  
  render(){
    const {type, messageStyle, messageTextStyle} = this.props;
    
    return (
      <div style={messageStyle} ref={el => this.el = el}>
        <div>{this.props.leftIcon}</div>
        <div style={styles.messageTextSection}>
          {this.props.label !== undefined && 
            <div style={_.merge(type === 'user' ? {textAlign: 'right'} : {textAlign: 'left'}, {...messageTextStyle, ...styles.label})}>
              {this.props.label}
            </div>
          }
          <Paper style={messageTextStyle}>{this.props.text}</Paper>
          
        </div>
        <div>{this.props.rightIcon}</div>
      </div>
    );
  }
});

export const StudentMessage = createReactClass({
  propTypes: {
    text: PropTypes.string.isRequired,
    student: PropTypes.object.isRequired,
    onOpenStudentDialog: PropTypes.func.isRequired
  },
  
  render(){
    const messageStyle = _.merge({justifyContent: 'flex-start'}, styles.message);
    const messageTextStyle = _.merge({backgroundColor: '#f1c889'}, styles.messageText);
    
    return (
      <div>
        <Message 
          type="student"
          text={this.props.text}
          label={this.props.student.name}
          messageStyle={messageStyle}
          messageTextStyle={messageTextStyle}
          leftIcon={
            <IconButton 
              onTouchTap={this.props.onOpenStudentDialog} 
              style={styles.messageIconContainer} 
              iconStyle={styles.messageIcon}>
              <FaceIcon/>
            </IconButton>
          }
        />
      </div>
    );
  }
});

export const UserMessage = createReactClass({
  propTypes: {
    text: PropTypes.string.isRequired,
    label: PropTypes.string
  },

  
  render(){
    const messageStyle = _.merge({justifyContent: 'flex-end'}, styles.message);
    const messageTextStyle = _.merge({backgroundColor: '#e6f9ff'}, styles.messageText);
    
    return (
      <div>
        <Message 
          type="user"
          text={this.props.text}
          label={this.props.label === undefined ? 'You' : this.props.label}
          messageStyle={messageStyle}
          messageTextStyle={messageTextStyle}
          rightIcon={
            <div style={styles.messageIconContainer}>
              <FaceIcon  style={{marginTop: 8, ...styles.messageIcon}}/>
            </div>
          }
        />
      </div>
    );
  }
});

export const InfoMessage = createReactClass({
  propTypes: {
    text: PropTypes.string.isRequired,
    onOpenInfoDialog: PropTypes.func.isRequired
  },
  
  render(){
    const messageStyle = _.merge({justifyContent: 'flex-start'}, styles.message);
    const messageTextStyle = styles.messageText;
    
    return (
      <div>
        <Message 
          type="info"
          text={this.props.text}
          messageStyle={messageStyle}
          messageTextStyle={messageTextStyle}
          leftIcon={
            <IconButton 
              onTouchTap={this.props.onOpenInfoDialog}
              style={styles.messageIconContainer}
              iconStyle={styles.messageIcon}>
              <InfoOutlineIcon/>
            </IconButton>
          }
        />
      </div>
    );
  }
});

const styles = {
  message: {
    display: 'flex',
    padding: 5
  },
  messageIconContainer: {
    margin: 0,
    padding: 0,
    width: '100%',
  },
  messageIcon: {
    width: 30,
    height: 30,
    padding: 0,
  },
  messageTextSection: {
    margin: 5,
    marginLeft: 10,
    marginRight: 10
  },
  messageText: {
    padding: 10,
    whiteSpace: 'pre-wrap',
    wordWrap: 'break-word',
    wordBreak: 'break-word',
  },
  label: {
    margin:5,
    fontSize: 12,
    padding: 0,
    backgroundColor: undefined,
  }
};