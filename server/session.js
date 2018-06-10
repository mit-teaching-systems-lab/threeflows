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
      const shareId = uuid.v4();
      const location = url+"&share="+shareId;

      const domain = getDomain(request);
      const shareLink = domain+"/share/"+shareId;
      console.log('location:',location);
      console.log('shareLink:',shareLink);

      var housekeepingPromises = [
        insertShareLink(pool, shareId, email, location),
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

function insertShareLink(pool, shareId, email, location) {
  console.log('inside insertShareLink');
  const sql = `
    INSERT INTO share_links (share_id, email, url)
    VALUES ($1, $2, $3)
  `;
  const values = [shareId, email, location];
  return pool.query(sql,values)
    .then(results => shareId)
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

function redirectShare(pool, request, response, next){
  console.log('redirectShare');
  const shareId = request.headers['x-teachermoments-share-id'];
  const sql = `
    SELECT url
    FROM share_links
    WHERE share_id = $1`;
  const values = [shareId];
  console.log('shareId',shareId);
  // response.redirect("/");
  pool.query(sql,values)
    .then(redirectLink => {
      console.log('redirecting to:',redirectLink.rows[0].url);
      console.log(typeof redirectLink.rows[0].url);
      return response.redirect(redirectLink.rows[0].url);
    })
    .catch(err => {
      console.log('there was an error redirecting');
    });
}

module.exports = {
  createSession,
  redirectShare
};