'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAdmin } from '@/context/AdminContext';
import { useWebsite } from '@/context/WebsiteContext';
import { useImageStorage } from '@/hooks/useImageStorage';
import { getImage } from '@/lib/indexedDB';
import { generateId, slugify } from '@/lib/utils';
import { BarChart3, Download, FileUp, ImagePlus, LogOut, Plus, RotateCcw, Save, Trash2, Upload, X } from 'lucide-react';

const collections = [
  ['profile', 'Profile'], ['about', 'About'], ['skills', 'Skills'], ['workshops', 'Workshops'], ['trainingPrograms', 'Training Programs'], ['projects', 'Projects'], ['achievements', 'Achievements'], ['gallery', 'Gallery'], ['education', 'Education'], ['experience', 'Experience'], ['testimonials', 'Testimonials'], ['socialLinks', 'Social Links'], ['seo', 'SEO'], ['settings', 'Website Settings'], ['stats', 'Statistics'],
];
const arrayKeys = new Set(['skills', 'workshops', 'trainingPrograms', 'projects', 'achievements', 'gallery', 'education', 'experience', 'testimonials', 'stats']);
const arrayFields = new Set(['titles', 'items', 'technologies', 'highlights', 'curriculum', 'gallery']);
const longFields = new Set(['bio', 'overview', 'description', 'message', 'text']);

const label = (key) => key.replace(/([A-Z])/g, ' $1').replace(/^./, (letter) => letter.toUpperCase());
const itemName = (item, index) => item.title || item.name || item.category || item.institution || item.degree || item.role || item.label || item.caption || `Item ${index + 1}`;

function ImagePreview({ imageId, alt }) {
  const [src, setSrc] = useState(null);
  useEffect(() => { if (imageId) getImage(imageId).then(setSrc); else setSrc(null); }, [imageId]);
  return src ? <img src={src} alt={alt} className="h-full w-full object-cover" /> : <div className="h-full w-full bg-gradient-to-br from-[#102A56] to-[#2563EB] flex items-center justify-center"><ImagePlus className="text-white/50" size={32}/></div>;
}

function ContentForm({ value, onChange }) {
  if (!value) return null;
  const update = (key, next) => onChange({ ...value, [key]: next });
  return <div className="grid sm:grid-cols-2 gap-5">
    {Object.entries(value).filter(([key]) => key !== 'id' && !['profileImage', 'coverImage', 'imageId'].includes(key)).map(([key, fieldValue]) => {
      if (typeof fieldValue === 'boolean') return <label key={key} className="sm:col-span-2 flex items-center gap-3 rounded-xl bg-slate-50 px-4 py-3 text-sm font-medium"><input type="checkbox" checked={fieldValue} onChange={(e) => update(key, e.target.checked)} className="h-4 w-4 accent-[#2563EB]" />{label(key)}</label>;
      const isList = Array.isArray(fieldValue) || arrayFields.has(key);
      const isLong = longFields.has(key);
      const inputValue = isList ? (fieldValue || []).join(', ') : (fieldValue ?? '');
      const base = 'mt-1.5 w-full rounded-xl border border-gray-200 bg-white px-3.5 py-2.5 text-sm outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/15';
      return <label key={key} className={isLong || isList ? 'sm:col-span-2' : ''}><span className="text-sm font-semibold text-gray-700">{label(key)}{isList && <em className="ml-1 font-normal text-gray-400">(separate with commas)</em>}</span>{isLong || isList ? <textarea rows={isLong ? 5 : 2} value={inputValue} onChange={(e) => update(key, isList ? e.target.value.split(',').map((x) => x.trim()).filter(Boolean) : e.target.value)} className={base} /> : <input type={key === 'date' ? 'date' : key === 'email' ? 'email' : key === 'projectLink' || key === 'website' ? 'url' : 'text'} value={inputValue} onChange={(e) => update(key, e.target.value)} className={base} />}</label>;
    })}
  </div>;
}

export default function DashboardPage() {
  const { authenticated, logout } = useAdmin(); const { data, updateSection, resetAllData, exportAllData, importAllData } = useWebsite(); const router = useRouter();
  const [section, setSection] = useState('profile'); const [selected, setSelected] = useState(0); const [edit, setEdit] = useState(null); const [notice, setNotice] = useState('');
  const importRef = useRef(null); const mainImageRef = useRef(null); const galleryImageRef = useRef(null); const { uploadImage, deleteImage, uploading } = useImageStorage();
  useEffect(() => { if (!authenticated) router.replace('/admin/login'); }, [authenticated, router]);
  const value = data?.[section]; const isArray = arrayKeys.has(section); const current = isArray ? value?.[selected] : value;
  useEffect(() => { setEdit(current ? structuredClone(current) : null); }, [current, section]);
  const cards = useMemo(() => [['Workshops', data?.workshops?.length || 0], ['Gallery images', data?.gallery?.length || 0], ['Projects', data?.projects?.length || 0], ['Training programs', data?.trainingPrograms?.length || 0]], [data]);
  if (!authenticated || !data) return null;
  const changeSection = (key) => { setSection(key); setSelected(0); setNotice(''); };
  const save = () => {
    if (!edit) return;
    const prepared = section === 'workshops' ? { ...edit, slug: slugify(edit.slug || edit.title || `workshop-${edit.id}`) } : edit;
    if (isArray) { const next = [...value]; next[selected] = prepared; updateSection(section, next); } else updateSection(section, prepared);
    setNotice('Saved successfully — changes are live on the public website.');
  };
  const add = () => {
    const record = { id: generateId(), title: 'New item', description: '' };
    if (section === 'skills') Object.assign(record, { category: 'New category', color: '#2563EB', items: [] });
    if (section === 'workshops') Object.assign(record, { slug: `workshop-${generateId()}`, institution: '', date: '', location: '', category: '', technologies: [], participants: '', highlights: [], coverImage: null, gallery: [] });
    if (section === 'trainingPrograms') Object.assign(record, { duration: '', level: '', curriculum: [], color: '#2563EB' });
    if (section === 'projects') Object.assign(record, { category: '', technologies: [], projectLink: '', coverImage: null, featured: false });
    if (section === 'gallery') Object.assign(record, { imageId: null, caption: '', event: '', category: '' });
    if (section === 'testimonials') Object.assign(record, { name: '', role: '', text: '', rating: '5' });
    const next = [...value, record]; updateSection(section, next); setSelected(next.length - 1); setNotice('New item created. Fill in its details and save.');
  };
  const remove = async () => { if (!current || !window.confirm('Delete this item permanently?')) return; if (current.imageId) await deleteImage(current.imageId); if (current.coverImage) await deleteImage(current.coverImage); for (const imageId of current.gallery || []) await deleteImage(imageId); updateSection(section, value.filter((_, index) => index !== selected)); setSelected(Math.max(0, selected - 1)); setNotice('Item deleted.'); };
  const attachImage = async (file, kind = 'main') => {
    if (!file || !edit) return; const { id } = await uploadImage(file);
    if (section === 'profile') setEdit({ ...edit, profileImage: id });
    else if (section === 'gallery') setEdit({ ...edit, imageId: id });
    else if (section === 'workshops' && kind === 'gallery') setEdit({ ...edit, gallery: [...(edit.gallery || []), id] });
    else if (section === 'workshops' || section === 'projects') setEdit({ ...edit, coverImage: id });
    else { setNotice('Images can be added to Profile, Gallery, Workshops and Projects.'); return; }
    setNotice('Image added. Click Save changes to publish it.');
  };
  const doImport = async (file) => { try { await importAllData(file); setNotice('Backup imported.'); } catch { setNotice('Please select a valid exported backup JSON file.'); } };
  const imageId = edit?.profileImage || edit?.coverImage || edit?.imageId;
  return <main className="min-h-screen bg-[#f3f6fb] text-[#111827]"><header className="sticky top-0 z-20 border-b bg-white/95 backdrop-blur px-4 sm:px-7 py-4 flex justify-between items-center"><div><p className="text-xs text-[#D99A22] uppercase font-bold tracking-wider">Vikas Jain portfolio</p><h1 className="font-bold text-xl">Website Manager</h1></div><button onClick={() => { logout(); router.replace('/admin/login'); }} className="inline-flex items-center gap-2 text-sm px-3 py-2 rounded-lg hover:bg-gray-100"><LogOut size={16}/>Logout</button></header>
    <div className="max-w-7xl mx-auto p-4 sm:p-7"><div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-7">{cards.map(([name, count]) => <div key={name} className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm"><BarChart3 className="text-[#2563EB] mb-3"/><p className="text-3xl font-bold">{count}</p><p className="text-sm text-gray-500">{name}</p></div>)}</div>
      <div className="flex flex-wrap gap-2 mb-6"><button onClick={exportAllData} className="tool"><Download size={15}/>Backup content</button><button onClick={() => importRef.current?.click()} className="tool"><FileUp size={15}/>Restore backup</button><input ref={importRef} type="file" accept="application/json" className="hidden" onChange={(e) => e.target.files[0] && doImport(e.target.files[0])}/><button onClick={() => { if (window.confirm('Restore all content to its initial values?')) resetAllData(); }} className="tool text-red-600"><RotateCcw size={15}/>Reset defaults</button></div>
      <div className="grid lg:grid-cols-[240px_1fr] gap-6"><aside className="bg-white border border-slate-100 rounded-2xl p-3 h-fit shadow-sm"><p className="px-3 py-2 text-xs font-bold text-gray-400 uppercase">Edit website</p>{collections.map(([key, name]) => <button key={key} onClick={() => changeSection(key)} className={`w-full text-left px-3 py-2.5 rounded-xl text-sm ${section === key ? 'bg-[#102A56] text-white shadow-sm' : 'hover:bg-slate-50 text-gray-700'}`}>{name}</button>)}</aside>
        <section className="bg-white border border-slate-100 rounded-2xl p-5 sm:p-7 shadow-sm min-w-0"><div className="flex flex-wrap gap-3 justify-between items-center mb-6"><div><p className="text-sm font-semibold text-[#D99A22]">Manage content</p><h2 className="text-2xl font-bold">{collections.find(([key]) => key === section)?.[1]}</h2><p className="text-sm text-gray-500 mt-1">Update your portfolio with simple fields — no code required.</p></div>{isArray && <div className="flex gap-2"><button onClick={add} className="tool bg-[#102A56] text-white"><Plus size={15}/>Add new</button><button onClick={remove} disabled={!current} className="tool text-red-600 disabled:opacity-40"><Trash2 size={15}/>Delete</button></div>}</div>
          {isArray && <div className="flex gap-2 overflow-x-auto pb-4 mb-6 border-b">{value?.map((item, index) => <button key={item.id || index} onClick={() => setSelected(index)} className={`shrink-0 px-3 py-2 rounded-lg text-sm ${selected === index ? 'bg-blue-50 text-[#102A56] font-semibold ring-1 ring-blue-100' : 'text-gray-500 hover:bg-gray-50'}`}>{itemName(item, index)}</button>)}{!value?.length && <p className="text-sm text-gray-500">Nothing here yet. Use “Add new” to create the first item.</p>}</div>}
          {edit && <><div className="grid md:grid-cols-[180px_1fr] gap-7"><div><div className="aspect-square rounded-2xl overflow-hidden border border-slate-100"><ImagePreview imageId={imageId} alt="Content preview" /></div><input ref={mainImageRef} type="file" accept="image/*" className="hidden" onChange={(e) => attachImage(e.target.files[0])}/><button onClick={() => mainImageRef.current?.click()} className="mt-3 tool w-full justify-center"><Upload size={15}/>{uploading ? 'Uploading…' : imageId ? 'Replace image' : 'Add image'}</button>{section === 'workshops' && <><input ref={galleryImageRef} type="file" accept="image/*" className="hidden" onChange={(e) => attachImage(e.target.files[0], 'gallery')}/><button onClick={() => galleryImageRef.current?.click()} className="mt-2 tool w-full justify-center"><ImagePlus size={15}/>Add gallery photo</button>{edit.gallery?.length > 0 && <p className="mt-2 text-xs text-center text-gray-500">{edit.gallery.length} event gallery photo(s) added</p>}</>}</div><ContentForm value={edit} onChange={setEdit}/></div><div className="mt-7 pt-5 border-t flex flex-wrap gap-3"><button onClick={save} className="tool bg-[#2563EB] text-white px-5"><Save size={16}/>Save changes</button><button onClick={() => setEdit(structuredClone(current))} className="tool"><X size={16}/>Discard edits</button></div></>}
          {notice && <p className="mt-4 rounded-xl bg-blue-50 text-[#102A56] px-4 py-3 text-sm">{notice}</p>}
        </section></div></div></main>;
}
