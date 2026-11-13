const express = require('express');
const router = express.Router();
const db = require('../services/dbAdapter');
const upload = require('../middleware/upload');
const { calculateItemEstimate } = require('../services/pricingService');
const { sendNotification } = require('../services/emailService');
const { authenticateToken, requireRoles } = require('../middleware/auth');

// Helper to generate sequential readable Request ID: REQ-2026-XXXX
function generateRequestId() {
  const year = new Date().getFullYear();
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  return `REQ-${year}-${randomSuffix}`;
}

// POST /api/requests/upload-photos (Multipart upload for item/request images)
router.post('/upload-photos', upload.array('photos', 10), (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: 'No se subieron archivos.' });
    }

    const uploadedUrls = req.files.map((file) => ({
      url: `/uploads/${file.filename}`,
      originalName: file.originalname,
      size: file.size,
      mimeType: file.mimetype
    }));

    res.json({ photos: uploadedUrls });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/requests (Customer submits selling cart)
router.post('/', async (req, res) => {
  try {
    const {
      customer,
      items,
      photos = [],
      customerNotes = '',
      termsAccepted
    } = req.body;

    if (!customer || !customer.fullName || !customer.email || !customer.phone) {
      return res.status(400).json({ error: 'Nombre completo, correo electrónico y teléfono/WhatsApp son obligatorios.' });
    }

    if (!customer.city || !customer.state || !customer.postalCode) {
      return res.status(400).json({ error: 'Ciudad, Estado y Código Postal en México son obligatorios para la logística.' });
    }

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: 'El carrito de venta debe contener al menos un artículo.' });
    }

    if (!termsAccepted) {
      return res.status(400).json({ error: 'Debe aceptar los Términos y Condiciones del servicio para continuar.' });
    }

    // Re-verify and calculate estimates server-side for integrity
    let totalEstimated = 0;
    const validatedItems = items.map((rawItem, idx) => {
      const calc = calculateItemEstimate(rawItem);
      totalEstimated += calc.calculatedEstimate;
      return {
        itemId: `item-${Date.now()}-${idx + 1}`,
        ...calc,
        customerNotes: rawItem.customerNotes || ''
      };
    });

    const requestId = generateRequestId();
    const nowIso = new Date().toISOString();

    const newRequest = {
      id: requestId,
      customer: {
        fullName: customer.fullName.trim(),
        email: customer.email.trim().toLowerCase(),
        phone: customer.phone.trim(),
        whatsapp: customer.whatsapp ? customer.whatsapp.trim() : customer.phone.trim(),
        city: customer.city.trim(),
        state: customer.state.trim(),
        postalCode: customer.postalCode.trim(),
        shippingOrigin: `${customer.city.trim()}, ${customer.state.trim()} C.P. ${customer.postalCode.trim()}`,
        streetAddress: customer.streetAddress ? customer.streetAddress.trim() : ''
      },
      items: validatedItems,
      totalEstimatedAmount: totalEstimated,
      currency: 'MXN',
      status: 'SUBMITTED',
      statusLabel: 'En Revisión Preliminar',
      customerNotes: customerNotes.trim(),
      photos: Array.isArray(photos) ? photos : [],
      termsAccepted: true,
      termsAcceptedAt: nowIso,
      termsVersion: '1.1-MEX-2026',
      preliminaryOffer: {
        amount: totalEstimated,
        preparedBy: null,
        sentAt: null,
        acceptedByCustomer: null,
        acceptedAt: null
      },
      shippingApproval: {
        approved: false, // Must NEVER be approved automatically per SRS 6.3!
        approvedBy: null,
        approvedAt: null,
        carrier: null,
        trackingNumber: null,
        labelReference: null,
        instructions: null,
        isCRTVerified: false
      },
      inspection: null,
      revisedOffer: null,
      internalNotes: [],
      createdAt: nowIso,
      updatedAt: nowIso,
      statusHistory: [
        {
          status: 'SUBMITTED',
          changedBy: `Cliente (${customer.fullName})`,
          timestamp: nowIso,
          notes: 'Solicitud creada en línea con fotos y aceptación de términos.'
        }
      ]
    };

    const savedRequest = db.insertOne('sellRequests', newRequest);

    // Audit log
    db.insertOne('auditLogs', {
      id: `audit-${Date.now()}`,
      action: 'SELL_REQUEST_CREATED',
      performedBy: customer.fullName,
      requestId,
      timestamp: nowIso,
      details: `Nueva solicitud creada con ${validatedItems.length} artículos por $${totalEstimated} MXN`
    });

    // Trigger transactional notifications asynchronously
    await sendNotification('NEW_REQUEST_ALERT_TO_BUSINESS', {
      requestId,
      customer: savedRequest.customer,
      items: savedRequest.items,
      totalEstimatedAmount: totalEstimated
    });

    await sendNotification('CUSTOMER_SUBMISSION_CONFIRMATION', {
      requestId,
      customer: savedRequest.customer,
      items: savedRequest.items,
      totalEstimatedAmount: totalEstimated
    });

    res.status(201).json({
      message: 'Solicitud enviada exitosamente.',
      requestId: savedRequest.id,
      request: savedRequest
    });
  } catch (err) {
    console.error('Error submitting sell request:', err);
    res.status(500).json({ error: err.message });
  }
});

// GET /api/requests/track/:requestId (Public customer lookup with Email verification)
router.get('/track/:requestId', (req, res) => {
  const { email } = req.query;
  const requestId = req.params.requestId.trim().toUpperCase();

  const request = db.findById('sellRequests', requestId);
  if (!request) {
    return res.status(404).json({ error: 'Folio de solicitud no encontrado.' });
  }

  // If email query is passed, verify ownership
  if (email && email.trim().toLowerCase() !== request.customer.email.toLowerCase()) {
    return res.status(403).json({ error: 'El correo electrónico no coincide con este folio de solicitud.' });
  }

  // Remove internal sensitive fields before returning to public customer
  const publicRequest = {
    id: request.id,
    customer: {
      fullName: request.customer.fullName,
      email: request.customer.email,
      phone: request.customer.phone,
      city: request.customer.city,
      state: request.customer.state,
      postalCode: request.customer.postalCode
    },
    items: request.items.map(i => ({
      itemId: i.itemId,
      productName: i.productName,
      category: i.category,
      categoryName: i.categoryName,
      conditionLabel: i.conditionLabel,
      calculatedEstimate: i.calculatedEstimate,
      customerNotes: i.customerNotes,
      imageUrl: i.imageUrl
    })),
    totalEstimatedAmount: request.totalEstimatedAmount,
    currency: request.currency,
    status: request.status,
    statusLabel: request.statusLabel,
    photos: request.photos,
    shippingApproval: request.shippingApproval?.approved ? request.shippingApproval : { approved: false },
    preliminaryOffer: request.preliminaryOffer?.sentAt ? request.preliminaryOffer : null,
    revisedOffer: request.revisedOffer,
    inspection: request.inspection ? {
      inspectedAt: request.inspection.inspectedAt,
      functionalityStatus: request.inspection.functionalityStatus,
      physicalCondition: request.inspection.physicalCondition,
      discrepancies: request.inspection.discrepancies,
      missingAccessories: request.inspection.missingAccessories,
      inspectionEvidenceUrls: request.inspection.inspectionEvidenceUrls
    } : null,
    createdAt: request.createdAt,
    updatedAt: request.updatedAt,
    statusHistory: request.statusHistory
  };

  res.json({ request: publicRequest });
});

// POST /api/requests/:requestId/customer-decision (AC-11: Customer accepts or rejects offer)
router.post('/:requestId/customer-decision', async (req, res) => {
  const { decision, offerType = 'revised' } = req.body; // decision: 'ACCEPT' or 'REJECT'
  const requestId = req.params.requestId.trim().toUpperCase();

  const request = db.findById('sellRequests', requestId);
  if (!request) {
    return res.status(404).json({ error: 'Solicitud no encontrada.' });
  }

  const nowIso = new Date().toISOString();

  if (offerType === 'preliminary') {
    if (decision === 'ACCEPT') {
      request.status = 'OFFER_ACCEPTED';
      request.statusLabel = 'Oferta Preliminar Aceptada';
      request.preliminaryOffer.acceptedByCustomer = true;
      request.preliminaryOffer.acceptedAt = nowIso;
      request.statusHistory.push({
        status: 'OFFER_ACCEPTED',
        changedBy: `Cliente (${request.customer.fullName})`,
        timestamp: nowIso,
        notes: `Cliente aceptó formalmente la oferta preliminar de $${request.preliminaryOffer.amount} MXN.`
      });
    } else {
      request.status = 'OFFER_DECLINED';
      request.statusLabel = 'Oferta Preliminar Rechazada';
      request.preliminaryOffer.acceptedByCustomer = false;
      request.preliminaryOffer.acceptedAt = nowIso;
      request.statusHistory.push({
        status: 'OFFER_DECLINED',
        changedBy: `Cliente (${request.customer.fullName})`,
        timestamp: nowIso,
        notes: 'Cliente declinó la oferta preliminar.'
      });
    }
  } else {
    // Revised offer decision (AC-11)
    if (!request.revisedOffer) {
      return res.status(400).json({ error: 'No hay ninguna oferta revisada activa para esta solicitud.' });
    }

    if (decision === 'ACCEPT') {
      request.status = 'FINAL_ACCEPTED';
      request.statusLabel = 'Oferta Revisada Aceptada';
      request.revisedOffer.customerDecision = 'ACCEPTED';
      request.revisedOffer.customerDecisionAt = nowIso;
      request.statusHistory.push({
        status: 'FINAL_ACCEPTED',
        changedBy: `Cliente (${request.customer.fullName})`,
        timestamp: nowIso,
        notes: `Cliente aceptó explícitamente la oferta revisada de $${request.revisedOffer.revisedAmount} MXN.`
      });
    } else {
      request.status = 'FINAL_REJECTED';
      request.statusLabel = 'Oferta Rechazada (Retorno Requerido)';
      request.revisedOffer.customerDecision = 'REJECTED';
      request.revisedOffer.customerDecisionAt = nowIso;
      request.statusHistory.push({
        status: 'FINAL_REJECTED',
        changedBy: `Cliente (${request.customer.fullName})`,
        timestamp: nowIso,
        notes: 'Cliente rechazó la oferta revisada. Se requiere tramitar el retorno seguro de los artículos.'
      });

      // Send return notification
      await sendNotification('RETURN_STATUS', {
        requestId,
        customer: request.customer
      });
    }
  }

  const updated = db.findByIdAndUpdate('sellRequests', requestId, request);

  // Audit
  db.insertOne('auditLogs', {
    id: `audit-${Date.now()}`,
    action: `CUSTOMER_OFFER_${decision}`,
    performedBy: request.customer.fullName,
    requestId,
    timestamp: nowIso,
    details: `Cliente decidió ${decision} para la oferta (${offerType})`
  });

  res.json({ message: 'Decisión registrada exitosamente.', request: updated });
});

// --- ADMIN / STAFF ROUTES ---

// GET /api/requests (Admin search and filter)
router.get('/', authenticateToken, (req, res) => {
  const { status, category, search, page = 1, limit = 50 } = req.query;

  let requests = db.find('sellRequests');

  // Filter by status
  if (status && status !== 'all') {
    requests = requests.filter(r => r.status === status);
  }

  // Filter by category
  if (category && category !== 'all') {
    requests = requests.filter(r => r.items.some(i => i.category === category));
  }

  // Filter by search (id, customer name, email, phone)
  if (search && search.trim()) {
    const q = search.trim().toLowerCase();
    requests = requests.filter(r =>
      r.id.toLowerCase().includes(q) ||
      r.customer.fullName.toLowerCase().includes(q) ||
      r.customer.email.toLowerCase().includes(q) ||
      r.customer.phone.toLowerCase().includes(q) ||
      r.customer.city.toLowerCase().includes(q)
    );
  }

  // Sort descending by created date
  requests.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  const total = requests.length;
  const startIndex = (Number(page) - 1) * Number(limit);
  const paginated = requests.slice(startIndex, startIndex + Number(limit));

  res.json({
    requests: paginated,
    total,
    page: Number(page),
    limit: Number(limit),
    totalPages: Math.ceil(total / Number(limit))
  });
});

// GET /api/requests/:requestId (Admin view full request)
router.get('/:requestId', authenticateToken, (req, res) => {
  const request = db.findById('sellRequests', req.params.requestId);
  if (!request) {
    return res.status(404).json({ error: 'Solicitud no encontrada.' });
  }
  res.json({ request });
});

// POST /api/requests/:requestId/status (Update status with internal note)
router.post('/:requestId/status', authenticateToken, (req, res) => {
  const { status, statusLabel, notes } = req.body;
  const requestId = req.params.requestId;

  const request = db.findById('sellRequests', requestId);
  if (!request) {
    return res.status(404).json({ error: 'Solicitud no encontrada.' });
  }

  const nowIso = new Date().toISOString();

  request.status = status;
  if (statusLabel) request.statusLabel = statusLabel;

  request.statusHistory.push({
    status,
    changedBy: `${req.user.name} (${req.user.role})`,
    timestamp: nowIso,
    notes: notes || 'Actualización de estado por personal operativo.'
  });

  if (notes) {
    if (!request.internalNotes) request.internalNotes = [];
    request.internalNotes.push({
      author: req.user.name,
      role: req.user.role,
      date: nowIso,
      text: notes
    });
  }

  const updated = db.findByIdAndUpdate('sellRequests', requestId, request);

  db.insertOne('auditLogs', {
    id: `audit-${Date.now()}`,
    action: 'STATUS_UPDATED',
    performedBy: req.user.name,
    requestId,
    timestamp: nowIso,
    details: `Estado cambiado a ${status}: ${notes || 'Sin nota'}`
  });

  res.json({ message: 'Estado actualizado correctamente.', request: updated });
});

// POST /api/requests/:requestId/request-info (Request more info from customer)
router.post('/:requestId/request-info', authenticateToken, requireRoles(['admin', 'purchasing', 'customer_service']), async (req, res) => {
  const { notes } = req.body;
  const requestId = req.params.requestId;

  const request = db.findById('sellRequests', requestId);
  if (!request) {
    return res.status(404).json({ error: 'Solicitud no encontrada.' });
  }

  const nowIso = new Date().toISOString();
  request.status = 'INFO_REQUESTED';
  request.statusLabel = 'Información Adicional Solicitada';

  request.statusHistory.push({
    status: 'INFO_REQUESTED',
    changedBy: `${req.user.name} (${req.user.role})`,
    timestamp: nowIso,
    notes: `Se solicitó información adicional al cliente: "${notes}"`
  });

  const updated = db.findByIdAndUpdate('sellRequests', requestId, request);

  await sendNotification('REQUEST_MORE_INFO', {
    requestId,
    customer: request.customer,
    notes
  });

  res.json({ message: 'Solicitud de información enviada al cliente.', request: updated });
});

// POST /api/requests/:requestId/preliminary-offer (Issue preliminary offer)
router.post('/:requestId/preliminary-offer', authenticateToken, requireRoles(['admin', 'purchasing']), async (req, res) => {
  const { amount, notes } = req.body;
  const requestId = req.params.requestId;

  const request = db.findById('sellRequests', requestId);
  if (!request) {
    return res.status(404).json({ error: 'Solicitud no encontrada.' });
  }

  const nowIso = new Date().toISOString();
  const offerAmount = Number(amount) || request.totalEstimatedAmount;

  request.status = 'PRELIMINARY_OFFER_SENT';
  request.statusLabel = 'Oferta Preliminar Emitida';
  request.preliminaryOffer = {
    amount: offerAmount,
    preparedBy: req.user.name,
    sentAt: nowIso,
    notes: notes || '',
    acceptedByCustomer: null
  };

  request.statusHistory.push({
    status: 'PRELIMINARY_OFFER_SENT',
    changedBy: `${req.user.name} (${req.user.role})`,
    timestamp: nowIso,
    notes: `Oferta preliminar por $${offerAmount} MXN autorizada y notificada al cliente.`
  });

  const updated = db.findByIdAndUpdate('sellRequests', requestId, request);

  await sendNotification('PRELIMINARY_OFFER', {
    requestId,
    customer: request.customer,
    preliminaryOffer: request.preliminaryOffer
  });

  res.json({ message: 'Oferta preliminar emitida con éxito.', request: updated });
});

// POST /api/requests/:requestId/approve-shipping (AC-09: Explicit shipping approval)
router.post('/:requestId/approve-shipping', authenticateToken, requireRoles(['admin', 'purchasing']), async (req, res) => {
  const {
    carrier,
    trackingNumber,
    labelReference,
    instructions,
    isCRTVerified
  } = req.body;

  const requestId = req.params.requestId;
  const request = db.findById('sellRequests', requestId);
  if (!request) {
    return res.status(404).json({ error: 'Solicitud no encontrada.' });
  }

  if (!carrier || !trackingNumber) {
    return res.status(400).json({ error: 'Paquetería y número de guía/rastreo son obligatorios para aprobar el envío.' });
  }

  // Check if request contains CRT TVs - require separate assessment per SRS 6.3
  const hasCRT = request.items.some(i => i.category === 'retro_tvs');
  if (hasCRT && !isCRTVerified) {
    return res.status(400).json({
      error: 'Esta solicitud incluye un Televisor CRT. Debe confirmar la verificación técnica de peso, dimensiones y logística de tarima/fragilidad antes de aprobar el envío.'
    });
  }

  const nowIso = new Date().toISOString();

  request.status = 'SHIPPING_APPROVED';
  request.statusLabel = 'Envío Aprobado (Guía Emitida)';

  request.shippingApproval = {
    approved: true,
    approvedBy: req.user.name,
    approvedByRole: req.user.role,
    approvedAt: nowIso,
    carrier: carrier.trim(),
    trackingNumber: trackingNumber.trim(),
    labelReference: labelReference ? labelReference.trim() : `LION-${Date.now().toString().slice(-6)}`,
    instructions: instructions || 'Empacar con plástico burbuja y caja de doble corrugado. Entregar en la sucursal del transportista asignado.',
    isCRTVerified: Boolean(isCRTVerified)
  };

  request.statusHistory.push({
    status: 'SHIPPING_APPROVED',
    changedBy: `${req.user.name} (${req.user.role})`,
    timestamp: nowIso,
    notes: `Envío explícitamente aprobado por ${req.user.name}. Paquetería: ${carrier}, Guía: ${trackingNumber}.`
  });

  const updated = db.findByIdAndUpdate('sellRequests', requestId, request);

  // Send shipping instructions to customer
  await sendNotification('SHIPPING_APPROVAL', {
    requestId,
    customer: request.customer,
    shippingApproval: request.shippingApproval
  });

  db.insertOne('auditLogs', {
    id: `audit-${Date.now()}`,
    action: 'SHIPPING_EXPLICITLY_APPROVED',
    performedBy: req.user.name,
    requestId,
    timestamp: nowIso,
    details: `Envío autorizado con guía ${trackingNumber} (${carrier})`
  });

  res.json({ message: 'Envío formalmente aprobado. Notificación e instrucciones enviadas al cliente.', request: updated });
});

module.exports = router;
