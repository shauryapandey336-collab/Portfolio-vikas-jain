'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronRight } from 'lucide-react';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/expertise', label: 'Expertise' },
  { href: '/workshops', label: 'Workshops' },
  { href: '/training', label: 'Training' },
  { href: '/projects', label: 'Projects' },
  { href: '/achievements', label: 'Achievements' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [pathname]);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#102A56] to-[#2563EB] flex items-center justify-center text-white font-bold text-lg shadow-lg group-hover:scale-105 transition-transform">VJ</div>
            <div className="hidden sm:block">
              <p className={`font-bold text-lg leading-tight ${scrolled ? 'text-[#102A56]' : 'text-white'}`}>Vikas Jain</p>
              <p className={`text-xs leading-tight ${scrolled ? 'text-gray-500' : 'text-blue-200'}`}>Director, PNINFOSYS</p>
            </div>
          </Link>

          {/* Desktop */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${pathname === link.href
                  ? 'bg-[#102A56] text-white shadow-md' : scrolled ? 'text-gray-700 hover:bg-gray-100 hover:text-[#102A56]' : 'text-white/90 hover:bg-white/10 hover:text-white'}`}>
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile toggle */}
          <button onClick={() => setOpen(!open)} className={`lg:hidden p-2 rounded-lg ${scrolled ? 'text-[#102A56]' : 'text-white'}`}>
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`lg:hidden transition-all duration-300 overflow-hidden ${open ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="bg-white shadow-xl border-t px-4 py-4 space-y-1">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href}
              className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all ${pathname === link.href
                ? 'bg-[#102A56] text-white' : 'text-gray-700 hover:bg-gray-50'}`}>
              {link.label}
              <ChevronRight size={16} className="opacity-40" />
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
