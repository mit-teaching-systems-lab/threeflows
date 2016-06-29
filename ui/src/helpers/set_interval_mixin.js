/* @flow */
export default {
  componentWillMount: function() {
    this.intervals = [];
  },
  setInterval: function() {
    this.intervals.push(window.setInterval.apply(null, arguments));
  },
  componentWillUnmount: function() {
    this.intervals.forEach(window.clearInterval);
  }
};