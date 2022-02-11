var express = require('express').Router();
var router = express.Router();

module.exports = (db) => {
  
  /* GET users listing. */
  router.get('/', function(req, res, next) {
    res.send('respond with a resource');
  });

  return router;
}
