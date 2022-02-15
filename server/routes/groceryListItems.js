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

  //DELETE specific grocery list item
  router.delete("/:id", function (req, res, next) {
    const queryString = `DELETE FROM grocery_items
      WHERE id = $1 RETURNING *;`;
    const queryParams = [req.params.id];

    db.query(queryString, queryParams).then((data) => {
      console.log("HI");
      res.json(data);
    });
  });

  return router;
};
