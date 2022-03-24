require("dotenv").config();

const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { shouldSendSameSiteNone } = require('should-send-same-site-none');
const cors = require('cors');

// db connection
const db = require("./configs/db.config");

const usersRouter = require('./routes/users');
const fridgesRouter = require('./routes/fridges');
const fridgeItemsRouter = require('./routes/fridgeItems');
const groceryListsRouter = require('./routes/groceryLists');
const groceryListItemsRouter = require('./routes/groceryListItems');
const recipeRouter = require('./routes/recipeItems');
const imagesRouter = require("./routes/images");

const app = express();

const corsOptions = {
  origin: process.env.CLIENT_URL,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept',
  exposedHeaders: 'Set-Cookie',
  credentials: true
}

app.use(cors(corsOptions));

app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(shouldSendSameSiteNone);

app.use('/api/users', usersRouter(db));
app.use('/api/fridges', fridgesRouter(db));
app.use('/fridge_items', fridgeItemsRouter(db));
app.use('/grocery_lists', groceryListsRouter(db));
app.use("/grocery_items", groceryListItemsRouter(db));
app.use('/recipeItems', recipeRouter(db));
app.use('/api/images', imagesRouter(db));

module.exports = app;
