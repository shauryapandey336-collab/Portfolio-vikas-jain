'use client';
import { useWebsite } from '@/context/WebsiteContext';
import { PageHero, SectionHeader } from '@/components/common/UI';
import { useEffect, useState } from 'react';
import { getImage } from '@/lib/indexedDB';
import { Briefcase, GraduationCap, MapPin, CheckCircle2, Award, Target, Users, Code } from 'lucide-react';

const achieveIcons = { users: Users, code: Code, award: Award, 'trending-up': Target, building: Briefcase };

export default function AboutPage() {
  const { data } = useWebsite();
  const { profile, about, experience, education, achievements } = data;
  const [profileImg, setProfileImg] = useState(null);

  useEffect(() => {
    if (profile.profileImage) getImage(profile.profileImage).then(setProfileImg);
  }, [profile.profileImage]);

  return (
    <>
      <PageHero title="About Me" subtitle="My professional journey and technical expertise" breadcrumb="About" />

      {/* Overview */}
      <section className="py-20 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-1">
              <div className="sticky top-28">
                <div className="w-full aspect-square rounded-2xl bg-gradient-to-br from-[#102A56] to-[#2563EB] flex items-center justify-center overflow-hidden shadow-xl">
                  {profileImg ? (
                    <img src={profileImg} alt={profile.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="text-center text-white">
                      <div className="text-7xl font-bold opacity-20 mb-2">VJ</div>
                      <p className="text-blue-200 text-sm">Profile Photo</p>
                    </div>
                  )}
                </div>
                <div className="mt-6 space-y-3">
                  <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex items-center gap-3">
                    <Briefcase size={20} className="text-[#102A56]" />
                    <div><p className="text-xs text-gray-500">Role</p><p className="font-semibold text-[#111827] text-sm">{profile.designation}</p></div>
                  </div>
                  <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex items-center gap-3">
                    <MapPin size={20} className="text-[#102A56]" />
                    <div><p className="text-xs text-gray-500">Location</p><p className="font-semibold text-[#111827] text-sm">{profile.location}</p></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2 space-y-12">
              <div>
                <h2 className="text-2xl font-bold text-[#111827] mb-4">Professional Overview</h2>
                <p className="text-gray-600 leading-relaxed text-lg">{about.overview}</p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-[#111827] mb-4">Key Responsibilities</h3>
                <div className="space-y-3">
                  {about.responsibilities.map((r, i) => (
                    <div key={i} className="flex items-start gap-3 bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                      <CheckCircle2 size={20} className="text-[#2563EB] flex-shrink-0 mt-0.5" />
                      <p className="text-gray-600">{r}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader badge="Career" title="Work Experience" />
          <div className="max-w-3xl mx-auto space-y-6">
            {experience.map((exp) => (
              <div key={exp.id} className="bg-[#F8FAFC] rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-all">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#102A56] flex items-center justify-center text-white flex-shrink-0">
                    <Briefcase size={22} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-[#111827]">{exp.role}</h3>
                    <p className="text-[#2563EB] font-semibold">{exp.company}</p>
                    <p className="text-gray-500 text-sm mt-1">{exp.duration} · {exp.location}</p>
                    <p className="text-gray-600 mt-3">{exp.description}</p>
                    {exp.highlights && (
                      <div className="mt-4 space-y-2">
                        {exp.highlights.map((h, i) => (
                          <div key={i} className="flex items-center gap-2 text-sm text-gray-600">
                            <CheckCircle2 size={14} className="text-[#D99A22]" /> {h}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Education */}
      <section className="py-20 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader badge="Education" title="Academic Background" />
          <div className="max-w-3xl mx-auto space-y-6">
            {education.map((edu) => (
              <div key={edu.id} className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-all">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#2563EB] flex items-center justify-center text-white flex-shrink-0">
                    <GraduationCap size={22} />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#111827]">{edu.degree}</h3>
                    <p className="text-[#2563EB] font-medium">{edu.institution}, {edu.location}</p>
                    <p className="text-gray-500 text-sm mt-1">{edu.year}</p>
                    <p className="text-gray-600 mt-2 text-sm">{edu.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements Summary */}
      <section className="py-20 bg-gradient-to-br from-[#102A56] to-[#2563EB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader badge="Achievements" title="Key Milestones" light />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {achievements.slice(0, 5).map((a) => {
              const Icon = achieveIcons[a.icon] || Award;
              return (
                <div key={a.id} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all">
                  <Icon size={28} className="text-[#D99A22] mb-3" />
                  <h3 className="font-bold text-white mb-1">{a.title}</h3>
                  <p className="text-blue-200 text-sm">{a.description}</p>
                  {a.year && <p className="text-[#D99A22] text-xs mt-3 font-medium">{a.year}</p>}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
