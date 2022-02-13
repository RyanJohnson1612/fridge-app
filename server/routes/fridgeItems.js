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
      `SELECT name, category, image_URL, notes, date_removed,
       to_char(date_stored, 'Mon DD, YYYY') as date_stored,
       to_char(expiry, 'Mon DD, YYYY') as expiry,
       (expiry - date_stored) as expire_in,
       (CURRENT_DATE - date_stored) as stored_since
       FROM fridge_items
       WHERE id = $1`;
    const queryParams = [req.params.id]
    db.query(queryString, queryParams).then(data => {
      res.json(data.rows);
    }).catch(error => console.log(`Error: ${error.message}`));
  });

  return router;
}
