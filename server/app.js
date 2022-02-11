require('dotenv').config();

const express = require('express');
const path = require('path');
const logger = require('morgan');

// db connection
const db = require('./configs/db.config');

const usersRouter = require('./routes/users');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', usersRouter(db));

module.exports = app;
