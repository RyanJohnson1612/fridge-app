const { verify } = require('jsonwebtoken');
const { promisify } = require('util');
const db = require('../configs/db.config');

/* Decrypts jwt  */
const decryptToken = async (token) => {
  //convert jwt.verify to a function that returns promise
  const verifyToken = promisify(verify);
  return await verifyToken(token, process.env.JWT_SECRET);
}

/* Route protection middleware, requires a jsonwebtoken (access-token) to be set to access route */
const protectedRoute = async (req, res, next) => {
  const accessToken = req.cookies['access-token'];

  if (!accessToken) {
    return res.status(401).send('Unauthorized')
  }

  const decryptedToken = await decryptToken(accessToken);

  if(decryptedToken) {
    req.user = { id: decryptedToken.id, email: decryptedToken.email };
    req.authenticated = true;
    return next();

  } else {
    return res.status(400).json('Error authorizing')
  }
}

module.exports = protectedRoute;
