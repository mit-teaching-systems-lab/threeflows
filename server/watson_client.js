var fs = require('fs');

module.exports = function createWatsonClient() {
  const watsonConfig = (process.env.NODE_ENV === 'development')
    ? JSON.parse(fs.readFileSync('./tmp/watson_config.json'))
    : JSON.parse(process.env.WATSON_CONFIG_JSON);
  return watsonConfig; 
};