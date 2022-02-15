const router = require('express').Router();
const protectedRoute = require('../middleware/protectedRoute');

module.exports = (db) => {

  /* GET fridge by user id */
  router.get('/:id/fridge', protectedRoute, (req, res) => {
    if (!req.authenticated) {
      return res.status(401).json({message: 'Unauthorized'}).end();
    }
    const command = `
      SELECT * FROM fridges
      WHERE user_id = $1`;

    db.query(command, [req.params.id])
      .then(data => {
        console.log(data);
      })
      .catch(err => err);
  });

  /* POST create new fridge for user */
  router.post('/', (req, res) => {
    const command = `INSERT INTO fridges (name, user_id) VALUES ($1, $2);`;
    db.query(command, [`${req.body.name}'s Fridge`, req.body.id])
      .then(data => {
        return res.status(201).json('Fridge Created').end()
      })
      .catch(err => {
        return res.status(400).json({err}).end();
      });
  });

  // router.get('/fridge-test', (req, res) => {
  //   const command =
  //     `SELECT * FROM fridges
  //     JOIN fridge_items ON fridge.id = fridge_id
  //     WHERE id = $1`;

  //   db.query(command, [1])
  //     .then(data => {
  //       console.log(data)
  //       res.json(data.rows);
  //     })
  //     .catch(err => err);
  // });

  return router
}
