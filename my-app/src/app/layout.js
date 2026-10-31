import "./globals.css";
import ClientLayout from "@/components/layout/ClientLayout";
import { Suspense } from "react";

export const metadata = {
  title: "Vikas Jain – Director PNINFOSYS | Data Analytics Expert | Corporate IT Trainer",
  description: "Portfolio of Vikas Jain, Director of PNINFOSYS, Data Analytics Expert, Full Stack Developer and Corporate IT Trainer based in Gwalior, MP.",
  keywords: "Vikas Jain, PNINFOSYS, Data Analytics, Full Stack Developer, Corporate IT Trainer, Gwalior",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <Suspense fallback={<main className="min-h-screen bg-[#F8FAFC]" />}>
          <ClientLayout>{children}</ClientLayout>
        </Suspense>
      </body>
    </html>
  );
}
