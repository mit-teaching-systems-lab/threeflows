module.exports = {
  getDomain: function(request) {
    return (process.env.NODE_ENV === 'development')
      // apps built using create-react-app have a development server 
      // hosted at port 4000 but the client is accessed at port 3000
      ? 'http://localhost:3000'
      : `https://${request.headers.host}`;
  }
};
