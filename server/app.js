require("dotenv").config();

const express = require("express");
const path = require("path");
const logger = require("morgan");
const cors = require("cors");

// db connection
const db = require("./configs/db.config");

const usersRouter = require("./routes/users");
const fridgeItemsRouter = require("./routes/fridgeItems");
const groceryListsRouter = require("./routes/groceryLists");
const groceryListItemsRouter = require("./routes/groceryListItems");

const app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/users", usersRouter(db));
app.use("/fridge_items", fridgeItemsRouter(db));
app.use("/grocery_lists", groceryListsRouter(db));
app.use("/grocery_items", groceryListItemsRouter(db));

module.exports = app;
