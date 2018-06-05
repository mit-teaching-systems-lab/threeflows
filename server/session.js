const{getEmail} = require('./database.js');
const uuid = require('uuid');

function createSession(pool, request, response) {
  console.log('createSession');
  // const token = request.headers['x-teachermoments-token'];
  const token = '5892dd62-b2b1-4f3b-98f1-77bcf020cba1';
  const url = request.headers['x-teachermoments-location'];
  const description = request.headers['x-teachermoments-description'];

  // console.log(token);
  // console.log(url);
  // console.log(description);

  return getEmail(pool,token)
    .then(email => {
      console.log('got email:', email);
      const shareID = uuid.v4();
      const location = url+"&share="+shareID;
      const shareLink = 'https://teachermoments.com/share/'+shareID;
      console.log('location:',location);
      console.log('shareLink:',shareLink);

      var housekeepingPromises = [
        insertShareLink(pool, shareLink, email, url),
        insertAccess(pool, email, location, description),
      ];
      Promise.all(housekeepingPromises)
        .then( result => {
          console.log('done:',result);
          response.json({
            shareLink: shareLink
          });
          return response.status(200).end();
        })
        .catch(err => {
          console.log('something went wrong');
          return response.status(500).end();
        });
    })
    .catch(err => {
      console.log('Fail getEmail');
      return response.status(500).end();
    });
}

function insertShareLink(pool, shareID, email, url) {
  console.log('inside insertShareLink');
  return Promise.resolve(shareID);
}

function insertAccess(pool, email, location, description){
  console.log('inside insertAccess');
  return Promise.resolve(location);
}

module.exports = {
  createSession
};