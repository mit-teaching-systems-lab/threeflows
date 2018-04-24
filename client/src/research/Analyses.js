import Filters from './Filters.js';
import _ from 'lodash';

export const playtestJanTurner = {
  description: 'January 2018 Playtest: Turner',
  filter(row) {
    return _.every([
      Filters.containsPath('/teachermoments/turner?playtest20180124', row),
      Filters.isSubmittedResponse(row),
      !Filters.isFlavorText(row),
      !Filters.isDeveloper(row),
      !Filters.isThrowawayUser(row),
      !Filters.isMeaninglessChoice(row)
    ]);
  },
  location: '/teachermoments/turner?playtest20180124'
};

export const MeredithDarius = {
  description: 'Meredith 11.125: Darius',
  filter(row) {
    return _.every([
      Filters.containsPath('/teachermoments/darius?fromdemos', row),
      Filters.isSubmittedResponse(row),
      !Filters.isFlavorText(row),
      !Filters.isDeveloper(row),
      !Filters.isThrowawayUser(row),
      !Filters.isMeaninglessChoice(row)
    ]);
  },
  location: '/teachermoments/darius?fromdemos'
};

export const testing = {
  description: 'testing new feature',
  filter(row) {
    return _.every([
      Filters.containsPath('/teachermoments/turner?KevinTesting20180319', row),
      Filters.isSubmittedResponse(row),
      !Filters.isFlavorText(row),
      !Filters.isDeveloper(row),
      !Filters.isThrowawayUser(row),
      !Filters.isMeaninglessChoice(row)
    ]);
  },
  location: '/teachermoments/turner?KevinTesting20180319'
};

export const kevinThesis = {
  description: 'WWA playtest for Kevin Thesis',
  filter(row) {
    return _.every([
      Filters.containsPath('/teachermoments/turner?WWA04062018', row),
      Filters.isSubmittedResponse(row),
      !Filters.isFlavorText(row),
      !Filters.isDeveloper(row),
      !Filters.isThrowawayUser(row),
      !Filters.isMeaninglessChoice(row)
    ]);
  },
  location: '/teachermoments/turner?WWA04062018'
};

export const MeredithSub = {
  description: 'Meredith 11.125: Sub',
  filter(row) {
    return _.every([
      Filters.containsPath('/teachermoments/sub?11.125', row),
      Filters.isSubmittedResponse(row),
      !Filters.isFlavorText(row),
      !Filters.isDeveloper(row),
      !Filters.isThrowawayUser(row),
      !Filters.isMeaninglessChoice(row)
    ]);
  },
  location: '/teachermoments/sub?11.125'
};

export const MeredithSub2 = {
  description: 'Meredith 11.125: Sub2',
  filter(row) {
    return _.every([
      Filters.containsPath('/teachermoments/sub', row),
      Filters.isSubmittedResponse(row),
      !Filters.isFlavorText(row),
      !Filters.isDeveloper(row),
      !Filters.isThrowawayUser(row),
      !Filters.isMeaninglessChoice(row)
    ]);
  },
  location: '/teachermoments/sub'
};