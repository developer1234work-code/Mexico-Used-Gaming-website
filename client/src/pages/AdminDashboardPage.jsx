import React, { useState, useEffect } from 'react';
import { 
  Package, 
  Search, 
  Filter, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  Truck, 
  FileText, 
  Download, 
  Upload, 
  Plus, 
  LogOut, 
  Clock, 
  Eye, 
  Mail, 
  ShieldCheck, 
  UserCheck, 
  Tv, 
  DollarSign, 
  RefreshCw,
  Layers
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import { formatMXN, formatDate, STATUS_MAP } from '../utils/formatters';

export default function AdminDashboardPage({ onLogout }) {
  const { user, logout } = useAuth();

  const [activeTab, setActiveTab] = useState('requests'); // 'requests', 'catalogue', 'emails', 'audit'
  const [requests, setRequests] = useState([]);
  const [catalogue, setCatalogue] = useState([]);
  const [emailLogs, setEmailLogs] = useState([]);
  const [auditLogs, setAuditLogs] = useState([]);
  const [loading, setLoading] = useState(false);

  // Filters for requests
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Selected Request Drawer
  const [selectedRequest, setSelectedRequest] = useState(null);

  // Modals
  const [showShippingModal, setShowShippingModal] = useState(false);
  const [showInspectionModal, setShowInspectionModal] = useState(false);
  const [showPrelimOfferModal, setShowPrelimOfferModal] = useState(false);
  const [showRequestInfoModal, setShowRequestInfoModal] = useState(false);
  const [showNewProductModal, setShowNewProductModal] = useState(false);
  const [showCsvImportModal, setShowCsvImportModal] = useState(false);
  const [showEmailPreviewModal, setShowEmailPreviewModal] = useState(null);

  // Shipping Modal Form State (AC-09)
  const [shippingForm, setShippingForm] = useState({
    carrier: 'Estafeta México',
    trackingNumber: '',
    labelReference: '',
    instructions: 'Empacar con al menos 3 capas de plástico de burbujas en caja de cartón corrugado rígida.',
    isCRTVerified: false
  });

  // Inspection Modal Form State (AC-10)
  const [inspectionForm, setInspectionForm] = useState({
    outcome: 'CONFIRM_PRELIMINARY', // 'CONFIRM_PRELIMINARY', 'REVISED_OFFER', 'REJECT_ALL'
    functionalityStatus: 'fully_functional',
    physicalCondition: 'good',
    serialVerified: '',
    authenticityVerified: 'authentic',
    discrepancies: '',
    missingAccessoriesText: '',
    revisedAmount: '',
    revisedReason: ''
  });

  // Action input states
  const [prelimAmount, setPrelimAmount] = useState('');
  const [prelimNotes, setPrelimNotes] = useState('');
  const [requestInfoNotes, setRequestInfoNotes] = useState('');
  const [csvContent, setCsvContent] = useState('');
  const [csvResult, setCsvResult] = useState(null);

  // New Product Form
  const [newProductForm, setNewProductForm] = useState({
    name: '',
    category: 'consoles',
    categoryName: 'Consolas',
    brand: 'Nintendo',
    model: '',
    platform: '',
    sku: '',
    baseBuyPrice: '',
    description: '',
    imageUrl: '',
    isCRT: false,
    weightKg: '',
    accessoryPricing: {
      extra_controller: 150,
      original_box: 200,
      original_manuals: 100,
      expansion_pak: 300,
      memory_card: 100
    }
  });

  useEffect(() => {
    fetchDashboardData();
  }, [activeTab, filterStatus, searchQuery]);

  async function fetchDashboardData() {
    setLoading(true);
    try {
      if (activeTab === 'requests') {
        const res = await api.getAdminRequests({
          status: filterStatus,
          search: searchQuery
        });
        if (res.requests) setRequests(res.requests);
      } else if (activeTab === 'catalogue') {
        const res = await api.getProducts({ all: 'true' });
        if (res.products) setCatalogue(res.products);
      } else if (activeTab === 'emails') {
        const res = await api.getEmailLogs();
        if (res.emails) setEmailLogs(res.emails);
      } else if (activeTab === 'audit') {
        const res = await api.getAuditLogs();
        if (res.auditLogs) setAuditLogs(res.auditLogs);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  // --- ACTIONS ---

  // 1. Explicit Shipping Approval (AC-09)
  const handleApproveShipping = async (e) => {
    e.preventDefault();
    if (!selectedRequest) return;

    try {
      const res = await api.approveShipping(selectedRequest.id, shippingForm);
      if (res.request) {
        setSelectedRequest(res.request);
        setShowShippingModal(false);
        fetchDashboardData();
        alert('¡Envío formalmente aprobado e instrucciones generadas!');
      } else {
        alert(res.error || 'Error al aprobar envío.');
      }
    } catch (err) {
      alert('Error de conexión.');
    }
  };

  // 2. Inspection Submission (AC-10)
  const handleRecordInspection = async (e) => {
    e.preventDefault();
    if (!selectedRequest) return;

    try {
      const missingAccArray = inspectionForm.missingAccessoriesText
        .split(',')
        .map(s => s.trim())
        .filter(s => s.length > 0);

      const payload = {
        outcome: inspectionForm.outcome,
        functionalityStatus: inspectionForm.functionalityStatus,
        physicalCondition: inspectionForm.physicalCondition,
        serialVerified: inspectionForm.serialVerified,
        authenticityVerified: inspectionForm.authenticityVerified,
        discrepancies: inspectionForm.discrepancies,
        missingAccessories: missingAccArray,
        revisedAmount: inspectionForm.revisedAmount,
        revisedReason: inspectionForm.revisedReason,
        evidencePhotos: [
          'https://images.unsplash.com/photo-1593305841991-05c297ba4575?auto=format&fit=crop&w=600&q=80'
        ]
      };

      const res = await api.recordInspection(selectedRequest.id, payload);
      if (res.request) {
        setSelectedRequest(res.request);
        setShowInspectionModal(false);
        fetchDashboardData();
        alert('Dictamen de inspección guardado y oferta procesada exitosamente.');
      } else {
        alert(res.error || 'Error al registrar inspección.');
      }
    } catch (err) {
      alert('Error de conexión.');
    }
  };

  // 3. Issue Preliminary Offer
  const handleSendPrelimOffer = async () => {
    if (!selectedRequest) return;
    try {
      const res = await api.issuePreliminaryOffer(selectedRequest.id, prelimAmount, prelimNotes);
      if (res.request) {
        setSelectedRequest(res.request);
        setShowPrelimOfferModal(false);
        fetchDashboardData();
      }
    } catch (err) {
      alert('Error al emitir oferta.');
    }
  };

  // 4. Request More Info
  const handleSendInfoRequest = async () => {
    if (!selectedRequest) return;
    try {
      const res = await api.requestMoreInfo(selectedRequest.id, requestInfoNotes);
      if (res.request) {
        setSelectedRequest(res.request);
        setShowRequestInfoModal(false);
        fetchDashboardData();
      }
    } catch (err) {
      alert('Error al enviar mensaje.');
    }
  };

  // 5. Record Physical Receipt
  const handleRecordReceipt = async () => {
    if (!selectedRequest) return;
    try {
      const res = await api.recordReceipt(selectedRequest.id, 'Paquete recibido en muelle de carga Azcapotzalco.');
      if (res.request) {
        setSelectedRequest(res.request);
        fetchDashboardData();
      }
    } catch (err) {
      alert('Error al registrar recepción.');
    }
  };

  // 6. Create Product
  const handleCreateProduct = async (e) => {
    e.preventDefault();
    try {
      const res = await api.createProduct(newProductForm);
      if (res.product) {
        setShowNewProductModal(false);
        fetchDashboardData();
        alert('Producto creado en catálogo exitosamente.');
      } else {
        alert(res.error || 'Error al crear producto.');
      }
    } catch (err) {
      alert('Error de conexión.');
    }
  };

  // 7. CSV Import
  const handleImportCsv = async () => {
    if (!csvContent.trim()) return;
    try {
      const res = await api.importCsv(csvContent);
      setCsvResult(res.results);
      fetchDashboardData();
    } catch (err) {
      alert('Error al importar CSV.');
    }
  };

  // Metrics
  const totalVolume = requests.reduce((sum, r) => sum + (r.totalEstimatedAmount || 0), 0);
  const pendingReviewCount = requests.filter(r => r.status === 'SUBMITTED').length;
  const inInspectionCount = requests.filter(r => ['SHIPPING_APPROVED', 'RECEIVED', 'INSPECTION_IN_PROGRESS'].includes(r.status)).length;
  const revisedCount = requests.filter(r => r.status === 'REVISED_OFFER_SENT').length;

  return (
    <div className="min-h-screen bg-[#0B0F19] text-slate-100 flex flex-col">
      
      {/* Top Admin Bar */}
      <header className="bg-[#111827] border-b border-slate-800 px-4 sm:px-8 py-4 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center font-black text-slate-950">
            🦁
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-black text-base tracking-wider text-white">RETROCOMPRA</h1>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-amber-500/20 text-amber-400 border border-amber-500/40">
                Staff Ops
              </span>
            </div>
            <p className="text-xs text-slate-400">Sistema de Administración de Recompra Inversa (México)</p>
          </div>
        </div>

        {/* User Info & Logout */}
        <div className="flex items-center gap-4">
          <div className="hidden sm:block text-right">
            <span className="text-xs font-bold text-white block">{user?.name}</span>
            <span className="text-[10px] font-semibold text-amber-400 capitalize">{user?.role} • {user?.department}</span>
          </div>

          <button
            onClick={() => { logout(); onLogout(); }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 hover:text-white border border-slate-700 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Salir</span>
          </button>
        </div>
      </header>

      {/* Main Container */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-8 space-y-6">
        
        {/* KPI Metrics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-[#111827] rounded-2xl p-5 border border-slate-800 space-y-1">
            <span className="text-xs text-slate-400 font-medium">Volumen Total en Cartera</span>
            <div className="text-2xl font-black text-amber-400">{formatMXN(totalVolume)}</div>
            <span className="text-[11px] text-slate-500">{requests.length} solicitudes activas</span>
          </div>

          <div className="bg-[#111827] rounded-2xl p-5 border border-slate-800 space-y-1">
            <span className="text-xs text-slate-400 font-medium">Pendientes de Revisión</span>
            <div className="text-2xl font-black text-blue-400">{pendingReviewCount}</div>
            <span className="text-[11px] text-slate-500">Nuevas solicitudes por valuar</span>
          </div>

          <div className="bg-[#111827] rounded-2xl p-5 border border-slate-800 space-y-1">
            <span className="text-xs text-slate-400 font-medium">En Logística / Inspección</span>
            <div className="text-2xl font-black text-emerald-400">{inInspectionCount}</div>
            <span className="text-[11px] text-slate-500">En tránsito o en laboratorio</span>
          </div>

          <div className="bg-[#111827] rounded-2xl p-5 border border-slate-800 space-y-1">
            <span className="text-xs text-slate-400 font-medium">Ofertas Revisadas (AC-11)</span>
            <div className="text-2xl font-black text-amber-500">{revisedCount}</div>
            <span className="text-[11px] text-slate-500">Esperando decisión de cliente</span>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('requests')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'requests'
                  ? 'bg-amber-400 text-slate-950 shadow-md'
                  : 'bg-slate-900 text-slate-400 hover:text-white'
              }`}
            >
              Solicitudes de Venta ({requests.length})
            </button>

            <button
              onClick={() => setActiveTab('catalogue')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'catalogue'
                  ? 'bg-amber-400 text-slate-950 shadow-md'
                  : 'bg-slate-900 text-slate-400 hover:text-white'
              }`}
            >
              Catálogo y Precios Base
            </button>

            <button
              onClick={() => setActiveTab('emails')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'emails'
                  ? 'bg-amber-400 text-slate-950 shadow-md'
                  : 'bg-slate-900 text-slate-400 hover:text-white'
              }`}
            >
              Notificaciones por Correo
            </button>

            <button
              onClick={() => setActiveTab('audit')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'audit'
                  ? 'bg-amber-400 text-slate-950 shadow-md'
                  : 'bg-slate-900 text-slate-400 hover:text-white'
              }`}
            >
              Auditoría y Trazabilidad
            </button>
          </div>

          <button
            onClick={fetchDashboardData}
            className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800"
            title="Refrescar datos"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>

        {/* ======================================================== */}
        {/* TAB 1: REQUESTS MANAGEMENT */}
        {/* ======================================================== */}
        {activeTab === 'requests' && (
          <div className="space-y-4">
            
            {/* Filter Toolbar */}
            <div className="bg-[#111827] p-4 rounded-2xl border border-slate-800 flex flex-col md:flex-row gap-3 items-center justify-between">
              <div className="relative w-full md:w-80">
                <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar por folio, cliente, correo..."
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="flex items-center gap-2 w-full md:w-auto">
                <span className="text-xs text-slate-400 font-medium">Estado:</span>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-amber-400 font-medium"
                >
                  <option value="all">Todos los estados</option>
                  <option value="SUBMITTED">En Revisión (SUBMITTED)</option>
                  <option value="INFO_REQUESTED">Info Solicitada</option>
                  <option value="PRELIMINARY_OFFER_SENT">Oferta Preliminar</option>
                  <option value="SHIPPING_APPROVED">Envío Aprobado (AC-09)</option>
                  <option value="RECEIVED">Recibido en Bodega</option>
                  <option value="REVISED_OFFER_SENT">Oferta Revisada (AC-11)</option>
                  <option value="OFFER_CONFIRMED">Oferta Confirmada</option>
                  <option value="FINAL_ACCEPTED">Final Aceptada</option>
                  <option value="FINAL_REJECTED">Final Rechazada</option>
                </select>
              </div>
            </div>

            {/* Table */}
            <div className="bg-[#111827] rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-900 text-slate-400 uppercase font-semibold border-b border-slate-800">
                    <tr>
                      <th className="py-3 px-4">Folio ID</th>
                      <th className="py-3 px-4">Cliente / Contacto</th>
                      <th className="py-3 px-4">Origen (México)</th>
                      <th className="py-3 px-4">Artículos</th>
                      <th className="py-3 px-4">Monto Estimado</th>
                      <th className="py-3 px-4">Estado Actual</th>
                      <th className="py-3 px-4 text-right">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {requests.length === 0 ? (
                      <tr>
                        <td colSpan="7" className="text-center py-12 text-slate-500">
                          No se encontraron solicitudes con los filtros aplicados.
                        </td>
                      </tr>
                    ) : (
                      requests.map((req) => {
                        const statusObj = STATUS_MAP[req.status] || {
                          label: req.statusLabel || req.status,
                          color: 'bg-slate-800 text-slate-300'
                        };
                        return (
                          <tr key={req.id} className="hover:bg-slate-800/40 transition-colors">
                            <td className="py-3 px-4 font-mono font-bold text-amber-400">
                              {req.id}
                            </td>
                            <td className="py-3 px-4">
                              <div className="font-bold text-white">{req.customer.fullName}</div>
                              <div className="text-[11px] text-slate-400">{req.customer.email} • {req.customer.phone}</div>
                            </td>
                            <td className="py-3 px-4 text-slate-300">
                              {req.customer.city}, {req.customer.state}
                            </td>
                            <td className="py-3 px-4">
                              <span className="font-semibold text-slate-200">
                                {req.items.length} {req.items.length === 1 ? 'artículo' : 'artículos'}
                              </span>
                              <div className="text-[10px] text-slate-400 truncate max-w-[140px]">
                                {req.items.map(i => i.productName).join(', ')}
                              </div>
                            </td>
                            <td className="py-3 px-4 font-black text-amber-400 text-sm">
                              {formatMXN(req.revisedOffer ? req.revisedOffer.revisedAmount : req.totalEstimatedAmount)}
                            </td>
                            <td className="py-3 px-4">
                              <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${statusObj.color}`}>
                                {statusObj.label}
                              </span>
                            </td>
                            <td className="py-3 px-4 text-right">
                              <button
                                onClick={() => setSelectedRequest(req)}
                                className="px-3 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-[11px] transition-all inline-flex items-center gap-1 shadow-sm"
                              >
                                <Eye className="w-3.5 h-3.5" />
                                <span>Ver Detalle</span>
                              </button>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 2: CATALOGUE & PRICING MANAGEMENT */}
        {/* ======================================================== */}
        {activeTab === 'catalogue' && (
          <div className="space-y-4">
            
            <div className="flex flex-wrap items-center justify-between gap-3 bg-[#111827] p-4 rounded-2xl border border-slate-800">
              <div>
                <h3 className="font-bold text-sm text-white">Catálogo Oficial de Compra</h3>
                <p className="text-xs text-slate-400">Administra precios base, multiplicadores y valores de accesorios.</p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowNewProductModal(true)}
                  className="px-3.5 py-2 rounded-xl bg-amber-400 text-slate-950 hover:bg-amber-300 font-bold text-xs flex items-center gap-1.5 transition-colors shadow-sm"
                >
                  <Plus className="w-4 h-4" />
                  <span>Nuevo Producto</span>
                </button>

                <button
                  onClick={() => api.exportCsv()}
                  className="px-3.5 py-2 rounded-xl bg-slate-800 text-slate-200 hover:bg-slate-700 font-bold text-xs border border-slate-700 flex items-center gap-1.5 transition-colors"
                >
                  <Download className="w-4 h-4 text-amber-400" />
                  <span>Exportar CSV</span>
                </button>

                <button
                  onClick={() => setShowCsvImportModal(true)}
                  className="px-3.5 py-2 rounded-xl bg-slate-800 text-slate-200 hover:bg-slate-700 font-bold text-xs border border-slate-700 flex items-center gap-1.5 transition-colors"
                >
                  <Upload className="w-4 h-4 text-amber-400" />
                  <span>Importar CSV</span>
                </button>
              </div>
            </div>

            {/* Catalogue Table */}
            <div className="bg-[#111827] rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-900 text-slate-400 uppercase font-semibold border-b border-slate-800">
                    <tr>
                      <th className="py-3 px-4">SKU / ID</th>
                      <th className="py-3 px-4">Producto</th>
                      <th className="py-3 px-4">Categoría</th>
                      <th className="py-3 px-4">Marca / Modelo</th>
                      <th className="py-3 px-4">Precio Base Recompra</th>
                      <th className="py-3 px-4">Estatus</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {catalogue.map((prod) => (
                      <tr key={prod.id} className="hover:bg-slate-800/40">
                        <td className="py-3 px-4 font-mono text-slate-400">{prod.sku}</td>
                        <td className="py-3 px-4 font-bold text-white flex items-center gap-2">
                          {prod.imageUrl && (
                            <img src={prod.imageUrl} alt="" className="w-7 h-7 rounded object-cover" />
                          )}
                          <span>{prod.name}</span>
                        </td>
                        <td className="py-3 px-4 text-slate-300 capitalize">{prod.category}</td>
                        <td className="py-3 px-4 text-slate-400">{prod.brand} {prod.model ? `(${prod.model})` : ''}</td>
                        <td className="py-3 px-4 font-black text-amber-400 text-sm">
                          {formatMXN(prod.baseBuyPrice)}
                        </td>
                        <td className="py-3 px-4">
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400">
                            Activo
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 3: EMAIL NOTIFICATION LOGS & TEMPLATE PREVIEWS */}
        {/* ======================================================== */}
        {activeTab === 'emails' && (
          <div className="space-y-4">
            <div className="bg-[#111827] p-4 rounded-2xl border border-slate-800">
              <h3 className="font-bold text-sm text-white">Registro de Notificaciones por Correo Electrónico</h3>
              <p className="text-xs text-slate-400">Plantillas transaccionales emitidas en Español Mexicano con auditoría de envío.</p>
            </div>

            <div className="bg-[#111827] rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-900 text-slate-400 uppercase font-semibold border-b border-slate-800">
                  <tr>
                    <th className="py-3 px-4">Destinatario</th>
                    <th className="py-3 px-4">Asunto / Evento</th>
                    <th className="py-3 px-4">Folio Asociado</th>
                    <th className="py-3 px-4">Fecha y Hora</th>
                    <th className="py-3 px-4 text-right">Vista Previa</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {emailLogs.map((eml) => (
                    <tr key={eml.id} className="hover:bg-slate-800/40">
                      <td className="py-3 px-4 font-medium text-white">{eml.to}</td>
                      <td className="py-3 px-4 font-semibold text-slate-200">
                        <div>{eml.subject}</div>
                        <div className="text-[10px] text-amber-400 uppercase font-mono">{eml.eventType}</div>
                      </td>
                      <td className="py-3 px-4 font-mono text-amber-400">{eml.requestId}</td>
                      <td className="py-3 px-4 text-slate-400">{formatDate(eml.sentAt)}</td>
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={() => setShowEmailPreviewModal(eml)}
                          className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold"
                        >
                          Ver Correo
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 4: AUDIT LOGS */}
        {/* ======================================================== */}
        {activeTab === 'audit' && (
          <div className="space-y-4">
            <div className="bg-[#111827] p-4 rounded-2xl border border-slate-800">
              <h3 className="font-bold text-sm text-white">Bitácora de Auditoría del Sistema (Audit Log)</h3>
              <p className="text-xs text-slate-400">Registro inmutable de acciones realizadas por clientes y personal operativo.</p>
            </div>

            <div className="bg-[#111827] rounded-2xl border border-slate-800 p-4 space-y-3">
              {auditLogs.map((log) => (
                <div key={log.id} className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-amber-400 mt-1.5 shrink-0"></div>
                  <div className="flex-1 space-y-0.5">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-amber-400">{log.action}</span>
                      <span className="text-[10px] text-slate-500">{formatDate(log.timestamp)}</span>
                    </div>
                    <p className="text-slate-300">{log.details}</p>
                    <span className="text-[10px] text-slate-500">Ejecutado por: {log.performedBy}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* ======================================================== */}
      {/* DRAWER: DETAILED REQUEST VIEW & OPERATIONAL WORKFLOW */}
      {/* ======================================================== */}
      {selectedRequest && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div 
            onClick={() => setSelectedRequest(null)}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />

          <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-2xl bg-[#111827] text-slate-100 shadow-2xl flex flex-col border-l border-slate-800">
              
              {/* Drawer Header */}
              <div className="px-6 py-5 bg-[#0B0F19] border-b border-slate-800 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="text-xl font-mono font-black text-amber-400">{selectedRequest.id}</span>
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-800 border border-slate-700 text-slate-200">
                      {selectedRequest.status}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">
                    Creado el: {formatDate(selectedRequest.createdAt)}
                  </p>
                </div>

                <button
                  onClick={() => setSelectedRequest(null)}
                  className="p-2 rounded-lg text-slate-400 hover:text-white"
                >
                  ✕
                </button>
              </div>

              {/* Drawer Content */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                
                {/* Customer Information */}
                <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2 text-xs">
                  <h4 className="font-bold text-amber-400 uppercase tracking-wide">Datos del Cliente:</h4>
                  <div className="grid grid-cols-2 gap-2 text-slate-300">
                    <div><strong>Nombre:</strong> {selectedRequest.customer.fullName}</div>
                    <div><strong>Email:</strong> {selectedRequest.customer.email}</div>
                    <div><strong>Teléfono:</strong> {selectedRequest.customer.phone}</div>
                    <div><strong>WhatsApp:</strong> {selectedRequest.customer.whatsapp || 'Mismo'}</div>
                    <div className="col-span-2">
                      <strong>Origen de Envío:</strong> {selectedRequest.customer.city}, {selectedRequest.customer.state} C.P. {selectedRequest.customer.postalCode}
                    </div>
                  </div>
                </div>

                {/* Items in Request */}
                <div className="space-y-3">
                  <h4 className="font-bold text-xs uppercase tracking-wide text-amber-400">
                    Artículos para Recompra ({selectedRequest.items.length}):
                  </h4>

                  {selectedRequest.items.map((item, i) => (
                    <div key={i} className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2 text-xs">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="font-bold text-white text-sm">{item.productName}</div>
                          <div className="text-slate-400">{item.platform} • {item.category}</div>
                          <div className="text-amber-400 font-semibold mt-1">Estado: {item.conditionLabel}</div>
                        </div>
                        <span className="text-base font-black text-amber-400">
                          {formatMXN(item.calculatedEstimate)}
                        </span>
                      </div>

                      {item.customerNotes && (
                        <p className="text-slate-400 italic bg-slate-950 p-2 rounded">
                          "{item.customerNotes}"
                        </p>
                      )}
                    </div>
                  ))}

                  <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 flex justify-between items-center text-sm">
                    <span className="font-bold text-slate-300">Monto Estimado Inicial:</span>
                    <span className="font-black text-amber-400 text-lg">
                      {formatMXN(selectedRequest.totalEstimatedAmount)}
                    </span>
                  </div>
                </div>

                {/* Uploaded Customer Photos Gallery */}
                <div className="space-y-2">
                  <h4 className="font-bold text-xs uppercase tracking-wide text-amber-400">
                    Fotografías Adjuntas por el Cliente ({selectedRequest.photos?.length || 0}):
                  </h4>
                  {selectedRequest.photos?.length > 0 ? (
                    <div className="grid grid-cols-3 gap-3">
                      {selectedRequest.photos.map((p, idx) => (
                        <a key={idx} href={p.url} target="_blank" rel="noreferrer" className="group block">
                          <img 
                            src={p.url} 
                            alt="" 
                            className="w-full h-24 object-cover rounded-xl border border-slate-700 group-hover:border-amber-400 transition-colors"
                          />
                          <span className="text-[10px] text-slate-400 truncate block mt-0.5">{p.label}</span>
                        </a>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-slate-500">No se adjuntaron fotos en la solicitud inicial.</p>
                  )}
                </div>

                {/* Shipping Approval Record (AC-09) */}
                {selectedRequest.shippingApproval?.approved && (
                  <div className="p-4 rounded-2xl bg-sky-950/60 border border-sky-600/50 space-y-2 text-xs">
                    <div className="flex items-center gap-2 text-sky-400 font-bold">
                      <Truck className="w-4 h-4" />
                      <span>Envío Explícitamente Aprobado</span>
                    </div>
                    <div className="text-slate-300 space-y-1">
                      <div><strong>Transportista:</strong> {selectedRequest.shippingApproval.carrier}</div>
                      <div><strong>Número de Guía:</strong> <span className="font-mono text-sky-300">{selectedRequest.shippingApproval.trackingNumber}</span></div>
                      <div><strong>Aprobado por:</strong> {selectedRequest.shippingApproval.approvedBy} ({formatDate(selectedRequest.shippingApproval.approvedAt)})</div>
                      <div><strong>Instrucciones:</strong> {selectedRequest.shippingApproval.instructions}</div>
                    </div>
                  </div>
                )}

                {/* Inspection Findings Record (AC-10) */}
                {selectedRequest.inspection && (
                  <div className="p-4 rounded-2xl bg-emerald-950/60 border border-emerald-600/50 space-y-2 text-xs">
                    <div className="flex items-center gap-2 text-emerald-400 font-bold">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Dictamen de Inspección Física Realizado</span>
                    </div>
                    <div className="text-slate-300 space-y-1">
                      <div><strong>Inspector:</strong> {selectedRequest.inspection.inspectedBy} ({formatDate(selectedRequest.inspection.inspectedAt)})</div>
                      <div><strong>Número de Serie Verificado:</strong> <span className="font-mono">{selectedRequest.inspection.serialVerified}</span></div>
                      <div><strong>Funcionamiento:</strong> {selectedRequest.inspection.functionalityStatus}</div>
                      <div><strong>Cosmética:</strong> {selectedRequest.inspection.physicalCondition}</div>
                      {selectedRequest.inspection.discrepancies && (
                        <div><strong>Discrepancias:</strong> {selectedRequest.inspection.discrepancies}</div>
                      )}
                    </div>
                  </div>
                )}

                {/* Revised Offer Status (AC-11) */}
                {selectedRequest.revisedOffer && (
                  <div className="p-4 rounded-2xl bg-amber-950/60 border border-amber-600/50 space-y-2 text-xs">
                    <div className="flex items-center gap-2 text-amber-400 font-bold">
                      <AlertTriangle className="w-4 h-4" />
                      <span>Oferta Revisada Emitida (AC-11)</span>
                    </div>
                    <div className="text-slate-300 space-y-1">
                      <div><strong>Monto Original:</strong> <strike>{formatMXN(selectedRequest.revisedOffer.originalAmount)}</strike></div>
                      <div><strong>Monto Revisado:</strong> <strong className="text-amber-400 text-sm">{formatMXN(selectedRequest.revisedOffer.revisedAmount)}</strong></div>
                      <div><strong>Motivo:</strong> {selectedRequest.revisedOffer.reason}</div>
                      <div className="pt-1">
                        <strong>Decisión del Cliente:</strong>{' '}
                        {selectedRequest.revisedOffer.customerDecision ? (
                          <span className={`px-2 py-0.5 rounded font-bold ${
                            selectedRequest.revisedOffer.customerDecision === 'ACCEPTED' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'
                          }`}>
                            {selectedRequest.revisedOffer.customerDecision}
                          </span>
                        ) : (
                          <span className="text-amber-400 font-bold">Pendiente de Aceptación/Rechazo</span>
                        )}
                      </div>
                    </div>
                  </div>
                )}

              </div>

              {/* Drawer Actions Toolbar */}
              <div className="p-6 bg-[#0B0F19] border-t border-slate-800 space-y-3">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                  Acciones Operativas según tu rol ({user?.role}):
                </span>

                <div className="flex flex-wrap gap-2">
                  
                  {/* Action 1: Request more info */}
                  <button
                    onClick={() => setShowRequestInfoModal(true)}
                    className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 border border-slate-700"
                  >
                    Pedir Más Info
                  </button>

                  {/* Action 2: Issue preliminary offer */}
                  <button
                    onClick={() => {
                      setPrelimAmount(selectedRequest.totalEstimatedAmount);
                      setShowPrelimOfferModal(true);
                    }}
                    className="px-3 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-xs font-bold text-white shadow-sm"
                  >
                    Emitir Oferta Preliminar
                  </button>

                  {/* Action 3: Explicit Shipping Approval (AC-09) */}
                  {!selectedRequest.shippingApproval?.approved && (
                    <button
                      onClick={() => setShowShippingModal(true)}
                      className="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-xs font-bold text-white shadow-sm flex items-center gap-1.5"
                    >
                      <Truck className="w-3.5 h-3.5" />
                      <span>Aprobar Envío Formal (AC-09)</span>
                    </button>
                  )}

                  {/* Action 4: Record Receipt */}
                  {selectedRequest.shippingApproval?.approved && selectedRequest.status === 'SHIPPING_APPROVED' && (
                    <button
                      onClick={handleRecordReceipt}
                      className="px-3 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-xs font-bold text-white"
                    >
                      Marcar Paquete Recibido
                    </button>
                  )}

                  {/* Action 5: Conduct Inspection (AC-10) */}
                  <button
                    onClick={() => {
                      setInspectionForm(prev => ({
                        ...prev,
                        revisedAmount: selectedRequest.totalEstimatedAmount,
                        serialVerified: ''
                      }));
                      setShowInspectionModal(true);
                    }}
                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-xs font-bold text-white shadow-sm flex items-center gap-1.5"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Dictaminar Inspección Física (AC-10)</span>
                  </button>

                </div>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL: SHIPPING APPROVAL (AC-09) */}
      {/* ======================================================== */}
      {showShippingModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#111827] rounded-3xl max-w-lg w-full p-6 sm:p-8 border border-slate-700 shadow-2xl space-y-4">
            <div className="flex items-center gap-2.5 text-sky-400 font-bold text-base">
              <Truck className="w-5 h-5" />
              <h3>Aprobación Formal de Envío (SRS 6.3 / AC-09)</h3>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              El transportista y la guía NO se generan automáticamente. Esta acción formal autoriza al cliente a entregar su mercancía.
            </p>

            <form onSubmit={handleApproveShipping} className="space-y-4 pt-2">
              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">
                  Empresa de Paquetería / Transportista: *
                </label>
                <select
                  value={shippingForm.carrier}
                  onChange={(e) => setShippingForm({ ...shippingForm, carrier: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white"
                >
                  <option value="Estafeta México">Estafeta México</option>
                  <option value="DHL Express México">DHL Express México</option>
                  <option value="FedEx México">FedEx México</option>
                  <option value="Castores (Transporte Especializado CRT)">Castores (Transporte Especializado CRT)</option>
                  <option value="Tres Guerras Pallet">Tres Guerras Pallet</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">
                  Número de Guía / Rastreo Asignado: *
                </label>
                <input
                  type="text"
                  required
                  value={shippingForm.trackingNumber}
                  onChange={(e) => setShippingForm({ ...shippingForm, trackingNumber: e.target.value })}
                  placeholder="Ej. EST-MX-9823419082"
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white font-mono"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">
                  Instrucciones de Empaque para el Cliente:
                </label>
                <textarea
                  rows="2"
                  value={shippingForm.instructions}
                  onChange={(e) => setShippingForm({ ...shippingForm, instructions: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white"
                ></textarea>
              </div>

              {/* CRT Special Verification Checkbox (SRS 6.3) */}
              {selectedRequest?.items?.some(i => i.category === 'retro_tvs') && (
                <label className="flex items-start gap-2.5 p-3 rounded-xl bg-amber-500/20 border border-amber-500/50 cursor-pointer">
                  <input
                    type="checkbox"
                    required
                    checked={shippingForm.isCRTVerified}
                    onChange={(e) => setShippingForm({ ...shippingForm, isCRTVerified: e.target.checked })}
                    className="w-4 h-4 rounded text-amber-500 mt-0.5"
                  />
                  <span className="text-xs text-amber-200">
                    <strong>Verificación de Seguridad CRT:</strong> Confirmo que se han evaluado peso, fragilidad del tubo al vacío y logística de tarima/fleje conforme a la sección 6.3 del SRS.
                  </span>
                </label>
              )}

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowShippingModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-400 hover:text-white"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-sky-500 hover:bg-sky-400 text-slate-950 shadow-md"
                >
                  Confirmar y Emitir Guía
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL: PHYSICAL INSPECTION (AC-10) */}
      {/* ======================================================== */}
      {showInspectionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#111827] rounded-3xl max-w-xl w-full p-6 sm:p-8 border border-slate-700 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center gap-2.5 text-emerald-400 font-bold text-base">
              <CheckCircle2 className="w-5 h-5" />
              <h3>Registro de Inspección Técnica Física (AC-10)</h3>
            </div>
            <p className="text-xs text-slate-400">
              Registra pruebas de funcionamiento, número de serie y dictamina si se confirma la oferta o se revisa.
            </p>

            <form onSubmit={handleRecordInspection} className="space-y-4">
              
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">
                    Prueba de Funcionamiento:
                  </label>
                  <select
                    value={inspectionForm.functionalityStatus}
                    onChange={(e) => setInspectionForm({ ...inspectionForm, functionalityStatus: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white"
                  >
                    <option value="fully_functional">100% Funcional / Óptimo</option>
                    <option value="minor_issues">Detalle Menor (drift, ruidos)</option>
                    <option value="non_functional">No Enciende / Dañado</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">
                    Estado Cosmético Real:
                  </label>
                  <select
                    value={inspectionForm.physicalCondition}
                    onChange={(e) => setInspectionForm({ ...inspectionForm, physicalCondition: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white"
                  >
                    <option value="mint">Excelente / Sin Rayones</option>
                    <option value="good">Bueno (Uso Normal)</option>
                    <option value="fair">Desgaste Visible / Rayas</option>
                    <option value="damaged">Golpes / Carcasa Rota</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">
                  Número de Serie Verificado en el Dispositivo: *
                </label>
                <input
                  type="text"
                  required
                  value={inspectionForm.serialVerified}
                  onChange={(e) => setInspectionForm({ ...inspectionForm, serialVerified: e.target.value })}
                  placeholder="Ej. CFI-1215A-9281940"
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white font-mono"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">
                  Dictamen Final de Inspección: *
                </label>
                <select
                  value={inspectionForm.outcome}
                  onChange={(e) => setInspectionForm({ ...inspectionForm, outcome: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-amber-500 text-xs text-white font-bold"
                >
                  <option value="CONFIRM_PRELIMINARY">Confirmar Oferta Preliminar (Sin cambios)</option>
                  <option value="REVISED_OFFER">Emitir Oferta Revisada (Discrepancia detectada)</option>
                  <option value="REJECT_ALL">Rechazar Artículo (No cumple criterios)</option>
                </select>
              </div>

              {/* If Revised Offer chosen (AC-11) */}
              {inspectionForm.outcome === 'REVISED_OFFER' && (
                <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 space-y-3">
                  <div className="flex items-center gap-2 text-amber-400 font-bold text-xs">
                    <AlertTriangle className="w-4 h-4" />
                    <span>Configurar Oferta Revisada (Requerirá Decisión del Cliente)</span>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-300 block mb-1">
                      Nuevo Monto Propuesto (MXN): *
                    </label>
                    <input
                      type="number"
                      required
                      value={inspectionForm.revisedAmount}
                      onChange={(e) => setInspectionForm({ ...inspectionForm, revisedAmount: e.target.value })}
                      placeholder="Ej. 3200"
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white font-bold text-amber-400"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-300 block mb-1">
                      Motivo Fundado del Ajuste (Visible al Cliente): *
                    </label>
                    <textarea
                      rows="2"
                      required
                      value={inspectionForm.revisedReason}
                      onChange={(e) => setInspectionForm({ ...inspectionForm, revisedReason: e.target.value })}
                      placeholder="Ej. Desgaste en carcasa superior y falta de control original..."
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white"
                    ></textarea>
                  </div>
                </div>
              )}

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowInspectionModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-400 hover:text-white"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-md"
                >
                  Guardar Dictamen
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Preliminary Offer */}
      {showPrelimOfferModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#111827] rounded-3xl max-w-md w-full p-6 border border-slate-700 space-y-4">
            <h3 className="font-bold text-base text-white">Emitir Oferta Preliminar</h3>
            <div>
              <label className="text-xs text-slate-400 block mb-1">Monto en MXN:</label>
              <input
                type="number"
                value={prelimAmount}
                onChange={(e) => setPrelimAmount(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-sm font-bold text-amber-400"
              />
            </div>
            <div>
              <label className="text-xs text-slate-400 block mb-1">Notas para el cliente:</label>
              <textarea
                rows="2"
                value={prelimNotes}
                onChange={(e) => setPrelimNotes(e.target.value)}
                placeholder="Oferta sujeta a recepción de fotos finales..."
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white"
              ></textarea>
            </div>
            <div className="flex justify-end gap-2">
              <button onClick={() => setShowPrelimOfferModal(false)} className="px-3 py-1.5 text-xs text-slate-400">Cancelar</button>
              <button onClick={handleSendPrelimOffer} className="px-4 py-1.5 rounded-xl bg-blue-600 text-white font-bold text-xs">Enviar Oferta</button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Request Info */}
      {showRequestInfoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#111827] rounded-3xl max-w-md w-full p-6 border border-slate-700 space-y-4">
            <h3 className="font-bold text-base text-white">Solicitar Información Adicional</h3>
            <div>
              <label className="text-xs text-slate-400 block mb-1">Mensaje para el cliente:</label>
              <textarea
                rows="3"
                value={requestInfoNotes}
                onChange={(e) => setRequestInfoNotes(e.target.value)}
                placeholder="Por favor sube fotos de la etiqueta de serie o confirma si incluye cables originales..."
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white"
              ></textarea>
            </div>
            <div className="flex justify-end gap-2">
              <button onClick={() => setShowRequestInfoModal(false)} className="px-3 py-1.5 text-xs text-slate-400">Cancelar</button>
              <button onClick={handleSendInfoRequest} className="px-4 py-1.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs">Enviar Solicitud</button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: CSV Import (SRS 4.2) */}
      {showCsvImportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#111827] rounded-3xl max-w-lg w-full p-6 border border-slate-700 space-y-4">
            <h3 className="font-bold text-base text-white">Importar Catálogo por CSV (SRS 4.2)</h3>
            <p className="text-xs text-slate-400">Pega el contenido CSV con encabezados: name, category, baseBuyPrice, sku, brand, etc.</p>
            
            <textarea
              rows="6"
              value={csvContent}
              onChange={(e) => setCsvContent(e.target.value)}
              placeholder="name,category,baseBuyPrice,sku,brand&#10;PlayStation 5 Slim,consoles,6200,CON-PS5-SLIM,Sony"
              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs font-mono text-white"
            ></textarea>

            {csvResult && (
              <div className="p-3 rounded-xl bg-slate-900 text-xs space-y-1">
                <div className="text-emerald-400">Nuevos: {csvResult.imported} | Actualizados: {csvResult.updated}</div>
                {csvResult.errors?.length > 0 && (
                  <div className="text-red-400">Errores: {csvResult.errors.join(', ')}</div>
                )}
              </div>
            )}

            <div className="flex justify-end gap-2">
              <button onClick={() => setShowCsvImportModal(false)} className="px-3 py-1.5 text-xs text-slate-400">Cerrar</button>
              <button onClick={handleImportCsv} className="px-4 py-1.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs">Procesar CSV</button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: New Product / Console */}
      {showNewProductModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#111827] rounded-3xl max-w-lg w-full p-6 sm:p-7 border border-slate-700 space-y-4 max-h-[88vh] overflow-y-auto shadow-2xl">
            <h3 className="font-bold text-base text-white">Nuevo Producto o Consola en Catálogo</h3>
            <p className="text-xs text-slate-400">
              Registra una nueva consola o producto. Aparecerá inmediatamente en el catálogo y calculador en vivo.
            </p>
            <form onSubmit={handleCreateProduct} className="space-y-3">
              <div>
                <label className="text-xs text-slate-400 block mb-1">Nombre del Sistema o Producto: *</label>
                <input
                  type="text"
                  required
                  value={newProductForm.name}
                  onChange={(e) => setNewProductForm({ ...newProductForm, name: e.target.value })}
                  placeholder="Ej. Nintendo 64 / PlayStation 5 Pro"
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs text-slate-400 block mb-1">Categoría: *</label>
                  <select
                    value={newProductForm.category}
                    onChange={(e) => setNewProductForm({ ...newProductForm, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-amber-400"
                  >
                    <option value="consoles">Consolas</option>
                    <option value="video_games">Videojuegos</option>
                    <option value="accessories">Accesorios</option>
                    <option value="retro_tvs">Retro CRT TVs</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs text-slate-400 block mb-1">Precio Base MXN: *</label>
                  <input
                    type="number"
                    required
                    value={newProductForm.baseBuyPrice}
                    onChange={(e) => setNewProductForm({ ...newProductForm, baseBuyPrice: e.target.value })}
                    placeholder="Ej. 900"
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs text-slate-400 block mb-1">Marca:</label>
                  <select
                    value={newProductForm.brand}
                    onChange={(e) => setNewProductForm({ ...newProductForm, brand: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-amber-400"
                  >
                    <option value="Nintendo">Nintendo</option>
                    <option value="PlayStation">Sony PlayStation</option>
                    <option value="Xbox">Microsoft Xbox</option>
                    <option value="Sega">Sega</option>
                    <option value="Atari">Atari</option>
                    <option value="Vintage">Vintage / Retro</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs text-slate-400 block mb-1">Modelo / Versión:</label>
                  <input
                    type="text"
                    value={newProductForm.model}
                    onChange={(e) => setNewProductForm({ ...newProductForm, model: e.target.value })}
                    placeholder="Ej. NUS-001 / Fat / Slim"
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-slate-400 block mb-1">URL de la Imagen:</label>
                <input
                  type="url"
                  value={newProductForm.imageUrl}
                  onChange={(e) => setNewProductForm({ ...newProductForm, imageUrl: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="text-xs text-slate-400 block mb-1">Descripción:</label>
                <textarea
                  rows="2"
                  value={newProductForm.description}
                  onChange={(e) => setNewProductForm({ ...newProductForm, description: e.target.value })}
                  placeholder="Descripción de la consola o producto..."
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              {/* Controllable Accessories Pricing */}
              <div className="pt-2 border-t border-slate-800 space-y-2">
                <span className="text-xs font-bold text-amber-400 block">Precios de Recompra para Accesorios (MXN):</span>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <label className="text-[10px] text-slate-400 block">Control adicional (+MXN):</label>
                    <input
                      type="number"
                      value={newProductForm.accessoryPricing?.extra_controller || 150}
                      onChange={(e) => setNewProductForm({
                        ...newProductForm,
                        accessoryPricing: { ...newProductForm.accessoryPricing, extra_controller: Number(e.target.value) }
                      })}
                      className="w-full px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-white"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-400 block">Caja original (+MXN):</label>
                    <input
                      type="number"
                      value={newProductForm.accessoryPricing?.original_box || 200}
                      onChange={(e) => setNewProductForm({
                        ...newProductForm,
                        accessoryPricing: { ...newProductForm.accessoryPricing, original_box: Number(e.target.value) }
                      })}
                      className="w-full px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-white"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-400 block">Manuales (+MXN):</label>
                    <input
                      type="number"
                      value={newProductForm.accessoryPricing?.original_manuals || 100}
                      onChange={(e) => setNewProductForm({
                        ...newProductForm,
                        accessoryPricing: { ...newProductForm.accessoryPricing, original_manuals: Number(e.target.value) }
                      })}
                      className="w-full px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-white"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-400 block">Expansion Pak/Memory (+MXN):</label>
                    <input
                      type="number"
                      value={newProductForm.accessoryPricing?.expansion_pak || 300}
                      onChange={(e) => setNewProductForm({
                        ...newProductForm,
                        accessoryPricing: { ...newProductForm.accessoryPricing, expansion_pak: Number(e.target.value) }
                      })}
                      className="w-full px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-white"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
                <button type="button" onClick={() => setShowNewProductModal(false)} className="px-4 py-2 text-xs text-slate-400 hover:text-white transition-colors">Cancelar</button>
                <button type="submit" className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md transition-all">Guardar Consola / Producto</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Email Template Rendered HTML Preview */}
      {showEmailPreviewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 text-slate-900 space-y-4 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div>
                <h3 className="font-bold text-base text-slate-900">{showEmailPreviewModal.subject}</h3>
                <p className="text-xs text-slate-500">Para: {showEmailPreviewModal.to} • {formatDate(showEmailPreviewModal.sentAt)}</p>
              </div>
              <button onClick={() => setShowEmailPreviewModal(null)} className="p-1 text-slate-400 hover:text-slate-800">✕</button>
            </div>
            
            <div 
              className="p-4 rounded-xl border border-slate-200 bg-slate-50 overflow-x-auto text-xs"
              dangerouslySetInnerHTML={{ __html: showEmailPreviewModal.bodyHtml }}
            />
          </div>
        </div>
      )}

    </div>
  );
}
