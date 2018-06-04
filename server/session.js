function createSession(pool, request, response) {
  const {email} = request.body;
  
  const token = request.headers['x-teachermoments-token'];
  const url = request.headers['x-teachermoments-location'];

  const domain = getDomain(request);
  const location = `${domain}`+url;
}

module.exports = {
  createSession
};