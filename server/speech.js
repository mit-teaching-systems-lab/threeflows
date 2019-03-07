// This endpoint handles server calls to get transcript of an audio file
// We check the database for an existing transcript, and if we find none
// we use the IBM Watson api to transcribe one from the wav file on s3 and
// store it
function transcribeEndpoint(pool, s3, watsonConfig, request, response) {
  const {audioID} = request.params;

  const values = [audioID];
  const sql = `
    SELECT transcript
    FROM transcripts
    WHERE 1=1
      AND audio_id = $1`;

  pool.query(sql,values)
    .then(results => {
      if ((results.rowCount >= 1) && (results.rows[0].transcript !== "")){
        response.set('Content-Type', 'application/json');
        response.json({
          transcript: results.rows[0].transcript
        });
        return response.status(200).end();
      }
      else{
        speechToText(pool,s3,watsonConfig,audioID,request,response)
          .then(results => {
            response.set('Content-Type', 'application/json');
            response.json({
              transcript: results
            });
            return response.status(200).end();
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

function getAudioKey(request, id) {
  const deploymentFolder = [process.env.NODE_ENV, request.headers.host].join('_');
  return [
    deploymentFolder,
    'wav-responses',
    `${id}.wav`
  ].join('/');
}

// Sets up connection to IBM Watson api and transcribes audio to text.
// returns a promise resolved with the transcript
function speechToText(pool, s3, watsonConfig, audioID, request, response) {
  var SpeechToTextV1 = require('watson-developer-cloud/speech-to-text/v1');

  var watson = new SpeechToTextV1 (watsonConfig);
  //console.log(JSON.stringify(watsonConfig));

  var s3Params = {
    Bucket: s3.config.bucket,
    Key: getAudioKey(request, audioID)
  };
  var params = {
    audio: s3.getObject(s3Params).createReadStream(),
    content_type: 'audio/wav',                          // eslint-disable-line camelcase
    timestamps: true,
    word_alternatives_threshold: 0.9                    // eslint-disable-line camelcase
  };

  return new Promise((resolve,reject) => {
    watson.recognize(params, function(error, transcript) {
      if (error) {
        console.log('Could not transcribe with IBM Watson:', error);
        reject('Could not transcribe with IBM Watson:', error);
      }
      else{
        var text = [];
        for (var i=0; i<transcript.results.length; i++) {
          text.push(transcript.results[i].alternatives[0].transcript);
        }
        updateTranscript(pool, text.join(' [PAUSE] '), audioID)
          .then(results => {
            resolve(results);
          });
      }
    });
  });
}

// Updates database with transcript so we dont need to transcribe
// the same wav files multiple times
function updateTranscript(pool, text, audioID) {
  const values = [audioID, text];
  // var is_it_already_there;
  // const sql_check = `SELECT EXISTS(SELECT * FROM transcripts WHERE audio_id=$1);`;
  // pool.query(sql_check,values)
  //   .then(results => is_it_already_there)
  //   .catch(err => {
  //     console.log('Error with database query for TRUE/FALSE:', err);
  //   });
  // console.log(is_it_already_there, "is is_it_already_there")
  const sql = `
    INSERT INTO transcripts(audio_id,transcript)
    VALUES ($1, $2)
    ON CONFLICT (audio_id) DO NOTHING;`;

  return pool.query(sql,values)
    .then(results => text)
    .catch(err => {
      console.log('Error with database query for updating transcript:', err);
    });
}

module.exports = {
  transcribeEndpoint
};
