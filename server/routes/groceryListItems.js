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
      res.json(data);
    });
  });

  // GET specific grocery list item
  router.get("/:id", function (req, res, next) {
    const queryString = `SELECT id, name, grocery_list_id, obtained
    FROM grocery_items
    WHERE id = $1`;
    const queryParams = [req.params.id];
    db.query(queryString, queryParams).then((data) => {
      res.json(data.rows);
    });
  });

  return router;
};
