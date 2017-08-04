var fs = require('fs');
var AWS = require('aws-sdk');

module.exports = function createS3Client() {
  const awsConfig = (process.env.NODE_ENV === 'development')
    ? JSON.parse(fs.readFileSync('./tmp/aws_message_popup.json'))
    : JSON.parse(process.env.MESSAGE_POPUP_S3_CONFIG_JSON);
  return new AWS.S3(awsConfig); 
};