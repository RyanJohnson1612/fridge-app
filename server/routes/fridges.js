const router = require('express').Router();
const protectedRoute = require('../middleware/protectedRoute');

module.exports = (db) => {

  /* GET fridge by user id */
  router.get('/', protectedRoute, (req, res) => {
    if (!req.authenticated) {
      return res.status(401).json({message: 'Unauthorized'}).end();
    }
    const command = `
      SELECT * FROM fridges
      JOIN fridge_items ON fridges.id = fridge_id
      WHERE fridges.id = $1`;

    db.query(command, [req.user.id])
      .then(data => {
        res.status(200).json(data.rows).end();
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({error: 'error fetching items', err}).end();
      });
  });

  /* POST create new fridge for user */
  router.post('/', (req, res) => {
    const command = `INSERT INTO fridges (name, user_id) VALUES ($1, $2);`;
    db.query(command, [`${req.body.name}'s Fridge`, req.body.id])
      .then(data => {
        return res.status(201).json('Fridge Created').end();
      })
      .catch(err => {
        return res.status(400).json({err}).end();
      });
  });

  return router
}
