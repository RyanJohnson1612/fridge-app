const router = require('express').Router();
const bcrypt = require('bcrypt');

module.exports = (db) => {

  /* GET list of users. */
  router.get('/', (req, res) => {
    const command = "SELECT * FROM users";
    db.query(command)
      .then(data => {
        res.json(data.rows);
        res.end();
      })
      .catch(err => {
        res.status(400)
        res.json(err).end();
      });
  });

  /* GET user by id. */
  router.get('/:id', (req, res) => {
    const command = "SELECT * FROM users WHERE id = $1";
    db.query(command, [req.params.id])
      .then(data => {
        res.json(data.rows[0]);
        res.end()
      })
      .catch(err => {
        res.status(400)
        res.json(err).end();
      });
  });

  /* POST create new user */
  router.post('/', async (req, res) => {
    // Hash and salt password
    req.body.password = await bcrypt.hash(req.body.password, 10);

    const params = Object.values(req.body);
    const command = "INSERT INTO users (first_name, last_name, email, password) VALUES ($1, $2, $3, $4);"
    db.query(command, params)
      .then(data => {
        res.status(201).end();
      })
      .catch(err => {
        res.status(400)
        res.json(err).end();
      });
  });

  return router;
}
