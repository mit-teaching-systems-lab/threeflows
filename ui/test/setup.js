/* setup.js */


// Setup jsdom for testing in node
// see https://github.com/airbnb/enzyme/blob/master/docs/guides/jsdom.md
var jsdom = require('jsdom').jsdom;
var exposedProperties = ['window', 'navigator', 'document'];
global.document = jsdom('');
global.window = document.defaultView;
Object.keys(document.defaultView).forEach((property) => {
  if (typeof global[property] === 'undefined') {
    exposedProperties.push(property);
    global[property] = document.defaultView[property];
  }
});
global.navigator = {
  userAgent: 'node.js'
};


// Disable velocity-react in test
// see https://github.com/twitter-fabric/velocity-react#statics
require('velocity-react/velocity-transition-group').disabledForTest = true;


// Monkey-patch console.error so any calls to it fail the test.
// This covers React PropType validations as well.
var consoleError = console.error;
console.error = function(message) {
  var args = Array.prototype.slice.call(arguments);
  throw new Error(message, args.slice(1));
  consoleError.apply(console, args);
};