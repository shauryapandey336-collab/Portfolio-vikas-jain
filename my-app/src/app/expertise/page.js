'use client';
import { useWebsite } from '@/context/WebsiteContext';
import { PageHero } from '@/components/common/UI';
import { BarChart3, Code, Terminal, Users, Layers, Zap, Briefcase } from 'lucide-react';

const iconMap = { 'bar-chart': BarChart3, code: Code, terminal: Terminal, users: Users, layers: Layers, zap: Zap, briefcase: Briefcase };

export default function ExpertisePage() {
  const { data } = useWebsite();
  const { skills } = data;

  return (
    <>
      <PageHero title="Expertise" subtitle="Technical skills and professional competencies" breadcrumb="Expertise" />

      <section className="py-20 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {skills.map((skill) => {
              const Icon = iconMap[skill.icon] || BarChart3;
              return (
                <div key={skill.id} className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group hover:-translate-y-1">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110" style={{ background: `${skill.color}15` }}>
                      <Icon size={28} style={{ color: skill.color }} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-[#111827]">{skill.category}</h3>
                      <p className="text-gray-500 text-sm">{skill.items.length} skills</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {skill.items.map((item) => (
                      <div key={item} className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors group/item">
                        <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: skill.color }} />
                        <span className="text-sm text-gray-700 font-medium">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
