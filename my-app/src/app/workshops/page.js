'use client';
import { useWebsite } from '@/context/WebsiteContext';
import { PageHero, EmptyState } from '@/components/common/UI';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { getImage } from '@/lib/indexedDB';
import { Search, MapPin, Calendar, Users as UsersIcon, GraduationCap, ArrowRight, Filter } from 'lucide-react';
import { formatDate } from '@/lib/utils';

function WorkshopCard({ ws }) {
  const [img, setImg] = useState(null);
  useEffect(() => { if (ws.coverImage) getImage(ws.coverImage).then(setImg); }, [ws.coverImage]);

  return (
    <Link href={`/workshops/${ws.slug}`} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:-translate-y-1">
      <div className="h-48 bg-gradient-to-br from-[#102A56] to-[#2563EB] relative overflow-hidden">
        {img ? <img src={img} alt={ws.title} className="w-full h-full object-cover" /> :
          <div className="flex items-center justify-center h-full"><GraduationCap size={48} className="text-white/20" /></div>}
        <div className="absolute top-4 left-4"><span className="bg-[#D99A22] text-white text-xs px-3 py-1 rounded-full font-medium">{ws.category}</span></div>
      </div>
      <div className="p-6">
        <h3 className="font-bold text-[#111827] text-lg mb-2 group-hover:text-[#2563EB] transition-colors">{ws.title}</h3>
        <p className="text-[#D99A22] font-medium text-sm mb-1">{ws.institution}</p>
        <div className="flex items-center gap-3 text-gray-500 text-xs mb-3">
          {ws.location && <span className="flex items-center gap-1"><MapPin size={12} />{ws.location}</span>}
          {ws.date && <span className="flex items-center gap-1"><Calendar size={12} />{formatDate(ws.date)}</span>}
          {ws.participants && <span className="flex items-center gap-1"><UsersIcon size={12} />{ws.participants}</span>}
        </div>
        <p className="text-gray-500 text-sm line-clamp-2 mb-4">{ws.description}</p>
        <div className="flex flex-wrap gap-1.5 mb-4">
          {ws.technologies.slice(0, 4).map((t) => <span key={t} className="text-xs bg-[#102A56]/5 text-[#102A56] px-2 py-0.5 rounded-md">{t}</span>)}
        </div>
        <span className="text-[#2563EB] text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">View Details <ArrowRight size={14} /></span>
      </div>
    </Link>
  );
}

export default function WorkshopsPage() {
  const { data } = useWebsite();
  const { workshops } = data;
  const [search, setSearch] = useState('');
  const [catFilter, setCatFilter] = useState('');
  const [instFilter, setInstFilter] = useState('');

  const categories = [...new Set(workshops.map((w) => w.category))];
  const institutions = [...new Set(workshops.map((w) => w.institution))];

  const filtered = workshops.filter((w) => {
    if (search && !w.title.toLowerCase().includes(search.toLowerCase()) && !w.institution.toLowerCase().includes(search.toLowerCase())) return false;
    if (catFilter && w.category !== catFilter) return false;
    if (instFilter && w.institution !== instFilter) return false;
    return true;
  });

  return (
    <>
      <PageHero title="Workshops & Events" subtitle="Training programs and seminars conducted at leading institutions" breadcrumb="Workshops" />

      <section className="py-20 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filters */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-10">
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type="text" placeholder="Search workshops..." value={search} onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent" />
              </div>
              <select value={catFilter} onChange={(e) => setCatFilter(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB]">
                <option value="">All Categories</option>
                {categories.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
              <select value={instFilter} onChange={(e) => setInstFilter(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB]">
                <option value="">All Institutions</option>
                {institutions.map((i) => <option key={i} value={i}>{i}</option>)}
              </select>
            </div>
          </div>

          {filtered.length === 0 ? (
            <EmptyState icon={GraduationCap} title="No workshops found" message="Try adjusting your filters." />
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((ws) => <WorkshopCard key={ws.id} ws={ws} />)}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
