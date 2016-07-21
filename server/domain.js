module.exports = {
  getDomain: function(request) {
    return (process.env.NODE_ENV === 'development')
      ? 'http://localhost:5000'
      : `https://${request.headers.host}`;
  }
};
