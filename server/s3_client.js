var fs = require('fs');
var AWS = require('aws-sdk');

module.exports = function createS3Client() {
  const awsConfig = (process.env.NODE_ENV === 'development')
    ? JSON.parse(fs.readFileSync('./tmp/aws_message_popup.json'))
    : {
        accessKeyId: process.env.MESSAGE_POPUP_S3_ACCESS_KEY_ID,
        secretAccessKey: process.env.MESSAGE_POPUP_S3_SECRET_ACCESS_KEY,
        region: process.env.MESSAGE_POPUP_S3_REGION,
        bucket: process.env.MESSAGE_POPUP_S3_BUCKET
      };
  return new AWS.S3(awsConfig); 
}