const express = require('express');
const router = express.Router();
const db = require('../services/dbAdapter');
const { sendNotification } = require('../services/emailService');
const { authenticateToken, requireRoles } = require('../middleware/auth');

// POST /api/inspection/:requestId/record-receipt (Mark package arrived at facility)
router.post('/:requestId/record-receipt', authenticateToken, requireRoles(['admin', 'inspection']), async (req, res) => {
  const { notes } = req.body;
  const requestId = req.params.requestId;

  const request = db.findById('sellRequests', requestId);
  if (!request) {
    return res.status(404).json({ error: 'Solicitud no encontrada.' });
  }

  const nowIso = new Date().toISOString();
  request.status = 'RECEIVED';
  request.statusLabel = 'Paquete Recibido en Bodega';

  request.statusHistory.push({
    status: 'RECEIVED',
    changedBy: `${req.user.name} (${req.user.role})`,
    timestamp: nowIso,
    notes: notes || 'Paquete recibido físicamente en el centro de inspección de Lion Games & TVs.'
  });

  const updated = db.findByIdAndUpdate('sellRequests', requestId, request);

  await sendNotification('ITEM_RECEIVED', {
    requestId,
    customer: request.customer
  });

  res.json({ message: 'Recepción registrada exitosamente.', request: updated });
});

// POST /api/inspection/:requestId/record-findings (Record item-level inspection & emit final/revised offer)
router.post('/:requestId/record-findings', authenticateToken, requireRoles(['admin', 'inspection']), async (req, res) => {
  try {
    const {
      outcome, // 'CONFIRM_PRELIMINARY', 'REVISED_OFFER', 'REJECT_ALL'
      functionalityStatus, // 'fully_functional', 'minor_issues', 'non_functional'
      physicalCondition, // 'mint', 'good', 'fair', 'damaged'
      serialVerified,
      authenticityVerified, // 'authentic', 'counterfeit', 'unverified'
      discrepancies = '',
      missingAccessories = [],
      evidencePhotos = [],
      revisedAmount,
      revisedReason
    } = req.body;

    const requestId = req.params.requestId;
    const request = db.findById('sellRequests', requestId);
    if (!request) {
      return res.status(404).json({ error: 'Solicitud no encontrada.' });
    }

    const nowIso = new Date().toISOString();

    // Store inspection report
    request.inspection = {
      inspectedBy: req.user.name,
      inspectedByRole: req.user.role,
      inspectedAt: nowIso,
      serialVerified: serialVerified || 'N/A',
      functionalityStatus: functionalityStatus || 'fully_functional',
      physicalCondition: physicalCondition || 'good',
      authenticityVerified: authenticityVerified || 'authentic',
      discrepancies: discrepancies.trim(),
      missingAccessories: Array.isArray(missingAccessories) ? missingAccessories : [],
      inspectionEvidenceUrls: Array.isArray(evidencePhotos) ? evidencePhotos : []
    };

    if (outcome === 'CONFIRM_PRELIMINARY') {
      request.status = 'OFFER_CONFIRMED';
      request.statusLabel = 'Inspección Aprobada - Oferta Confirmada';
      request.revisedOffer = null;

      request.statusHistory.push({
        status: 'OFFER_CONFIRMED',
        changedBy: `${req.user.name} (${req.user.role})`,
        timestamp: nowIso,
        notes: `Inspección física superada con éxito. Oferta confirmada por $${request.preliminaryOffer?.amount || request.totalEstimatedAmount} MXN.`
      });
    } else if (outcome === 'REVISED_OFFER') {
      if (!revisedAmount || !revisedReason) {
        return res.status(400).json({ error: 'Monto revisado y motivo fundado en la inspección son obligatorios.' });
      }

      request.status = 'REVISED_OFFER_SENT';
      request.statusLabel = 'Oferta Revisada Emitida';

      request.revisedOffer = {
        originalAmount: request.preliminaryOffer?.amount || request.totalEstimatedAmount,
        revisedAmount: Number(revisedAmount),
        reason: revisedReason.trim(),
        issuedBy: req.user.name,
        issuedAt: nowIso,
        customerDecision: null, // Must be explicitly accepted or rejected by customer! (AC-11)
        customerDecisionAt: null
      };

      request.statusHistory.push({
        status: 'REVISED_OFFER_SENT',
        changedBy: `${req.user.name} (${req.user.role})`,
        timestamp: nowIso,
        notes: `Inspección detectó discrepancias. Se emitió oferta revisada de $${revisedAmount} MXN. Motivo: ${revisedReason}`
      });

      // Send email alert to customer for decision
      await sendNotification('REVISED_OFFER', {
        requestId,
        customer: request.customer,
        revisedOffer: request.revisedOffer
      });
    } else if (outcome === 'REJECT_ALL') {
      request.status = 'REJECTED';
      request.statusLabel = 'Artículos Rechazados en Inspección';

      request.statusHistory.push({
        status: 'REJECTED',
        changedBy: `${req.user.name} (${req.user.role})`,
        timestamp: nowIso,
        notes: `Artículos no superaron los criterios de calidad o autenticidad: ${discrepancies}`
      });

      await sendNotification('RETURN_STATUS', {
        requestId,
        customer: request.customer
      });
    }

    const updated = db.findByIdAndUpdate('sellRequests', requestId, request);

    db.insertOne('auditLogs', {
      id: `audit-${Date.now()}`,
      action: 'INSPECTION_RECORDED',
      performedBy: req.user.name,
      requestId,
      timestamp: nowIso,
      details: `Inspección completada con dictamen: ${outcome}`
    });

    res.json({ message: 'Dictamen de inspección guardado.', request: updated });
  } catch (err) {
    console.error('Error recording inspection:', err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
