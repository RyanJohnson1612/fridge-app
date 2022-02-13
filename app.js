require('dotenv').config();

const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require("body-parser");
const cors = require('cors');

// db connection
const db = require('./configs/db.config');

const usersRouter = require('./routes/users');

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/users', usersRouter(db));

module.exports = app;
