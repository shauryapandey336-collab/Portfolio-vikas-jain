'use client';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export function SectionHeader({ badge, title, subtitle, center = true, light = false }) {
  return (
    <div className={`mb-12 ${center ? 'text-center' : ''}`}>
      {badge && <span className={`inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase mb-4 ${light ? 'bg-white/10 text-blue-200' : 'bg-[#102A56]/10 text-[#102A56]'}`}>{badge}</span>}
      <h2 className={`text-3xl sm:text-4xl font-bold mb-4 ${light ? 'text-white' : 'text-[#111827]'}`}>{title}</h2>
      {subtitle && <p className={`max-w-2xl text-lg ${center ? 'mx-auto' : ''} ${light ? 'text-blue-200' : 'text-gray-500'}`}>{subtitle}</p>}
    </div>
  );
}

export function PageHero({ title, subtitle, breadcrumb }) {
  return (
    <section className="relative bg-gradient-to-br from-[#102A56] via-[#1a3a6e] to-[#2563EB] pt-28 pb-16 overflow-hidden">
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, #D99A22 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {breadcrumb && (
          <div className="flex items-center gap-2 text-blue-200 text-sm mb-4">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ArrowRight size={14} />
            <span className="text-white">{breadcrumb}</span>
          </div>
        )}
        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">{title}</h1>
        {subtitle && <p className="text-xl text-blue-200 max-w-2xl">{subtitle}</p>}
      </div>
    </section>
  );
}

export function EmptyState({ icon: Icon, title, message }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      {Icon && <Icon size={48} className="text-gray-300 mb-4" />}
      <h3 className="text-xl font-semibold text-gray-400 mb-2">{title}</h3>
      <p className="text-gray-400">{message}</p>
    </div>
  );
}

export function ConfirmDialog({ open, title, message, onConfirm, onCancel }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4" onClick={onCancel}>
      <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-md w-full" onClick={(e) => e.stopPropagation()}>
        <h3 className="text-lg font-bold text-[#111827] mb-2">{title}</h3>
        <p className="text-gray-500 mb-6">{message}</p>
        <div className="flex justify-end gap-3">
          <button onClick={onCancel} className="px-4 py-2 rounded-xl text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors">Cancel</button>
          <button onClick={onConfirm} className="px-4 py-2 rounded-xl text-sm font-medium text-white bg-red-500 hover:bg-red-600 transition-colors">Delete</button>
        </div>
      </div>
    </div>
  );
}

export function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center py-20">
      <div className="w-10 h-10 border-4 border-[#102A56]/20 border-t-[#102A56] rounded-full animate-spin" />
    </div>
  );
}
