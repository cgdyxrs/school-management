const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(403).json({ message: 'Token inahitajika!' });

  try {
    const bearer = token.split(' ')[1];
    const decoded = jwt.verify(bearer, 'SECRET_KEY_YAKO_HAPA');
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token si sahihi au ime-expire!' });
  }
};

module.exports = verifyToken;
