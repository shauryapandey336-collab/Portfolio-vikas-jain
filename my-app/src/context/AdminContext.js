'use client';
import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { isLoggedIn, login as doLogin, logout as doLogout } from '@/lib/auth';

const AdminContext = createContext(null);

export function AdminProvider({ children }) {
  const [authenticated, setAuthenticated] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    setAuthenticated(isLoggedIn());
    setChecked(true);
  }, []);

  const login = useCallback((u, p) => {
    const ok = doLogin(u, p);
    setAuthenticated(ok);
    return ok;
  }, []);

  const logout = useCallback(() => {
    doLogout();
    setAuthenticated(false);
  }, []);

  if (!checked) return null;

  return (
    <AdminContext.Provider value={{ authenticated, login, logout }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const ctx = useContext(AdminContext);
  if (!ctx) throw new Error('useAdmin must be used within AdminProvider');
  return ctx;
}
