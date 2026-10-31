
'use client';

import { Suspense } from 'react';
import { usePathname } from 'next/navigation';

import { WebsiteProvider } from '@/context/WebsiteContext';
import { AdminProvider } from '@/context/AdminContext';

import Navbar from './Navbar';
import Footer from './Footer';

function ClientLayoutContent({ children }) {
  const pathname = usePathname();

  const isAdmin = pathname?.startsWith('/admin');

  return (
    <>
      {!isAdmin && <Navbar />}

      <main className="flex-1">
        {children}
      </main>

      {!isAdmin && <Footer />}
    </>
  );
}

export default function ClientLayout({ children }) {
  return (
    <WebsiteProvider>
      <AdminProvider>
        <Suspense
          fallback={
            <main className="flex-1">
              {children}
            </main>
          }
        >
          <ClientLayoutContent>
            {children}
          </ClientLayoutContent>
        </Suspense>
      </AdminProvider>
    </WebsiteProvider>
  );
}
