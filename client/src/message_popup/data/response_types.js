/* @flow weak */

// Ensure that all data access has to go through here.
// For creating params that go with a log type.
export const ResponseTypes = {};

type ForcedChoiceResponseParamsT = {choice:Object};
ResponseTypes.FORCED_CHOICE_RESPONSE = {
  type: 'message_popup_choice_for_behavior_response',
  params(p:ForcedChoiceResponseParamsT):ForcedChoiceResponseParamsT { return p; }
};

type LikertResponseParamsT = {choice:string, choices:[string]};
ResponseTypes.LIKERT_RESPONSE = {
  type: 'message_popup_likert_response',
  params(p:LikertResponseParamsT):LikertResponseParamsT { return p; }
};

type TimedAutoAdvanceResponseParamsT = {skipTapped?:true};
ResponseTypes.TIMED_AUTO_ADVANCE_RESPONSE = {
  type: 'timer_auto_advance_response',
  params(p:TimedAutoAdvanceResponseParamsT):TimedAutoAdvanceResponseParamsT { return p; }
};