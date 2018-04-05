//Endpoint to handle requests to access participant audio data
//queries databse for a specific url corresponding to a certain group 
//of users and returns all rows in the evidence table with that url
//Returns 200 unless there was an error with the database query
function audioEndpoint(pool, s3, request, response) {
  const {id} = request.params;
  console.log('audio id:',id);

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
  console.log('params:\n',s3Params);
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
  audioEndpoint
};