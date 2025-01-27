// Middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const Utilisateur = require('../Models/Utilisateur');

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await Utilisateur.findById(decoded.id);

    if (!user) {
      throw new Error();
    }

    req.Utilisateur = user;
    next();
  } catch (error) {
    res.status(401).send({ error: 'Please authenticate.' });
  }
};

module.exports = authMiddleware;
