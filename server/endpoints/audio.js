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

// There's no authorization check here
function insecureStreamAudioFileFromS3(params, request, response) {
  const {s3, id} = params;
  var s3Params = {
    Bucket: 'message-popup',
    Key: getAudioKey(request, id)
  };
  console.log('Reading from S3...');
  try {
    s3.getObject(s3Params).createReadStream().pipe(response);
    return;
  }
  catch (err) {
    console.log('Error reading from S3: ', err);
    response.status(503);
    response.json({});
    return;
  }
}


module.exports = {
  post,
  insecureStreamAudioFileFromS3
};