[![Build Status](https://travis-ci.org/mit-teaching-systems-lab/threeflows.svg?branch=master)](https://travis-ci.org/mit-teaching-systems-lab/threeflows)
# Practice spaces for teacher preparation programs

> "We conclude that, in the program we studied, prospective teachers have fewer opportunities to engage in approximations that focus on contingent, interactive practice than do novices in the other two professions we studied."
Grossman et al. ([2009](https://cset.stanford.edu/sites/default/files/files/documents/publications/Grossman-TeachingPracticeACross-ProfessionalPerspective.pdf))


- [Demos](https://threeflows.herokuapp.com)
- [Read more](http://tsl.mit.edu/practice-spaces-for-teacher-preparation/)
- ["Playful Rehearsal" talk](https://www.youtube.com/watch?v=ncGmf1OK9oQ&feature=youtu.be) ([slides](http://web.mit.edu/~xtalks/Reich-xtalk-11-10-16.pdf))
- [Academic publications](http://tsl.mit.edu/publications/)

For more information come chat with [@mit_tsl](https://twitter.com/mit_tsl) or visit the [MIT Teaching Systems Lab](http://tsl.mit.edu).

## Diagram and example scenarios
![diagram](https://s3-us-west-2.amazonaws.com/tsl-public/teacher-moments-diagram.png)

## Local software development
This is a [React](https://facebook.github.io/react/) webapp, and a small [Express](http://expressjs.com/) server.
Code in both environments is written in [ES6](https://babeljs.io/docs/learn-es2015/).

#### UI
In another terminal, install dependencies and then start a process that will continually build the UI with hot reloading:
```
$ cd ui
ui $ npm install
ui $ mkdir build
ui $ npm run watch
```
This builds artifacts and places them in the `ui/build` folder.


#### Server
The server app was developed for the [engine specified in the root package.json](https://github.com/mit-teaching-systems-lab/threeflows/blob/master/package.json#L5).  If you already have node installed, you can check the version with:

```
$ node -v
```
And if you need to install it from scratch, follow the instructions for the current version on the [node.js website](https://nodejs.org/en/).

For storing audio files, you'll need keys authorized for a development S3 bucket.  Ask someone for these.

In another terminal, install dependencies and then start the server:
```
$ npm install
$ mkdir tmp
$ npm run dev
```

Now you can play around with the app locally!



## UI tools
The project is built with [Browserify](http://browserify.org/) and uses Babel via [bablify](https://github.com/babel/babelify) to transpile ES6 and JSX.  It also uses [livereactload](https://github.com/milankinen/livereactload) for hot reloading of React components in local development.

For static analysis, we're experimenting with [eslint](http://eslint.org/) and [Flow](https://flowtype.org/).  The configuration for eslint uses [eslint-plugin-react](https://github.com/yannickcr/eslint-plugin-react) and [babel-eslint](https://github.com/babel/babel-eslint).  None of these tools trigger build failures right now, but can be run locally.

You may also want to check out [react-devtools](https://github.com/facebook/react-devtools), which is a Chrome plugin that is especially helpful for navigating apps and discovering which parts of the product correspond to which React components.

### Type check with Flow
This starts a [Flow](https://flowtype.org/) server in the background, and then runs a typecheck once.  There's no watch command right now.
```
ui $ npm run flow-quiet
```

### Lint and fixup with eslint
```
ui $ npm run lint-quiet
```

### Run Mocha tests
This project uses Mocha, with Chai's expect-style assertions, and Enzyme for some React testing utilities.  Tests are co-located with source code in the same folder, distinguished by a `_test.jsx` extension.  To run a process that watches and continually re-runs the tests:

```
ui $ npm run mocha-watch
```

### Run all tests
This is used in CI, and runs any and all tests in the project including linting, typechecks and actual tests.
```
ui $ npm run test
```

### Sublime setup
If you're developing in Sublime, here's a recommended setup for niceties like code highlighting and inline lint errors:
 - [Package Control](https://packagecontrol.io/) for installing Sublime packages
 - [babel-sublime](https://github.com/babel/babel-sublime) for syntax highlighting
 - [SublimeLinter-eslint](https://github.com/roadhump/SublimeLinter-eslint) for inline linting (not jshint)

## Heroku setup
### Initial setup
Make sure you have [Node.js](http://nodejs.org/) and the [Heroku Toolbelt](https://toolbelt.heroku.com/) installed.  To run remote Postgres commands you'll also need to [install Postgres locally](https://devcenter.heroku.com/articles/heroku-postgresql).

Create the database:
```
$ heroku addons:create heroku-postgresql:hobby-dev
```

Seed the database:
```
CREATE TABLE evidence (
  id serial primary key,
  app text,
  type text,
  version integer,
  timestamp timestamp,
  json jsonb
);
CREATE TABLE evaluations (
  id serial primary key,
  app text,
  type text,
  version integer,
  timestamp timestamp,
  json jsonb
);

CREATE TABLE message_popup_questions (
  id serial primary key,
  timestamp timestamp,
  questions jsonb
);

CREATE TABLE reviews (
  id serial primary key,
  timestamp timestamp,
  review_key text,
  access_code text
);

CREATE TABLE review_tokens (
  id serial primary key,
  timestamp timestamp,
  review_id integer,
  email_address text,
  hid text,
  token text
);

```

### Database backups
Backups can be scheduled like so:

```
$ heroku pg:backups schedule DATABASE_URL --at '01:00 America/New_York'
Scheduled automatic daily backups at 01:00 America/New_York for DATABASE

$ heroku pg:backups schedules
=== Backup Schedules
DATABASE_URL: daily at 1:00 (America/New_York)
```

### Deploying to Heroku

```
$ heroku create
$ git push heroku master
$ heroku open
```
or

[![Deploy to Heroku](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy)

Other Heroku docs:
- [Getting Started with Node.js on Heroku](https://devcenter.heroku.com/articles/getting-started-with-nodejs)
- [Heroku Node.js Support](https://devcenter.heroku.com/articles/nodejs-support)
- [Node.js on Heroku](https://devcenter.heroku.com/categories/nodejs)
- [Best Practices for Node.js Development](https://devcenter.heroku.com/articles/node-best-practices)

## Other services
[Travis](https://travis-ci.org/mit-teaching-systems-lab/threeflows) is setup for CI.  It will run on pull requests and on commits to master.

On merging to master, Travis will trigger a build.  If that build passes, Heroku will deploy the app on its own.

## Creating a new simulation
In order to create a new simulation or scenarios, you need to follow these steps:

- **Create Experience Page:** Create an experience page (in `ui/src/message_popup/playtest` folder) to implement and connect the key components of your simulation such as the welcome page, the scenarios, and the summary page. In this experience page, you can use linear_session.jsx to step through all the questions, responses, and reviews that make up your scenarios. You can look at some of the other experience pages to get a better understanding of how this works. For example, danson_experience_page.jsx is for the [Lori Danson simulation](https://threeflows.herokuapp.com/teachermoments/danson) which consists of a background context, reflection questions, text scenarios and audio responses. turner_experience_page.jsx is for the [Jennifer Turner simulation](https://threeflows.herokuapp.com/teachermoments/turner), which has a similar structure as the Lori Danson simulation except that it consists of video scenarios and the audio recording begins immediately the scenario ends instead of requiring the user to click a button. There are other simulations that include a review after each response, multiple choice responses, and likert-scale responses.

- **Create Scenarios:** For many of the current simulations, the actual scenarios are contained in a separate file in the same folder as the experience page. The name of these files typically end in `_scenarios.js`. For example, the scenarios for `turner_experience_page.jsx` are contained in `turner_scenarios.js`. The scenarios get imported in the experience page.

- **Configure URL**: The URL for the simulations are configured in `ui/src/message_popup/index.js`. This is where you configure a URL that points to your experience page. Note that it requires you to configure a URL at the top of the file and then export your experience page at the bottom of the file.

- **Implement Logger and Data store**: If you follow a similar format to what we currently have in other experience pages and reuse existing components, your data will be stored in our current data stores i.e., postgres database for text and log messages, and Amazon S3 for audio recordings.
