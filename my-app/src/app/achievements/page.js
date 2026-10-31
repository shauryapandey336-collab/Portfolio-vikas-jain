'use client';
import { useWebsite } from '@/context/WebsiteContext';
import { PageHero } from '@/components/common/UI';
import { Award, Users, Code, Target, Briefcase, Trophy } from 'lucide-react';

const iconMap = { users: Users, code: Code, award: Award, 'trending-up': Target, building: Briefcase };

export default function AchievementsPage() {
  const { data } = useWebsite();
  const { achievements } = data;

  return (
    <>
      <PageHero title="Achievements" subtitle="Key milestones and accomplishments" breadcrumb="Achievements" />

      <section className="py-20 bg-[#F8FAFC]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            {achievements.map((a, i) => {
              const Icon = iconMap[a.icon] || Award;
              return (
                <div key={a.id} className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex items-start gap-5 group hover:-translate-y-0.5">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#102A56] to-[#2563EB] flex items-center justify-center text-white flex-shrink-0 group-hover:scale-110 transition-transform">
                    <Icon size={24} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-[#111827] mb-1">{a.title}</h3>
                    <p className="text-gray-500 leading-relaxed">{a.description}</p>
                    {a.year && <p className="text-[#D99A22] text-sm font-semibold mt-3">{a.year}</p>}
                  </div>
                  <div className="hidden sm:flex w-10 h-10 rounded-full bg-[#D99A22]/10 items-center justify-center text-[#D99A22] font-bold text-sm flex-shrink-0">
                    #{i + 1}
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
