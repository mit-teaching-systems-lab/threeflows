// see https://github.com/lazerwalker/twison
export type TwisonT = {
  name:string,
  startnode:string,
  ifid:string,
  passages: [TwinePassageT]
};
export type TwinePassageT = {
  pid:string,
  name:string,
  text:string,
  links: [TwineLinkT],
  position: {
    x:string,
    y:string,
  }
};
export type TwineLinkT = {
  pid:string,
  name:string,
  link:string
};