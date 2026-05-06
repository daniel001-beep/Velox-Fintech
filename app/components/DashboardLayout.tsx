import React from 'react';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <section className="container mx-auto px-6 md:px-12 lg:px-24 pt-4 pb-10 max-w-6xl">
      <div className="space-y-10">
        {children}
      </div>
    </section>
  );
}
