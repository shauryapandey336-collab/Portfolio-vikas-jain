'use client';
import { useWebsite } from '@/context/WebsiteContext';
import { PageHero, EmptyState } from '@/components/common/UI';
import { useState, useEffect } from 'react';
import { getImage } from '@/lib/indexedDB';
import { Camera, X, ChevronLeft, ChevronRight, ImageIcon } from 'lucide-react';

function Lightbox({ images, current, onClose, onPrev, onNext }) {
  if (current === null) return null;
  const img = images[current];
  return (
    <div className="fixed inset-0 z-[100] bg-black/90 flex flex-col items-center justify-center" onClick={onClose}>
      <button onClick={onClose} className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"><X size={28} /></button>
      {images.length > 1 && <button onClick={(e) => { e.stopPropagation(); onPrev(); }} className="absolute left-4 text-white hover:text-gray-300"><ChevronLeft size={36} /></button>}
      {images.length > 1 && <button onClick={(e) => { e.stopPropagation(); onNext(); }} className="absolute right-4 text-white hover:text-gray-300"><ChevronRight size={36} /></button>}
      <img src={img.dataUrl} alt={img.caption || ''} className="max-h-[80vh] max-w-[90vw] object-contain rounded-lg" onClick={(e) => e.stopPropagation()} />
      {(img.caption || img.event) && (
        <div className="mt-4 text-center" onClick={(e) => e.stopPropagation()}>
          {img.caption && <p className="text-white text-lg">{img.caption}</p>}
          {img.event && <p className="text-gray-400 text-sm">{img.event}</p>}
        </div>
      )}
    </div>
  );
}

export default function GalleryPage() {
  const { data } = useWebsite();
  const { gallery } = data;
  const [images, setImages] = useState([]);
  const [lightboxIdx, setLightboxIdx] = useState(null);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    if (!gallery?.length) { setImages([]); return; }
    Promise.all(gallery.map(async (item) => {
      const dataUrl = await getImage(item.imageId);
      return dataUrl ? { ...item, dataUrl } : null;
    })).then((res) => setImages(res.filter(Boolean)));
  }, [gallery]);

  const categories = [...new Set(gallery.map((g) => g.category).filter(Boolean))];
  const filtered = filter ? images.filter((img) => img.category === filter) : images;

  return (
    <>
      <PageHero title="Gallery" subtitle="Moments from workshops, events and training sessions" breadcrumb="Gallery" />

      <section className="py-20 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {categories.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-10 justify-center">
              <button onClick={() => setFilter('')} className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${!filter ? 'bg-[#102A56] text-white' : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'}`}>All</button>
              {categories.map((c) => (
                <button key={c} onClick={() => setFilter(c)} className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${filter === c ? 'bg-[#102A56] text-white' : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'}`}>{c}</button>
              ))}
            </div>
          )}

          {filtered.length === 0 ? (
            <EmptyState icon={ImageIcon} title="No photos yet" message="Gallery images will appear once added through admin." />
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {filtered.map((img, i) => (
                <div key={img.id || i} className="group relative aspect-square rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all" onClick={() => setLightboxIdx(i)}>
                  <img src={img.dataUrl} alt={img.caption || ''} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                    {img.caption && <p className="text-white text-sm font-medium">{img.caption}</p>}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <Lightbox images={filtered} current={lightboxIdx} onClose={() => setLightboxIdx(null)}
        onPrev={() => setLightboxIdx((p) => (p - 1 + filtered.length) % filtered.length)}
        onNext={() => setLightboxIdx((p) => (p + 1) % filtered.length)} />
    </>
  );
}
