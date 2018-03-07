import raf from 'raf';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';


// Enzyme setup
configure({ adapter: new Adapter() });


// Magic file for create-react-app and Jest
// See https://github.com/facebookincubator/create-react-app/pull/548
global.requestAnimationFrame = raf; // eslint-disable-line no-undef


// for media queries (eg., react-media)
// via https://github.com/WickyNilliams/enquire.js/issues/82#issuecomment-26990494
window.matchMedia = window.matchMedia || function() {
  return {
    matches : false,
    addListener : function() {},
    removeListener: function() {}
  };
};

// Disable velocity-react in test
// see https://github.com/twitter-fabric/velocity-react#statics
require('velocity-animate'); // eslint-disable-line no-undef
require('velocity-animate/velocity.ui'); // eslint-disable-line no-undef
require('velocity-react/velocity-transition-group').disabledForTest = true; // eslint-disable-line no-undef


// Monkey-patch console.error so any calls to it fail the test.
// This covers React PropType validations as well.
console.error = function(message) { // eslint-disable-line no-console
  var args = Array.prototype.slice.call(arguments);
  throw new Error(message, args.slice(1));
};

// for material-ui, see https://github.com/zilverline/react-tap-event-plugin
// can only be called once
require('react-tap-event-plugin')(); // eslint-disable-line no-undef


// Mock window.scrollTo so it does nothing.  The default setup will throw
// "Not implemented" which is good but we don't care in test, we care ignore
// any impact this has on the UI since we don't need to test scroll position
// at the moment.
window.scrollTo = function() { /* noop */ };