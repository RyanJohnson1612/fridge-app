require("dotenv").config();


const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

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

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));


app.use('/api/users', usersRouter(db));
app.use('/api/fridges', fridgesRouter(db));
app.use('/fridge_items', fridgeItemsRouter(db));
app.use('/grocery_lists', groceryListsRouter(db));
app.use("/grocery_items", groceryListItemsRouter(db));
<<<<<<< HEAD
app.use('/api/images', imagesRouter(db));
=======
app.use('/recipeItems', recipeRouter(db));

>>>>>>> main

module.exports = app;
