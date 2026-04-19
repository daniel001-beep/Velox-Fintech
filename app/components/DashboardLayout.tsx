import React from 'react';
import Link from 'next/link';
import { LayoutDashboard, BarChart3, ShoppingCart, Lock, Activity } from 'lucide-react';

interface DashboardLayoutProps {
  children: React.ReactNode;
  activeTab?: 'dashboard' | 'ledger' | 'marketplace' | 'security' | 'api';
}

export default function DashboardLayout({ children, activeTab = 'dashboard' }: DashboardLayoutProps) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, href: '/fintech/dashboard' },
    { id: 'ledger', label: 'Ledger', icon: BarChart3, href: '/fintech/ledger' },
    { id: 'marketplace', label: 'Marketplace', icon: ShoppingCart, href: '/fintech/marketplace' },
    { id: 'security', label: 'Security Audit', icon: Lock, href: '/fintech/security' },
    { id: 'api', label: 'API Status', icon: Activity, href: '/fintech/api-status' },
  ];

  return (
    <div className="flex h-screen bg-base-bg">
      {/* Sidebar Navigation - Fixed, Slim */}
      <nav className="w-64 border-r border-[rgba(99,91,255,0.1)] bg-card-bg flex flex-col py-6 px-4 overflow-y-auto">
        {/* Logo Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white tracking-tight">
            <span className="bg-linear-to-r from-[#635BFF] to-[#00FFC2] bg-clip-text text-transparent">
              Velox
            </span>
          </h2>
          <p className="text-xs text-text-secondary mt-1 uppercase tracking-widest">Fintech</p>
        </div>

        {/* Navigation Links */}
        <div className="space-y-2 flex-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            
            return (
              <Link
                key={item.id}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  isActive
                    ? 'bg-[rgba(99,91,255,0.2)] text-[#635BFF]'
                    : 'text-text-secondary hover:bg-[rgba(99,91,255,0.1)] hover:text-[#635BFF]'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="text-sm font-medium">{item.label}</span>
              </Link>
            );
          })}
        </div>

        {/* Status Indicator */}
        <div className="mt-auto pt-4 border-t border-[rgba(99,91,255,0.1)]">
          <div className="px-4 py-3 bg-[rgba(0,255,194,0.05)] border border-[rgba(0,255,194,0.15)] rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 bg-[#00FFC2] rounded-full animate-pulse"></div>
              <span className="text-xs text-[#00FFC2] font-semibold">LIVE</span>
            </div>
            <p className="text-xs text-text-secondary">System Online</p>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
