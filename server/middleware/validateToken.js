const { verify } = require('jsonwebtoken');

const validateToken = (req, res, next) => {
  const accessToken = req.cookie["access-token"];

  if (!accessToken) {
    return res.status(400).json({error: 'User not authenticated'})
  }

  try {
    if(verify(accessToken, process.env.JWT_SECRET)) {
      req.authenticated = true;
      return next();
    }
  } catch (err) {
    return res.status(400).json({error: err})
  }
}

module.exports = validateToken;
