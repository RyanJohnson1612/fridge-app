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
    const queryString =
      `SELECT fridge_items.*, to_char(date_stored, 'YYYY/MM/DD') as modified_date, to_char(expiry, 'YYYY/MM/DD') as modified_expiry, (expiry - date_stored) as expire_in, (CURRENT_DATE - date_stored) as stored_since
       FROM fridge_items
       WHERE id = $1`;
    const queryParams = [req.params.id]
    db.query(queryString, queryParams).then(data => {
      res.json(data.rows);
    }).catch(error => console.log(`Error: ${error.message}`));
  });

  return router;
}
