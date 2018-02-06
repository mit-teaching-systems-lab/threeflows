import _ from 'lodash';
import moment from 'moment';
import {obfuscateEmail} from './Anonymize.js';



// Define common filters
const Filters = {
  isConsentedELK(consentFile, row){
    if (!(String(row.game_id) in consentFile)){  //No consent for this game ID
      return false ;
    }
    return ('teacher' in consentFile[row.game_id] && 'student' in consentFile[row.game_id]);
  },
  isConsentedFromDisk(consentFile, row) {
    const emailAddress = row.json.email;
    if (!emailAddress) return;
    return _.includes(consentFile.consented, emailAddress.toLowerCase());
  },
  isConsentedHardcode(row) {
    const emailAddress = row.json.email;
    if (!emailAddress) return true;

    const notConsented = [
      'FireBrick:c1',
      'Turquoise:e9'
    ];
    const withheldConsent = _.includes(notConsented, obfuscateEmail(emailAddress));
    return (!withheldConsent);
  },
  isPairsScenario(row) {
    return Filters.isPath('/teachermoments/tuesday', row);
  },
  isProjectScenario(row) {
    return Filters.isPath('/teachermoments/csfair', row);
  },
  isPath(path, row) {
    return (row.json.GLOBAL && row.json.GLOBAL.location === `https://threeflows.herokuapp.com${path}`);
  },
  containsPath(path, row) {
    return (row.json.GLOBAL && row.json.GLOBAL.location.indexOf(path) !== -1);
  },
  isDeveloper(row) {
    return (row.json.email === 'krob@mit.edu' || row.json.email === 'keyjahanian@gmail.com');
  },
  isThrowawayUser(row) {
    return (-1 !== ['sdf', 'k', 'f', 'test@test.com'].indexOf(row.json.email));
  },
  isUser(emailAddress, row) {
    return (emailAddress.toLowerCase() === (row.json.email || '').toLowerCase());
  },
  isExtraAudioLog(row) {
    return (-1 !== ['message_popup_audio_record_clicked', 'message_popup_audio_done_recording_clicked', 'message_popup_audio_on_done_capture','message_popup_audio_on_submit', 'message_popup_audio_done_uploading'].indexOf(row.type));
  },
  isMeaninglessChoice(row) {
    return (row.json.choice === 'OK' && (-1 !== ['message_popup_choice_for_behavior_response', 'on_response_submitted'].indexOf(row.type)));
  },
  isSubmittedResponse(row) {
    return (row.type === 'on_response_submitted');
  },
  isLikertScore(row) {
    return (row.type === 'message_popup_cs_fair_score_response');
  },
  isAfterTime(timeString, row) {
    return moment(row.timestamp).isAfter(timeString);
  },
  isBeforeTime(timeString, row) {
    return moment(row.timestamp).isBefore(timeString);
  },
  isFlavorText(row) {
    if (row.json.question){
      return (row.json.question.stage === 'info');
    }
    return false;
  },
};


export default Filters;
