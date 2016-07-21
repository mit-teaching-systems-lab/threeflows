const {getDomain} = require('../domain.js');
const dateFns = require('date-fns');
var uuid = require('uuid');

function getAudioKey(request, id) {
  const env = process.env.NODE_ENV;
  const domain = getDomain(request);

  return [
    env,
    domain,
    'wav-responses',
    `${id}.wav`
  ].join('/');
}


function getUrl(request, id) {
  const domain = getDomain(request);
  return `${domain}/message_popup/wav/${id}.wav`;
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


function get(s3) {
  return (request, response) => {
    const {id} = request.params;
    var params = {
      Bucket: 'message-popup',
      Key: getAudioKey(request, id)
    };
    console.log('Reading from S3...');
    s3.getObject(params).createReadStream().pipe(response);
  }
}

module.exports = {
  get,
  post
};