const jwt = require('jsonwebtoken');
const db = require('../services/dbAdapter');

const JWT_SECRET = process.env.JWT_SECRET || 'lion-games-tv-secret-key-2026';

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Acceso no autorizado: Token no proporcionado.' });
  }

  jwt.verify(token, JWT_SECRET, (err, userPayload) => {
    if (err) {
      return res.status(403).json({ error: 'Token inválido o expirado.' });
    }

    const user = db.findById('users', userPayload.id);
    if (!user) {
      return res.status(403).json({ error: 'Usuario no encontrado.' });
    }

    req.user = user;
    next();
  });
}

function requireRoles(allowedRoles = []) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Usuario no autenticado.' });
    }

    if (allowedRoles.length === 0 || allowedRoles.includes(req.user.role) || req.user.role === 'admin') {
      return next();
    }

    return res.status(403).json({
      error: `Acceso restringido: Se requiere rol de [${allowedRoles.join(', ')}], pero tu rol es '${req.user.role}'.`
    });
  };
}

module.exports = {
  authenticateToken,
  requireRoles,
  JWT_SECRET
};
