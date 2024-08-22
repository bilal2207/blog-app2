const jwt = require('jsonwebtoken');
const CustomError = require('../errors/customError');

const authMiddleware = (req, res, next) => {
  const token = req.header('x-auth-token');

  if (!token) {
    throw new CustomError('No token, authorization denied', 401);
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    throw new CustomError('Token is not valid', 401);
  }
};

module.exports = authMiddleware;
