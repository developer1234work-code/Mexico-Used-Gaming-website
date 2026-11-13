const express = require('express');
const router = express.Router();
const db = require('../services/dbAdapter');
const { authenticateToken, requireRoles } = require('../middleware/auth');

// GET /api/logs/emails (Admin view notification logs)
router.get('/emails', authenticateToken, (req, res) => {
  const { requestId } = req.query;
  let logs = db.find('emailLogs');
  if (requestId) {
    logs = logs.filter(l => l.requestId === requestId);
  }
  logs.sort((a, b) => new Date(b.sentAt) - new Date(a.sentAt));
  res.json({ emails: logs });
});

// GET /api/logs/audit (Admin view system audit logs)
router.get('/audit', authenticateToken, requireRoles(['admin']), (req, res) => {
  let logs = db.find('auditLogs');
  logs.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  res.json({ auditLogs: logs });
});

module.exports = router;
