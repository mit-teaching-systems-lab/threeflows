# threeflows
[![Build Status](https://travis-ci.org/mit-teaching-systems-lab/threeflows.svg?branch=master)](https://travis-ci.org/mit-teaching-systems-lab/threeflows)

A barebones [Express](http://expressjs.com/) server and [React](https://facebook.github.io/react/) webapp for doing design sketches of flows through a challenge and pieces of the challenge experience.

## Server
#### Run locally
```
$ npm install
$ npm start
```

#### Database
It's expecting [Postgres](https://devcenter.heroku.com/articles/heroku-postgresql) in production, and doesn't use anything locally.

## UI
#### Build
In another terminal, start a watch process to build the project:
```
ui $ npm run watch
```
This builds artifacts and places them in the `ui/build` folder.

### Type check with Flow
This starts a [Flow](https://flowtype.org/) server in the background, and then runs a typecheck once.  There's no watch command right now.
```
ui $ npm run flow
``

### Run all tests
This is used in CI, and runs any and all tests in the project including typechecks.
```
ui $ npm run test
```

## Initial Heroku setup
Make sure you have [Node.js](http://nodejs.org/) and the [Heroku Toolbelt](https://toolbelt.heroku.com/) installed.  To run remote Postgres commands you'll also need to [install Postgres locally](https://devcenter.heroku.com/articles/heroku-postgresql).

Create the database:
```
$ heroku addons:create heroku-postgresql:hobby-dev
```

Seed the database:
```
$ heroku pg:psql
threeflows:DATABASE=> CREATE TABLE evidence (
  id serial primary key,
  app text,
  type text,
  version integer,
  timestamp timestamp,
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

## Other services
[Travis](https://travis-ci.org/mit-teaching-systems-lab/threeflows) is setup for CI.  It will run on pull requests and on commits to master.

On merging to master, Travis will trigger a build.  If that build passes, Heroku will deploy the app on its own.

## Documentation

For more information about using Node.js on Heroku, see these Dev Center articles:

- [Getting Started with Node.js on Heroku](https://devcenter.heroku.com/articles/getting-started-with-nodejs)
- [Heroku Node.js Support](https://devcenter.heroku.com/articles/nodejs-support)
- [Node.js on Heroku](https://devcenter.heroku.com/categories/nodejs)
- [Best Practices for Node.js Development](https://devcenter.heroku.com/articles/node-best-practices)
- [Using WebSockets on Heroku with Node.js](https://devcenter.heroku.com/articles/node-websockets)
