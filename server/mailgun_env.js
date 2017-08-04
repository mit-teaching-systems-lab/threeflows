var fs = require('fs');

module.exports = function createMailgunEnv() {
  if (process.env.NODE_ENV === 'development') {
    const devFilename = './tmp/mailgun_config.json';  
    if (fs.existsSync(devFilename)) {
      return JSON.parse(fs.readFileSync(devFilename));
    }
  }

  return {
    MAILGUN_API_KEY: process.env.MAILGUN_API_KEY,
    MAILGUN_DOMAIN: process.env.MAILGUN_DOMAIN
  };
};