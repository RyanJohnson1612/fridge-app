const router = require('express').Router();

module.exports = (db) => {

  // GET grocery list
  router.get('/:id', function(req, res, next) {
    const queryString =
      `SELECT *
       FROM grocery_items
       WHERE grocery_list_id = $1;`;
    const queryParams = [req.params.id]

    db.query(queryString, queryParams).then(data => {
      console.log(data.rows)
      res.json(data.rows);
    }).catch(error => console.log(`Error: ${error.message}`));
  });

  router.post('/:id', function(req, res, next) {
    const queryString =
      `INSERT INTO grocery_items (name, grocery_list_id)
       VALUES ($1, $2) RETURNING *;`;
    const queryParams = [req.body.name, req.body.grocery_list_id]

    db.query(queryString, queryParams).then(data => {
      console.log(data.rows[0]);
      res.json(data.rows[0]);
    }).catch(error => console.log(`Error: ${error.message}`));
  });

  return router;
}
