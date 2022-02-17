const { verify } = require('jsonwebtoken');

/* Route protection middleware, requires a jsonwebtoken (access-token) to be set to access route */

const protected = (req, res, next) => {
  console.log(req.cookies)
  const accessToken = req.cookies['access-token'];

  if (!accessToken) {
    return res.status(401).send('Unauthorized')
  }

  try {
    console.log('valid', valid)
    if(verify(accessToken, process.env.JWT_SECRET)) {
      req.authenticated = true;
      return next();
    }
  } catch (err) {
    return res.status(400).json({error: err})
  }
}

module.exports = protected;
