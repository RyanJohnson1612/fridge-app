const router = require('express').Router();
const bcrypt = require('bcrypt');

module.exports = (db) => {

  /* GET list of users. */
  router.get('/', (req, res) => {
    const command = "SELECT * FROM users";
    db.query(command)
      .then(data => {
        res.json(data.rows);
      })
      .catch(err => err);
  });

  /* GET user by id. */
  router.get('/:id', (req, res) => {
    const command = "SELECT * FROM users WHERE id = $1";
    db.query(command, [req.params.id])
      .then(data => {
        res.json(data.rows[0]);
      })
      .catch(err => err);
  });

  /* POST create new user */
  router.post('/', (req, res) => {

  });

  return router;
}
