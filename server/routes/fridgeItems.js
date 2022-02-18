const router = require('express').Router();

module.exports = (db) => {

  // GET food listing
  router.get('/', function(req, res, next) {
    const queryString =
      `SELECT id, name, category, image_URL, notes, date_removed,
      to_char(date_stored, 'Mon DD, YYYY') as date_stored,
      to_char(expiry, 'Mon DD, YYYY') as expiry,
      (expiry - date_stored) as expire_in,
      (CURRENT_DATE - date_stored) as stored_since
      FROM fridge_items`;
    db.query(queryString).then(data => {
      console.log(data.rows)
      res.json(data.rows);
    }).catch(error => console.log(`Error: ${error.message}`));
  });

  // GET specific food
  router.get('/:id', function(req, res, next) {
    const queryString =
      `SELECT id, name, category, image_URL, notes, date_removed,
       to_char(date_stored, 'Mon DD, YYYY') as date_stored,
       to_char(expiry, 'Mon DD, YYYY') as expiry,
       (expiry - date_stored) as expire_in,
       (CURRENT_DATE - date_stored) as stored_since
       FROM fridge_items
       WHERE id = $1`;
    const queryParams = [req.params.id]
    db.query(queryString, queryParams).then(data => {
      res.json(data.rows[0]);
    });
  });

  // DELETE specific food
  router.put('/:id', function(req, res, next) {
    const queryString =
      `UPDATE fridge_items
       SET date_removed = CURRENT_DATE
       WHERE id = $1 RETURNING *;`;
    const queryParams = [req.params.id];

    db.query(queryString, queryParams).then((data) => {
      console.log("HI");
      res.json(data);
    });
  });

  // changed delete to updating the fridge item instead b/c we want to
  // still be able to use the item's info for food wastage tracking ?
  // router.delete('/:id', function(req, res, next) {
  //   const queryString =
  //     `DELETE FROM fridge_items
  //      WHERE id = $1 RETURNING *;`;
  //   const queryParams = [req.params.id];

  //   db.query(queryString, queryParams).then((data) => {
  //     console.log("HI");
  //     res.json(data);
  //   });
  // });

  router.post('/', function(req, res, next) {
    const queryString =
      `INSERT INTO fridge_items (name, fridge_id, expiry, category, image_URL, notes)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;`;
    const queryParams = [req.body.name, 1, req.body.expiry, req.body.category, req.body.image_URL, req.body.notes]

    db.query(queryString, queryParams).then(data => {
      console.log(data.rows[0]);
      res.json(data.rows[0]);
    }).catch(error => console.log(`Error: ${error.message}`));
  });

  return router;
}
