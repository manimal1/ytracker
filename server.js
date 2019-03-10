const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const chalk = require('chalk');

const users = require('./routes/api/users');
const captains = require('./routes/api/captains');
const yachts = require('./routes/api/yachts');
const company = require('./routes/api/company');
const profile = require('./routes/api/profile');
const yachtprofiles = require('./routes/api/yachtprofiles');
const services = require('./routes/api/services');
const posts = require('./routes/api/posts');

const app = express();
const { log } = console;

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// DB config
const db = require('./config/keys').mongoURI;

// Connect to mongodb
mongoose.set('useCreateIndex', true);
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => log(chalk.green('MongoDB connected'))) // eslint-disable-line no-console
  .catch(err => log(chalk.red(err))); // eslint-disable-line no-console

// Passport middleware
app.use(passport.initialize());

// Passport config
require('./config/passport')(passport);

// Use Routes
app.use('/api/users', users);
app.use('/api/yachts', yachts);
app.use('/api/captains', captains);
app.use('/api/company', company);
app.use('/api/profile', profile);
app.use('/api/yachtprofiles', yachtprofiles);
app.use('/api/services', services);
app.use('/api/posts', posts);

// serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  // set a static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendfile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => log(chalk.green(`Server running on port ${port}`))); // eslint-disable-line no-console
