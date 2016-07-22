//@flow
import querystring from 'querystring';

/*
Navigation functions
*/
import ReactMiniRouter from 'react-mini-router';
export const navigate = ReactMiniRouter.navigate;
export function newTab(url:string):void {
  window.open(url, '_blank');
}


/*
Path definitions
*/
export const Home = '/';
export function challengePath(id:number):string {
  return `/challenge/${id}`;
}

export function virtualSchoolPath():string {
  return '/virtual_school';
}

export function messagePopupPracticePath() {
  return '/message_popup';
}

export function messagePopupSolutionPath() {
  return "/message_popup?solution";
}

export function messagePopupScoringPath() {
  return '/message_popup/scoring';
}

export function messagePopupExplorationPath() {
  return '/message_popup/exploration';
}

export function messagePopupEvaluationUrl(evaluationId:number) {
  return `/message_popup/evaluations/${evaluationId}`;
}

export function messagePopupAuthoringQuestionsPath(){
  return '/message_popup/authoring/questions';
}

export function doSomethingPath() {
  return '/do_something';
}

export function ecdRaw() {
  return '/ecd/raw';
}

export function ecdCandidate(email:string) {
  const queryString = querystring.stringify({email});
  return `/ecd/candidate?${queryString}`;
}


/* Services */
type EvidencePathT = {app:string, type:string, version:number};
export function evidencePath({app, type, version}:EvidencePathT):string {
  return `/server/evidence/${app}/${type}/${version}`;
}
export function evaluationPath({app, type, version}:EvidencePathT):string {
  return `/server/evaluations/${app}/${type}/${version}`;
}

/* External links */
export function chatRoom(room:string):string {
  return `https://mittsl.slack.com/messages/${room}/`;
}

export function chatMessage(user:string):string {
  return `https://mittsl.slack.com/messages/@${user}/`;
}

export function videoFor(challengeName:string) {
  return `https://appear.in/${encodeURIComponent(challengeName)}`;
}

export function embeddedDriveList(driveFolderId:string) {
  return `https://drive.google.com/embeddedfolderview?id=${driveFolderId}#list`;
}

export function driveFolder(driveFolderId:string) {
  return `https://drive.google.com/drive/folders/${driveFolderId}`;
}

export function googleCalendar() {
  return 'https://calendar.google.com/';
}