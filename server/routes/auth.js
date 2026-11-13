const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../services/dbAdapter');
const { authenticateToken, requireRoles, JWT_SECRET } = require('../middleware/auth');

// POST /api/auth/login
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Por favor ingrese correo y contraseña.' });
  }

  const user = db.findOne('users', { email: email.trim().toLowerCase() });
  if (!user) {
    return res.status(401).json({ error: 'Credenciales inválidas.' });
  }

  const isMatch = bcrypt.compareSync(password, user.passwordHash);
  if (!isMatch) {
    return res.status(401).json({ error: 'Credenciales inválidas.' });
  }

  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
      name: user.name
    },
    JWT_SECRET,
    { expiresIn: '24h' }
  );

  // Audit log
  db.insertOne('auditLogs', {
    id: `audit-${Date.now()}`,
    action: 'USER_LOGIN',
    performedBy: user.name,
    userId: user.id,
    role: user.role,
    timestamp: new Date().toISOString(),
    details: `Inicio de sesión exitoso como ${user.role}`
  });

  res.json({
    message: 'Inicio de sesión exitoso',
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      department: user.department
    }
  });
});

// GET /api/auth/me
router.get('/me', authenticateToken, (req, res) => {
  res.json({
    user: {
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
      role: req.user.role,
      department: req.user.department
    }
  });
});

// GET /api/auth/staff-users
router.get('/staff-users', authenticateToken, requireRoles(['admin']), (req, res) => {
  const users = db.find('users').map(u => ({
    id: u.id,
    name: u.name,
    email: u.email,
    role: u.role,
    department: u.department,
    createdAt: u.createdAt
  }));
  res.json({ users });
});

module.exports = router;
