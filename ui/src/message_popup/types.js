/* @flow */
export type ResponseLogT = {
  app: 'threeflows',
  type: 'message_popup_response',
  version: number,
  json: {
    name: string
  }
};