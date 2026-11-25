import React, { createContext, useContext, useState, useEffect } from 'react';
import { DEMO_USERS } from '../services/mockAdminData';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('lion_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const [token, setToken] = useState(() => localStorage.getItem('lion_token') || null);
  const [loading, setLoading] = useState(false);

  // Restore saved session directly from localStorage on load without backend calls
  useEffect(() => {
    try {
      const saved = localStorage.getItem('lion_user');
      if (saved) {
        setUser(JSON.parse(saved));
      }
    } catch {
      // ignore
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    if (!email || !email.trim()) {
      return { success: false, error: 'Por favor ingrese correo electrónico.' };
    }

    const normEmail = email.trim().toLowerCase();
    const foundUser = DEMO_USERS[normEmail] || {
      id: `usr-${Date.now()}`,
      name: email.split('@')[0],
      email: normEmail,
      role: 'admin',
      department: 'Administración'
    };

    const mockToken = `mock-token-${foundUser.role}-${Date.now()}`;
    setToken(mockToken);
    setUser(foundUser);
    localStorage.setItem('lion_token', mockToken);
    localStorage.setItem('lion_user', JSON.stringify(foundUser));

    return { success: true, user: foundUser };
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('lion_token');
    localStorage.removeItem('lion_user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user,
        login,
        logout,
        loading
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
