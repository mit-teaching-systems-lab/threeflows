//Endpoint to handle requests to access participant audio data
//I assume requests that get to this point are authorized because:
//  -they pass OnlyAllowResearchers to get to this endpoint so token is valid
//  -the id parameter is taken from data returned from dataEndpoint so checkAccess was passed
//grabs wav file from s3 and returns audio in response body
function audioEndpoint(pool, s3, request, response) {
  const {id} = request.params;
  return insecureStreamAudioFileFromS3({s3,id},request,response);
}

function getAudioKey(request, id) {
  const deploymentFolder = [process.env.NODE_ENV, request.headers.host].join('_');
  return [
    deploymentFolder,
    'wav-responses',
    `${id}.wav`
  ].join('/');
}

function insecureStreamAudioFileFromS3(params, request, response) {
  const {s3, id} = params;
  var s3Params = {
    Bucket: s3.config.bucket,
    Key: getAudioKey(request, id)
  };
  console.log('Reading', id,' from S3...');
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
  audioEndpoint,
  insecureStreamAudioFileFromS3
};