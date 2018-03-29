import Filters from './Filters.js';
import _ from 'lodash';
const LATEST_DB_PATH = '';
const LATEST_S3_PATH = '';


function isForUnconsciousBias(row) {
  if (Filters.containsPath('/teachermoments/smithB', row)) return true;
  if (Filters.containsPath('/teachermoments/sub?group=css', row)) return true;
  if (Filters.containsPath('/teachermoments/sub?group=caf', row)) return true;
  if (Filters.containsPath('/teachermoments/sub?group=playtest', row)) return true;
  if (Filters.containsPath('/teachermoments/sub', row)) return true;
  if (Filters.containsPath('/teachermoments/ecs', row)) return true;
  if (Filters.containsPath('/teachermoments/jayden', row)) return true;
  if (Filters.containsPath('/teachermoments/smithFacilitated', row)) return true;
  if (Filters.containsPath('/teachermoments/hmtca', row)) return true;
}

export const AllLego = {
  description: 'All: Lego scenario',
  filter(row) {
    return _.every([
      Filters.containsPath('/teachermoments/sub', row) || Filters.containsPath('/teachermoments/ecs', row),
      Filters.isSubmittedResponse(row),
      !Filters.isDeveloper(row),
      !Filters.isThrowawayUser(row),
      !Filters.isMeaninglessChoice(row)
    ]);
  },
  dataSet: {
    db: LATEST_DB_PATH,
    s3: LATEST_S3_PATH
  }
};

export const Latest = {
  description: 'All: Unconscious Bias (unconsented)',
  filter(row) {
    return _.every([
      isForUnconsciousBias(row),
      Filters.isSubmittedResponse(row),
      !Filters.isDeveloper(row),
      !Filters.isThrowawayUser(row),
      !Filters.isExtraAudioLog(row),
      !Filters.isMeaninglessChoice(row)
    ]);
  },
  dataSet: {
    db: LATEST_DB_PATH,
    s3: LATEST_S3_PATH
  }
};

export const CompositeSIGCSE = {
  description: 'Composite: SIGCSE paper',
  filter(row) {
    return _.some([
      CTMobileCSPJayden.filter(row),
      EcsJuly24FieldTest.filter(row),
      EcsJuly28FieldTest.filter(row),
      EcsJuneFieldTest.filter(row),
      ElevenAnalysis.filter(row),
      MobileCSPOrientationAnalysis.filter(row)
    ]);
  },
  dataSet: {
    db: LATEST_DB_PATH,
    s3: LATEST_S3_PATH
  }
};

export const FairAnalysis = {
  description: 'Scenario: Computer science fair',
  filter(row) {
    return _.every([
      Filters.isConsentedHardcode(row),
      Filters.isProjectScenario(row),
      Filters.isSubmittedResponse(row) || Filters.isLikertScore(row),
      !Filters.isDeveloper(row),
      !Filters.isThrowawayUser(row),
      !Filters.isUser('jrosato@css.edu', row),
      !Filters.isExtraAudioLog(row),
      !Filters.isMeaninglessChoice(row)
    ]);
  },
  dataSet: {
    db: LATEST_DB_PATH,
    s3: LATEST_S3_PATH
  }
};

export const ElevenAnalysis = {
  description: 'Field test: 4/5 MIT 11.125',
  filter(row) {
    return _.every([
      Filters.isConsentedHardcode(row),
      Filters.isPairsScenario(row),
      Filters.isSubmittedResponse(row),
      !Filters.isDeveloper(row),
      !Filters.isThrowawayUser(row),
      !Filters.isExtraAudioLog(row),
      !Filters.isMeaninglessChoice(row),
      !Filters.isAfterTime('04/04/17 2:35:00 pm', row) // exclude during class
    ]);
  },
  dataSet: {
    db: LATEST_DB_PATH,
    s3: LATEST_S3_PATH
  }
};

export const MobileCSPOrientationAnalysis = {
  description: 'Field test: 4/22 Mobile CSP orientation',
  filter(row) {
    return _.every([
      Filters.isPath('/teachermoments/sub?group=css', row),
      Filters.isSubmittedResponse(row),
      !Filters.isDeveloper(row),
      !Filters.isThrowawayUser(row),
      !Filters.isExtraAudioLog(row),
      !Filters.isMeaninglessChoice(row),
    ]);
  },
  dataSet: {
    db: LATEST_DB_PATH,
    s3: LATEST_S3_PATH
  }
};

export const LabPlaytestApril25 = {
  description: 'Playtest: 4/25 TSL lab playtest',
  filter(row) {
    return _.every([
      Filters.isPath('/teachermoments/sub?group=playtest', row) || Filters.isPath('/teachermoments/sub?group=caf', row),
      Filters.isSubmittedResponse(row),
      !Filters.isDeveloper(row),
      !Filters.isThrowawayUser(row),
      !Filters.isExtraAudioLog(row),
      !Filters.isMeaninglessChoice(row),
      !Filters.isPath('/teachermoments/turner', row), // run at the same time
      Filters.isAfterTime('04/25/17 4:00:00 pm', row),
      Filters.isBeforeTime('04/25/17 9:00:00 pm', row)
    ]);
  },
  dataSet: {
    db: LATEST_DB_PATH,
    s3: LATEST_S3_PATH
  }
};

export const EcsJuneFieldTest = {
  description: 'Field test: 6/26 ECS Lego',
  filter(row) {
    return _.every([
      Filters.containsPath('/teachermoments/ecs', row),
      Filters.isSubmittedResponse(row),
      !Filters.isDeveloper(row),
      !Filters.isThrowawayUser(row),
      !Filters.isExtraAudioLog(row),
      !Filters.isMeaninglessChoice(row),
      Filters.isAfterTime('06/23/17 4:00:00 pm', row),
      Filters.isBeforeTime('07/01/17 9:00:00 pm', row)
    ]);
  },
  dataSet: {
    db: LATEST_DB_PATH,
    s3: LATEST_S3_PATH
  }
};

export const JaydenJunePlaytest = {
  description: 'Playtest: 6/26 Jayden playtest',
  filter(row) {
    return _.every([
      Filters.isPath('/teachermoments/jayden', row),
      Filters.isSubmittedResponse(row),
      !Filters.isDeveloper(row),
      !Filters.isThrowawayUser(row),
      !Filters.isExtraAudioLog(row),
      !Filters.isMeaninglessChoice(row),
      Filters.isAfterTime('06/23/17 4:00:00 pm', row),
      Filters.isBeforeTime('06/28/17 9:00:00 pm', row)
    ]);
  },
  dataSet: {
    db: LATEST_DB_PATH,
    s3: LATEST_S3_PATH
  }
};

export const SmithJunePlaytest = {
  description: 'Playtest: 6/26 Smith playtest',
  filter(row) {
    return _.every([
      Filters.isPath('/teachermoments/smithB', row),
      Filters.isSubmittedResponse(row),
      !Filters.isDeveloper(row),
      !Filters.isThrowawayUser(row),
      !Filters.isExtraAudioLog(row),
      !Filters.isMeaninglessChoice(row),
      Filters.isAfterTime('06/23/17 4:00:00 pm', row),
      Filters.isBeforeTime('06/28/17 9:00:00 pm', row)
    ]);
  },
  dataSet: {
    db: LATEST_DB_PATH,
    s3: LATEST_S3_PATH
  }
};

export const EcsJuly24FieldTest = {
  description: 'Field test: 7/24 ECS Lego',
  filter(row) {
    return _.every([
      Filters.containsPath('/teachermoments/ecs', row),
      Filters.isSubmittedResponse(row),
      !Filters.isDeveloper(row),
      !Filters.isThrowawayUser(row),
      !Filters.isExtraAudioLog(row),
      !Filters.isMeaninglessChoice(row),
      Filters.isAfterTime('07/23/17 4:00:00 pm', row),
      Filters.isBeforeTime('07/26/17 9:00:00 pm', row)
    ]);
  },
  dataSet: {
    db: LATEST_DB_PATH,
    s3: LATEST_S3_PATH
  }
};

export const EcsJuly28FieldTest = {
  description: 'Field test: 7/28 ECS Rosa',
  filter(row) {
    return _.every([
      Filters.containsPath('/teachermoments/rosa', row),
      Filters.isSubmittedResponse(row),
      !Filters.isDeveloper(row),
      !Filters.isThrowawayUser(row),
      !Filters.isExtraAudioLog(row),
      !Filters.isMeaninglessChoice(row),
      Filters.isAfterTime('07/26/17 4:00:00 pm', row),
      Filters.isBeforeTime('07/29/17 9:00:00 pm', row)
    ]);
  },
  dataSet: {
    db: LATEST_DB_PATH,
    s3: LATEST_S3_PATH
  }
};


export const Scholastica = {
  description: '6/19 CSS faculty',
  filter(row) {
    return _.every([
      // Filters.isConsentedFromDisk(LATEST_CONSENT, row),
      isForUnconsciousBias(row),
      Filters.isSubmittedResponse(row),
      !Filters.isDeveloper(row),
      !Filters.isThrowawayUser(row),
      !Filters.isExtraAudioLog(row),
      !Filters.isMeaninglessChoice(row),
      Filters.isAfterTime('06/18/17 4:00:00 pm', row),
      Filters.isBeforeTime('06/24/17 9:00:00 pm', row)
    ]);
  },
  dataSet: {
    db: LATEST_DB_PATH,
    s3: LATEST_S3_PATH
  }
};

export const XQFieldTests = {
  description: 'Play test: 7/7 XQ Jayden (unconsented)',
  filter(row) {
    return _.every([
      Filters.isPath('/teachermoments/jayden', row),
      // this was done informally for development purposes,
      // and no consent was asked
      Filters.isSubmittedResponse(row),
      !Filters.isDeveloper(row),
      !Filters.isThrowawayUser(row),
      !Filters.isMeaninglessChoice(row),
      Filters.isAfterTime('07/06/17 4:00:00 pm', row),
      Filters.isBeforeTime('07/08/17 9:00:00 pm', row)
    ]);
  },
  dataSet: {
    db: LATEST_DB_PATH,
    s3: LATEST_S3_PATH
  }
};

export const HMTCA = {
  description: 'Field test: 8/23 HMTCA',
  filter(row) {
    return _.every([
      Filters.isPath('/teachermoments/hmtca?workshop=hmtca20170822', row),
      Filters.isSubmittedResponse(row),
      !Filters.isDeveloper(row),
      !Filters.isThrowawayUser(row),
      !Filters.isMeaninglessChoice(row)
    ]);
  },
  dataSet: {
    db: LATEST_DB_PATH,
    s3: LATEST_S3_PATH
  }
};

export const CTMobileCSPSmith = {
  description: 'Field test: 8/24 CT Mobile CSP Smith',
  filter(row) {
    return _.every([
      Filters.isPath('/teachermoments/smithFacilitated?cohort=mobilecsp&consent=false', row),
      Filters.isSubmittedResponse(row),
      !Filters.isDeveloper(row),
      !Filters.isThrowawayUser(row),
      !Filters.isMeaninglessChoice(row)
    ]);
  },
  dataSet: {
    db: LATEST_DB_PATH,
    s3: LATEST_S3_PATH
  }
};

export const CTMobileCSPJayden = {
  description: 'Field test: 8/24 CT Mobile CSP Jayden',
  filter(row) {
    return _.every([
      Filters.isPath('/teachermoments/jayden?cohort=mobilecsp&text', row),
      Filters.isSubmittedResponse(row),
      !Filters.isDeveloper(row),
      !Filters.isThrowawayUser(row),
      !Filters.isMeaninglessChoice(row)
    ]);
  },
  dataSet: {
    db: LATEST_DB_PATH,
    s3: LATEST_S3_PATH
  }
};

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
  dataSet: {
    db: LATEST_DB_PATH,
    s3: LATEST_S3_PATH
  }
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
  dataSet: {
    db: LATEST_DB_PATH,
    s3: LATEST_S3_PATH
  }
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
  dataSet: {
    db: LATEST_DB_PATH,
    s3: LATEST_S3_PATH
  }
};