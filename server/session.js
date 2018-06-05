const{getEmail} = require('./database.js');
const uuid = require('uuid');
const {getDomain} = require('./domain.js');

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

      const domain = getDomain(request);
      const shareLink = domain+"/share/"+shareID;
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

function insertShareLink(pool, shareLink, email, url) {
  console.log('inside insertShareLink');
  const sql = `
    INSERT INTO share_links (share_link, email, url)
    VALUES ($1, $2, $3)
  `;
  const values = [shareLink, email, url];
  return pool.query(sql,values)
    .then(results => shareLink)
    .catch(err => {
      console.log('query error in inserting shareLink');
    });
}

function insertAccess(pool, email, location, description){
  console.log('inside insertAccess');
  const sql = `
    INSERT INTO access (email, url, description)
    VALUES ($1, $2, $3)
  `;
  const values = [email, location, description];
  return pool.query(sql,values)
    .then(results => location)
    .catch(err => {
      console.log('query error in inserting access');
    });
}

module.exports = {
  createSession
};