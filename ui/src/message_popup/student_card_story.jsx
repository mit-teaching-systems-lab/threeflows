import React from 'react';
import _ from 'lodash';
import {storiesOf} from '@kadira/storybook';

import StudentCard from './student_card.jsx';
import {allStudents} from '../data/virtual_school.js';

storiesOf('StudentCard')
  .add('for first student', () => (
    <StudentCard student={_.first(allStudents)} />
  ))
  .add('for first student, useCardStyles', () => (
    <StudentCard student={_.first(allStudents)} useCardStyles={true} />
  ))
  .add('for Mursion student, useCardStyles', () => (
    <StudentCard student={_.find(allStudents, { isMursion: true })} useCardStyles={true} />
  ));