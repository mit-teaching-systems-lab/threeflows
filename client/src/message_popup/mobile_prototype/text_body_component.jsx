/* @flow weak */
import PropTypes from 'prop-types';
import createReactClass from 'create-react-class';

import React from 'react';
import _ from 'lodash';
import VelocityComponent from 'velocity-react/velocity-component';
import 'velocity-animate/velocity.ui';

import {StudentMessage, UserMessage, InfoMessage} from './message_components.jsx';

export default createReactClass({
  displayName: 'TextBody',

  propTypes: {
    question: PropTypes.object.isRequired,
    animatedMessages: PropTypes.array.isRequired,
    messages: PropTypes.array.isRequired,
    onOpenStudentDialog: PropTypes.func.isRequired,
    onOpenInfoDialog: PropTypes.func.isRequired,
    onAnimationDone: PropTypes.func.isRequired
  },
  
  render(){
    const messagesToRender = _.compact(this.props.animatedMessages.concat(this.props.messages[0]));
    return (
      <div>
        {messagesToRender.map(message => {
          if(message.type === 'user'){
            return (
              <VelocityComponent animation='transition.slideRightBigIn' complete={this.props.onAnimationDone} duration={500} runOnMount={true} key={'animation'+ message.key}>
                <UserMessage text={message.text}/>
              </VelocityComponent>
            );
          }else if(message.type === 'student'){
            return (
              <VelocityComponent animation='transition.slideLeftBigIn' complete={this.props.onAnimationDone} duration={500} runOnMount={true} key={'animation'+ message.key}>
                <StudentMessage text={message.text} student={message.student} onOpenStudentDialog={this.props.onOpenStudentDialog(message.student)}/>
              </VelocityComponent>
            );
          }else{
            return (
              <VelocityComponent animation='transition.slideLeftBigIn' complete={this.props.onAnimationDone} duration={500} runOnMount={true} key={'animation'+ message.key}>
                <InfoMessage text={message.text} onOpenInfoDialog={this.props.onOpenInfoDialog}/>
              </VelocityComponent>
            );
          }
        })}
      </div>
    );
  }
});