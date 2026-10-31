'use client';

import { useState } from 'react';
import { useWebsite } from '@/context/WebsiteContext';
import { PageHero } from '@/components/common/UI';
import { Mail, MapPin, Phone, Send, Globe, CheckCircle2 } from 'lucide-react';

export default function ContactPage() {
  const { data } = useWebsite();
  const { profile } = data;
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [status, setStatus] = useState('');
  const update = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));
  const submit = (event) => {
    event.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.subject.trim() || !form.message.trim()) {
      setStatus('Please complete your name, email, subject and message.');
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(form.email)) { setStatus('Please enter a valid email address.'); return; }
    setStatus('This form is ready, but no delivery service is connected. Please use the email or phone details beside the form.');
  };
  const fields = [
    ['name', 'Name', 'text', true], ['email', 'Email', 'email', true], ['phone', 'Phone', 'tel', false], ['subject', 'Subject', 'text', true],
  ];
  return <>
    <PageHero title="Let’s Start a Conversation" subtitle="For training programs, technical workshops and technology consulting." breadcrumb="Contact" />
    <section className="py-20 bg-[#F8FAFC]"><div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-5 gap-10">
      <aside className="lg:col-span-2 bg-[#102A56] rounded-3xl p-8 text-white"><p className="text-[#D99A22] font-semibold text-sm uppercase tracking-wider mb-3">Contact details</p><h2 className="text-3xl font-bold mb-5">Let’s build something meaningful.</h2><p className="text-blue-100 leading-relaxed mb-8">Reach out to discuss a tailored workshop, corporate learning program or digital initiative.</p>
        <div className="space-y-5">
          <a href={`tel:${profile.phone.replace(/\s/g, '')}`} className="flex gap-3 hover:text-[#D99A22]"><Phone size={20} className="mt-0.5"/><span><small className="block text-blue-200">Phone</small>{profile.phone}</span></a>
          <a href={`mailto:${profile.email}`} className="flex gap-3 hover:text-[#D99A22]"><Mail size={20} className="mt-0.5"/><span><small className="block text-blue-200">Email</small>{profile.email}</span></a>
          <a href={profile.website} target="_blank" rel="noreferrer" className="flex gap-3 hover:text-[#D99A22]"><Globe size={20} className="mt-0.5"/><span><small className="block text-blue-200">Website</small>{profile.website.replace(/^https?:\/\//, '')}</span></a>
          <div className="flex gap-3"><MapPin size={20} className="mt-0.5"/><span><small className="block text-blue-200">Location</small>{profile.location}</span></div>
        </div></aside>
      <form onSubmit={submit} className="lg:col-span-3 bg-white rounded-3xl border border-gray-100 shadow-sm p-6 sm:p-8"><h2 className="text-2xl font-bold text-[#111827] mb-2">Send an enquiry</h2><p className="text-gray-500 text-sm mb-6">Fields marked with * are required.</p>
        <div className="grid sm:grid-cols-2 gap-4">{fields.map(([key, label, type, required]) => <label key={key} className={key === 'subject' ? 'sm:col-span-2' : ''}><span className="text-sm font-medium text-gray-700">{label}{required && ' *'}</span><input required={required} type={type} value={form[key]} onChange={(e) => update(key, e.target.value)} className="mt-1.5 w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/15" /></label>)}</div>
        <label className="block mt-4"><span className="text-sm font-medium text-gray-700">Message *</span><textarea required rows="5" value={form.message} onChange={(e) => update('message', e.target.value)} className="mt-1.5 w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/15" /></label>
        {status && <p className={`mt-4 text-sm flex gap-2 ${status.startsWith('This') ? 'text-amber-700' : 'text-red-600'}`}><CheckCircle2 size={17}/>{status}</p>}
        <button className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#102A56] px-6 py-3 text-white font-semibold hover:bg-[#2563EB] transition-colors"><Send size={17}/>Send enquiry</button>
      </form>
    </div></section>
  </>;
}
