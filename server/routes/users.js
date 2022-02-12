const router = require('express').Router();

module.exports = (db) => {
  /* GET users listing. */
  router.get('/', function(req, res, next) {
    const command = "SELECT * FROM users";
    db.query(command).then(data => {
      res.json(data.rows);
    }).catch(error => console.log(`Error: ${error.message}`));
  });

  return router;
}
