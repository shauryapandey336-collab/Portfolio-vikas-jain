'use client';
import { useWebsite } from '@/context/WebsiteContext';
import { PageHero } from '@/components/common/UI';
import { BarChart3, Code, Terminal, Users, Layers, Zap, Briefcase, Clock, Award, CheckCircle2, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const iconMap = { 'bar-chart': BarChart3, code: Code, terminal: Terminal, users: Users, layers: Layers, zap: Zap, briefcase: Briefcase };

export default function TrainingPage() {
  const { data } = useWebsite();
  const { trainingPrograms } = data;

  return (
    <>
      <PageHero title="Training Programs" subtitle="Industry-aligned courses designed for career success" breadcrumb="Training" />

      <section className="py-20 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trainingPrograms.map((tp) => {
              const Icon = iconMap[tp.icon] || Code;
              return (
                <div key={tp.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group hover:-translate-y-1">
                  <div className="h-2" style={{ background: tp.color }} />
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: `${tp.color}15` }}>
                        <Icon size={24} style={{ color: tp.color }} />
                      </div>
                      <div>
                        <h3 className="font-bold text-[#111827]">{tp.title}</h3>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <Clock size={12} /> {tp.duration}
                          <span className="w-1 h-1 bg-gray-300 rounded-full" />
                          <Award size={12} /> {tp.level}
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-500 text-sm mb-4">{tp.description}</p>
                    <div className="space-y-1.5">
                      {tp.curriculum.map((item, i) => (
                        <div key={i} className="flex items-center gap-2 text-sm text-gray-600">
                          <CheckCircle2 size={14} style={{ color: tp.color }} /> {item}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-16 bg-gradient-to-br from-[#102A56] to-[#2563EB] rounded-2xl p-10 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">Interested in a Training Program?</h2>
            <p className="text-blue-200 mb-6 max-w-xl mx-auto">Get in touch to discuss custom training solutions for your team or institution.</p>
            <Link href="/contact" className="inline-flex items-center gap-2 bg-[#D99A22] hover:bg-[#c08a1e] text-white px-8 py-3 rounded-xl font-semibold transition-all hover:scale-105">
              Contact for Training <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
