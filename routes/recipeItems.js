const router = require('express').Router();
const bcrypt = require('bcrypt');
const createToken = require('../helpers/createToken');

module.exports = (db) => {

  /* GET list 3 items in fridge closest to expiring */
  //user_id temporarily hardcoded
  router.get('/', function(req, res, next) {
    const queryString =
      `SELECT fridge_items.id, fridge_items.name,
      (expiry - date_stored) as expire_in
      FROM fridge_items
      JOIN fridges ON fridges.id = fridge_id
      WHERE (expiry - date_stored)  > 0
      AND (date_removed IS NULL)
      AND user_id = 1
      ORDER BY (expiry - date_stored)
      LIMIT 3;`  ;
    db.query(queryString).then(data => {
      console.log(data.rows)
      res.json(data.rows);
    }).catch(error => console.log(`Error: ${error.message}`));
  });

  return router;
}
