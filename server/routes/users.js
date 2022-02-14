const router = require('express').Router();
const bcrypt = require('bcrypt');
const createToken = require('../helpers/createToken');

module.exports = (db) => {

  /* GET list of users. */
  router.get('/', (req, res) => {
    const command = "SELECT * FROM users;";
    db.query(command)
      .then(data => {
        return res.json(data.rows).end();
      })
      .catch(err => {
        return res.status(400).json({error: err}).end();
      });
  });

  /* GET user by id. */
  router.get('/:id', (req, res) => {
    const command = "SELECT * FROM users WHERE id = $1;";
    db.query(command, [req.params.id])
      .then(data => {
        if(data.rows[0]) {
          return res.json(data.rows[0]).end()
        } else {
          return res.status(404).json({ error: 'User not found' }).end();
        }
      })
      .catch(err => {
        return res.status(400).json(err).end();
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
        return res.status(201).json('User created').end();
      })
      .catch(err => {
        return res.status(400).json({error: err}).end();
      });
  });

  /* POST validate user login */
  router.post('/login', (req, res) => {
    const command = "SELECT * FROM users WHERE email = $1;"
    db.query(command, [req.body.email])
      .then(data => {
        const user = data.rows[0];

        if (!user) {
          return res.status(404).json({error: 'User not found'}).end();
        }

        if (user && bcrypt.compareSync(req.body.password, user.password)) {
          const token = createToken(user);
          // create cookie for access token that lasts 30 days
          res.cookie("access-token", token, {maxAge: 2592000000, httpOnly: true});

          return res.status(200).json({
            id: user.id,
            email: user.email,
            firstName: user.first_name,
            lastName: user.last_name
          }).end();

        } else {
          return res.status(401).json({error: 'Email or password is incorrect'}).end();
        }
      })
      .catch(err => {
        return res.status(500).json({error: 'Error logging in, please try again', err}).end();
      });
  });

  return router;
}
