'use client';
import Link from 'next/link';
import { Mail, Phone, MapPin, Globe, ArrowUp } from 'lucide-react';
import { useWebsite } from '@/context/WebsiteContext';

export default function Footer() {
  const { data } = useWebsite();
  const { profile } = data;
  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="bg-[#0B1D3A] text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#2563EB] to-[#D99A22] flex items-center justify-center text-white font-bold text-xl">VJ</div>
              <div>
                <h3 className="font-bold text-lg">{profile.name}</h3>
                <p className="text-blue-300 text-sm">{profile.designation}</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">Data Analytics Expert, Full Stack Developer and Corporate IT Trainer with 10+ years of experience.</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Quick Links</h4>
            <div className="space-y-2">
              {[['/', 'Home'], ['/about', 'About'], ['/expertise', 'Expertise'], ['/workshops', 'Workshops'], ['/training', 'Training'], ['/projects', 'Projects']].map(([href, label]) => (
                <Link key={href} href={href} className="block text-gray-400 hover:text-[#D99A22] transition-colors text-sm">{label}</Link>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Services</h4>
            <div className="space-y-2 text-sm text-gray-400">
              <p>Full Stack Development</p>
              <p>Data Analytics Training</p>
              <p>Corporate IT Training</p>
              <p>Industrial Training</p>
              <p>Technical Workshops</p>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Contact</h4>
            <div className="space-y-3 text-sm">
              <a href={`tel:${profile.phone.replace(/\s/g, '')}`} className="flex items-center gap-2 text-gray-400 hover:text-[#D99A22] transition-colors">
                <Phone size={14} /> {profile.phone}
              </a>
              <a href={`mailto:${profile.email}`} className="flex items-center gap-2 text-gray-400 hover:text-[#D99A22] transition-colors">
                <Mail size={14} /> {profile.email}
              </a>
              <a href={profile.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-400 hover:text-[#D99A22] transition-colors">
                <Globe size={14} /> {profile.website.replace(/^https?:\/\//, '')}
              </a>
              <div className="flex items-center gap-2 text-gray-400">
                <MapPin size={14} /> {profile.location}
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">&copy; {new Date().getFullYear()} {profile.name}. All rights reserved.</p>
          <p className="text-gray-500 text-sm">Designed by <span className="text-[#D99A22]">PNINFOSYS</span></p>
        </div>
      </div>

      <button onClick={scrollTop} className="absolute right-6 -top-5 w-10 h-10 bg-gradient-to-r from-[#2563EB] to-[#102A56] text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
        <ArrowUp size={18} />
      </button>
    </footer>
  );
}
