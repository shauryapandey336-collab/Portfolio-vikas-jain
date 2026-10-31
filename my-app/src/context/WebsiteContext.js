'use client';
import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { loadData, saveData, resetData as resetStorage, exportData as doExport, importData as doImport } from '@/lib/storage';

const WebsiteContext = createContext(null);

export function WebsiteProvider({ children }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setData(loadData());
    setLoading(false);
  }, []);

  const updateData = useCallback((updater) => {
    setData((prev) => {
      const next = typeof updater === 'function' ? updater(prev) : updater;
      saveData(next);
      return { ...next };
    });
  }, []);

  const updateSection = useCallback((key, value) => {
    updateData((prev) => ({ ...prev, [key]: typeof value === 'function' ? value(prev[key]) : value }));
  }, [updateData]);

  const resetAllData = useCallback(() => {
    const fresh = resetStorage();
    setData({ ...fresh });
  }, []);

  const exportAllData = useCallback(() => { doExport(); }, []);

  const importAllData = useCallback(async (file) => {
    const imported = await doImport(file);
    setData({ ...imported });
  }, []);

  if (loading || !data) return null;

  return (
    <WebsiteContext.Provider value={{ data, updateData, updateSection, resetAllData, exportAllData, importAllData }}>
      {children}
    </WebsiteContext.Provider>
  );
}

export function useWebsite() {
  const ctx = useContext(WebsiteContext);
  if (!ctx) throw new Error('useWebsite must be used within WebsiteProvider');
  return ctx;
}
