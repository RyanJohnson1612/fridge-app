const router = require('express').Router();
const protectedRoute = require('../middleware/protectedRoute');

module.exports = (db) => {

  /* GET list 3 items in fridge closest to expiring for SPECIFIC user*, to use in default recipe recommendation*/
  //user_id temporarily hardcoded
  router.get('/', protectedRoute, function(req, res, next) {
    const queryString =
      `SELECT fridge_items.id, fridge_items.name,
      FROM fridge_items
      JOIN fridges ON fridges.id = fridge_id
      WHERE (expiry - date_stored) > 0
      AND (date_removed IS NULL)
      AND user_id = $1
      ORDER BY (expiry - date_stored)
      LIMIT 3`;

    const queryParams = [req.user.id]
    db.query(queryString, queryParams).then(data => {
      console.log(data.rows)
      res.json(data.rows);
    }).catch(error => console.log(`Error: ${error.message}`));
  });

  return router;
}
