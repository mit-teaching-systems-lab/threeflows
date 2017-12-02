/* @flow weak */

// Ensure that all data access has to go through here.
// For creating params that go with a log type.
type ForcedChoiceResponseParamsT = {choice: Object};
export const ResponseTypes = {
  FORCED_CHOICE_RESPONSE: {
    type: 'message_popup_choice_for_behavior_response',
    params(p:ForcedChoiceResponseParamsT):ForcedChoiceResponseParamsT { return p; }
  }
};
