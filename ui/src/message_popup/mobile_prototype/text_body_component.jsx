/* @flow weak */
import React from 'react';
import VelocityComponent from 'velocity-react/velocity-component';
import 'velocity-animate/velocity.ui';

import {StudentMessage, UserMessage, InfoMessage} from './message_components.jsx';

export default React.createClass({
  displayName: 'TextBody',

  propTypes: {
    question: React.PropTypes.object.isRequired,
    animatedMessages: React.PropTypes.array.isRequired,
    messages: React.PropTypes.array.isRequired,
    onOpenStudentDialog: React.PropTypes.func.isRequired,
    onOpenInfoDialog: React.PropTypes.func.isRequired,
    onAnimationDone: React.PropTypes.func.isRequired
  },
  
  render(){
    const {animatedMessages} = this.props;
    return (
      <div>
        {animatedMessages.map(message => {
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