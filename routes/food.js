const router = require('express').Router();

module.exports = (db) => {

  // GET food listing
  router.get('/', function(req, res, next) {
    const command = "SELECT * FROM fridge_items";
    db.query(command).then(data => {
      console.log(data.rows)
      res.json(data.rows);
    }).catch(error => console.log(`Error: ${error.message}`));
  });

  // GET specific food
  router.get('/:id', function(req, res, next) {
    const queryString = `SELECT * FROM fridge_items WHERE id = $1`;
    const queryParams = [req.params.id]
    db.query(queryString, queryParams).then(data => {
      res.json(data.rows);
    }).catch(error => console.log(`Error: ${error.message}`));
  });

  return router;
}
