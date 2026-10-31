'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAdmin } from '@/context/AdminContext';
import { LockKeyhole, ShieldAlert } from 'lucide-react';

export default function AdminLoginPage() {
  const { authenticated, login } = useAdmin(); const router = useRouter();
  const [username, setUsername] = useState(''); const [password, setPassword] = useState(''); const [error, setError] = useState('');
  useEffect(() => { if (authenticated) router.replace('/admin/dashboard'); }, [authenticated, router]);
  const submit = (e) => { e.preventDefault(); if (login(username, password)) router.replace('/admin/dashboard'); else setError('The username or password is not valid.'); };
  return <main className="min-h-screen bg-gradient-to-br from-[#102A56] to-[#2563EB] flex items-center justify-center p-5"><form onSubmit={submit} className="w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl"><div className="w-12 h-12 bg-[#102A56] rounded-xl flex items-center justify-center text-white mb-6"><LockKeyhole/></div><p className="text-[#D99A22] text-sm font-bold uppercase tracking-wider">Portfolio administration</p><h1 className="text-3xl font-bold text-[#111827] mt-2">Welcome back</h1><p className="text-gray-500 mt-2 text-sm">Use the local demonstration credentials configured in your environment.</p><label className="block mt-6 text-sm font-medium">Username<input autoComplete="username" required value={username} onChange={(e) => setUsername(e.target.value)} className="mt-1.5 w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#2563EB]"/></label><label className="block mt-4 text-sm font-medium">Password<input autoComplete="current-password" required type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1.5 w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#2563EB]"/></label>{error && <p className="mt-4 text-red-600 text-sm">{error}</p>}<button className="w-full mt-6 py-3 rounded-xl bg-[#102A56] text-white font-semibold hover:bg-[#2563EB]">Sign in</button><p className="mt-5 text-xs text-gray-500 flex gap-2"><ShieldAlert size={16} className="shrink-0"/>This is a front-end-only local editing gate, not secure production authentication.</p></form></main>;
}
