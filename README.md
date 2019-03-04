## Table of Contents

- [Production App](#production-app)
- [CI/CD using TravisCI](#ci/cd-using-travisci)
- [Running the App](#running-the-app) - in development
- [Available Scripts](#available-scripts)

## Production App

This app is currently deployed on [Heroku](https://heroku.com/) and connects to an [mLab](https://mlab.com/) MongoDB database. You can find it here: [here](https://secure-caverns-23669.herokuapp.com/).

On the backend it uses [Node.js](https://nodejs.org/en/), [Express](https://expressjs.com/), and [MongoDB](https://www.mongodb.com/). On the frontend it uses [React](https://reactjs.org/), [Redux](https://redux.js.org/introduction), and the [Material-UI](https://material-ui.com/) library. Unit and integration tests employ [Jest](https://jestjs.io/en/) and [Enzyme](https://airbnb.io/enzyme/), while [ESLint](https://eslint.org/) maintains code standards. [Docker](https://www.docker.com/) is used for containerzation, ensuring consistency across platforms.

## CI/CD using TravisCI

I'm using [TravisCI](https://travis-ci.org/) and [Heroku](https://heroku.com/) for my deployment pipeline. Whenever a new commit is is added in [GitHub](https://github.com/), Travis runs all lint checks and Jest tests, and also runs a docker build, to ensure coding standards and build integrity. On any merge to master it automatically builds and deploys to Heroku.

## Running the App

This is a production ready build and uses a hosted Mongo database with mLab. The URI and secret or kept hidden in an untracked file. If you'd like to use it in development you'll have to add a keys.development.js file in the app config folder:

```
app/
  config/
    keys.development.js
```

In this file, you'll need to put in a working URI for a MongoDB database:

```
module.exports = {
  mongoURI: 'working-URI-here',
  secretOrKey: 'secretGoesHere',
};
```

### Running with Docker

This app uses [Docker](https://www.docker.com/), so once you have the keys.development.js file setup, you're ready to run in development.

For the initial setup:<br>

- On your first build, run `docker-compose up --build`
- Open [http://localhost:3000](http://localhost:3000) to view the app in the browser<br>
  <br>

After the initial setup:<br>

- After the first build you can simply use the `docker-compose up` command.<br>
  <br>

- After running either of the `up` commands you can run `docker-compose down` to gracefully stop and remove the server and client containers created by the `up` command.<br>
  <br>

### Running without Docker

If you are unfamiliar with Docker and want to run the app without it, replace the "proxy" property "http://server:5000" in ./client/package.json with "http://localhost:5000". Make sure you have [Node](https://nodejs.org/en/download/) and [npm](https://www.npmjs.com/) installed on your device locally. Then follow these steps:<br>

- First, run `npm install` in the root folder
- Next, run `npm run client-install` in the root folder
- Finally, run `npm run dev` in the root folder
- Navigate to [localhost 3000](http://localhost:3000) and you should be up and running<br>
  <br>

## Available Scripts

### npm run dev

Runs the app in development mode without using docker.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits, but you must be sure to change the proxy property in ./client/package.json as mentioned above.<br>
You will also see any lint errors in the console.

### npm run client-install

Installs newly added dependencies in the client folder (React App) if necessary

### npm run client-build

Builds the react client application

### npm run linter-fix

Will run eslint against the backend code
