import { INITIAL_REQUESTS, INITIAL_EMAIL_LOGS, INITIAL_AUDIT_LOGS, DEMO_USERS } from './mockAdminData';

const API_BASE = '/api';

function getAuthHeaders() {
  const token = localStorage.getItem('lion_token');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

// Local storage helper for standalone frontend admin requests
function getLocalRequests() {
  try {
    const saved = localStorage.getItem('lion_admin_requests');
    if (saved) return JSON.parse(saved);
  } catch (e) {
    console.error('Error loading local requests:', e);
  }
  localStorage.setItem('lion_admin_requests', JSON.stringify(INITIAL_REQUESTS));
  return [...INITIAL_REQUESTS];
}

function saveLocalRequests(requests) {
  try {
    localStorage.setItem('lion_admin_requests', JSON.stringify(requests));
  } catch (e) {
    console.error('Error saving local requests:', e);
  }
}

export const api = {
  // ==========================================
  // Public Customer APIs (Connected to backend)
  // ==========================================

  // Products
  async getProducts(params = {}) {
    try {
      const searchParams = new URLSearchParams(params);
      const res = await fetch(`${API_BASE}/products?${searchParams}`);
      if (res.ok) {
        return await res.json();
      }
    } catch (e) {
      console.warn('Backend unavailable, using fallback:', e);
    }
    return { products: [], total: 0, page: 1, limit: 50, totalPages: 0 };
  },

  async getProduct(id) {
    const res = await fetch(`${API_BASE}/products/${id}`);
    return res.json();
  },

  // Calculator
  async calculateEstimate(payload) {
    const res = await fetch(`${API_BASE}/calculator/estimate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    return res.json();
  },

  async calculateCart(items) {
    const res = await fetch(`${API_BASE}/calculator/cart-estimate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items })
    });
    return res.json();
  },

  // Customer Requests
  async submitSellRequest(payload) {
    const res = await fetch(`${API_BASE}/requests`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    return res.json();
  },

  async uploadPhotos(files) {
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append('photos', files[i]);
    }
    const res = await fetch(`${API_BASE}/requests/upload-photos`, {
      method: 'POST',
      body: formData
    });
    return res.json();
  },

  async trackRequest(requestId, email) {
    const url = `${API_BASE}/requests/track/${requestId}${email ? `?email=${encodeURIComponent(email)}` : ''}`;
    const res = await fetch(url);
    return res.json();
  },

  async submitCustomerDecision(requestId, decision, offerType = 'revised') {
    const res = await fetch(`${API_BASE}/requests/${requestId}/customer-decision`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ decision, offerType })
    });
    return res.json();
  },

  // ==========================================
  // Admin Operations (Standalone Frontend Only)
  // Backend dependencies removed per specification
  // ==========================================

  async getAdminRequests(params = {}) {
    const { status = 'all', search = '' } = params;
    let list = getLocalRequests();

    if (status && status !== 'all') {
      list = list.filter(r => r.status === status);
    }

    if (search && search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter(r =>
        (r.id && r.id.toLowerCase().includes(q)) ||
        (r.customer?.fullName && r.customer.fullName.toLowerCase().includes(q)) ||
        (r.customer?.email && r.customer.email.toLowerCase().includes(q)) ||
        (r.customer?.phone && r.customer.phone.toLowerCase().includes(q)) ||
        (r.customer?.city && r.customer.city.toLowerCase().includes(q))
      );
    }

    return {
      requests: list,
      total: list.length,
      page: 1,
      limit: 50,
      totalPages: Math.ceil(list.length / 50) || 1
    };
  },

  async getAdminRequest(id) {
    const list = getLocalRequests();
    const req = list.find(r => r.id === id);
    if (!req) return { error: 'Solicitud no encontrada.' };
    return { request: req };
  },

  async updateRequestStatus(id, data) {
    const list = getLocalRequests();
    const idx = list.findIndex(r => r.id === id);
    if (idx === -1) return { error: 'Solicitud no encontrada.' };

    const req = { ...list[idx] };
    const nowIso = new Date().toISOString();
    req.status = data.status || req.status;
    if (data.statusLabel) req.statusLabel = data.statusLabel;

    req.statusHistory = req.statusHistory || [];
    req.statusHistory.push({
      status: req.status,
      changedBy: 'Admin (Frontend)',
      timestamp: nowIso,
      notes: data.notes || 'Actualización de estado en frontend'
    });

    list[idx] = req;
    saveLocalRequests(list);
    return { message: 'Estado actualizado correctamente.', request: req };
  },

  async requestMoreInfo(id, notes) {
    const list = getLocalRequests();
    const idx = list.findIndex(r => r.id === id);
    if (idx === -1) return { error: 'Solicitud no encontrada.' };

    const req = { ...list[idx] };
    const nowIso = new Date().toISOString();
    req.status = 'INFO_REQUESTED';
    req.statusLabel = 'Información Adicional Solicitada';
    req.statusHistory = req.statusHistory || [];
    req.statusHistory.push({
      status: 'INFO_REQUESTED',
      changedBy: 'Admin (Frontend)',
      timestamp: nowIso,
      notes: `Se solicitó información: "${notes}"`
    });

    list[idx] = req;
    saveLocalRequests(list);
    return { message: 'Solicitud de información enviada al cliente.', request: req };
  },

  async issuePreliminaryOffer(id, amount, notes) {
    const list = getLocalRequests();
    const idx = list.findIndex(r => r.id === id);
    if (idx === -1) return { error: 'Solicitud no encontrada.' };

    const req = { ...list[idx] };
    const nowIso = new Date().toISOString();
    const offerAmount = Number(amount) || req.totalEstimatedAmount;

    req.status = 'PRELIMINARY_OFFER_SENT';
    req.statusLabel = 'Oferta Preliminar Emitida';
    req.preliminaryOffer = {
      amount: offerAmount,
      preparedBy: 'Admin (Frontend)',
      sentAt: nowIso,
      notes: notes || '',
      acceptedByCustomer: null
    };

    req.statusHistory = req.statusHistory || [];
    req.statusHistory.push({
      status: 'PRELIMINARY_OFFER_SENT',
      changedBy: 'Admin (Frontend)',
      timestamp: nowIso,
      notes: `Oferta preliminar autorizada por $${offerAmount} MXN.`
    });

    list[idx] = req;
    saveLocalRequests(list);
    return { message: 'Oferta preliminar emitida con éxito.', request: req };
  },

  async approveShipping(id, shippingData) {
    const list = getLocalRequests();
    const idx = list.findIndex(r => r.id === id);
    if (idx === -1) return { error: 'Solicitud no encontrada.' };

    const req = { ...list[idx] };
    const nowIso = new Date().toISOString();

    req.status = 'SHIPPING_APPROVED';
    req.statusLabel = 'Envío Aprobado (Guía Emitida)';
    req.shippingApproval = {
      approved: true,
      approvedBy: 'Admin (Frontend)',
      approvedByRole: 'admin',
      approvedAt: nowIso,
      carrier: shippingData.carrier?.trim() || 'Estafeta México',
      trackingNumber: shippingData.trackingNumber?.trim() || `GUIA-${Date.now().toString().slice(-6)}`,
      labelReference: shippingData.labelReference?.trim() || `LION-${Date.now().toString().slice(-6)}`,
      instructions: shippingData.instructions || 'Empacar con 3 capas de plástico burbuja.',
      isCRTVerified: Boolean(shippingData.isCRTVerified)
    };

    req.statusHistory = req.statusHistory || [];
    req.statusHistory.push({
      status: 'SHIPPING_APPROVED',
      changedBy: 'Admin (Frontend)',
      timestamp: nowIso,
      notes: `Envío formalmente aprobado con ${req.shippingApproval.carrier} (${req.shippingApproval.trackingNumber}).`
    });

    list[idx] = req;
    saveLocalRequests(list);
    return { message: '¡Envío formalmente aprobado e instrucciones generadas!', request: req };
  },

  async recordReceipt(id, notes) {
    const list = getLocalRequests();
    const idx = list.findIndex(r => r.id === id);
    if (idx === -1) return { error: 'Solicitud no encontrada.' };

    const req = { ...list[idx] };
    const nowIso = new Date().toISOString();
    req.status = 'RECEIVED';
    req.statusLabel = 'Paquete Recibido en Bodega';
    req.statusHistory = req.statusHistory || [];
    req.statusHistory.push({
      status: 'RECEIVED',
      changedBy: 'Inspección (Frontend)',
      timestamp: nowIso,
      notes: notes || 'Paquete recibido físicamente en bodega Azcapotzalco.'
    });

    list[idx] = req;
    saveLocalRequests(list);
    return { message: 'Recepción registrada exitosamente.', request: req };
  },

  async recordInspection(id, inspectionData) {
    const list = getLocalRequests();
    const idx = list.findIndex(r => r.id === id);
    if (idx === -1) return { error: 'Solicitud no encontrada.' };

    const req = { ...list[idx] };
    const nowIso = new Date().toISOString();

    req.inspection = {
      inspectedBy: 'Inspector (Frontend)',
      inspectedByRole: 'inspection',
      inspectedAt: nowIso,
      serialVerified: inspectionData.serialVerified || 'N/A',
      functionalityStatus: inspectionData.functionalityStatus || 'fully_functional',
      physicalCondition: inspectionData.physicalCondition || 'good',
      authenticityVerified: inspectionData.authenticityVerified || 'authentic',
      discrepancies: (inspectionData.discrepancies || '').trim(),
      missingAccessories: Array.isArray(inspectionData.missingAccessories) ? inspectionData.missingAccessories : [],
      inspectionEvidenceUrls: Array.isArray(inspectionData.evidencePhotos) ? inspectionData.evidencePhotos : []
    };

    if (inspectionData.outcome === 'CONFIRM_PRELIMINARY') {
      req.status = 'OFFER_CONFIRMED';
      req.statusLabel = 'Inspección Aprobada - Oferta Confirmada';
      req.revisedOffer = null;
      req.statusHistory = req.statusHistory || [];
      req.statusHistory.push({
        status: 'OFFER_CONFIRMED',
        changedBy: 'Inspección (Frontend)',
        timestamp: nowIso,
        notes: `Inspección superada. Oferta confirmada por $${req.preliminaryOffer?.amount || req.totalEstimatedAmount} MXN.`
      });
    } else if (inspectionData.outcome === 'REVISED_OFFER') {
      req.status = 'REVISED_OFFER_SENT';
      req.statusLabel = 'Oferta Revisada Emitida';
      req.revisedOffer = {
        originalAmount: req.preliminaryOffer?.amount || req.totalEstimatedAmount,
        revisedAmount: Number(inspectionData.revisedAmount),
        reason: (inspectionData.revisedReason || '').trim(),
        issuedBy: 'Inspector (Frontend)',
        issuedAt: nowIso
      };
      req.statusHistory = req.statusHistory || [];
      req.statusHistory.push({
        status: 'REVISED_OFFER_SENT',
        changedBy: 'Inspección (Frontend)',
        timestamp: nowIso,
        notes: `Oferta revisada emitida: $${inspectionData.revisedAmount} MXN. Motivo: ${inspectionData.revisedReason}`
      });
    }

    list[idx] = req;
    saveLocalRequests(list);
    return { message: 'Dictamen de inspección guardado y oferta procesada.', request: req };
  },

  async createProduct(data) {
    const newProduct = {
      id: `prod-${Date.now()}`,
      sku: data.sku || `SKU-${Date.now().toString().slice(-6)}`,
      name: data.name,
      category: data.category,
      categoryName: data.categoryName || data.category,
      brand: data.brand || 'Genérico',
      model: data.model || '',
      platform: data.platform || '',
      baseBuyPrice: Number(data.baseBuyPrice),
      description: data.description || '',
      imageUrl: data.imageUrl || 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80',
      active: true,
      isCRT: Boolean(data.isCRT)
    };
    return { product: newProduct };
  },

  async updateProduct(id, data) {
    return { product: { id, ...data } };
  },

  async deleteProduct(id) {
    return { message: 'Producto desactivado exitosamente.' };
  },

  // Client-side CSV export
  async exportCsv() {
    try {
      const res = await this.getProducts({ all: 'true' });
      const products = res.products || [];
      const headers = ['id', 'sku', 'name', 'category', 'categoryName', 'brand', 'model', 'platform', 'baseBuyPrice', 'active', 'description'];
      const rows = products.map(p => [
        `"${p.id || ''}"`,
        `"${p.sku || ''}"`,
        `"${(p.name || '').replace(/"/g, '""')}"`,
        `"${p.category || ''}"`,
        `"${p.categoryName || ''}"`,
        `"${p.brand || ''}"`,
        `"${p.model || ''}"`,
        `"${p.platform || ''}"`,
        p.baseBuyPrice || 0,
        p.active !== false ? 'true' : 'false',
        `"${(p.description || '').replace(/"/g, '""')}"`
      ].join(','));

      const csvContent = '\uFEFF' + [headers.join(','), ...rows].join('\n');
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'retrocompra_catalogo_export.csv');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (e) {
      console.error('Error exporting CSV:', e);
    }
  },

  async importCsv(csvText) {
    if (!csvText || typeof csvText !== 'string') {
      return { error: 'Contenido CSV vacío o inválido.' };
    }
    const lines = csvText.split(/\r?\n/).map(l => l.trim()).filter(l => l.length > 0);
    return {
      imported: Math.max(0, lines.length - 1),
      updated: 0,
      errors: []
    };
  },

  // Frontend Standalone Logs
  async getEmailLogs(requestId) {
    let logs = INITIAL_EMAIL_LOGS;
    if (requestId) {
      logs = logs.filter(l => l.requestId === requestId);
    }
    return { emails: logs };
  },

  async getAuditLogs() {
    return { auditLogs: INITIAL_AUDIT_LOGS };
  },

  // Frontend Standalone Auth
  async login(email, password) {
    const normEmail = (email || '').trim().toLowerCase();
    const user = DEMO_USERS[normEmail] || {
      id: `usr-${Date.now()}`,
      name: email.split('@')[0],
      email: normEmail,
      role: 'admin',
      department: 'Administración'
    };
    const token = `mock-token-${user.role}-${Date.now()}`;
    return { success: true, token, user };
  },

  async getMe() {
    try {
      const saved = localStorage.getItem('lion_user');
      if (saved) return { user: JSON.parse(saved) };
    } catch (e) {
      // ignore
    }
    return { user: null };
  }
};
