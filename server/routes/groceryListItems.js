const router = require("express").Router();

module.exports = (db) => {
  // GET grocery items listing
  router.get("/", function (req, res, next) {
    const command = "SELECT * FROM grocery_items";
    db.query(command)
      .then((data) => {
        console.log(data.rows);
        res.json(data.rows);
      })
      .catch((error) => console.log(`Error: ${error.message}`));
  });

  return router;
};
