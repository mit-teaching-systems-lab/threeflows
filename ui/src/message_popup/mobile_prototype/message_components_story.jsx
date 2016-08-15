import React from 'react';
import _ from 'lodash';
import {storiesOf} from '@kadira/storybook';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {StudentMessage, UserMessage, InfoMessage} from './message_components.jsx';
import {allStudents} from '../../data/virtual_school.js';

const student = _.first(allStudents);
storiesOf('MessageComponents')
  .add('StudentMessage', () => (
    <MuiThemeProvider>
      <StudentMessage text="Hello from the student." student={student} onOpenStudentDialog={() => alert('onOpenStudentDialog')} />
    </MuiThemeProvider>
  ))
  .add('UserMessage', () => (
    <MuiThemeProvider>
      <UserMessage text="Hello from the user." />
    </MuiThemeProvider>
  ))
  .add('InfoMessage', () => (
    <MuiThemeProvider>
      <UserMessage text="Info message." />
    </MuiThemeProvider>
  ))