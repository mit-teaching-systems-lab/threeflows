/* @flow */
export default {
  componentWillMount() {
    this.intervals = [];
  },
  setInterval() {
    this.intervals.push(window.setInterval.apply(null, arguments));
  },
  clearIntervals() {
    this.intervals.forEach(window.clearInterval);
  },
  componentWillUnmount() {
    this.clearIntervals();
  }
};