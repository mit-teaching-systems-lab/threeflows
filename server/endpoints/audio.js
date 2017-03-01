const {getDomain} = require('../domain.js');
const dateFns = require('date-fns');
var uuid = require('uuid');

function getAudioKey(request, id) {
  const deploymentFolder = [process.env.NODE_ENV, request.headers.host].join('_');
  return [
    deploymentFolder,
    'wav-responses',
    `${id}.wav`
  ].join('/');
}

function getUrl(request, id) {
  const domain = getDomain(request);
  return `${domain}/teachermoments/wav/${id}.wav`;
};

function post(s3) {
  return (request, response) => {
    const id = [
      dateFns.format(new Date(), 'YYYYMMDD-HHmmss-SSS'),
      uuid.v4()
    ].join('_');
    console.log(`Received ${request.body.length} bytes of audio.`);

    var params = {
      Body: request.body,
      Bucket: 'message-popup',
      Key: getAudioKey(request, id)
    };    
    const url = getUrl(request, id);
    console.log('Writing to S3...');
    s3.putObject(params, function(err, data) {
      if (err) {
        console.log('Error writing to S3: ', err);
        response.status(500);
        return response.json({});
      }

      response.status(201);
      return response.json({ url, id });
    });
  }
}


module.exports = {
  post
};