//@flow
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

export function messagePopupPath() {
  return `/message_popup`;
}

export function messagePopupSolutionPath() {
  return `/message_popup?solution`;
}


/* Services */
type EvidencePathT = {app:string, type:string, version:number};
export function evidencePath({app, type, version}:EvidencePathT):string {
  return `/server/evidence/${app}/${type}/${version}`;
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