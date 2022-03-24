if(process.env.NODE_ENV !== 'production') {
  require("dotenv").config();
}

const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
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
  origin: ['http://localhost:3000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept',
  exposedHeaders: 'Set-Cookie',
  credentials: true,
}

app.use(cors(corsOptions));

app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
if(process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));
} else {
  app.use(express.static(path.join(__dirname, "public")));
}


app.use('/api/users', usersRouter(db));
app.use('/api/fridges', fridgesRouter(db));
app.use('/api/fridge_items', fridgeItemsRouter(db));
app.use('/api/grocery_lists', groceryListsRouter(db));
app.use("/api/grocery_items", groceryListItemsRouter(db));
app.use('/api/recipeItems', recipeRouter(db));
app.use('/api/images', imagesRouter(db));



module.exports = app;


