const router = require('express').Router();
const bcrypt = require('bcrypt');

module.exports = (db) => {

  /* GET list of users. */
  router.get('/', (req, res) => {
    const command = "SELECT * FROM users;";
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
    const command = "SELECT * FROM users WHERE id = $1;";
    db.query(command, [req.params.id])
      .then(data => {
        if(data.rows[0]) {
          res.json(data.rows[0]);
          res.end()
        } else {
          res.status(404);
          res.json({ message: 'User not found' }).end();
        }
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
    // console.log(req.body.password)
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

  /* POST validate user login */
  router.post('/login', (req, res) => {
    const command = "SELECT * FROM users WHERE email = $1;"
    db.query(command, [req.body.email])
      .then(data => {
        const user = data.rows[0];

        if (!user) {
          res.status(404);
          res.json({message: 'User not found'}).end();
          return;
        }

        if (user && bcrypt.compareSync(req.body.password, user.password)) {
          res.status(200);
          res.json(user).end();
          return;
        } else {
          res.status(401);
          res.json({message: 'Email or password is incorrect'}).end();
        }
      })
      .catch(err => {
        res.json({message: 'Error logging in, please try again', error: err}).end();
      });
  });

  return router;
}
