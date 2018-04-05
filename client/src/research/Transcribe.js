function requestTranscript(token,audioID) {
  return fetch('/server/research/transcribe/'+audioID, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'x-teachermoments-token': token,
    },
    method: 'POST'
  })
    .then(result => {
      return result.json();
    })
    .catch(err => {
      console.log('Failed to request transcript');
    });
}

module.exports = {
  requestTranscript
};