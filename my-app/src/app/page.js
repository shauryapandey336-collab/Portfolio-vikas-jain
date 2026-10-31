'use client';
import { useWebsite } from '@/context/WebsiteContext';
import Link from 'next/link';
import { useEffect, useState, useRef } from 'react';
import { ArrowRight, Calendar, Users, Code, TrendingUp, BarChart3, Briefcase, GraduationCap, Award, ChevronRight, Star, Play } from 'lucide-react';
import { SectionHeader } from '@/components/common/UI';
import { getImage } from '@/lib/indexedDB';

function AnimatedCounter({ value, label }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const num = parseInt(value) || 0;

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        let start = 0;
        const duration = 2000;
        const step = (timestamp) => {
          if (!start) start = timestamp;
          const progress = Math.min((timestamp - start) / duration, 1);
          setCount(Math.floor(progress * num));
          if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
        observer.disconnect();
      }
    }, { threshold: 0.3 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [num]);

  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl sm:text-5xl font-bold text-white mb-2">
        {count}{value.toString().replace(/\d/g, '')}
      </div>
      <div className="text-blue-200 text-sm">{label}</div>
    </div>
  );
}

const iconMap = { calendar: Calendar, users: Users, code: Code, 'trending-up': TrendingUp, 'bar-chart': BarChart3 };

export default function HomePage() {
  const { data } = useWebsite();
  const { profile, stats, skills, workshops, projects, testimonials, settings } = data;
  const [profileImg, setProfileImg] = useState(null);

  useEffect(() => {
    if (profile.profileImage) getImage(profile.profileImage).then(setProfileImg);
  }, [profile.profileImage]);

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center bg-gradient-to-br from-[#102A56] via-[#1a3a6e] to-[#2563EB] overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 right-20 w-72 h-72 bg-[#D99A22]/10 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-[#2563EB]/10 rounded-full blur-3xl animate-float animation-delay-300" />
          <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 relative z-10 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in-up">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-2 mb-6">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-blue-100 text-sm">Available for Training & Consulting</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4">
                {profile.name}
              </h1>
              <p className="text-xl text-[#D99A22] font-semibold mb-2">{profile.designation}</p>
              <p className="text-lg text-blue-200 mb-6">
                {profile.titles.join(' | ')}
              </p>
              <p className="text-blue-100/80 text-lg leading-relaxed mb-8 max-w-xl">
                {profile.bio.slice(0, 200)}...
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href="/projects" className="inline-flex items-center gap-2 bg-[#D99A22] hover:bg-[#c08a1e] text-white px-6 py-3 rounded-xl font-semibold transition-all hover:scale-105 shadow-lg shadow-[#D99A22]/30">
                  View My Work <ArrowRight size={18} />
                </Link>
                <Link href="/workshops" className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-xl font-semibold transition-all border border-white/20 backdrop-blur-sm">
                  Explore Workshops
                </Link>
                <Link href="/contact" className="inline-flex items-center gap-2 bg-white hover:bg-gray-100 text-[#102A56] px-6 py-3 rounded-xl font-semibold transition-all">
                  Contact Me
                </Link>
              </div>
            </div>

            <div className="hidden lg:flex justify-center animate-fade-in animation-delay-300">
              <div className="relative">
                <div className="w-80 h-80 rounded-3xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md border border-white/20 flex items-center justify-center overflow-hidden shadow-2xl">
                  {profileImg ? (
                    <img src={profileImg} alt={profile.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="text-center">
                      <div className="text-8xl font-bold text-white/20 mb-2">VJ</div>
                      <p className="text-blue-200 text-sm">Profile Photo</p>
                    </div>
                  )}
                </div>
                <div className="absolute -bottom-4 -right-4 bg-[#D99A22] text-white px-4 py-2 rounded-xl text-sm font-bold shadow-lg">10+ Years</div>
                <div className="absolute -top-4 -left-4 bg-white text-[#102A56] px-4 py-2 rounded-xl text-sm font-bold shadow-lg">Director</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-[#102A56] py-16 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((s) => (
              <AnimatedCounter key={s.id} value={s.value} label={s.label} />
            ))}
          </div>
        </div>
      </section>

      {/* Expertise Overview */}
      <section className="py-20 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader badge="Expertise" title="Technical Proficiency" subtitle="Specialized in modern web technologies, data analytics and corporate training." />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {skills.slice(0, 4).map((skill, i) => (
              <div key={skill.id} className={`bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 animate-fade-in-up animation-delay-${(i + 1) * 100}`}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ background: `${skill.color}15` }}>
                  <BarChart3 size={24} style={{ color: skill.color }} />
                </div>
                <h3 className="font-bold text-[#111827] mb-3">{skill.category}</h3>
                <div className="flex flex-wrap gap-1.5">
                  {skill.items.map((item) => (
                    <span key={item} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-md">{item}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/expertise" className="inline-flex items-center gap-2 text-[#2563EB] hover:text-[#102A56] font-semibold transition-colors">
              View All Expertise <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Workshops */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader badge="Workshops & Events" title="Featured Workshops" subtitle="Training programs conducted at leading institutions." />
          <div className="grid md:grid-cols-2 gap-6">
            {workshops.slice(0, 4).map((ws) => (
              <Link key={ws.id} href={`/workshops/${ws.slug}`} className="group bg-[#F8FAFC] rounded-2xl p-6 hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-[#2563EB]/20">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#102A56] flex items-center justify-center text-white flex-shrink-0">
                    <GraduationCap size={22} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-[#111827] group-hover:text-[#2563EB] transition-colors mb-1">{ws.title}</h3>
                    <p className="text-[#D99A22] text-sm font-medium mb-2">{ws.institution}</p>
                    <p className="text-gray-500 text-sm line-clamp-2">{ws.description}</p>
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {ws.technologies.slice(0, 3).map((t) => (
                        <span key={t} className="text-xs bg-[#102A56]/5 text-[#102A56] px-2 py-0.5 rounded-md">{t}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/workshops" className="inline-flex items-center gap-2 text-[#2563EB] hover:text-[#102A56] font-semibold transition-colors">
              View All Workshops <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-20 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader badge="Projects" title="Featured Work" subtitle="A selection of web and data-driven applications." />
          <div className="grid md:grid-cols-3 gap-6">
            {projects.filter((p) => p.featured).slice(0, 3).map((p) => (
              <div key={p.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 group">
                <div className="h-48 bg-gradient-to-br from-[#102A56] to-[#2563EB] flex items-center justify-center">
                  <Code size={48} className="text-white/20" />
                </div>
                <div className="p-6">
                  <span className="text-xs text-[#D99A22] font-semibold uppercase">{p.category}</span>
                  <h3 className="font-bold text-[#111827] mt-1 mb-2 group-hover:text-[#2563EB] transition-colors">{p.title}</h3>
                  <p className="text-gray-500 text-sm line-clamp-2 mb-3">{p.description}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {p.technologies.slice(0, 4).map((t) => (
                      <span key={t} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-md">{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/projects" className="inline-flex items-center gap-2 text-[#2563EB] hover:text-[#102A56] font-semibold transition-colors">
              View All Projects <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials - only show if admin has added verified ones */}
      {settings?.showTestimonials && testimonials && testimonials.length > 0 && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeader badge="Testimonials" title="What People Say" subtitle="Feedback from students and professionals." />
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {testimonials.map((t) => (
                <div key={t.id} className="bg-[#F8FAFC] rounded-2xl p-6 border border-gray-100">
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(5)].map((_, i) => <Star key={i} size={14} className={i < (t.rating || 5) ? 'text-[#D99A22] fill-[#D99A22]' : 'text-gray-300'} />)}
                  </div>
                  <p className="text-gray-600 text-sm italic mb-4">&ldquo;{t.text}&rdquo;</p>
                  <div>
                    <p className="font-semibold text-[#111827] text-sm">{t.name}</p>
                    <p className="text-gray-500 text-xs">{t.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-[#102A56] to-[#2563EB] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, #D99A22 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Ready to Collaborate?</h2>
          <p className="text-xl text-blue-200 mb-8">Whether you need a training program, a technical workshop, or a web development project — let&apos;s connect.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="inline-flex items-center gap-2 bg-[#D99A22] hover:bg-[#c08a1e] text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all hover:scale-105 shadow-lg">
              Get In Touch <ArrowRight size={20} />
            </Link>
            <Link href="/training" className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all border border-white/20">
              Explore Training
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
