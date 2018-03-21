// This endpoint handles server calls to get transcript of an audio file
// We check the database for an existing transcript, and if we find none
// we use the IBM Watson api to transcribe one from the wav file on s3 and 
// store it
function transcribeEndpoint(pool, request, response) {
  var audioFile = request.headers['x-teachermoments-audio'];
  console.log('audioFile from header:',audioFile);

  //Hard coding this audioFile to a downloadUrl in my local database
  //audioFile should be the downloadUrl for a wav file in s3
  //Should not need this line when hooked to s3
  audioFile = "blob:http://localhost:3000/a510a130-f17d-4331-90fe-1f2c8c0a2083";

  const values = [audioFile];
  const sql = `
    SELECT transcript
    FROM evidence
    WHERE 1=1
      AND json->>'downloadUrl' = $1
    ORDER BY json->>'sessionId', id ASC;`;

  pool.query(sql,values)
    .then(results => {
      if ((results.rowCount >= 1) && (results.rows[0].transcript !== "")){
        console.log('found transcript: ', results.rows[0].transcript);
        response.set('Content-Type', 'application/json');
        response.json({
          transcript: results.rows[0].transcript
        });
        return response.status(200).end();
      }
      else{
        console.log('need to transcribe');
        speechToText(pool,audioFile)
          .then(results => {
            console.log('final transcript: ',results);
            response.set('Content-Type', 'application/json');
            response.json({
              transcript: results 
            });
            return response.status(500).end();
          })
          .catch(err => {
            console.log('Error with transcription:', err);
            return response.status(500).end();
          });
      }
    })
    .catch(err => {
      console.log('Error with database query for transcript:', err);
      return response.status(500).end();
    });
}

// Sets up connection to IBM Watson api and transcribes audio to text.
// returns a promise resolved with the transcript
function speechToText(pool, audioFile) {
  //changing audioFile here to a wav file on my local disk to transcribe
  //Should not need this line when hooked up to s3
  audioFile = '/Users/keving17/Documents/Github/TSL/teacher-moments/server/20180213-185953-485_8d44f67e-d783-4597-aec2-d417325cce06.wav';
  
  var SpeechToTextV1 = require('watson-developer-cloud/speech-to-text/v1');
  var fs = require('fs');

  var watson = new SpeechToTextV1 ({
    username: '54aa1588-bbee-4e5e-8cb9-0533e4494d91',
    password: 'eR8ayEdlzCL4'
  });
  
  var params = {
    audio: fs.createReadStream(audioFile),
    content_type: 'audio/wav',                          // eslint-disable-line camelcase
    timestamps: true,
    word_alternatives_threshold: 0.9,                   // eslint-disable-line camelcase
    keywords: ['colorado', 'tornado', 'tornadoes'],
    keywords_threshold: 0.5                             // eslint-disable-line camelcase
  };
  
  return new Promise((resolve,reject) => {
    watson.recognize(params, function(error, transcript) {
      if (error) {
        console.log('Could not transcribe with IBM Watson:', error);
        reject('Could not transcribe with IBM Watson:', error);
      }
      else{
        const text = transcript.results[0].alternatives[0].transcript;
        updateTranscript(pool, text, audioFile)
          .then(results => {
            resolve(results);
          });
      }
    });
  });
}

// Updates database with transcript so we dont need to transcribe 
// the same wav files multiple times
function updateTranscript(pool, text, audioFile) {
  //change audioFile back to the downloadUrl from my local db to update that entry
  //should not need this when hooked to s3
  audioFile = "blob:http://localhost:3000/a510a130-f17d-4331-90fe-1f2c8c0a2083";

  const values = [text, audioFile];
  const sql = `
    UPDATE evidence
    SET transcript = $1
    WHERE 1=1
      AND json->>'downloadUrl' = $2;`;

  return pool.query(sql,values)
    .then(results => text)
    .catch(err => {
      console.log('Error with database query for updating transcript:', err);
    });
}

module.exports = {
  transcribeEndpoint
};