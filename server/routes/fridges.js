const router = require('express').Router();
const protectedRoute = require('../middleware/protectedRoute');
const formatQueryString = require('../helpers/formatQueryString');
const moment = require('moment');

module.exports = (db) => {

  /* GET fridge by user id */
  router.get('/', protectedRoute, (req, res) => {
    if (!req.authenticated) {
      return res.status(401).json({error: 'Unauthorized'}).end();
    }

    let command = `
      SELECT * FROM fridge_items WHERE (fridge_id = $1)`

    command += `${formatQueryString(req.query)}`;

    command = command
      .replace(/status = /g, '')
      .replace("'fresh'", `expiry >= '${moment().add(3, 'days').format('YYYY-MM-DD')}' OR expiry IS NULL`)
      .replace("'expiring soon'", `expiry BETWEEN '${moment().format('YYYY-MM-DD')}' AND '${moment().add(3, 'days').format('YYYY-MM-DD')}'`)
      .replace("'expired'", `expiry <= '${moment().format('YYYY-MM-DD')}'`)
      .replace('search', 'name');

    console.log(command);

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
