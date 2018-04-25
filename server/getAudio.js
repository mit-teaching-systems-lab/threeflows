const {insecureStreamAudioFileFromS3} = require('./endpoints/audio.js');

//Endpoint to handle requests to access participant audio data
//I assume requests that get to this point are authorized because:
//  -they pass OnlyAllowResearchers to get to this endpoint so token is valid
//  -the id parameter is taken from data returned from dataEndpoint so checkAccess was passed
//grabs wav file from s3 and returns audio in response body
function audioEndpoint(pool, s3, request, response) {
  const {id} = request.params;
  return insecureStreamAudioFileFromS3({s3,id},request,response);
}

module.exports = {
  audioEndpoint
};