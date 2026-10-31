'use client';
import { useWebsite } from '@/context/WebsiteContext';
import { useCallback } from 'react';
import { generateId, slugify } from '@/lib/utils';

export function useWebsiteData() {
  const { data, updateSection, updateData, resetAllData, exportAllData, importAllData } = useWebsite();

  // Generic CRUD helpers
  const addItem = useCallback((section, item) => {
    updateSection(section, (prev) => [...(prev || []), { ...item, id: item.id || generateId() }]);
  }, [updateSection]);

  const updateItem = useCallback((section, id, updates) => {
    updateSection(section, (prev) => (prev || []).map((it) => (it.id === id ? { ...it, ...updates } : it)));
  }, [updateSection]);

  const deleteItem = useCallback((section, id) => {
    updateSection(section, (prev) => (prev || []).filter((it) => it.id !== id));
  }, [updateSection]);

  // Workshop-specific
  const addWorkshop = useCallback((ws) => {
    const item = { ...ws, id: ws.id || generateId(), slug: ws.slug || slugify(ws.title), gallery: ws.gallery || [] };
    updateSection('workshops', (prev) => [...(prev || []), item]);
  }, [updateSection]);

  const updateWorkshop = useCallback((id, updates) => {
    if (updates.title && !updates.slug) updates.slug = slugify(updates.title);
    updateItem('workshops', id, updates);
  }, [updateItem]);

  // Profile
  const updateProfile = useCallback((updates) => {
    updateSection('profile', (prev) => ({ ...prev, ...updates }));
  }, [updateSection]);

  const updateAbout = useCallback((updates) => {
    updateSection('about', (prev) => ({ ...prev, ...updates }));
  }, [updateSection]);

  const updateSocialLinks = useCallback((updates) => {
    updateSection('socialLinks', (prev) => ({ ...prev, ...updates }));
  }, [updateSection]);

  const updateSEO = useCallback((updates) => {
    updateSection('seo', (prev) => ({ ...prev, ...updates }));
  }, [updateSection]);

  const updateSettings = useCallback((updates) => {
    updateSection('settings', (prev) => ({ ...prev, ...updates }));
  }, [updateSection]);

  return {
    data, updateData, updateSection,
    addItem, updateItem, deleteItem,
    addWorkshop, updateWorkshop,
    updateProfile, updateAbout, updateSocialLinks, updateSEO, updateSettings,
    resetAllData, exportAllData, importAllData,
  };
}
