'use client';

import React from 'react';
import DashboardLayout from '@/app/components/DashboardLayout';
import { Activity, CheckCircle } from 'lucide-react';

export default function APIStatusPage() {
  const apiEndpoints = [
    { name: 'Fraud Detection API', latency: '8.3ms', status: 'healthy' },
    { name: 'Multi-Currency Engine', latency: '5.1ms', status: 'healthy' },
    { name: 'Commerce Agent', latency: '12.4ms', status: 'healthy' },
    { name: 'Insurtech API', latency: '15.2ms', status: 'healthy' },
    { name: 'Digital ID Verification', latency: '9.8ms', status: 'healthy' },
    { name: 'Cash Flow Forecaster', latency: '18.5ms', status: 'healthy' },
  ];

  return (
    <DashboardLayout activeTab="api">
      <div className="min-h-screen bg-base-bg p-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <Activity className="w-8 h-8 text-[#635BFF]" />
            <h1 className="text-3xl font-bold text-white">API Status</h1>
          </div>
          
          <div className="glass-panel p-8">
            <div className="mb-8">
              <h2 className="text-lg font-bold text-white mb-2">Overall Status</h2>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-[#00FFC2] rounded-full animate-pulse"></div>
                <span className="text-[#00FFC2] font-semibold">All Systems Operational</span>
              </div>
            </div>

            <div className="space-y-3">
              {apiEndpoints.map((endpoint) => (
                <div key={endpoint.name} className="flex items-center justify-between p-4 bg-[rgba(99,91,255,0.05)] border border-[rgba(99,91,255,0.1)] rounded-lg">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-[#00FFC2]" />
                    <div>
                      <p className="font-semibold text-white">{endpoint.name}</p>
                      <p className="text-xs text-text-secondary">Status: {endpoint.status}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-mono text-sm text-[#00FFC2]">{endpoint.latency}</p>
                    <p className="text-xs text-text-tertiary">latency</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
