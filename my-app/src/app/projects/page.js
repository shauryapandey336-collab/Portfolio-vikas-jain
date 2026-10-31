'use client';
import { useWebsite } from '@/context/WebsiteContext';
import { PageHero, EmptyState } from '@/components/common/UI';
import { useState, useEffect } from 'react';
import { getImage } from '@/lib/indexedDB';
import { Code, ExternalLink, FolderOpen } from 'lucide-react';

function ProjectCard({ project }) {
  const [img, setImg] = useState(null);
  useEffect(() => { if (project.coverImage) getImage(project.coverImage).then(setImg); }, [project.coverImage]);

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group hover:-translate-y-1">
      <div className="h-48 bg-gradient-to-br from-[#102A56] to-[#2563EB] relative overflow-hidden">
        {img ? <img src={img} alt={project.title} className="w-full h-full object-cover" /> :
          <div className="flex items-center justify-center h-full"><Code size={48} className="text-white/20" /></div>}
        <div className="absolute top-4 right-4"><span className="bg-white/20 backdrop-blur-md text-white text-xs px-3 py-1 rounded-full">{project.category}</span></div>
      </div>
      <div className="p-6">
        <h3 className="font-bold text-[#111827] text-lg mb-2 group-hover:text-[#2563EB] transition-colors">{project.title}</h3>
        <p className="text-gray-500 text-sm line-clamp-2 mb-4">{project.description}</p>
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.technologies.map((t) => <span key={t} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-md">{t}</span>)}
        </div>
        {project.projectLink && (
          <a href={project.projectLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-[#2563EB] text-sm font-semibold hover:text-[#102A56] transition-colors">
            View Project <ExternalLink size={14} />
          </a>
        )}
      </div>
    </div>
  );
}

export default function ProjectsPage() {
  const { data } = useWebsite();
  const { projects } = data;
  const [filter, setFilter] = useState('');
  const categories = [...new Set(projects.map((p) => p.category))];
  const filtered = filter ? projects.filter((p) => p.category === filter) : projects;

  return (
    <>
      <PageHero title="Projects" subtitle="Web and data-driven applications built across sectors" breadcrumb="Projects" />

      <section className="py-20 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2 mb-10 justify-center">
            <button onClick={() => setFilter('')} className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${!filter ? 'bg-[#102A56] text-white' : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'}`}>All</button>
            {categories.map((c) => (
              <button key={c} onClick={() => setFilter(c)} className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${filter === c ? 'bg-[#102A56] text-white' : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'}`}>{c}</button>
            ))}
          </div>

          {filtered.length === 0 ? (
            <EmptyState icon={FolderOpen} title="No projects yet" message="Projects will appear here once added." />
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((p) => <ProjectCard key={p.id} project={p} />)}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
