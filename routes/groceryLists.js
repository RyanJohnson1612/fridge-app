const router = require('express').Router();

module.exports = (db) => {

  // GET grocery lists
  router.get('/', function(req, res, next) {
    const queryString =
      `SELECT *
       FROM grocery_lists;`
    db.query(queryString).then(data => {
      console.log(data.rows)
      res.json(data.rows);
    }).catch(error => console.log(`Error: ${error.message}`));
  })

  // GET grocery list
  router.get('/:id', function(req, res, next) {
    const queryString =
      `SELECT * FROM grocery_items
       WHERE grocery_list_id = $1
       ORDER BY ID;`;
    const queryParams = [req.params.id]

    db.query(queryString, queryParams).then(data => {
      console.log(data.rows)
      res.json(data.rows);
    }).catch(error => console.log(`Error: ${error.message}`));
  });

  router.post('/:id', function(req, res, next) {
    const queryString =
      `INSERT INTO grocery_items (name, grocery_list_id, obtained)
       VALUES ($1, $2, $3) RETURNING *;`;
    const queryParams = [req.body.name, req.body.grocery_list_id, req.body.obtained]

    db.query(queryString, queryParams).then(data => {
      console.log(data.rows[0]);
      res.json(data.rows[0]);
    }).catch(error => console.log(`Error: ${error.message}`));
  });

  //POST a new grocery list
  router.post('/', function(req, res, next) {
    const queryString =
      `INSERT INTO grocery_lists (user_id, name)
       VALUES ($1, $2) RETURNING *;`;
    const queryParams = [req.body.user_id, req.body.name]

    db.query(queryString, queryParams).then(data => {
      console.log(data.rows[0]);
      res.json(data.rows[0]);
    }).catch(error => console.log(`Error: ${error.message}`));
  });

  //DELETE specific grocery list
  router.delete("/", function (req, res, next) {
    const queryString = `DELETE FROM grocery_lists
      WHERE id = $1 RETURNING *;`;
    const queryParams = [req.body.id];

    db.query(queryString, queryParams).then((data) => {
      res.json(data);
    });
  });


  return router;
}
