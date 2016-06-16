/*
Navigation functions
*/
export * from 'react-mini-router';
export function newTab(url) {
  window.open(url, '_blank');
}


/*
Path definitions
*/
export const Home = '/';
export function challengePath(id) {
  return `/challenge/${id}`;
}

export function messagePopupPath() {
  return `/message_popup`;
}


/* Services */
export function evidencePath({app, type, version}) {
  return `/server/evidence/${app}/${type}/${version}`;
}

/* External links */
export function chatRoom(room) {
  return `https://mittsl.slack.com/messages/${room}/`;
}

export function chatMessage(user) {
  return `https://mittsl.slack.com/messages/@${user}/`;
}

export function videoFor(challengeName) {
  return `https://appear.in/${encodeURIComponent(challengeName)}`;
}

export function embeddedDriveList(driveFolderId) {
  return `https://drive.google.com/embeddedfolderview?id=${driveFolderId}#list`;
}

export function driveFolder(driveFolderId) {
  return `https://drive.google.com/drive/folders/${driveFolderId}`;
}

export function googleCalendar() {
  return 'https://calendar.google.com/';
}