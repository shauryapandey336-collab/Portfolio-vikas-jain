'use client';
import { useWebsite } from '@/context/WebsiteContext';
import { PageHero, EmptyState } from '@/components/common/UI';
import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { getImage } from '@/lib/indexedDB';
import Link from 'next/link';
import { MapPin, Calendar, Users, CheckCircle2, ArrowLeft, X, ChevronLeft, ChevronRight, GraduationCap } from 'lucide-react';
import { formatDate } from '@/lib/utils';

function Lightbox({ images, current, onClose, onPrev, onNext }) {
  if (current === null) return null;
  return (
    <div className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center" onClick={onClose}>
      <button onClick={onClose} className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"><X size={28} /></button>
      <button onClick={(e) => { e.stopPropagation(); onPrev(); }} className="absolute left-4 text-white hover:text-gray-300 z-10"><ChevronLeft size={36} /></button>
      <button onClick={(e) => { e.stopPropagation(); onNext(); }} className="absolute right-4 text-white hover:text-gray-300 z-10"><ChevronRight size={36} /></button>
      <img src={images[current]} alt="" className="max-h-[85vh] max-w-[90vw] object-contain rounded-lg" onClick={(e) => e.stopPropagation()} />
    </div>
  );
}

export default function WorkshopDetailPage() {
  const params = useParams();
  const { data } = useWebsite();
  const ws = data.workshops.find((w) => w.slug === params.slug);
  const [coverImg, setCoverImg] = useState(null);
  const [galleryImgs, setGalleryImgs] = useState([]);
  const [lightboxIdx, setLightboxIdx] = useState(null);

  useEffect(() => {
    if (ws?.coverImage) getImage(ws.coverImage).then(setCoverImg);
    if (ws?.gallery?.length) {
      Promise.all(ws.gallery.map((id) => getImage(id))).then((imgs) => setGalleryImgs(imgs.filter(Boolean)));
    }
  }, [ws]);

  if (!ws) return (
    <>
      <PageHero title="Workshop Not Found" breadcrumb="Workshops" />
      <div className="py-20"><EmptyState icon={GraduationCap} title="Workshop not found" message="This workshop doesn't exist or has been removed." /></div>
    </>
  );

  return (
    <>
      <PageHero title={ws.title} subtitle={ws.institution} breadcrumb="Workshops" />

      <section className="py-20 bg-[#F8FAFC]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/workshops" className="inline-flex items-center gap-2 text-[#2563EB] hover:text-[#102A56] font-medium mb-8 transition-colors">
            <ArrowLeft size={16} /> Back to Workshops
          </Link>

          {/* Cover */}
          <div className="rounded-2xl overflow-hidden mb-10 shadow-lg">
            <div className="h-64 sm:h-80 bg-gradient-to-br from-[#102A56] to-[#2563EB] flex items-center justify-center">
              {coverImg ? <img src={coverImg} alt={ws.title} className="w-full h-full object-cover" /> :
                <GraduationCap size={64} className="text-white/20" />}
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <div>
                <span className="inline-block bg-[#D99A22] text-white text-xs px-3 py-1 rounded-full font-medium mb-3">{ws.category}</span>
                <h2 className="text-2xl font-bold text-[#111827] mb-4">{ws.title}</h2>
                <p className="text-gray-600 leading-relaxed">{ws.description}</p>
              </div>

              {ws.highlights?.length > 0 && (
                <div>
                  <h3 className="text-lg font-bold text-[#111827] mb-4">Highlights</h3>
                  <div className="space-y-2">
                    {ws.highlights.map((h, i) => (
                      <div key={i} className="flex items-center gap-2 text-gray-600">
                        <CheckCircle2 size={16} className="text-[#2563EB]" /> {h}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {galleryImgs.length > 0 && (
                <div>
                  <h3 className="text-lg font-bold text-[#111827] mb-4">Gallery</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {galleryImgs.map((img, i) => (
                      <div key={i} className="aspect-square rounded-xl overflow-hidden cursor-pointer hover:opacity-90 transition-opacity" onClick={() => setLightboxIdx(i)}>
                        <img src={img} alt="" className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-4">
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h4 className="font-bold text-[#111827] mb-4">Details</h4>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-2 text-gray-600"><GraduationCap size={16} className="text-[#2563EB]" />{ws.institution}</div>
                  {ws.location && <div className="flex items-center gap-2 text-gray-600"><MapPin size={16} className="text-[#2563EB]" />{ws.location}</div>}
                  {ws.date && <div className="flex items-center gap-2 text-gray-600"><Calendar size={16} className="text-[#2563EB]" />{formatDate(ws.date)}</div>}
                  {ws.participants && <div className="flex items-center gap-2 text-gray-600"><Users size={16} className="text-[#2563EB]" />{ws.participants} Participants</div>}
                </div>
              </div>

              {ws.technologies?.length > 0 && (
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                  <h4 className="font-bold text-[#111827] mb-3">Technologies</h4>
                  <div className="flex flex-wrap gap-2">
                    {ws.technologies.map((t) => (
                      <span key={t} className="text-xs bg-[#102A56]/5 text-[#102A56] px-3 py-1.5 rounded-lg font-medium">{t}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <Lightbox images={galleryImgs} current={lightboxIdx} onClose={() => setLightboxIdx(null)}
        onPrev={() => setLightboxIdx((p) => (p - 1 + galleryImgs.length) % galleryImgs.length)}
        onNext={() => setLightboxIdx((p) => (p + 1) % galleryImgs.length)} />
    </>
  );
}
