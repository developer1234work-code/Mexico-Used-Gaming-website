const API_BASE = '/api';

function getAuthHeaders() {
  const token = localStorage.getItem('lion_token');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export const api = {
  // Products
  async getProducts(params = {}) {
    const searchParams = new URLSearchParams(params);
    const res = await fetch(`${API_BASE}/products?${searchParams}`);
    return res.json();
  },

  async getProduct(id) {
    const res = await fetch(`${API_BASE}/products/${id}`);
    return res.json();
  },

  async createProduct(data) {
    const res = await fetch(`${API_BASE}/products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
      body: JSON.stringify(data)
    });
    return res.json();
  },

  async updateProduct(id, data) {
    const res = await fetch(`${API_BASE}/products/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
      body: JSON.stringify(data)
    });
    return res.json();
  },

  async deleteProduct(id) {
    const res = await fetch(`${API_BASE}/products/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
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

  // Requests
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

  // Admin Operations
  async getAdminRequests(params = {}) {
    const searchParams = new URLSearchParams(params);
    const res = await fetch(`${API_BASE}/requests?${searchParams}`, {
      headers: getAuthHeaders()
    });
    return res.json();
  },

  async getAdminRequest(id) {
    const res = await fetch(`${API_BASE}/requests/${id}`, {
      headers: getAuthHeaders()
    });
    return res.json();
  },

  async updateRequestStatus(id, data) {
    const res = await fetch(`${API_BASE}/requests/${id}/status`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
      body: JSON.stringify(data)
    });
    return res.json();
  },

  async requestMoreInfo(id, notes) {
    const res = await fetch(`${API_BASE}/requests/${id}/request-info`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
      body: JSON.stringify({ notes })
    });
    return res.json();
  },

  async issuePreliminaryOffer(id, amount, notes) {
    const res = await fetch(`${API_BASE}/requests/${id}/preliminary-offer`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
      body: JSON.stringify({ amount, notes })
    });
    return res.json();
  },

  async approveShipping(id, shippingData) {
    const res = await fetch(`${API_BASE}/requests/${id}/approve-shipping`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
      body: JSON.stringify(shippingData)
    });
    return res.json();
  },

  async recordReceipt(id, notes) {
    const res = await fetch(`${API_BASE}/inspection/${id}/record-receipt`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
      body: JSON.stringify({ notes })
    });
    return res.json();
  },

  async recordInspection(id, inspectionData) {
    const res = await fetch(`${API_BASE}/inspection/${id}/record-findings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
      body: JSON.stringify(inspectionData)
    });
    return res.json();
  },

  // CSV
  async exportCsv() {
    window.open(`${API_BASE}/csv/export-products`, '_blank');
  },

  async importCsv(csvText) {
    const res = await fetch(`${API_BASE}/csv/import-products`, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain', ...getAuthHeaders() },
      body: csvText
    });
    return res.json();
  },

  // Logs
  async getEmailLogs(requestId) {
    const res = await fetch(`${API_BASE}/logs/emails${requestId ? `?requestId=${requestId}` : ''}`, {
      headers: getAuthHeaders()
    });
    return res.json();
  },

  async getAuditLogs() {
    const res = await fetch(`${API_BASE}/logs/audit`, {
      headers: getAuthHeaders()
    });
    return res.json();
  },

  // Auth
  async login(email, password) {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    return res.json();
  },

  async getMe() {
    const res = await fetch(`${API_BASE}/auth/me`, {
      headers: getAuthHeaders()
    });
    return res.json();
  }
};
