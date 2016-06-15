# threeflows
A barebones Express server and React webapp for doing design sketches of flows through a challenge and pieces of the challenge experience.

## Server
```
$ npm install
$ npm start
```

## UI
In another terminal, start a watch process to build the project:
```
$ npm run watch
```

This builds artifacts and places them in the `ui/build` folder.

## Initial Heroku setup
Make sure you have [Node.js](http://nodejs.org/) and the [Heroku Toolbelt](https://toolbelt.heroku.com/) installed.  To run remote Postgres commands you'll also need to [install Postgres locally](https://devcenter.heroku.com/articles/heroku-postgresql).

Create the database:
```
$ heroku addons:create heroku-postgresql:hobby-dev
```

Seed the database:
```
$ heroku pg:psql
threeflows:DATABASE=> CREATE TABLE message_popup_responses (
  id serial primary key,
  json jsonb
);
```

## Deploying to Heroku

```
$ heroku create
$ git push heroku master
$ heroku open
```
or

[![Deploy to Heroku](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy)

## Documentation

For more information about using Node.js on Heroku, see these Dev Center articles:

- [Getting Started with Node.js on Heroku](https://devcenter.heroku.com/articles/getting-started-with-nodejs)
- [Heroku Node.js Support](https://devcenter.heroku.com/articles/nodejs-support)
- [Node.js on Heroku](https://devcenter.heroku.com/categories/nodejs)
- [Best Practices for Node.js Development](https://devcenter.heroku.com/articles/node-best-practices)
- [Using WebSockets on Heroku with Node.js](https://devcenter.heroku.com/articles/node-websockets)
