'use client';

import React from 'react';
import DashboardLayout from '@/app/components/DashboardLayout';
import { Shield, CheckCircle } from 'lucide-react';

export default function SecurityPage() {
  const securityItems = [
    { label: 'SOC 2 Type II', status: 'certified', icon: CheckCircle },
    { label: 'PCI DSS', status: 'certified', icon: CheckCircle },
    { label: 'GDPR Compliant', status: 'certified', icon: CheckCircle },
    { label: 'End-to-End Encryption', status: 'active', icon: CheckCircle },
  ];

  return (
    <DashboardLayout activeTab="security">
      <div className="min-h-screen bg-base-bg p-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <Shield className="w-8 h-8 text-[#00FFC2]" />
            <h1 className="text-3xl font-bold text-white">Security Audit</h1>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {securityItems.map((item) => {
              const Icon = item.icon;
              
              return (
                <div key={item.label} className="glass-panel p-6 flex items-start gap-4">
                  <Icon className="w-6 h-6 text-carbon-mint shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-bold text-white mb-1">{item.label}</h3>
                    <p className="text-sm text-text-secondary capitalize">
                      Status: {item.status}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
