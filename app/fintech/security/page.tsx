'use client';

import React from 'react';
import DashboardLayout from '@/app/components/DashboardLayout';
import { Shield, CheckCircle } from 'lucide-react';

export default function SecurityPage() {
  const securityItems = [
    { label: 'SOC 2 Type II', status: 'Certified', icon: CheckCircle },
    { label: 'PCI DSS Compliant', status: 'Certified', icon: CheckCircle },
    { label: 'GDPR Compliant', status: 'Certified', icon: CheckCircle },
    { label: 'End-to-End Encryption', status: 'Active', icon: CheckCircle },
    { label: '256-bit AES Encryption', status: 'Active', icon: CheckCircle },
    { label: 'Multi-Factor Authentication', status: 'Enabled', icon: CheckCircle },
  ];

  return (
    <DashboardLayout>
      <div className="mb-8 border-b border-slate-800 pb-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 bg-blue-500/10 rounded-sm border border-blue-500/20">
            <Shield className="w-8 h-8 text-blue-500" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-slate-100">Security Audit</h1>
            <p className="text-slate-400 mt-1">Enterprise security certifications and compliance status</p>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {securityItems.map((item) => {
          const Icon = item.icon;
          
          return (
            <div key={item.label} className="bg-slate-900 border border-slate-700 rounded-sm p-6 hover:bg-slate-800 transition-all duration-200">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-slate-800 rounded-sm border border-slate-700">
                  <Icon className="w-5 h-5 text-emerald-400 shrink-0" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-100 mb-1">{item.label}</h3>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-sm"></div>
                    <p className="text-xs font-bold text-emerald-500 uppercase tracking-widest">{item.status}</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </DashboardLayout>
  );
}
