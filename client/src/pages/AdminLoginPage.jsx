import React, { useState } from 'react';
import { Lock, Mail, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function AdminLoginPage({ onLoginSuccess }) {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);
    try {
      const res = await login(email, password);
      if (res.success) {
        onLoginSuccess();
      } else {
        setErrorMsg(res.error || 'Credenciales incorrectas');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleQuickLogin = async (userEmail, userPass) => {
    setEmail(userEmail);
    setPassword(userPass);
    setErrorMsg('');
    setLoading(true);
    try {
      const res = await login(userEmail, userPass);
      if (res.success) {
        onLoginSuccess();
      } else {
        setErrorMsg(res.error || 'Credenciales incorrectas');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] text-white flex items-center justify-center py-12 px-4 sm:px-6">
      <div className="max-w-md w-full space-y-6">
        
        {/* Brand */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400 via-amber-500 to-amber-700 flex items-center justify-center mx-auto shadow-xl shadow-amber-500/20">
            <Lock className="w-7 h-7 text-slate-950" />
          </div>
          <h1 className="text-2xl font-black tracking-wider text-white">
            LION GAMES & TVs
          </h1>
          <p className="text-xs text-amber-400 font-bold uppercase tracking-widest">
            PANEL DE ADMINISTRACIÓN Y OPERACIONES
          </p>
          <p className="text-xs text-slate-400">
            Acceso protegido con control de acceso basado en roles (RBAC).
          </p>
        </div>

        {errorMsg && (
          <div className="p-3.5 rounded-xl bg-red-950/80 border border-red-500/60 text-red-300 text-xs font-semibold flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-[#111827] rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-2xl space-y-4">
          <div>
            <label className="text-xs font-bold text-slate-300 block mb-1">
              Correo Electrónico Corporativo:
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="usuario@liongamestv.mx"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-300 block mb-1">
              Contraseña de Acceso:
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl font-bold text-sm bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-500 text-slate-950 shadow-md shadow-amber-500/20 transition-all flex items-center justify-center gap-2"
          >
            <span>{loading ? 'Verificando...' : 'Iniciar Sesión'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Quick-switch demo logins for the 4 SRS roles */}
        <div className="bg-[#111827]/80 rounded-2xl p-5 border border-slate-800 space-y-3">
          <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
            Acceso Rápido por Rol (Demostración de Funcionalidades):
          </span>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <button
              type="button"
              onClick={() => handleQuickLogin('admin@liongamestv.mx', 'Admin123!')}
              className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-left transition-colors"
            >
              <div className="font-bold text-amber-400">Admin / Dueño</div>
              <div className="text-[10px] text-slate-400">Acceso total</div>
            </button>

            <button
              type="button"
              onClick={() => handleQuickLogin('purchasing@liongamestv.mx', 'Purchasing123!')}
              className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-left transition-colors"
            >
              <div className="font-bold text-blue-400">Compras</div>
              <div className="text-[10px] text-slate-400">Valuación y ofertas</div>
            </button>

            <button
              type="button"
              onClick={() => handleQuickLogin('inspection@liongamestv.mx', 'Inspection123!')}
              className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-left transition-colors"
            >
              <div className="font-bold text-emerald-400">Inspección</div>
              <div className="text-[10px] text-slate-400">QA y recepción</div>
            </button>

            <button
              type="button"
              onClick={() => handleQuickLogin('support@liongamestv.mx', 'Support123!')}
              className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-left transition-colors"
            >
              <div className="font-bold text-purple-400">Soporte</div>
              <div className="text-[10px] text-slate-400">Atención a cliente</div>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
