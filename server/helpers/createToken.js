const { sign } = require('jsonwebtoken')

const createToken = (user) => {
  const accessToken = sign(
    {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName
    },
    process.env.JWT_SECRET
  );

  return accessToken;
}

module.exports = createToken;
