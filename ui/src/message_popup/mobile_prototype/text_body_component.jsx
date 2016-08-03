import React from 'react';
import VelocityComponent from 'velocity-react/velocity-component';
import 'velocity-animate/velocity.ui';

import {StudentMessage, UserMessage, InfoMessage} from './message_components.jsx';

export default React.createClass({
  displayName: 'TextBody',

  propTypes: {
    question: React.PropTypes.object.isRequired,
    messages: React.PropTypes.array.isRequired,
    onOpenStudentDialog: React.PropTypes.func.isRequired,
    onOpenInfoDialog: React.PropTypes.func.isRequired
  },
  
  render(){
    const {messages} = this.props;
    return (
      <div>
        {messages.map(message => { 
          if(message.type === 'user'){
            return (
              <VelocityComponent animation='transition.expandIn' runOnMount={true} key={'animation'+ message.key}>
                <UserMessage text={message.text}  key={message.key} />
              </VelocityComponent>
              );
          }else if(message.type === 'student'){
            return (
              <VelocityComponent animation='transition.expandIn' runOnMount={true} key={'animation'+ message.key}>
                <StudentMessage text={message.text} student={message.student} onOpenStudentDialog={this.props.onOpenStudentDialog(message.student)} key={message.key} />
              </VelocityComponent>
              );
          }else{
            return (
              <VelocityComponent animation='transition.expandIn' runOnMount={true} key={'animation'+ message.key}>
                <InfoMessage text={message.text} onOpenInfoDialog={this.props.onOpenInfoDialog} key={message.key} />
              </VelocityComponent>
              );
          }
        })}
      </div>
    );
  }
});