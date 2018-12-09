## Table of Contents

- [Production App](#production-app)
- [CI/CD using CircleCI](#ci/cd-using-circleci)
- [Running the App](#running-the-app) - in development
- [Available Scripts](#available-scripts)

## Production App

This app is currently deployed on [Heroku](https://heroku.com/) and connects to an [mLab](https://mlab.com/) MongoDB database.  You can find it here: [here]().

On the backend it uses Node.js, Express, and MongoDB/Mongoose.  On the frontend it uses React and the Material-UI library.


## CI/CD using CircleCI

I'm using [CircleCI](https://circleci.com/) and [Heroku](https://heroku.com/) for my deployment pipeline.  Whenever a new PR is created in [GitHub](https://github.com/) CircleCI checks the build and runs all tests.  On any merge to master it automatically builds and deploys the new docker container to Heroku.


## Running the App

If you'd like to use it in development you'll have to add a keys.development.js file in the app config folder:

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

This app is intended to use [Docker](https://www.docker.com/) and run in a container.  Please make sure you have Docker installed.  Once you have the keys.development.js file setup and Docker, you're ready to run in development.

For the initial setup:<br>
- First, run `npm install` in the root folder
- Next, run `npm run client-install` in the root folder
- On your first build, run `docker-compose up --build`
- Open [http://localhost:3000](http://localhost:3000) to view the app in the browser<br>
<br>

After the initial setup:<br>
- After the first build you can simply use the `docker-compose up` command.<br>
<br>

- After running either of the `up` commands you can run `docker-compose down` to gracefully stop and remove containers, networks, volumes, and images created by the `up` command.


## Available Scripts

### npm run dev

Runs the app in the development mode without using docker.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### npm run client-install

Installs newly added dependencies in the client folder (React App) if necessary

### npm run linter-fix

Will run eslint against the backend code
