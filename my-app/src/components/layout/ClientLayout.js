'use client';
import { usePathname } from 'next/navigation';
import { WebsiteProvider } from '@/context/WebsiteContext';
import { AdminProvider } from '@/context/AdminContext';
import Navbar from './Navbar';
import Footer from './Footer';

export default function ClientLayout({ children }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith('/admin');

  return (
    <WebsiteProvider>
      <AdminProvider>
        {!isAdmin && <Navbar />}
        <main className="flex-1">{children}</main>
        {!isAdmin && <Footer />}
      </AdminProvider>
    </WebsiteProvider>
  );
}
